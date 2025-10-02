import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

import '../styles/Home.css'

import biryaniHero from '../assets/images/biryani.png'
// import steamingPot from "../assets/images/logo.png";
import dish1 from '../assets/images/dish1.png'
import dish2 from '../assets/images/dish2.png'
import dish3 from '../assets/images/dish3.png'
import birthdayIcon from '../assets/images/birthday.png'
import weddingIcon from '../assets/images/wedding.png'
import corporateIcon from '../assets/images/corporate.png'
import bulkIcon from '../assets/images/bulk.png'
// import outlet1 from "../assets/images/logo.png";
// import outlet2 from "../assets/images/logo.png";
import steamingPot from '../assets/images/steaming_pot.png'

const headlines = [
  'A Royal Feast in Every Bite',
  'A Taste You Can’t Forget',
  'Every Bite Bursting with Flavor',
  'Slow-Cooked, Served with Pride',
  'Flavors You’ll Crave Again',
  'Where Tradition Meets Temptation',
]

const reviews = [
  {
    rating: 5,
    text: 'Absolutely delicious! The biryani was rich, aromatic, and reminded me of home.',
    name: 'Ayesha Khan',
    role: 'Customer',
  },
  {
    rating: 4,
    text: 'Perfect blend of spices! The meat was tender and the rice perfectly cooked.',
    name: 'Rohan Mehta',
    role: 'Customer',
  },
  {
    rating: 5,
    text: 'Hands down the best Mughlai cuisine in town. Their kebabs are just as good as the biryani!',
    name: 'Sana Iqbal',
    role: 'Blogger',
  },
  {
    rating: 4,
    text: 'Quick service, warm hospitality, and food that leaves you craving for more.',
    name: 'Arjun Patel',
    role: 'Business',
  },
  {
    rating: 5,
    text: 'Loved the ambience and the food was spectacular! Definitely coming back with family.',
    name: 'Fatima Noor',
    role: 'Customer',
  },
  {
    rating: 5,
    text: 'A feast for the senses — aromatic, flavorful, and beautifully presented.',
    name: 'Karan Sharma',
    role: 'Food Critic',
  },
]

const infiniteReviews = [...reviews, ...reviews]

// Reusable fade-up animation for scroll trigger
const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function Home() {
  const [currentHeadline, setCurrentHeadline] = useState(0)
  const navigate = useNavigate()
  const carouselRef = useRef(null)
  const rafRef = useRef(null)
  const resumeTimeoutRef = useRef(null)
  // const scrollIntervalRef = useRef(null);
  const isPausedRef = useRef(false)
  const specialOrdersRef = useRef(null)
  const SCROLL_SPEED = 0.5

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline(prev => (prev + 1) % headlines.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const continuousScrollLoop = () => {
    if (carouselRef.current && !isPausedRef.current) {
      carouselRef.current.scrollLeft += SCROLL_SPEED

      // Reset when reaching end of the duplicated content
      if (
        carouselRef.current.scrollLeft >=
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      ) {
        carouselRef.current.scrollLeft = 0
      }
    }
    rafRef.current = requestAnimationFrame(continuousScrollLoop)
  }

  const pauseContinuousScroll = () => {
    isPausedRef.current = true
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = null
    }
  }

  const resumeContinuousScroll = (delay = 1000) => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false
      resumeTimeoutRef.current = null
    }, delay)
  }

  // Start scrolling on mount
  useEffect(() => {
    if (carouselRef.current) carouselRef.current.scrollLeft = 0
    isPausedRef.current = false
    rafRef.current = requestAnimationFrame(continuousScrollLoop)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [])

  // Pause continuous scroll when carousel not in viewport
useEffect(() => {
  if (!carouselRef.current) return;
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) {
          pauseContinuousScroll();
        } else {
          resumeContinuousScroll(600);
        }
      });
    },
    { threshold: 0.1 }
  );
  obs.observe(carouselRef.current);
  return () => obs.disconnect();
}, [carouselRef.current]);


  const splitHeadline = text =>
    text.split('').map((char, i) => (
      <motion.span
        key={`${char}-${i}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.03 }}
        style={{ display: 'inline-block', whiteSpace: 'pre' }}
      >
        {char}
      </motion.span>
    ))

  useEffect(() => {
    if (!specialOrdersRef.current) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 🎉 Fire confetti once when section is visible
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(specialOrdersRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div className='home-page'>
      {/* ===== HERO ===== */}
      <section className='hero-section' style={{ minHeight: '100vh' }}>
        <div className='hero-content'>
          <AnimatePresence mode='wait'>
            <motion.h1
              key={currentHeadline}
              className='hero-headline'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {splitHeadline(headlines[currentHeadline])}
            </motion.h1>
          </AnimatePresence>

          <p className='hero-subheadline'>
            In Every Bite, Pure Delight — With ABB
          </p>
          <p className='hero-description'>
            Savor the authentic taste of Ambur Biryani in Chennai, crafted with
            premium ingredients and our cherished traditional recipe. As the
            best biryani in Chennai, we offer elegant dine-in, speedy takeaway,
            and reliable Chennai catering services; our rich biryani experience
            is always just a click or call away, bringing genuine Ambur flavors
            to you.
          </p>

          <div className='hero-buttons'>
            <button className='btn-primary' onClick={() => navigate('/menu')} aria-label="View menu">
              View Menu
            </button>
            <button
              className='btn-secondary'
              onClick={() => navigate('/outlets')}
              aria-label="Find an outlet">
              Find an Outlet
            </button>
          </div>
        </div>

        <motion.div
          className='hero-image'
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ rotateY: 5, rotateX: -5, scale: 1.03 }}
          style={{ perspective: '1000px' }}
        >
          <img src={biryaniHero} alt='Delicious Ambur Biryani' loading='lazy' />
        </motion.div>
      </section>

      <div className='section-divider'></div>

      {/* ===== SIGNATURE DISHES ===== */}
      <motion.section
        className='signature-dishes'
        variants={fadeUpVariant}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <h2>Signature Dishes</h2>
        <div className='dish-cards'>
          {[
            {
              img: dish1,
              title: 'Naatu Kozhi Biryani',
              desc: 'Aromatic basmati rice cooked with tender country chicken, infused with authentic South Indian spices.',
              badge: 'Signature Dish',
            },
            {
              img: dish2,
              title: 'Aattu Kaal Biryani',
              desc: 'Rich, slow-cooked goat leg biryani that melts in your mouth with bold, traditional flavors.',
              badge: 'Best Seller',
            },
            {
              img: dish3,
              title: 'Bamboo Biryani',
              desc: 'Exotic biryani steamed inside bamboo for a unique smoky aroma and irresistible taste.',
              badge: 'Exclusive',
            },
          ].map((dish, idx) => (
            <motion.div
              className='dish-card'
              key={idx}
              whileHover={{ scale: 1.02 }}
            >
              <div className='dish-image'>
                <span className='dish-badge'>{dish.badge}</span>
                <img src={dish.img} alt={dish.title} />
              </div>
              <div className='dish-content'>
                <h3>{dish.title}</h3>
                <p>{dish.desc}</p>
              </div>
              <div className='dish-footer'>
                <button className='btn-view' onClick={() => navigate('/menu')}>
                  View More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className='section-divider'></div>

      {/* ===== SPECIAL ORDERS ===== */}
      <motion.section
        ref={specialOrdersRef}
        className='special-orders'
        variants={fadeUpVariant}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <h2 className='section-title'>Special Orders & Catering</h2>
        <p className='section-subtitle'>
          From intimate gatherings to grand celebrations — we deliver
          exceptional culinary experiences for every occasion.
        </p>

        <div className='event-cards'>
          {[
            {
              icon: birthdayIcon,
              title: 'Birthday Parties',
              desc: 'Make every birthday unforgettable with our gourmet delights.',
            },
            {
              icon: weddingIcon,
              title: 'Weddings',
              desc: 'Elegant catering to make your special day truly magical.',
              highlight: true,
            },
            {
              icon: corporateIcon,
              title: 'Corporate Events',
              desc: 'Impress clients & colleagues with premium catering services.',
            },
            {
              icon: bulkIcon,
              title: 'Bulk Orders',
              desc: 'Perfect for large gatherings with unbeatable taste & quality.',
            },
          ].map((event, idx) => (
            <motion.div
              className={`event-card ${event.highlight ? 'highlight' : ''}`}
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              whileHover={{
                y: -8,
              }}
            >
              {/* Ribbon for Most Popular */}
              {event.highlight && (
                <span className='popular-badge'>Most Popular</span>
              )}

              <div className='event-icon'>
                <img src={event.icon} alt={event.title} />
              </div>
              <h3>{event.title}</h3>
              <p className='event-desc'>{event.desc}</p>
              <button className='btn-gold' onClick={() => navigate('/events')}  aria-label={`Plan ${event.title} event`}>
                Plan Your Event
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className='section-divider'></div>

      {/* ===== ABOUT US ===== */}
      <motion.section
        className='about-preview'
        variants={fadeUpVariant}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <h2>About Us</h2>

        {[
          'Born from a passion for Ambur Bandaari Biryani, we bring the royal taste of biryani to your plate.',
          'Every recipe is crafted using time-honored traditions and the finest ingredients to ensure a truly unforgettable dining experience.',
          'Our chefs pour their heart into every dish, blending aromatic spices with love, so each bite is a celebration of heritage and flavor.',
          'We don’t just serve food — we serve memories.',
        ].map((text, idx) => (
          <motion.p
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ delay: idx * 0.2 }}
            dangerouslySetInnerHTML={{
              __html: text
                .replace(
                  'Ambur Bandaari Biryani',
                  "<span class='highlight'>Ambur Bandaari Biryani</span>"
                )
                .replace(
                  'royal taste of biryani',
                  "<span class='highlight'>royal taste of biryani</span>"
                ),
            }}
          />
        ))}
        <motion.button
          className='btn-gold-filled'
          onClick={() => navigate('/about')}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Know Our Story
        </motion.button>
      </motion.section>

      <div className='section-divider'></div>

      {/* ===== REVIEWS ===== */}
      <motion.section
        className='customer-reviews'
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className='section-title'>What Our Customers Say</h2>

        <div className='carousel-wrapper'>
          {/* Reviews Carousel */}
          <div
            className='review-carousel'
            ref={carouselRef}
            onMouseEnter={pauseContinuousScroll}
            onMouseLeave={() => resumeContinuousScroll(800)}
            onTouchStart={pauseContinuousScroll}
            onTouchEnd={() => resumeContinuousScroll(800)}
          >
            {infiniteReviews.map((r, idx) => (
              <div className='review-card' key={idx}>
                <div className='stars' aria-hidden>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`star ${i < r.rating ? 'filled' : 'empty'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className='quote-icon' aria-hidden>
                  “
                </div>
                <p className='review-text'>{r.text}</p>
                <div className='reviewer-info'>
                  <div className='avatar-icon' aria-hidden>
                    👤
                  </div>
                  <div className='reviewer-meta'>
                    <div className='reviewer-name'>{r.name}</div>
                    <div className='reviewer-role'>{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
      <div className='section-divider'></div>

      {/* ===== CTA ===== */}
      <motion.section
        className='cta-banner'
        style={{ backgroundImage: `url(${steamingPot})` }}
        variants={fadeUpVariant}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        {/* Steam Layer */}
        <div className='steam-overlay'></div>

        {/* Text Overlay */}
        <div className='cta-overlay'>
          <h2>
            Nothing Stops Your Hunger
            <br />
            <span className='highlight'>Neither Should You 🍽️</span>
          </h2>
          <p>
            When cravings knock, open the door to authentic biryani —
            slow-cooked to perfection, layered with spices, and served with a
            touch of royalty.
          </p>
          <button className='btn-primary' onClick={() => navigate('/menu')}>
            Order Now
          </button>
        </div>
      </motion.section>
    </div>
  )
}
