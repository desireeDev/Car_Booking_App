import React from "react";
import "..//styles/Contact.css"; // Import du fichier CSS

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="contact-title">Contactez-nous</h1>
        <p className="contact-subtitle">
          Une question, une suggestion ? Laissez-nous un message et nous vous répondrons rapidement.
        </p>
        <form className="contact-form">
          <div>
            <label className="contact-label">Nom complet</label>
            <input
              type="text"
              className="contact-input"
              placeholder="Votre nom"
              required
            />
          </div>
          <div>
            <label className="contact-label">Email</label>
            <input
              type="email"
              className="contact-input"
              placeholder="votre.email@exemple.com"
              required
            />
          </div>
          <div>
            <label className="contact-label">Message</label>
            <textarea
              rows="5"
              className="contact-textarea"
              placeholder="Écrivez votre message ici..."
              required
            ></textarea>
          </div>
          <div className="contact-button-container">
            <button type="submit" className="contact-button">
              Envoyer ❤️
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
