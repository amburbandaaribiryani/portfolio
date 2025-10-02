import "../styles/Pages.css";

export const FAQ = () => {
  return (
    <div className="resources-container">
      <header className="resources-header">
        <h1 className="page-title">❓ Frequently Asked Questions</h1>
        <p className="page-subtitle">
          Explore authentic insights about{" "}
          <strong>Ambur Bandaari Biryani</strong>, its tradition, ingredients,
          and preparation style.
        </p>
      </header>

      <section className="resources-content">
        {/* Q1 */}
        <div className="faq-card">
          <h2>Which rice is used in Ambur Biryani and why?</h2>
          <p>
            Ambur Biryani is often associated with{" "}
            <strong>Seeraga Samba rice</strong>, but modern variations also use{" "}
            <strong>Basmati rice</strong> for its long grains and rich aroma.
            Basmati rice gives the biryani a royal look, fluffy texture, and
            adds fragrance that enhances the overall dining experience. Many
            food lovers prefer Basmati as it balances spices well and provides a
            lighter, more digestible meal while still keeping the{" "}
            <strong>authentic Ambur Biryani flavors</strong> intact.
          </p>
        </div>

        {/* Q2 */}
        <div className="faq-card">
          <h2>What makes Ambur Biryani unique?</h2>
          <p>
            Unlike other biryani styles loaded with heavy spices and ghee, Ambur
            Biryani is prepared with a{" "}
            <strong>special chili paste and minimal whole spices</strong>. This
            gives it a bold yet clean taste that highlights the natural flavors
            of the rice and meat. The balance of spice, aroma, and slow-cooked
            method makes Ambur Biryani stand out in{" "}
            <strong>South Indian cuisine</strong>.
          </p>
        </div>

        {/* Q3 */}
        <div className="faq-card">
          <h2>Is Ambur Biryani healthy?</h2>
          <p>
            Yes, Ambur Biryani is considered lighter compared to many other
            biryanis because it does not rely heavily on ghee or butter. When
            made with <strong>Basmati rice</strong>, it is{" "}
            <strong>easier to digest</strong>, contains less starch, and pairs
            well with healthy sides like cucumber raita or boiled eggs. This
            makes it both flavorful and nutritious when consumed in moderation.
          </p>
        </div>

        {/* Q4 */}
        <div className="faq-card">
          <h2>What are the best accompaniments for Ambur Biryani?</h2>
          <p>
            Traditionally, Ambur Biryani is served with{" "}
            <strong>onion raita</strong>, <strong>brinjal curry</strong>, or{" "}
            <strong>dalcha</strong>. For a modern twist, it pairs wonderfully
            with spicy chicken gravy, green chutney, or even grilled kebabs.
            These sides enhance the flavor and make the{" "}
            <strong>biryani experience</strong> complete.
          </p>
        </div>

        {/* Q5 */}
        <div className="faq-card">
          <h2>Where can I find the best Ambur Biryani?</h2>
          <p>
            The most authentic Ambur Biryani is still found in{" "}
            <strong>Ambur, Tamil Nadu</strong>. However, many restaurants across
            India and abroad have mastered this dish. If you are searching
            online, look for{" "}
            <strong>“Ambur Biryani near me”</strong> or{" "}
            <strong>“Best Ambur Biryani with Basmati rice”</strong> to discover
            top-rated outlets that serve this delicacy.
          </p>
        </div>
      </section>
    </div>
  );
};
