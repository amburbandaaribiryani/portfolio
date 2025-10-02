import "../styles/Pages.css";

export const Recipes = () => {
  return (
    <div className="resources-container">
      {/* Header Section */}
      <header className="resources-header">
        <h1 className="page-title">🍴 Biryani Recipes</h1>
        <p className="page-subtitle">
          Explore authentic <strong>Ambur Bandaari</strong> style recipes, crafted with tradition.
        </p>
      </header>

      {/* Recipes Section */}
      <section className="resources-content">
        {/* Chicken Biryani Recipe */}
        <article className="recipe-card">
          <h2>🍗 Chicken Biryani</h2>
          <p>
            A fragrant and flavorful biryani made with tender chicken, aromatic basmati rice,
            and freshly ground spices.
          </p>
          <h3>Ingredients:</h3>
          <ul>
            <li>2 cups Basmati rice (soaked 30 mins)</li>
            <li>500g Chicken (marinated in yogurt & spices)</li>
            <li>2 Onions (sliced & fried golden)</li>
            <li>2 Tomatoes (chopped)</li>
            <li>Spices: Bay leaf, Cloves, Cardamom, Cinnamon</li>
            <li>Mint & Coriander leaves</li>
            <li>Saffron or food color (optional)</li>
          </ul>
          <h3>Method:</h3>
          <ol>
            <li>Cook rice 70% with whole spices and keep aside.</li>
            <li>Cook marinated chicken with onions, tomatoes, and spices.</li>
            <li>Layer rice over chicken, sprinkle fried onions & mint.</li>
            <li>Cover & cook on dum for 20 mins.</li>
            <li>Serve hot with raita or salan.</li>
          </ol>
        </article>

        {/* Mutton Biryani Recipe */}
        <article className="recipe-card">
          <h2>🥩 Mutton Biryani</h2>
          <p>
            A royal delicacy prepared with succulent mutton pieces, slow-cooked with rice,
            spices, and herbs for rich flavor.
          </p>
          <h3>Ingredients:</h3>
          <ul>
            <li>2 cups Basmati rice (soaked 30 mins)</li>
            <li>600g Mutton (marinated with yogurt, ginger-garlic paste, chili powder, salt)</li>
            <li>3 Onions (sliced & fried golden)</li>
            <li>2 Tomatoes (chopped)</li>
            <li>Spices: Bay leaf, Cloves, Cinnamon, Star anise</li>
            <li>Mint & Coriander leaves</li>
            <li>Ghee for rich flavor</li>
          </ul>
          <h3>Method:</h3>
          <ol>
            <li>Cook mutton until tender with onions, tomatoes, and spices.</li>
            <li>Parboil rice with whole spices until 70% cooked.</li>
            <li>Layer rice over mutton, drizzle ghee, saffron, fried onions, and mint.</li>
            <li>Cover tightly & cook on dum for 30-40 mins.</li>
            <li>Serve with mirchi ka salan or raita.</li>
          </ol>
        </article>
      </section>
    </div>
  );
};
