import "../styles/Pages.css";

export const Blog = () => {
  return (
    <div className="resources-container">
      <header className="resources-header">
        <h1 className="page-title">🍲 Our Blog</h1>
        <p className="page-subtitle">
          Discover authentic stories, culinary tips, and updates from{" "}
          <strong>Ambur Bandaari Biryani</strong>.
        </p>
      </header>

      <section className="resources-content">
        {/* Blog Post */}
        <article className="blog-post">
          <h2 className="blog-title">🥘 The Legacy of Ambur Biryani</h2>
          <p className="blog-meta">Published on September 2025 • 5 min read</p>
          <p>
            Ambur Biryani is not just a dish – it’s a story that began in the
            18th century under the Nawabs of Arcot. Crafted with{" "}
            <strong>jeera samba rice</strong>, tender meat, and a special{" "}
            <em>dried red chili paste</em>, this biryani has a unique balance of
            flavor, heat, and aroma that sets it apart from other styles.
          </p>
          <p>
            Unlike spice-heavy versions, Ambur Biryani uses fewer masalas, which
            lets the natural flavors of the meat shine through. Cooked using the
            traditional <em>dum</em> method, every grain of rice absorbs the
            rich aroma of the spices and meat, making it truly irresistible.
          </p>
          <h3>🍴 What Makes It Special?</h3>
          <ul>
            <li>
              <strong>Basmati Rice</strong> – tiny, aromatic, and perfect
              for biryani.
            </li>
            <li>
              <strong>Minimal Spices</strong> – a clean, authentic taste.
            </li>
            <li>
              <strong>Dried Red Chili Paste</strong> – for bold color and flavor.
            </li>
            <li>
              <strong>Slow Dum Cooking</strong> – layers of flavor in every
              bite.
            </li>
          </ul>
          <h3>🌿 How to Enjoy It</h3>
          <p>
            Traditionally, Ambur Biryani is served with cool cucumber raita,
            tangy brinjal curry, and finished with a cup of{" "}
            <em>Suleimani chai</em> – a lemon black tea that helps with
            digestion.
          </p>
          <p>
            Whether you’re enjoying our <strong>Mutton Biryani</strong> or{" "}
            <strong>Chicken Biryani</strong>, every bite is a journey into the
            culinary heritage of Ambur.
          </p>
        </article>

        {/* CTA / Footer */}
        <div className="blog-footer">
          <p>
            ✨ Stay tuned for more stories, recipes, and insider tips from{" "}
            <strong>Ambur Bandaari Biryani</strong>. Follow our journey and keep
            the tradition alive!
          </p>
        </div>
      </section>
    </div>
  );
};
