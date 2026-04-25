import React, { useState } from 'react';
import { X } from 'lucide-react';
import './FilterSidebar.css';

export default function FilterSidebar({
  onFilterChange,
  onClose,
  isMobile = false,
  genderContext = null
}) {
  const [filters, setFilters] = useState({
    category: [],
    size: [],
    color: [],
    priceRange: [0, 1000],
    availability: true,
    sort: 'populaire'
  });

  // Categories based on gender context
  const getAllCategories = () => [
    { label: 'Robes', value: 'robes' },
    { label: 'Vestes', value: 'vestes' },
    { label: 'Pyjamas', value: 'pyjamas' },
    { label: 'Jeans', value: 'jeans' },
    { label: '─────────────', value: 'divider1', disabled: true },
    { label: 'Homme - Chemises', value: 'homme-chemises' },
    { label: 'Homme - Pantalons', value: 'homme-pantalons' },
    { label: 'Homme - T-Shirts', value: 'homme-tshirts' },
    { label: '─────────────', value: 'divider2', disabled: true },
    { label: 'Chaussures & Sandales', value: 'chaussures' },
    { label: 'Accessoires', value: 'accessoires' }
  ];

  const getFemmeCategories = () => [
    { label: 'Robes', value: 'robes' },
    { label: 'Vestes', value: 'vestes' },
    { label: 'Pyjamas', value: 'pyjamas' },
    { label: 'Jeans', value: 'jeans' }
  ];

  const getHommeCategories = () => [
    { label: 'Chemises', value: 'homme-chemises' },
    { label: 'Pantalons', value: 'homme-pantalons' },
    { label: 'T-Shirts', value: 'homme-tshirts' },
    { label: 'Chaussures', value: 'chaussures' },
    { label: 'Accessoires', value: 'accessoires' }
  ];

  const categories = genderContext === 'femme' ? getFemmeCategories() :
                   genderContext === 'homme' ? getHommeCategories() :
                   getAllCategories();

  // Dynamic size options based on selected categories
  const shoeCategories = ['chaussures', 'sandales', 'baskets', 'accessoires'];
  const isShoeCategory = filters.category.some(c => shoeCategories.includes(c));
  
  const clothingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const shoeSizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
  const sizes = isShoeCategory ? shoeSizes : clothingSizes;

  const colors = [
    { name: 'Noir', hex: '#1A1A1A' },
    { name: 'Or', hex: '#C9A96E' },
    { name: 'Crème', hex: '#F8F5F0' },
    { name: 'Terracotta', hex: '#8B4513' },
    { name: 'Blanc', hex: '#ffffff' },
    { name: 'Bleu', hex: '#1a3a6b' },
    { name: 'Vert', hex: '#2d6a4f' },
    { name: 'Rose', hex: '#FFB6C1' }
  ];

  const handleCategoryChange = (cat) => {
    if (cat.startsWith('divider')) return;
    const updated = filters.category.includes(cat)
      ? filters.category.filter((c) => c !== cat)
      : [...filters.category, cat];
    updateFilters({ ...filters, category: updated });
  };

  const handleSizeChange = (size) => {
    const updated = filters.size.includes(size)
      ? filters.size.filter((s) => s !== size)
      : [...filters.size, size];
    updateFilters({ ...filters, size: updated });
  };

  const handleColorChange = (color) => {
    const updated = filters.color.includes(color)
      ? filters.color.filter((c) => c !== color)
      : [...filters.color, color];
    updateFilters({ ...filters, color: updated });
  };

  const handlePriceChange = (e) => {
    updateFilters({
      ...filters,
      priceRange: [filters.priceRange[0], parseInt(e.target.value)]
    });
  };

  const handleSortChange = (e) => {
    updateFilters({ ...filters, sort: e.target.value });
  };

  const resetAllFilters = () => {
    const resetFilters = {
      category: [],
      size: [],
      color: [],
      priceRange: [0, 1000],
      availability: true,
      sort: 'populaire'
    };
    setFilters(resetFilters);
    onFilterChange?.(resetFilters);
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const activeFiltersCount =
    filters.category.length +
    (filters.priceRange[1] < 1000 ? 1 : 0);

  return (
    <div className={`filter-sidebar ${isMobile ? 'mobile-drawer' : ''}`}>
      {isMobile && (
        <div className="filter-header">
          <h3>Filtres</h3>
          <button
            className="filter-close"
            onClick={onClose}
            aria-label="Fermer les filtres"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Reset Button */}
      {activeFiltersCount > 0 && (
        <button
          className="reset-filters-btn"
          onClick={resetAllFilters}
          style={{
            color: '#C9A96E',
            border: 'none',
            background: 'none',
            fontSize: '12px',
            cursor: 'pointer',
            textDecoration: 'underline',
            marginBottom: '20px',
            padding: '0'
          }}
        >
          Réinitialiser les filtres
        </button>
      )}

      {/* Sort */}
      <div className="filter-section">
        <h5 className="filter-title">Trier par</h5>
        <select
          value={filters.sort}
          onChange={handleSortChange}
          className="filter-select"
        >
          <option value="populaire">Populaire</option>
          <option value="prix-asc">Prix croissant</option>
          <option value="prix-desc">Prix décroissant</option>
          <option value="note">Mieux notés</option>
          <option value="nouveau">Nouveautés</option>
        </select>
      </div>

      {/* Category */}
      <div className="filter-section">
        <h5 className="filter-title">Catégorie</h5>
        <div className="filter-options">
          {categories.map((cat) => (
            <label 
              key={cat.value} 
              className={`filter-checkbox ${cat.disabled ? 'divider' : ''} ${
                filters.category.includes(cat.value) ? 'active' : ''
              }`}
              style={{
                pointerEvents: cat.disabled ? 'none' : 'auto',
                color: cat.disabled ? '#ccc' : (filters.category.includes(cat.value) ? '#C9A96E' : 'inherit'),
                fontWeight: filters.category.includes(cat.value) ? '600' : 'normal'
              }}
            >
              {!cat.disabled && (
                <input
                  type="checkbox"
                  checked={filters.category.includes(cat.value)}
                  onChange={() => handleCategoryChange(cat.value)}
                  style={{ accentColor: '#C9A96E' }}
                />
              )}
              <span className={cat.disabled ? '' : 'checkmark'} />
              {cat.label}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="filter-section">
        <h5 className="filter-title">Prix max</h5>
        <div className="price-input">
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange[1]}
            onChange={handlePriceChange}
            className="price-slider"
          />
          <div className="price-display">
            {filters.priceRange[1]} DH
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="filter-section">
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={filters.availability}
            onChange={(e) =>
              updateFilters({ ...filters, availability: e.target.checked })
            }
            style={{ accentColor: '#C9A96E' }}
          />
          <span className="checkmark" />
          En stock uniquement
        </label>
      </div>
    </div>
  );
}
