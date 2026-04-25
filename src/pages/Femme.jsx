import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import './Collection.css';

export default function Femme({ showToast }) {
  const [searchParams] = useSearchParams();
  const gender = searchParams.get('gender');
  const sale = searchParams.get('sale');
  const sortParam = searchParams.get('sort');
  const cat = searchParams.get('cat');
  const search = searchParams.get('search');

  // Scroll to top when page loads or gender changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [gender, searchParams]);

  // Default to femme categories when no specific filter is set
  const getDefaultCategories = () => {
    if (cat) {
      return [cat]; // Show only the specific category from URL
    }
    if (gender === 'homme') {
      return ['homme-chemises', 'homme-pantalons', 'homme-tshirts'];
    }
    // Default to femme categories for Casa Moda women's fashion store
    return ['robes', 'vestes', 'pyjamas', 'jeans'];
  };

  const [filters, setFilters] = useState({
    sort: sortParam || 'populaire',
    category: getDefaultCategories(),
    size: [],
    color: [],
    priceRange: [0, 1000],
    availability: true,
    showSaleOnly: sale === 'true'
  });
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Update filters when URL parameters change
  useEffect(() => {
    const newFilters = { ...filters };
    
    // Reset showSaleOnly first
    newFilters.showSaleOnly = false;
    
    if (cat) {
      // Category-specific filter - show ALL products of this category regardless of gender
      newFilters.category = [cat];
    } else if (gender === 'femme') {
      newFilters.category = ['robes', 'vestes', 'pyjamas', 'jeans'];
    } else if (gender === 'homme') {
      newFilters.category = ['homme-chemises', 'homme-pantalons', 'homme-tshirts'];
    } else {
      // Default categories when no gender specified
      newFilters.category = [];
    }
    
    // Handle specific page types
    if (sale === 'true') {
      // SOLDES page - show only products with sale prices
      newFilters.showSaleOnly = true;
      newFilters.category = []; // Show all categories for sale items
    } else if (sortParam === 'nouveau') {
      // NOUVEAUTÉS page - show products with 'New' badge, NOT sale items
      newFilters.sort = 'nouveau';
      newFilters.showSaleOnly = false; // Explicitly exclude sale items
      newFilters.category = []; // Show all categories for new items
    }
    
    setFilters(newFilters);
  }, [searchParams]);

  const filteredAndSortedProducts = useMemo(() => {
    // First filter products
    let result = products.filter((p) => {
      // Search filter
      const searchMatch = !search || 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      
      // If filtering by specific category from homepage, ignore gender filter
      if (cat) {
        const categoryMatch = p.category === cat;
        
        // Sale filter
        if (filters.showSaleOnly && !p.oldPrice) {
          return false;
        }
        
        // Price filter
        const currentPrice = p.salePrice || p.price;
        const priceMatch = currentPrice <= filters.priceRange[1];
        
        // Availability filter
        const availabilityMatch = !filters.availability || p.inStock;
        
        return searchMatch && categoryMatch && priceMatch && availabilityMatch;
      }
      
      // Special handling for Nouveautés page
      if (sortParam === 'nouveau') {
        // Show only products with 'New' badge AND no sale (no oldPrice)
        const isNew = p.badge === 'New';
        const isNotOnSale = !p.oldPrice; // Products that are NOT on sale
        
        if (!isNew || !isNotOnSale) {
          return false;
        }
      }
      
      // Special handling for Soldes page
      if (sale === 'true') {
        // Show only products with sale prices (oldPrice exists)
        if (!p.oldPrice) {
          return false;
        }
      }
      
      // Normal filtering with gender restriction
      const genderMatch = !gender || p.gender === gender;
      
      // Category filter
      const categoryMatch = filters.category.length === 0 || 
        filters.category.includes(p.category);
      
      // Size filter
      const sizeMatch = filters.size.length === 0 || 
        filters.size.some(s => p.sizes?.includes(s));
      
      // Color filter
      const colorMatch = filters.color.length === 0 || 
        filters.color.some(c => p.colors?.includes(c));
      
      // Price filter
      const currentPrice = p.salePrice || p.price;
      const priceMatch = currentPrice <= filters.priceRange[1];
      
      // Availability filter
      const availabilityMatch = !filters.availability || p.inStock;
      
      return searchMatch && genderMatch && categoryMatch && sizeMatch && colorMatch && priceMatch && availabilityMatch;
    });

    // Then sort the filtered results
    switch (filters.sort) {
      case 'prix-asc':
        return result.sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return priceA - priceB;
        });
      case 'prix-desc':
        return result.sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return priceB - priceA;
        });
      case 'note':
        return result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'nouveau':
        return result.sort((a, b) => {
          const aIsNew = a.badge === 'New' ? 1 : 0;
          const bIsNew = b.badge === 'New' ? 1 : 0;
          return bIsNew - aIsNew;
        });
      case 'populaire':
      default:
        return result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
  }, [filters, search]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const activeFiltersCount = 
    filters.category.length + 
    filters.size.length + 
    filters.color.length + 
    (filters.priceRange[1] < 1000 ? 1 : 0);

  const getPageTitle = () => {
    if (search) {
      return `Résultats de recherche`;
    }
    if (cat) {
      const categoryNames = {
        'robes': 'Robes & Jupes',
        'sport': 'Sport & Fitness', 
        'homme-chemises': 'Chemises',
        'chaussures': 'Chaussures'
      };
      return categoryNames[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
    }
    if (gender === 'homme') return 'Collection Homme';
    if (sale === 'true') return 'Soldes';
    if (sortParam === 'nouveau') return 'Nouveautés';
    return 'Collection Femme';
  };

  const getPageDescription = () => {
    if (search) {
      return `Résultats pour: "${search}"`;
    }
    if (cat) {
      const categoryDescs = {
        'robes': 'Découvrez notre sélection de robes et jupes élégantes',
        'sport': 'Équipements et vêtements de sport pour tous',
        'homme-chemises': 'Chemises élégantes pour homme',
        'chaussures': 'Chaussures de qualité pour tous les styles'
      };
      return categoryDescs[cat] || `Découvrez notre sélection ${cat}`;
    }
    if (gender === 'homme') return 'Trouvez le style parfait pour l\'homme marocain moderne';
    if (sale === 'true') return 'Découvrez nos meilleures offres et promotions';
    if (sortParam === 'nouveau') return 'Découvrez nos dernières créations';
    return 'Découvrez nos créations exclusives pour la femme marocaine moderne';
  };

  return (
    <div className="collection">
      <div className="collection-header">
        <h1>{getPageTitle()}</h1>
        <p>{getPageDescription()}</p>
      </div>

      <div className="collection-container">
        {/* Mobile Filter Button */}
        <button
          className="mobile-filter-btn"
          onClick={() => setShowMobileFilter(!showMobileFilter)}
        >
          🔍 Filtres ({activeFiltersCount})
        </button>

        {/* Filter Sidebar */}
        {showMobileFilter && (
          <FilterSidebar
            onFilterChange={handleFilterChange}
            onClose={() => setShowMobileFilter(false)}
            isMobile={true}
            genderContext={gender}
          />
        )}

        <div className="collection-sidebar">
          <FilterSidebar
            onFilterChange={handleFilterChange}
            isMobile={false}
            genderContext={gender}
          />
        </div>

        {/* Products */}
        <div className="collection-content">
          {search && (
            <p style={{ marginBottom: '10px', color: '#666' }}>Résultats pour: <strong>"{search}"</strong></p>
          )}
          
          <p className="product-count">
            {filteredAndSortedProducts.length} articles trouvés
          </p>

          <div className="products-grid">
            {filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showToast={showToast}
                />
              ))
            ) : (
              <div className="no-products">
                {search ? (
                  <p>Aucun produit trouvé pour "{search}"</p>
                ) : (
                  <p>Aucun produit ne correspond à vos critères</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
