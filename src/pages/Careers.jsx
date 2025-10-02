import "../styles/Pages.css";

export const Careers = () => {
  return (
    <div className="resources-container">
      <header className="resources-header">
        <h1>Careers at Ambur Bandaari Biryani</h1>
        <p>
          Join our passionate team and help us spread the authentic{" "}
          <strong>Ambur Bandaari Biryani</strong> experience worldwide.
        </p>
      </header>

      <section className="resources-content">
        {/* Example Career Card */}
        <div className="career-card">
          <h2>Restaurant Manager</h2>
          <p className="career-meta">📍 chennai, Tamil Nadu | Full-Time</p>
          <p>
            Lead daily operations, manage staff, and ensure guests enjoy
            premium-quality service and authentic biryani experiences.
          </p>
          <button className="apply-btn">Apply Now</button>
        </div>

        <div className="career-card">
          <h2>Chef – Biryani Specialist</h2>
          <p className="career-meta">📍 Chennai, Tamil Nadu | Full-Time</p>
          <p>
            Showcase your culinary skills and master the art of traditional Ambur
            Biryani. Training and accommodation provided.
          </p>
          <button className="apply-btn">Apply Now</button>
        </div>

        <div className="career-card">
          <h2>Digital Marketing Executive</h2>
          <p className="career-meta">📍 Remote | Full-Time</p>
          <p>
            Drive our online presence with creative campaigns, SEO, and social
            media storytelling about Ambur Bandaari Biryani.
          </p>
          <button className="apply-btn">Apply Now</button>
        </div>
      </section>
    </div>
  );
};
