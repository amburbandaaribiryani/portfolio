import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/ContactUs.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    agree: false
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Validation rules
  const validate = (name, value) => {
    switch (name) {
      case "name":
        return /^[A-Za-z ]{3,}$/.test(value)
          ? ""
          : "Name must be at least 3 letters";
      case "email":
        return /^\S+@\S+\.\S+$/.test(value)
          ? ""
          : "Please enter a valid email";
      case "phone":
        return /^[0-9]{10}$/.test(value)
          ? ""
          : "Phone must be exactly 10 digits";
      case "subject":
        return value ? "" : "Please select a subject";
      case "message":
        return value.length >= 5 && value.length <= 500
          ? ""
          : "Message must be 5-500 characters";
      case "agree":
        return value ? "" : "You must agree to the terms";
      default:
        return "";
    }
  };

  // Real-time validation
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: fieldValue });
    setErrors({ ...errors, [name]: validate(name, fieldValue) });
  };

  // Check overall form validity
  useEffect(() => {
    const allValid =
      Object.values(formData).every((val) => val !== "" && val !== false) &&
      Object.values(errors).every((err) => err === "");
    setIsValid(allValid);
  }, [formData, errors]);


  const handleSubmit = (e) => {
  e.preventDefault();

  let newErrors = {};
  Object.keys(formData).forEach((field) => {
    const errorMsg = validate(field, formData[field]);
    if (errorMsg) {
      newErrors[field] = errorMsg || "This field is required";
    }
  });

  setErrors(newErrors);
  if (Object.values(newErrors).some((err) => err !== "")) {
    toast.error("Please fill in all required fields correctly.");
    return;
  }

  toast.success("Your message has been sent! We’ll get back to you shortly.");
  setFormData({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    agree: false
  });
};


  // Animation Variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <motion.section
        className="contact-hero"
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="overlay">
          <h1>Let’s Connect</h1>
          <p className="hero-subheading">
            Whether it’s a catering request, a question, or just to say hello — we’re here for you.
          </p>
        </div>
      </motion.section>

      <section className="contact-container">
        {/* Left Column */}
        <motion.div
          className="contact-info"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>Contact Details</h2>
          <p className="tagline">We’re just a message away from your next feast!</p>

          {/* Tap-to-call link */}
          <motion.div className="info-item" whileHover={{ scale: 1.05 }}>
            <FaPhoneAlt /> <a href="tel:+919003500426">+91 9003500426</a>
          </motion.div>

          {/* Tap-to-email link */}
          <motion.div className="info-item" whileHover={{ scale: 1.05 }}>
            <FaEnvelope /> <a href="mailto:contact@amburbandaari.com">contact@amburbandaari.com</a>
          </motion.div>

          <motion.div className="info-item" whileHover={{ scale: 1.05 }}>
          <FaMapMarkerAlt />
            <a
              href="https://maps.app.goo.gl/3qPqE7aSUweGGrK6A?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
            >
              New No.280, Old No.238/2, Quaid-E-Millath Road, Triplicane, Chennai
          </a>
        </motion.div>

          <motion.div className="info-item" whileHover={{ scale: 1.05 }}>
            <FaClock /> Mon-Sun: 10AM - 11PM
          </motion.div>

          <motion.iframe
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.655294775243!2d80.2739333!3d13.0575998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526700320e3803%3A0x23ec8007c8e4b86f!2sAmbur%20Bandaari%20Biryani!5e0!3m2!1sen!2sin!4v1756817406720!5m2!1sen!2sin"
            width="100%"
            height="200"
            style={{
              border: "0",
              borderRadius: "12px",
              marginTop: "15px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
            }}
            allowFullScreen
            loading="lazy"
          ></motion.iframe>
        </motion.div>


        {/* Right Column - Contact Form */}
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>Send Us a Message</h2>
          
         <label htmlFor="name" className="visually-hidden">Your Name</label> 
          <input
            id="name" 
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error" : formData.name ? "success" : ""}
          />
          {errors.name && <small className="error-text">{errors.name}</small>}

          <label htmlFor="email" className="visually-hidden">Your Email</label> 
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : formData.email ? "success" : ""}
          />
          {errors.email && <small className="error-text">{errors.email}</small>}

          <label htmlFor="phone" className="visually-hidden">Your Phone</label>
          <input
            id="phone"
            type="text"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "error" : formData.phone ? "success" : ""}
          />
          {errors.phone && <small className="error-text">{errors.phone}</small>}

          <label htmlFor="subject" className="visually-hidden">Subject</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={errors.subject ? "error" : formData.subject ? "success" : ""}>
            <option value="">Select Subject</option>
            <option value="Catering Inquiry">Catering Inquiry</option>
            <option value="Reservation">Reservation</option>
            <option value="Feedback">Feedback</option>
            <option value="Other">Other</option>
          </select>
          {errors.subject && <small className="error-text">{errors.subject}</small>}

          <label htmlFor="message" className="visually-hidden">Your Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? "error" : formData.message ? "success" : ""}>
          </textarea>
          {errors.message && <small className="error-text">{errors.message}</small>}

          <div className="checkbox-container">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            <label>I agree to the terms & privacy policy</label>
          </div>
          {errors.agree && <small className="error-text">{errors.agree}</small>}

          <button type="submit" >Send Message</button>
        </motion.form>
      </section>

      <p className="contactus-tagline">Every great biryani starts with a conversation.</p>

      <ToastContainer position="top-center" autoClose={3000} />

    </div>
  );
};
