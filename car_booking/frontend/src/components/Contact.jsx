import React from "react";
import "../styles/Contact.css"; // Import du fichier CSS

function Contact() {
  return (
    <div className="contact-page-wrapper"> {/* Conteneur global pour la page */}
      <div className="contact-main-header"> {/* En-tête principal "Des questions ? Contactez-nous !" */}
        <h1 className="main-title">Des questions ? Contactez-nous !</h1>
        <p className="main-description">
          Super ! Nous sommes ravis de vous entendre et de commencer quelque chose de spécial ensemble. Appelez-nous pour toute demande.
        </p>
      </div>

      <div className="contact-content-container"> {/* Conteneur pour les deux colonnes (formulaire + détails) */}
        <div className="contact-form-section"> {/* Section du formulaire à gauche */}
          <p className="form-section-subtitle">Prenez contact</p>
          <h2 className="form-section-title">Envoyez un message</h2>
          <p className="form-section-description">
            Nos experts et développeurs seraient ravis d'apporter leur expertise et leurs idées à vos projets potentiels.
          </p>
          <form className="contact-form">
            <div className="form-row"> {/* Conteneur pour les champs sur la même ligne */}
              <div className="form-group">
                <label htmlFor="fullName" className="contact-label">Votre Nom*</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="contact-input"
                  placeholder="Votre Nom"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="contact-label">Adresse E-mail*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="contact-input"
                  placeholder="Adresse E-mail"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phoneNumber" className="contact-label">Numéro de téléphone*</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="contact-input"
                  placeholder="Numéro de téléphone"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject" className="contact-label">Sujet*</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="contact-input"
                  placeholder="Sujet"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message" className="contact-label">Écrivez un message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="contact-textarea"
                placeholder="Écrivez un message"
                required
              ></textarea>
            </div>
            <div className="contact-button-container">
              <button type="submit" className="contact-submit-button">
                Envoyer le message
              </button>
            </div>
          </form>
        </div>

        <div className="contact-details-section"> {/* Section des détails de contact à droite */}
          <h3 className="details-title">Coordonnées</h3>
          <p className="detail-item address">
            1635 Franklin Street Montgomery, Près de Sherwood Mall. AL 36104
          </p>
          <p className="detail-item send-email">Envoyer un e-mail</p>
          <p className="detail-item email-address">Support@Example.Com</p>
          <p className="detail-item call-anytime">Appelez à tout moment</p>
          <p className="detail-item phone-number">(007) 123 456 7890</p>
          <div className="social-icons">
            {/* Si vous utilisez de vraies icônes (FontAwesome, SVG), le texte 'F', 'T', etc. serait à retirer */}
            <a href="#" className="social-icon facebook"></a> {/* Ex: <FaFacebookF /> */}
            <a href="#" className="social-icon twitter"></a> {/* Ex: <FaTwitter /> */}
            <a href="#" className="social-icon google"></a> {/* Ex: <FaGoogle /> */}
            <a href="#" className="social-icon youtube"></a> {/* Ex: <FaYoutube /> */}
            <a href="#" className="social-icon linkedin"></a> {/* Ex: <FaLinkedinIn /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;