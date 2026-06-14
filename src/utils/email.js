import emailjs from '@emailjs/browser';

export async function sendPortfolioMessage(form) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    await new Promise((resolve) => setTimeout(resolve, 650));
    return { offline: true };
  }

  return emailjs.send(
    serviceId,
    templateId,
    {
      from_name: form.name,
      from_email: form.email,
      project_type: form.projectType,
      message: form.message
    },
    { publicKey }
  );
}
