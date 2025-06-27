import React from "react";
import "../styles/Contact.css"; // Import du fichier CSS

function Contact() {
  return (
    <div className="contact-page-wrapper"> {/* Conteneur global pour la page */}
      <div className="contact-main-header"> {/* En-tête principal "Have Questions? Get In Touch!" */}
        <h1 className="main-title">Have Questions? Get In Touch!</h1>
        <p className="main-description">
          Great! We're excited to hear from you and let's start something special together. call us for any inquiry.
        </p>
      </div>

      <div className="contact-content-container"> {/* Conteneur pour les deux colonnes (formulaire + détails) */}
        <div className="contact-form-section"> {/* Section du formulaire à gauche */}
          <p className="form-section-subtitle">Get in touch</p>
          <h2 className="form-section-title">Send A Message</h2>
          <p className="form-section-description">
            Our experts and developers would love to contribute their expertise and insights to your potential projects
          </p>
          <form className="contact-form">
            <div className="form-row"> {/* Conteneur pour les champs sur la même ligne */}
              <div className="form-group">
                <label htmlFor="fullName" className="contact-label">Your Name*</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="contact-input"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="contact-label">Email Address*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="contact-input"
                  placeholder="Email Address"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phoneNumber" className="contact-label">Phone Number*</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="contact-input"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject" className="contact-label">Subject*</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="contact-input"
                  placeholder="Subject"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message" className="contact-label">Write a Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="contact-textarea"
                placeholder="Write a Message"
                required
              ></textarea>
            </div>
            <div className="contact-button-container">
              <button type="submit" className="contact-submit-button"> {/* Renommé pour éviter conflit */}
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="contact-details-section"> {/* Section des détails de contact à droite */}
          <h3 className="details-title">Contact Details</h3>
          <p className="detail-item address">
            1635 Franklin Street Montgomery, Near Sherwood Mall. AL 36104
          </p>
          <p className="detail-item send-email">Send email</p>
          <p className="detail-item email-address">Support@Example.Com</p>
          <p className="detail-item call-anytime">Call anytime</p>
          <p className="detail-item phone-number">(007) 123 456 7890</p>
          <div className="social-icons"> {/* Icônes sociales */}
            <a href="#" className="social-icon facebook"><i class="fa fab fa-facebook-f"></i></a> 
            <a href="#" className="social-icon twitter">T</a>
            <a href="#" className="social-icon google">G</a>
            <a href="#" className="social-icon youtube">Y</a>
            <a href="#" className="social-icon linkedin">L</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;