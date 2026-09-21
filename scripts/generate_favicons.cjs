const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// 1. Decode PNG
function decodePNG(buffer) {
  let offset = 8;
  let idatList = [];
  let width, height;
  while (offset < buffer.length) {
    const len = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    if (type === 'IHDR') {
      width = buffer.readUInt32BE(offset + 8);
      height = buffer.readUInt32BE(offset + 12);
    } else if (type === 'IDAT') {
      idatList.push(buffer.slice(offset + 8, offset + 8 + len));
    }
    offset += 12 + len;
  }
  const decompressed = zlib.inflateSync(Buffer.concat(idatList));
  const bpp = 4;
  const stride = width * bpp;
  const raw = Buffer.alloc(width * height * 4);
  let srcPos = 0;
  let prevLine = Buffer.alloc(stride);

  for (let y = 0; y < height; y++) {
    const filter = decompressed[srcPos++];
    const currentLine = Buffer.alloc(stride);
    for (let x = 0; x < stride; x++) {
      const byte = decompressed[srcPos++];
      const left = x >= bpp ? currentLine[x - bpp] : 0;
      const up = prevLine[x];
      const upLeft = x >= bpp ? prevLine[x - bpp] : 0;
      let val = 0;
      if (filter === 0) val = byte;
      else if (filter === 1) val = (byte + left) & 0xff;
      else if (filter === 2) val = (byte + up) & 0xff;
      else if (filter === 3) val = (byte + Math.floor((left + up) / 2)) & 0xff;
      else if (filter === 4) {
        const p = left + up - upLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - upLeft);
        let pr = (pa <= pb && pa <= pc) ? left : (pb <= pc ? up : upLeft);
        val = (byte + pr) & 0xff;
      }
      currentLine[x] = val;
    }
    currentLine.copy(raw, y * stride);
    prevLine = currentLine;
  }
  return { width, height, data: raw };
}

// 2. Encode PNG
function encodePNG(width, height, rgbaBuffer) {
  const stride = width * 4;
  const filtered = Buffer.alloc(height * (1 + stride));
  for (let y = 0; y < height; y++) {
    filtered[y * (1 + stride)] = 0; // None filter
    rgbaBuffer.copy(filtered, y * (1 + stride) + 1, y * stride, (y + 1) * stride);
  }
  const compressed = zlib.deflateSync(filtered, { level: 9 });

  function crc32(buf) {
    let table = crc32.table;
    if (!table) {
      table = crc32.table = new Int32Array(256);
      for (let i = 0; i < 256; i++) {
        let c = i;
        for (let k = 0; k < 8; k++) {
          c = ((c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1));
        }
        table[i] = c;
      }
    }
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ (-1)) >>> 0;
  }

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const typeAndData = buf.slice(4, 8 + len);
    buf.writeUInt32BE(crc32(typeAndData), 8 + len);
    return buf;
  }

  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8);
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);

  return Buffer.concat([
    header,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

// 3. Bilinear resample & center cropped logo into target canvas
function renderCanvas(cropped, targetW, targetH, logoScaleRatio = 0.75, bg = [5, 5, 5, 255]) {
  const canvas = Buffer.alloc(targetW * targetH * 4);
  // Fill background
  for (let i = 0; i < targetW * targetH; i++) {
    canvas[i * 4] = bg[0];
    canvas[i * 4 + 1] = bg[1];
    canvas[i * 4 + 2] = bg[2];
    canvas[i * 4 + 3] = bg[3];
  }

  // Calculate target logo size maintaining aspect ratio
  const maxLogoW = targetW * logoScaleRatio;
  const maxLogoH = targetH * logoScaleRatio;
  const scale = Math.min(maxLogoW / cropped.width, maxLogoH / cropped.height);
  const destW = Math.round(cropped.width * scale);
  const destH = Math.round(cropped.height * scale);
  const destX = Math.round((targetW - destW) / 2);
  const destY = Math.round((targetH - destH) / 2);

  for (let dy = 0; dy < destH; dy++) {
    const sy = (dy / destH) * (cropped.height - 1);
    const sy0 = Math.floor(sy);
    const sy1 = Math.min(sy0 + 1, cropped.height - 1);
    const yLerp = sy - sy0;

    for (let dx = 0; dx < destW; dx++) {
      const sx = (dx / destW) * (cropped.width - 1);
      const sx0 = Math.floor(sx);
      const sx1 = Math.min(sx0 + 1, cropped.width - 1);
      const xLerp = sx - sx0;

      const idx00 = (sy0 * cropped.width + sx0) * 4;
      const idx10 = (sy0 * cropped.width + sx1) * 4;
      const idx01 = (sy1 * cropped.width + sx0) * 4;
      const idx11 = (sy1 * cropped.width + sx1) * 4;

      const destIdx = ((destY + dy) * targetW + (destX + dx)) * 4;

      for (let c = 0; c < 4; c++) {
        const top = cropped.data[idx00 + c] * (1 - xLerp) + cropped.data[idx10 + c] * xLerp;
        const bot = cropped.data[idx01 + c] * (1 - xLerp) + cropped.data[idx11 + c] * xLerp;
        canvas[destIdx + c] = Math.round(top * (1 - yLerp) + bot * yLerp);
      }
    }
  }

  return encodePNG(targetW, targetH, canvas);
}

// 4. Build standard Windows Multi-Resolution ICO file with PNG payloads
function createIco(pngBuffers) {
  // pngBuffers: array of { width, height, buffer }
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(count, 4); // Count

  let dirOffset = 6 + count * 16;
  const dirEntries = [];

  for (let i = 0; i < count; i++) {
    const item = pngBuffers[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(item.buffer.length, 8); // image size
    entry.writeUInt32LE(dirOffset, 12); // image offset
    dirEntries.push(entry);
    dirOffset += item.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map(p => p.buffer)]);
}

// Main execution
const originalPng = fs.readFileSync(path.join(__dirname, '../public/image.png'));
const decoded = decodePNG(originalPng);

// Find tight bounding box of MJ logo
let minX = decoded.width, maxX = 0, minY = decoded.height, maxY = 0;
for (let y = 0; y < decoded.height; y++) {
  for (let x = 0; x < decoded.width; x++) {
    const idx = (y * decoded.width + x) * 4;
    const r = decoded.data[idx];
    const g = decoded.data[idx + 1];
    const b = decoded.data[idx + 2];
    if (r > 30 || g > 30 || b > 30) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

// Add 2px safety margin
minX = Math.max(0, minX - 2);
maxX = Math.min(decoded.width - 1, maxX + 2);
minY = Math.max(0, minY - 2);
maxY = Math.min(decoded.height - 1, maxY + 2);

const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;
const croppedData = Buffer.alloc(cropW * cropH * 4);

for (let y = 0; y < cropH; y++) {
  const srcY = minY + y;
  for (let x = 0; x < cropW; x++) {
    const srcX = minX + x;
    const srcIdx = (srcY * decoded.width + srcX) * 4;
    const dstIdx = (y * cropW + x) * 4;
    decoded.data.copy(croppedData, dstIdx, srcIdx, srcIdx + 4);
  }
}
const cropped = { width: cropW, height: cropH, data: croppedData };

console.log(`Cropped logo dimensions: ${cropW}x${cropH}`);

// Generate square assets
// Google recommends favicons to be square, multiple of 48px (48, 96, 144, 192), fits nicely in circular search snippet
const png512 = renderCanvas(cropped, 512, 512, 0.70);
const png192 = renderCanvas(cropped, 192, 192, 0.70);
const png180 = renderCanvas(cropped, 180, 180, 0.70); // Apple touch icon
const png96 = renderCanvas(cropped, 96, 96, 0.70);
const png48 = renderCanvas(cropped, 48, 48, 0.70);
const png32 = renderCanvas(cropped, 32, 32, 0.72);
const png16 = renderCanvas(cropped, 16, 16, 0.72);

// Generate 1200x630 social OpenGraph image
const pngOg = renderCanvas(cropped, 1200, 630, 0.50);

const pubDir = path.join(__dirname, '../public');

fs.writeFileSync(path.join(pubDir, 'favicon-48x48.png'), png48);
fs.writeFileSync(path.join(pubDir, 'favicon-96x96.png'), png96);
fs.writeFileSync(path.join(pubDir, 'icon-192.png'), png192);
fs.writeFileSync(path.join(pubDir, 'icon-512.png'), png512);
fs.writeFileSync(path.join(pubDir, 'apple-touch-icon.png'), png180);
fs.writeFileSync(path.join(pubDir, 'og-image.png'), pngOg);

// Replace /public/image.png and /public/assets/image.png with the new high-res 512x512 square version!
fs.writeFileSync(path.join(pubDir, 'image.png'), png512);
const assetsDir = path.join(pubDir, 'assets');
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
fs.writeFileSync(path.join(assetsDir, 'image.png'), png512);

// Generate valid multi-res ICO
const icoBuf = createIco([
  { width: 16, height: 16, buffer: png16 },
  { width: 32, height: 32, buffer: png32 },
  { width: 48, height: 48, buffer: png48 }
]);
fs.writeFileSync(path.join(pubDir, 'favicon.ico'), icoBuf);

console.log('Successfully generated all square favicons, ICO, and OG images!');
