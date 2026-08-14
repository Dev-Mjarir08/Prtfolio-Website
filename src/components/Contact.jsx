import React, { useState, useRef } from 'react';

export default React.memo(function Contact({ data, setCursor }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate clean form submission handling
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__intro">
        <span className="section-head__index">08</span>
        <h2 className="contact__title reveal-text">Let's<br />Connect</h2>
        <p className="contact__sub">
          Interested in collaborating or hiring for Full Stack MERN Development, React.js projects, or internships? Feel free to reach out directly.
        </p>
        <a 
          href={`mailto:${data.personalInfo.email}`} 
          className="contact__mail link-underline magnetic"
          onMouseEnter={() => setCursor('hover', 'EMAIL')}
          onMouseLeave={() => setCursor('default')}
        >
          {data.personalInfo.email}
        </a>
        <p style={{ marginTop: '1rem', color: 'var(--muted)', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem' }}>
          Phone: {data.personalInfo.phone} · {data.personalInfo.address}
        </p>
        <div className="contact__socials" style={{ marginTop: '1.5rem', display: 'flex', gap: '1.5rem', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem' }}>
          <a 
            href={data.personalInfo.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="link-underline magnetic"
            onMouseEnter={() => setCursor('hover', 'GITHUB')}
            onMouseLeave={() => setCursor('default')}
          >
            GitHub
          </a>
          <a 
            href={data.personalInfo.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="link-underline magnetic"
            onMouseEnter={() => setCursor('hover', 'LINKEDIN')}
            onMouseLeave={() => setCursor('default')}
          >
            LinkedIn
          </a>
        </div>
      </div>

      <form className="contact__form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            placeholder=" " 
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="name">Your Name</label>
          <span className="field__line" />
        </div>

        <div className="field">
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            placeholder=" " 
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="email">Email Address</label>
          <span className="field__line" />
        </div>

        <div className="field">
          <input 
            type="text" 
            id="subject" 
            name="subject" 
            placeholder=" " 
            value={formData.subject}
            onChange={handleChange}
          />
          <label htmlFor="subject">Subject / Inquiry Type</label>
          <span className="field__line" />
        </div>

        <div className="field">
          <textarea 
            id="message" 
            name="message" 
            rows="3" 
            required 
            placeholder=" "
            value={formData.message}
            onChange={handleChange}
          />
          <label htmlFor="message">Your Message</label>
          <span className="field__line" />
        </div>

        <button 
          type="submit" 
          className="btn btn--fill btn--block magnetic"
          disabled={isSubmitting}
          onMouseEnter={() => setCursor('hover', 'SEND')}
          onMouseLeave={() => setCursor('default')}
        >
          <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
          <i className="btn__arrow">&#8594;</i>
        </button>

        {submitted && (
          <p className="contact__success" style={{ opacity: 1, display: 'block' }}>
            Thank you — your message has been sent. I'll get back to you shortly.
          </p>
        )}
      </form>
    </section>
  );
});

