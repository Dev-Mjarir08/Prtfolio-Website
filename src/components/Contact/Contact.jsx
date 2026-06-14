import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiSend } from 'react-icons/fi';
import { profile } from '../../data/portfolio.js';
import { sendPortfolioMessage } from '../../utils/email.js';
import { SectionTitle } from '../Shared/SectionTitle.jsx';
import { MagneticButton } from '../Shared/MagneticButton.jsx';

const initialForm = {
  name: '',
  email: '',
  projectType: 'Full Stack Product',
  message: ''
};

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus('sending');
    try {
      await sendPortfolioMessage(form);
      setStatus('sent');
      setForm(initialForm);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-root contact-section">
      <SectionTitle
        eyebrow="Tree Portal"
        title="Let’s grow the next product."
        copy="Send a concise project signal and I’ll bring the stack, structure, and polish."
      />
      <div className="contact-portal">
        <motion.div
          className="portal-ring"
          initial={{ opacity: 0, scale: 0.84 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </motion.div>
        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <label>
            <span>Name</span>
            <input name="name" value={form.name} onChange={onChange} autoComplete="name" />
            {errors.name && <small>{errors.name}</small>}
          </label>
          <label>
            <span>Email</span>
            <input name="email" value={form.email} onChange={onChange} autoComplete="email" inputMode="email" />
            {errors.email && <small>{errors.email}</small>}
          </label>
          <label>
            <span>Project Type</span>
            <select name="projectType" value={form.projectType} onChange={onChange}>
              <option>Full Stack Product</option>
              <option>Frontend Build</option>
              <option>API Integration</option>
              <option>Website Optimization</option>
            </select>
          </label>
          <label className="message-field">
            <span>Message</span>
            <textarea name="message" value={form.message} onChange={onChange} rows="5" />
            {errors.message && <small>{errors.message}</small>}
          </label>
          <div className="contact-actions">
            <MagneticButton type="submit" className="w-full justify-center sm:w-auto">
              {status === 'sending' ? 'Sending' : 'Send Signal'} <FiSend />
            </MagneticButton>
            <a href={`mailto:${profile.email}`} className="mail-link" data-cursor="magnetic">
              <FiMail />
              {profile.email}
            </a>
          </div>
          {status === 'sent' && <p className="form-status">Message staged successfully.</p>}
          {status === 'error' && <p className="form-status is-error">The portal flickered. Try email directly.</p>}
        </form>
      </div>
    </section>
  );
}

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Valid email is required.';
  if (form.message.trim().length < 12) errors.message = 'Message needs at least 12 characters.';
  return errors;
}
