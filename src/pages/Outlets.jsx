import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import { FaUtensils, FaLeaf, FaCrown, FaSmile, FaHandsHelping, FaAward } from "react-icons/fa";

import "../styles/Outlets.css";

import outlet1 from "../assets/images/outlet_1.png";
import outlet2 from "../assets/images/outlet_2.png";
import outlet3 from "../assets/images/outlet_3.png";
import outlet4 from "../assets/images/outlet_4.png";

/* Animation Variants */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

/* ---------- DATA: outlets ---------- */
const outlets = [
  {
    id: 1,
    name: "Ambur Bandaari Biryani - Triplicane",
    address: "New No.280, Old No.238/2, Quaid-E-Millath Road, Triplicane, Chennai",
    timings: "11 AM – 11 PM",
    img: outlet1,
    mapLink: "https://maps.app.goo.gl/3qPqE7aSUweGGrK6A?g_st=aw",
    isOpen: true
  },
  {
    id: 2,
    name: "Ambur Bandaari Biryani - Ice House",
    address: "Ice House, Chennai",
    timings: "11 AM – 11 PM",
    img: outlet2,
    mapLink: "https://www.google.com/maps/place/Ice+House,+Chennai",
    isOpen: false
  },
  {
    id: 3,
    name: "Ambur Bandaari Biryani - Royapettah",
    address: "Royapettah, Chennai",
    timings: "11 AM – 11:30 PM",
    img: outlet3,
    mapLink: "https://maps.google.com/?q=Koyambedu+Chennai",
    isOpen: false
  },
  {
    id: 4,
    name: "Ambur Bandaari Biryani - Cheppakkam",
    address: "Cheppakkam, Chennai",
    timings: "11 AM – 11:11 PM",
    img: outlet4,
    mapLink: "https://maps.google.com/?q=Egmore+Chennai",
    isOpen: false
  }
];

/* ---------- Why Choose Us items  */
const items = [
  { id: 1, title: "Authentic Taste", desc: "Crafted with age-old Ambur recipes, delivering the true heritage of biryani.", icon: <FaUtensils /> },
  { id: 2, title: "Premium Ingredients", desc: "Only the finest basmati rice, tender meat, and hand-picked spices make it to your plate.", icon: <FaLeaf /> },
  { id: 3, title: "Royal Ambience", desc: "A warm and elegant dining space that blends tradition with modern comfort.", icon: <FaCrown /> },
  { id: 4, title: "Customer Delight", desc: "We value every guest, ensuring memorable dining experiences with exceptional service.", icon: <FaSmile /> },
  { id: 5, title: "Hospitality at Heart", desc: "Our staff is trained to serve with warmth, care, and professionalism.", icon: <FaHandsHelping /> },
  { id: 6, title: "Trusted Legacy", desc: "A name cherished by food lovers, known for consistency and excellence in every bite.", icon: <FaAward /> }
];

export function Outlets() {
  const navigate = useNavigate();

  return (
    <div className="outlets-page">
      {/* Hero Section */}
      <section className="hero">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
        >
          <h1>Find Us Near You</h1>
          <p>Experience authentic Ambur Biryani across Chennai</p>
        </motion.div>
      </section>

      <div className="section-divider" />

      {/* Outlet Grid */}
      <section className="outlet-grid" aria-label="Outlet list">
        {outlets.map((outlet, index) => {
          const isOpen = !!outlet.isOpen; 

          return (
            <motion.div
              key={outlet.id}
              className={`outlet-card ${isOpen ? "open" : "coming-soon"}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={isOpen ? { scale: 1.03 } : {}}
              aria-labelledby={`outlet-${outlet.id}-title`}
            >
              {/* IMAGE AREA */}
              <div className="outlet-media" aria-hidden={false}>
                <img src={outlet.img} alt={outlet.name} />

                {/* Top-right status badge (kept and styled via CSS) */}
                <div className={`status-badge ${isOpen ? "open-badge" : "soon-badge"}`} aria-hidden="true">
                  {isOpen ? "Open Now" : "Opening Soon"}
                </div>
              </div>

              {/* INFO AREA */}
              <div className="outlet-info">
                <h3 id={`outlet-${outlet.id}-title`}>{outlet.name}</h3>

                <p>
                  <MapPin size={16} color="#d4af37" aria-hidden="true" />
                  {" "}
                  <span className={isOpen ? "" : "muted-text"}>{outlet.address}</span>
                </p>

                <p className={`timings ${isOpen ? "" : "muted-text"}`}>
                  <Clock size={16} color="#d4af37" aria-hidden="true" /> {outlet.timings}
                </p>

                {/* CTA: real link if open, accessible disabled button if coming soon */}
                {isOpen ? (
                  <a
                    href={outlet.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn gold-btn center-btn"
                    aria-label={`Get directions to ${outlet.name}`}
                  >
                    Get Directions
                  </a>
                ) : (
                  <button
                    className="btn gold-btn center-btn disabled"
                    aria-disabled="true"
                    tabIndex={-1}
                    onClick={(e) => e.preventDefault()}
                    title="This branch is opening soon"
                    aria-label={`${outlet.name} is opening soon`}
                  >
                    Opening Soon
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Interactive Map  */}
      <motion.section
        className="map-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.8 }}
      >
        <iframe
          src="https://www.google.com/maps/d/u/0/embed?mid=1khmW3pLbpMbh6gXKxQy2yCfMSCo3xow&ehbc=2E312F&noprof=1"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Outlet Locations"
        />
      </motion.section>

      <div className="section-divider" />

      {/* Why Choose Us Section */}
      <section className="why-section">
        <h2 className="section-title">Why Choose Us?</h2>

        <div className="timeline">
          {items.map((item, idx) => (
            <div key={item.id} className="timeline-row">
              {idx % 2 === 0 ? (
                <>
                  <motion.div
                    className="timeline-card left"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="card-content">
                      <div className="icon-box">{item.icon}</div>
                      <div className="text-content">
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="timeline-number">{item.id}</div>
                  <div className="timeline-empty" />
                </>
              ) : (
                <>
                  <div className="timeline-empty" />
                  <div className="timeline-number">{item.id}</div>
                  <motion.div
                    className="timeline-card right"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="card-content">
                      <div className="icon-box">{item.icon}</div>
                      <div className="text-content">
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Franchise CTA  */}
      <motion.section
        className="franchise-cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        transition={{ duration: 0.8 }}
      >
        <div className="cta-content">
          <h2>Bring Ambur Bandaari Biryani to Your City</h2>
          <p>Want to bring Ambur Bandaari Biryani to your city? Contact us for franchise opportunities.</p>
          <button className="btn gold-btn" onClick={() => navigate("/contact")}>Contact Us</button>
        </div>
      </motion.section>
    </div>
  );
}

