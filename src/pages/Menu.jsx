import  { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Search, ShoppingCart, X, Plus, Minus, Star, Clock, Users, ChevronDown } from 'lucide-react';
import menuData from '../components/MenuCard.json';
import '../styles/menu.css';


function useRevealOnScroll(deps = []) {
  useEffect(() => {
    const revealElements = document.querySelectorAll('[data-reveal]:not(.revealed)');
    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.style.transition = `all 1.2s ease-out ${index * 0.12}s`;
            el.classList.add('revealed');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, deps);
}

// ConfirmModal Component
const ConfirmModal = ({ open, onClose }) => {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => closeBtnRef.current && closeBtnRef.current.focus(), 60);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="confirmation-modal-overlay"
      role="presentation"
      onKeyDown={handleKeyDown}
    >
      <div
        className="confirmation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
      >
        <header className="conf-header">
          <h2 id="confirm-title" className="conf-title">
            Delivery not started yet
          </h2>
          <button
            ref={closeBtnRef}
            className="conf-close-btn"
            aria-label="Close confirmation"
            onClick={onClose} // ✅ Only closes via X
          >
            <X />
          </button>
        </header>

        <div className="conf-body">
          <p id="confirm-desc" className="conf-message">
            Delivery not started yet — it will begin soon. Until then, feel free
            to enjoy our <strong>Dine-In</strong> and <strong>Takeaway</strong>{" "}
            options.
          </p>

          <div className="conf-actions">
            <button
              type="button"
              className="conf-btn conf-btn-primary"
              onClick={onClose} // ✅ Only closes via button
            >
              Close
            </button>
          </div>

          <div className="conf-subtle">
            <small>
              We'll notify you the moment delivery starts — thank you for your
              patience.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};



export const Menu = () => {
  // ------------------- state -------------------
  const [activeCategory, setActiveCategory] = useState('all');
  const [typed, setTyped] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // ------------------- refs (CHANGE: added searchInputRef for robust focus) -------------------
  const filterTriggerRef = useRef(null);
  const filterMenuRef = useRef(null);
  const cartDrawerRef = useRef(null);
  const searchInputRef = useRef(null); // <--- NEW: use ref instead of document.querySelector

  // Reset showAll when search cleared — keeps UI consistent
  useEffect(() => {
    if (searchTerm.trim() === '') setShowAll(false);
  }, [searchTerm]);

  // Re-run reveal when visible list changes (including searchTerm)
  useRevealOnScroll([activeCategory, searchTerm, showAll]);

  // ------------------- Debounce typed -> searchTerm -------------------
  useEffect(() => {
    const id = setTimeout(() => setSearchTerm(typed.trim()), 150);
    return () => clearTimeout(id);
  }, [typed]);

  // ------------------- Key helpers (CHANGE: robust cross-browser key checks) -------------------
  const isActivateKey = (e) =>
    e.key === 'Enter' ||
    e.key === ' ' ||
    e.key === 'Spacebar' || // older browsers
    e.code === 'Enter' ||
    e.code === 'Space';

  const isEscapeKey = (e) => e.key === 'Escape' || e.key === 'Esc';

  // ------------------- clearSearch (CHANGE: use ref for focus, removed querySelector) -------------------
  const clearSearch = useCallback(() => {
    setTyped('');
    setSearchTerm('');
    setShowAll(false);
    // return focus to search input (robust via ref)
    if (searchInputRef.current) searchInputRef.current.focus();
  }, []);

  // ------------------- Memoize allMenuItems -------------------
  const allMenuItems = useMemo(() => {
    return Object.keys(menuData)
      .filter((k) => Array.isArray(menuData[k]))
      .flatMap((k) => menuData[k] || []);
  }, []);

  // ------------------- Filtering -------------------
  const getFilteredItems = useCallback(() => {
    let allItems = [];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      allItems = allMenuItems.filter((item) =>
        (item.name || '').toLowerCase().includes(searchLower) ||
        (item.description || '').toLowerCase().includes(searchLower) ||
        ((item.category || '').toLowerCase().includes(searchLower)) ||
        ((item.variant || '').toLowerCase().includes(searchLower))
      );
    } else {
      switch (activeCategory) {
        case 'biryani': allItems = menuData.biryani || []; break;
        case 'mandi': allItems = menuData.mandi || []; break;
        case 'specials':
          allItems = [...(menuData.biryani || []), ...(menuData.mandi || [])].filter(item => item.isSpecial);
          break;
        case 'pre-order':
          allItems = [...(menuData.biryani || []), ...(menuData.mandi || [])].filter(item => item.preOrder);
          break;
        default:
          allItems = [...(menuData.biryani || []), ...(menuData.mandi || [])];
      }
    }

    return {
      featured: allItems.slice(0, 6),
      remaining: allItems.slice(6),
      total: allItems.length
    };
  }, [searchTerm, activeCategory, allMenuItems]);

  const { featured, remaining, total } = getFilteredItems();
  const itemsToShow = showAll ? [...featured, ...remaining] : featured;

  // ------------------- Helpers -------------------
  const getImagePath = (imagePath) => (!imagePath ? '/assets/images/placeholder-food.jpg' : imagePath.replace(/^\/?(public\/)?/, '/'));

  // Improved image error handler — sets fallback src & alt for clarity
  const handleImageError = (e, name) => {
    if (!e || !e.target) return;
    e.target.onerror = null; 
    e.target.src = '/assets/images/placeholder-food.jpg';
    e.target.alt = `${name} image unavailable`;
  };

  // ------------------- Cart functions -------------------
  const addToCart = (item) => {
    const cartItem = { id: item.id, name: item.name, image: item.image, variant: item.variant, price: item.price, serves: item.serves, quantity: 1 };
    setCart(prevCart => {
      const existingItem = prevCart.find(c => c.id === item.id);
      if (existingItem) return prevCart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prevCart, cartItem];
    });
  };

  const removeFromCart = (cartItemId) => setCart(prevCart => prevCart.filter(i => i.id !== cartItemId));
  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity === 0) return removeFromCart(cartItemId);
    setCart(prevCart => prevCart.map(i => i.id === cartItemId ? { ...i, quantity: newQuantity } : i));
  };
  const getTotalPrice = () => cart.reduce((t, i) => t + (i.price * i.quantity), 0);
  const getTotalItems = () => cart.reduce((t, i) => t + i.quantity, 0);

  // ------------------- Filter options -------------------
  const filterOptions = [
    { value: 'all', label: 'All Dishes', icon: '🍽️' },
    { value: 'biryani', label: 'Biryani Collection', icon: '🍛' },
    { value: 'mandi', label: 'Mandi Specialties', icon: '🥘' },
    { value: 'specials', label: 'Sunday Specials', icon: '⭐' },
    { value: 'pre-order', label: 'Pre-order Only', icon: '📅' }
  ];

  const handleFilterChange = (filterValue) => {
    setActiveCategory(filterValue);
    setShowAll(false);
    setIsFilterDropdownOpen(false);
    if (filterTriggerRef.current) filterTriggerRef.current.focus();
  };

  const getCurrentFilterLabel = () => {
    const option = filterOptions.find(opt => opt.value === activeCategory);
    return option ? option.label : 'All Dishes';
  };

  // close dropdown on outside click (keeps dropdown accessible)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isFilterDropdownOpen
        && filterMenuRef.current && !filterMenuRef.current.contains(event.target)
        && filterTriggerRef.current && !filterTriggerRef.current.contains(event.target)) {
        setIsFilterDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterDropdownOpen]);

  // ESC handler for closing filter & cart; also handle focus return (CHANGE: use isEscapeKey)
  useEffect(() => {
    const onKeyDown = (e) => {
      if (isEscapeKey(e)) {
        if (isFilterDropdownOpen) {
          setIsFilterDropdownOpen(false);
          if (filterTriggerRef.current) filterTriggerRef.current.focus();
        }
        if (isCartOpen) {
          setIsCartOpen(false);
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isFilterDropdownOpen, isCartOpen]);

  // When dropdown opens, focus first menu item for keyboard users
  useEffect(() => {
    if (isFilterDropdownOpen) {
      setTimeout(() => {
        const firstItem = filterMenuRef.current && filterMenuRef.current.querySelector('button[role="menuitem"]');
        if (firstItem) firstItem.focus();
      }, 50);
    }
  }, [isFilterDropdownOpen]);

  useEffect(() => {
    if (isCartOpen) {
      setTimeout(() => {
        if (cartDrawerRef.current) {
          cartDrawerRef.current.focus();
        }
      }, 50);
    }
  }, [isCartOpen]);

  // keyboard handler for filter menu items (supports Enter/Space to select + Arrow navigation)
  const onFilterMenuKeyDown = (e) => {

    if (!filterMenuRef.current || !filterMenuRef.current.contains(document.activeElement)) return;

    const items = filterMenuRef.current ? Array.from(filterMenuRef.current.querySelectorAll('button[role="menuitem"]')) : [];
    if (!items.length) return;

    const currentIndex = items.indexOf(document.activeElement);

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const next = items[(currentIndex + 1) % items.length];
        if (next) next.focus();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prev = items[(currentIndex - 1 + items.length) % items.length];
        if (prev) prev.focus();
        break;
      }
      case 'Home': {
        e.preventDefault();
        items[0].focus();
        break;
      }
      case 'End': {
        e.preventDefault();
        items[items.length - 1].focus();
        break;
      }
      case 'Enter':
      case ' ': {
        // Enter or Space selects the focused menu item
        e.preventDefault();
        if (document.activeElement && document.activeElement.dataset && document.activeElement.dataset.value) {
          handleFilterChange(document.activeElement.dataset.value);
        }
        break;
      }
      default:
        break;
    }
  };
    const handleOpenConfirm = () => {
    setIsConfirmOpen(true);
  };

    const handleModalClose = () => {
    setIsConfirmOpen(false);
    setIsCartOpen(false);
  };

  // --------------- JSX -----------------
  return (
    <div className="menu-page">
      <div className="menu-container">
        {/* Hero */}
        <div className="menu-hero" data-reveal="fade-up">
          <h1 className="menu-hero-title">Our Signature Menu</h1>
          <p className="menu-hero-subtitle">Authentic flavors crafted with tradition and love</p>
        </div>

        {/* Search + Filter */}
        <div className="search-filter-section" data-reveal="fade-up">
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search className="search-icon" aria-hidden />
              {/* Controlled input uses typed (debounced into searchTerm) */}
              <input
                ref={searchInputRef} 
                type="text"
                placeholder="Search across all dishes..."
                value={typed}
                onChange={(e) => {
                  setTyped(e.target.value);
                  setShowAll(false);
                }}
                className="search-input"
                aria-label="Search dishes"
              />
              {/* Clear (×) button - visible only when user typed */}
              {typed && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <X size={14} aria-hidden />
                </button>
              )}
            </div>
            {/* NOTE: result hint removed as requested */}
          </div>

          {/* Filter dropdown */}
          <div className="filter-dropdown-container">
            <div className="filter-dropdown-wrapper">
              <button
                ref={filterTriggerRef}
                onClick={() => setIsFilterDropdownOpen(prev => !prev)}
                onKeyDown={(e) => {
                  // CHANGE: use robust activation check for Enter/Space
                  if (isActivateKey(e)) {
                    e.preventDefault();
                    setIsFilterDropdownOpen(prev => !prev);
                  } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setIsFilterDropdownOpen(true);
                  }
                }}
                className="filter-dropdown-trigger"
                type="button"
                aria-expanded={isFilterDropdownOpen}
                aria-haspopup="menu"
                aria-controls="menu-filter-list"
              >
                <span className="filter-current" aria-hidden>
                  <span className="filter-icon">{filterOptions.find(opt => opt.value === activeCategory)?.icon || '🍽️'}</span>
                  {getCurrentFilterLabel()}
                </span>
                <ChevronDown className={`dropdown-chevron ${isFilterDropdownOpen ? 'rotated' : ''}`} aria-hidden />
              </button>

              {isFilterDropdownOpen && (
                // use semantic menu: ul[role="menu"] with li > button[role="menuitem"]
                <ul
                  id="menu-filter-list"
                  ref={filterMenuRef}
                  className="filter-dropdown-menu"
                  role="menu"
                  aria-label="Filter dishes"
                  onKeyDown={onFilterMenuKeyDown}
                >
                  {filterOptions.map(option => (
                    <li key={option.value} role="none">
                      <button
                        // each menu item is a button with role=menuitem for compatibility
                        data-value={option.value}
                        role="menuitem"
                        type="button"
                        tabIndex={0}
                        onClick={() => handleFilterChange(option.value)}
                        className={`filter-dropdown-item ${activeCategory === option.value ? 'active' : ''}`}
                        aria-current={activeCategory === option.value ? 'true' : undefined}
                        // CHANGE: use robust activation here too
                        onKeyDown={(e) => {
                          if (isActivateKey(e)) {
                            e.preventDefault();
                            handleFilterChange(option.value);
                          }
                        }}
                      >
                        <span className="filter-item-icon" aria-hidden>{option.icon}</span>
                        <span className="filter-item-label">{option.label}</span>
                        {activeCategory === option.value && <div className="filter-item-indicator" aria-hidden />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <section className="signature-dishes-section">
          <div className="section-header" data-reveal="fade-up">
            <h2 className="section-title">{getCurrentFilterLabel()}</h2>
            <p className="section-subtitle">
              {total} delicious {total === 1 ? 'dish' : 'dishes'} {searchTerm ? `found for "${searchTerm}"` : 'to choose from'}
            </p>
          </div>

          {total === 0 ? (
            <div className="no-results" data-reveal="fade-up">
              <div className="no-results-icon">🔍</div>
              <h3 className="no-results-title">No dishes found</h3>
              <p className="no-results-text">Try adjusting your search or filter to find what you're looking for</p>
            </div>
          ) : (
            <div className="dishes-grid" data-reveal="fade-up">
              {itemsToShow.map(item => (
                <div key={item.id} className="signature-card" tabIndex={-1}>
                  <div className="card-image-container">
                    <img
                      src={getImagePath(item.image)}
                      alt={`${item.name} - ${item.variant || 'Standard'}`}
                      className="card-image"
                      onError={(e) => handleImageError(e, item.name)}
                    />
                    {item.tag && <div className={`card-tag ${item.tag.toLowerCase().replace(/\s+/g, '-')}`}><span className="tag-text">{item.tag}</span></div>}
                    <div className="card-overlay">
                      <div className="overlay-content">
                        <div className="quick-info">
                          <span className="info-item"><Users size={14} aria-hidden />{item.serves}</span>
                          {item.preOrder && <span className="info-item pre-order-badge"><Clock size={14} aria-hidden />Pre-order</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-content">
                    <div className="dish-header">
                      <h3 className="dish-title">{item.name}</h3>
                      <span className="variant-badge">{item.variant}</span>
                    </div>

                    <p className="dish-description">{item.description}</p>

                    <div className="dish-meta">
                      <div className="serves-info"><Users size={16} aria-hidden /><span>Serves: {item.serves}</span></div>
                      {item.isSpecial && <div className="special-badge"><Star size={14} aria-hidden /><span>Sunday Special</span></div>}
                    </div>

                    <div className="card-footer">
                      <div className="price-section"><span className="currency">₹</span><span className="price">{item.price}</span></div>
                      <button onClick={() => addToCart(item)} className="add-to-cart-btn" aria-label={`Add ${item.name} to cart`}>
                        <Plus size={16} aria-hidden />Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {total > 6 && (
            <div className="show-more-section">
              <button onClick={() => setShowAll(!showAll)} className="show-more-btn" aria-expanded={showAll}>
                {showAll ? 'Show Less' : `View All ${total} Items`}
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Floating Cart */}
      {cart.length > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="floating-cart"
          aria-label={`Open cart with ${getTotalItems()} items, total ₹${getTotalPrice()}`}
        >
          <div className="cart-icon-wrapper"><ShoppingCart className="cart-icon" aria-hidden /><span className="cart-count">{getTotalItems()}</span></div>
          <span className="cart-text">₹{getTotalPrice()}</span>
        </button>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)} role="presentation">
          <div
            className="cart-drawer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Cart drawer"
            ref={cartDrawerRef}
            tabIndex={-1}
          >
            {/* cart content unchanged (kept for brevity) */}
            <div className="cart-header">
              <div className="cart-header-content"><h2 className="cart-title">Your Order</h2><p className="cart-subtitle">{getTotalItems()} items selected</p></div>
              <button onClick={() => setIsCartOpen(false)} className="close-cart-btn" aria-label="Close cart"><X className="close-icon" aria-hidden /></button>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart"><ShoppingCart className="empty-cart-icon" aria-hidden /><p className="empty-cart-text">Your cart is empty</p><p className="empty-cart-subtext">Add some delicious items to get started</p></div>
              ) : (
                <div className="cart-items-list">{cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={getImagePath(item.image)} alt={`${item.name} - ${item.variant}`} className="cart-item-image" onError={(e) => handleImageError(e, item.name)} />
                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-variant">{item.variant} • {item.serves}</p>
                      <div className="cart-item-price-section"><span className="cart-item-price">₹{item.price}</span><span className="cart-item-total">₹{item.price * item.quantity}</span></div>
                    </div>
                    <div className="cart-item-controls">
                      <div className="quantity-controls" role="group" aria-label={`Quantity controls for ${item.name}`}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="quantity-btn decrease" aria-label={`Decrease quantity of ${item.name}`}><Minus size={14} aria-hidden /></button>
                        <span className="quantity-display" aria-live="polite">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="quantity-btn increase" aria-label={`Increase quantity of ${item.name}`}><Plus size={14} aria-hidden /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="remove-item-btn" aria-label={`Remove ${item.name} from cart`}><X size={16} aria-hidden /></button>
                    </div>
                  </div>
                ))}</div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="summary-row"><span className="summary-label">Subtotal ({getTotalItems()} items)</span><span className="summary-value">₹{getTotalPrice()}</span></div>
                  <div className="summary-row total-row"><span className="total-label">Total Amount</span><span className="total-amount">₹{getTotalPrice()}</span></div>
                </div>
                <button className="checkout-btn" onClick={handleOpenConfirm}>Proceed to Checkout<span className="checkout-arrow" aria-hidden>→</span></button>
              </div>
            )}
          </div>
        </div>
      )}
      <ConfirmModal
        open={isConfirmOpen}
        onClose={handleModalClose}              
      />
    </div>
  );
};
