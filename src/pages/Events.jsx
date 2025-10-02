import  { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Events.css";

import heroImg from "../assets/images/event_hero.png";
import catBirthday from "../assets/images/Birthday.png";
import catWedding from "../assets/images/wedding.png";
import catCorporate from "../assets/images/corporate.png";
import catBulk from "../assets/images/bulk.png";

import g1 from "../assets/images/wedding_event.png";
import g2 from "../assets/images/corporate_event.png";
import g3 from "../assets/images/sangeet_event.png";
import g4 from "../assets/images/conference_event.png";
import g5 from "../assets/images/family_event.png";
import g6 from "../assets/images/festive_event.png";

 function useRevealOnScroll() {
  useEffect(() => {
    const revealElements = document.querySelectorAll("[data-reveal]");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const el = entry.target;

            // Smooth fade-up like Outlets.jsx
            el.style.transition = `all 1.2s ease-out ${index * 0.2}s`;
            el.classList.add("revealed");

            observer.unobserve(el); 
          }
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// ---- Card data ----
const categories = [
  {
    title: "Birthday Parties",
    desc:
      "Make every birthday unforgettable with our gourmet delights.",
    image: catBirthday,
    link: "#plan",
  },
  {
    title: "Weddings",
    desc:
      "Elegant catering to make your special day truly magical.",
    image: catWedding,
    link: "#plan",
  },
  {
    title: "Corporate Events",
    desc:
      "Impress clients & colleagues with premium catering services.",
    image: catCorporate,
    link: "#plan",
  },
  {
    title: "Bulk Orders",
    desc:
      "Perfect for large gatherings with unbeatable taste & quality.",
    image: catBulk,
    link: "#plan",
  },
];

const gallery = [
  { src: g1, caption: "Elegant Wedding Setup, chennai" },
  { src: g2, caption: "Corporate Excellence, Bengaluru" },
  { src: g3, caption: "Sangeet Celebration, Chennai" },
  { src: g4, caption: "Conference Buffet, chennai" },
  { src: g5, caption: "Family Gathering, Coimbatore" },
  { src: g6, caption: "Festive Catering, Kochi" },
];

export function Events() {
  useRevealOnScroll();
  const formRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    eventType: '',
    date: '',
    time: '',
    guests: '',
    venue: '',
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Validation functions
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[+]?[\d\s\-()]{10,}$/.test(phone.replace(/\s/g, ''));
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.eventType) errors.eventType = 'Please select an event type';
    if (!data.date) errors.date = 'Please select a date';
    if (!data.time) errors.time = 'Please select a time';
    if (!data.guests || data.guests < 1) errors.guests = 'Please enter number of guests';
    if (!data.venue.trim()) errors.venue = 'Please enter venue location';
    if (!data.name.trim()) errors.name = 'Please enter your name';
    if (!data.phone.trim()) {
      errors.phone = 'Please enter your phone number';
    } else if (!validatePhone(data.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!data.email.trim()) {
      errors.email = 'Please enter your email';
    } else if (!validateEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Date validation - should be in the future
    if (data.date) {
      const selectedDate = new Date(data.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.date = 'Please select a future date';
      }
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm(formData);
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
      return;
    }

    setSubmitting(true);
    setFormErrors({});

    try {
      // Here you would typically send the data to your backend
      console.log("Event lead:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert("Thank you! Our team will contact you within 24 hours to discuss your event details.");
      
      // Reset form
      setFormData({
        eventType: '',
        date: '',
        time: '',
        guests: '',
        venue: '',
        name: '',
        phone: '',
        email: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Sorry, there was an error submitting your request. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="abb-events" aria-labelledby="events-title">
      {/* ===== HERO ===== */}
      <section className="ev-hero" role="banner">
        <div
          className="ev-hero-bg"
          style={{ backgroundImage: `url(${heroImg})` }}
          aria-hidden="true"
        />
        <div className="ev-hero-overlay" />
        
        {/* Animate ONLY text */}
        <div className="ev-hero-inner" data-reveal="fade-up">
          <h1 id="events-title" className="ev-hero-title">
            Celebrate with Ambur Bandaari Biryani
          </h1>
          <p className="ev-hero-sub">
            From intimate gatherings to grand celebrations — we deliver exceptional
            culinary experiences for every occasion.
          </p>
          <button className="btn-gold" onClick={handleScrollToForm}>
            Reserve Your Date Now
          </button>
        </div>

        <div className="ev-hero-parallax" aria-hidden="true" />
      </section>
      <div className="section-divider"></div>

      {/* ===== SPECIAL ORDERS & CATERING ===== */}
      <section className="ev-cats wrapper">
        <header className="ev-sec-head" data-reveal="fade-up">
          <h2>Special Orders & Catering</h2>
          <p>
            Choose an event type to see how we tailor the perfect culinary experience 
            for your special occasion.
          </p>
        </header>

        <div className="ev-grid" data-reveal="fade-up">
          {categories.map((c) => (
            <article className="ev-card" key={c.title}>
              <div className="ev-card-media">
                <img src={c.image} alt={c.title} loading="lazy" />
              </div>
              <div className="ev-card-body">
                <div className="ev-card-text">
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <button 
                    className="plan-btn"
                    onClick={handleScrollToForm}
                  >
                    Plan Your Event
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="section-divider"></div>

      {/* ===== GALLERY ===== */}
      <section className="ev-gallery" aria-label="Event Highlights">
        <div className="wrapper">
          <header className="ev-sec-head" data-reveal="fade-up">
            <h2>Event Highlights</h2>
            <p>
              A glimpse of our premium setups — crafted for elegance, comfort,
              and unforgettable culinary experiences that leave lasting impressions.
            </p>
          </header>

          <div className="ev-gallery-grid" data-reveal="fade-up">
            {gallery.map((g, i) => (
              <figure className="ev-shot" key={i}>
                <img src={g.src} alt={g.caption} loading="lazy" />
                <figcaption>{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <div className="section-divider"></div>
      {/* ===== PLAN YOUR EVENT (FORM) ===== */}
      <section id="plan" ref={formRef} className="ev-form wrapper">
        <header className="ev-sec-head" data-reveal="fade-up">
          <h2>Plan Your Event</h2>
          <p>Share your event details — we'll craft the perfect culinary experience for you.</p>
        </header>

        <form className="ev-lead" onSubmit={handleSubmit} data-reveal="fade-up" noValidate>
          <div className="field">
            <label htmlFor="eventType" className="required">Event Type</label>
            <select 
              id="eventType" 
              name="eventType" 
              value={formData.eventType}
              onChange={handleInputChange}
              required
              aria-describedby={formErrors.eventType ? "eventType-error" : undefined}
            >
              <option value="">Select an option</option>
              <option value="Birthday">Birthday Party</option>
              <option value="Wedding">Wedding</option>
              <option value="Corporate">Corporate Event</option>
              <option value="Bulk Order">Bulk Order</option>
              <option value="Other">Other</option>
            </select>
            {formErrors.eventType && (
              <div id="eventType-error" className="field-error" role="alert">
                {formErrors.eventType}
              </div>
            )}
          </div>

          <div className="field">
            <label htmlFor="date" className="required">Event Date</label>
            <input 
              id="date" 
              name="date" 
              type="date" 
              value={formData.date}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              required
              aria-describedby={formErrors.date ? "date-error" : undefined}
            />
            {formErrors.date && (
              <div id="date-error" className="field-error" role="alert">
                {formErrors.date}
              </div>
            )}
          </div>

          <div className="field">
            <label htmlFor="time" className="required">Event Time</label>
            <input 
              id="time" 
              name="time" 
              type="time" 
              value={formData.time}
              onChange={handleInputChange}
              required
              aria-describedby={formErrors.time ? "time-error" : undefined}
            />
            {formErrors.time && (
              <div id="time-error" className="field-error" role="alert">
                {formErrors.time}
              </div>
            )}
          </div>

          <div className="field">
            <label htmlFor="guests" className="required">Number of Guests</label>
            <input
              id="guests"
              name="guests"
              type="number"
              min="1"
              max="10000"
              value={formData.guests}
              onChange={handleInputChange}
              placeholder="e.g., 120"
              required
              aria-describedby={formErrors.guests ? "guests-error" : undefined}
            />
            {formErrors.guests && (
              <div id="guests-error" className="field-error" role="alert">
                {formErrors.guests}
              </div>
            )}
          </div>

          <div className="field">
            <label htmlFor="venue" className="required">Venue / Location</label>
            <input
              id="venue"
              name="venue"
              type="text"
              value={formData.venue}
              onChange={handleInputChange}
              placeholder="Full address or area"
              required
              aria-describedby={formErrors.venue ? "venue-error" : undefined}
            />
            {formErrors.venue && (
              <div id="venue-error" className="field-error" role="alert">
                {formErrors.venue}
              </div>
            )}
          </div>

          <div className="field">
            <label htmlFor="name" className="required">Your Name</label>
            <input 
              id="name" 
              name="name" 
              type="text" 
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full name"
              required
              aria-describedby={formErrors.name ? "name-error" : undefined}
            />
            {formErrors.name && (
              <div id="name-error" className="field-error" role="alert">
                {formErrors.name}
              </div>
            )}
          </div>

          <div className="field">
            <label htmlFor="phone" className="required">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              inputMode="tel"
              placeholder="+91 98765 43210"
              required
              aria-describedby={formErrors.phone ? "phone-error" : undefined}
            />
            {formErrors.phone && (
              <div id="phone-error" className="field-error" role="alert">
                {formErrors.phone}
              </div>
            )}
          </div>

          <div className="field">
            <label htmlFor="email" className="required">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              required
              aria-describedby={formErrors.email ? "email-error" : undefined}
            />
            {formErrors.email && (
              <div id="email-error" className="field-error" role="alert">
                {formErrors.email}
              </div>
            )}
          </div>

          <div className="field span-2">
            <label htmlFor="notes">Additional Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              rows="4"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Menu preferences, dietary requirements, special requests, budget considerations..."
            />
          </div>

          <div className="submit-container">
            <button 
              type="submit" 
              className="btn-gold wide" 
              disabled={submitting}
              aria-describedby="submit-help"
            >
              {submitting ? "Submitting Request..." : "Submit Event Request"}
            </button>
          </div>
          
          <div id="submit-help" className="field span-2" style={{ textAlign: 'center', fontSize: '0.9rem', color: '#6e6e6e', marginTop: '0.5rem' }}>
           We'll respond in 24h with a curated plan
          </div>
        </form>
      </section>
      <div className="section-divider"></div>
      {/* ===== FINAL CTA ===== */}
      <section className="ev-cta">
        <div className="wrapper" data-reveal="slide-up">
          <h3>Let's Make Your Occasion Unforgettable with ABB</h3>
          <div className="ev-cta-actions">
            <button className="btn-gold" onClick={handleScrollToForm}>Get Started Today</button>
            <Link className="btn-outline" to="/contact">Contact Us Directly</Link>
          </div>
        </div>
      </section>
    </main>
  );
}