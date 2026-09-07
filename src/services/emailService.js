import emailjs from '@emailjs/browser';

// EmailJS Configuration
export const EMAILJS_CONFIG = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'WFs7aOdipjvnienJy',
  privateKey: import.meta.env.VITE_EMAILJS_PRIVATE_KEY || 'xOUYiROenkqg1EL67OQjS',
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_svfbuux',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_erkg2dq'
};

// Initialize EmailJS client
if (typeof window !== 'undefined' && EMAILJS_CONFIG.publicKey) {
  try {
    emailjs.init({
      publicKey: EMAILJS_CONFIG.publicKey
    });
  } catch (err) {
    console.warn('EmailJS initialization warning:', err);
  }
}

/**
 * Send email using EmailJS client-side service (No Node.js / nodemailer required)
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.email
 * @param {string} data.message
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function sendContactEmail({ name, email, message }) {
  const serviceId = EMAILJS_CONFIG.serviceId;
  const templateId = EMAILJS_CONFIG.templateId;
  const publicKey = EMAILJS_CONFIG.publicKey;
  const privateKey = EMAILJS_CONFIG.privateKey;

  // Normalized template parameters to match any EmailJS template variable names
  const templateParams = {
    name,
    from_name: name,
    user_name: name,
    email,
    from_email: email,
    user_email: email,
    reply_to: email,
    message,
    user_message: message,
    to_name: 'Jarir Multani',
    to_email: 'multanijarir08@gmail.com',
    sent_at: new Date().toLocaleString()
  };

  try {
    // 1. Primary: Dispatch through EmailJS browser SDK
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    if (response.status === 200 || response.text === 'OK') {
      return { success: true };
    }
  } catch (sdkError) {
    console.warn('EmailJS SDK send failed, trying direct REST endpoint with accessToken:', sdkError);

    // 2. Fallback: If privateKey/accessToken is enforced by EmailJS dashboard security
    try {
      const restResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          accessToken: privateKey,
          template_params: templateParams
        })
      });

      if (restResponse.ok) {
        return { success: true };
      }

      const errorText = await restResponse.text();
      console.error('EmailJS REST error:', errorText);

      // Detect specific setup notice for the user
      if (errorText.includes('service ID') || errorText.includes('Service ID')) {
        throw new Error('EmailJS Service ID not found. Please provide your Service ID from the EmailJS dashboard.');
      }
      if (errorText.includes('template ID') || errorText.includes('Template ID')) {
        throw new Error('EmailJS Template ID not found. Please provide your Template ID from the EmailJS dashboard.');
      }
      throw new Error(errorText || 'Failed to dispatch email via EmailJS');
    } catch (fallbackError) {
      const msg = fallbackError?.message || sdkError?.text || 'Email service error';
      throw new Error(msg);
    }
  }

  return { success: true };
}
