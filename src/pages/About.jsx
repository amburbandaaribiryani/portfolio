import { useRef } from "react";
import { motion } from "framer-motion";
import "../styles/About.css";

import heroImg from "../assets/images/about_hero.png";          
import chefsAction1 from "../assets/images/chef_1.png"; 
import chefsAction2 from "../assets/images/chef_2.png"; 
import chef1 from "../assets/images/chefs_1.png";                 
import chef2 from "../assets/images/chefs_2.png";             
import chef3 from "../assets/images/chefs_3.png";                 

export  function About() {
  const storyRef = useRef(null);

  const scrollToStory = () => {
    storyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Reusable motion variants (subtle, premium feel)
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const stagger = {
    show: { transition: { staggerChildren: 0.12 } },
  };

  return (
    <main className="abb-about" aria-labelledby="about-title">
      {/* HERO */}
      <header className="abb-hero" role="banner">
        <img
          src={heroImg}
          alt="Authentic Ambur biryani garnished with mint and fried onions"
          className="abb-hero__bg"
          fetchPriority="high"
        />
        <div className="abb-hero__overlay" aria-hidden="true" />
        <motion.div
          className="abb-hero__content"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.p className="abb-eyebrow" variants={fadeUp}>
            Ambur Bandaari Biryani
          </motion.p>
          <motion.h1 id="about-title" className="abb-title" variants={fadeUp}>
            Rich. Authentic. Unmistakably Ambur.
          </motion.h1>
          <motion.p className="abb-subtitle" variants={fadeUp}>
            A legacy simmered over slow fire—crafted by chefs with{" "}
            <strong>20+ years</strong> of traditional biryani mastery.
          </motion.p>
          <motion.button
            type="button"
            className="abb-btn abb-btn--gold"
            onClick={scrollToStory}
            variants={fadeUp}
            aria-label="Read our story"
          >
            Our Story
          </motion.button>
        </motion.div>
        <div className="abb-divider abb-divider--wave" aria-hidden="true" />
      </header>

      {/* OUR STORY */}
      <section ref={storyRef} className="abb-section abb-section--story">
        <div className="abb-container abb-grid">
          <motion.article
            className="abb-story"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="abb-h2">Our Story</h2>
          <div className="abb-story">
            <p>
              From the vibrant streets of <span className="abb-gold">Ambur</span> to the bustling heart of 
              <span className="abb-gold"> Chennai</span>, our journey began with a simple dream — 
              to share the <span className="abb-gold">true taste of Ambur</span> with the world. 
              What started as one man’s passion soon grew into a mission: 
              bringing the <span className="abb-gold">authentic biryani experience</span> closer to home.
            </p>
            <p>
              Rooted in a <span className="abb-gold">humble kitchen</span>, every plate was crafted with 
              recipes passed down through generations. The <span className="abb-gold">age-old techniques</span>, 
              carefully chosen spices, and guarded <span className="abb-gold">family secrets </span> 
              remained untouched — preserving the soul of Ambur in every grain of rice.
            </p>
            <p>
              Today, that small dream has blossomed into a <span className="abb-gold">beloved destination</span> 
              for biryani lovers across Chennai. While we have grown, one thing has never changed — 
              our unwavering <span className="abb-gold">commitment to authenticity</span> and the 
              <span className="abb-gold">love of our customers</span>, who make this journey worth every step.
            </p>
            <blockquote>
              "Why travel to Ambur, when <span className="abb-gold">Ambur Bandaari Biryani</span> brings it to you?"
            </blockquote>
          </div>

          </motion.article>

          <motion.aside
            className="abb-story__media"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <figure className="abb-photo">
              <img
                src={chefsAction1}
                alt="Chef tossing fragrant biryani in a large handi"
                loading="lazy"
              />
            </figure>
            <figure className="abb-photo">
              <img
                src={chefsAction2}
                alt="Chef layering rice and masala the Ambur way"
                loading="lazy"
              />
            </figure>
          </motion.aside>
        </div>
        <div className="abb-divider" aria-hidden="true" />
      </section>

      {/* MEET OUR CHEFS */}
      <section className="abb-section abb-section--chefs">
        <div className="abb-container">
          <motion.h2
            className="abb-h2 abb-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            Meet Our Chefs
          </motion.h2>

          <div className="abb-chefs">
            {[ 
              { src: chef1, name: "Chef Rahman", role: "Master of Spice",  badge: "20+ yrs exp" },
              { src: chef2, name: "Chef Raheem", role: "Rice Perfectionist" },
              { src: chef3, name: "Chef Parvez", role: "Handi Specialist" },
            ].map((c, i) => (
              <motion.figure
                key={c.name}
                className="abb-chefcard"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <img
                  src={c.src}
                  alt={`${c.name}, ${c.role}`}
                  loading="lazy"
                  className="abb-chefcard__img"
                />
                {c.badge && <span className="abb-badge">{c.badge}</span>}
                <figcaption className="abb-chefcard__caption">
                  <span className="abb-chefcard__name">{c.name}</span>
                  <span className="abb-chefcard__role">{c.role}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
        <div className="abb-divider" aria-hidden="true" />
      </section>

      {/* PHILOSOPHY */}
      <section className="abb-section abb-section--philosophy">
       <h2 className="abb-h2">Our Philosophy</h2>  
        <div className="abb-container abb-grid--3">
          <motion.div
            className="abb-philocard"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="abb-h3">Uncompromising Quality</h3>
            <p className="abb-body">
              We source premium ingredients and prepare fresh batches daily—no shortcuts,
              just honest, exceptional biryani.
            </p>
          </motion.div>
          <motion.div
            className="abb-philocard"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="abb-h3">True to Tradition</h3>
            <p className="abb-body">
              Every step honors Ambur’s legacy—from spice roasting to the
              signature dum that seals in aroma.
            </p>
          </motion.div>
          <motion.div
            className="abb-philocard"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="abb-h3">Warmth in Service</h3>
            <p className="abb-body">
              Hospitality is our default setting—serving with grace so every
              guest feels like family.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
