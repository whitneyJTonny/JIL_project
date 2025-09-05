// src/pages/MenuPage.jsx
import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { useCart } from "../../context/CartContext";
import "./MenuPage.css";

// ✅ Meal images
import meal1 from "../../assets/meal1.jpg";
import meal2 from "../../assets/meal2.jpg";
import meal3 from "../../assets/meal3.jpg";
import meal4 from "../../assets/meal4.jpg";
import meal5 from "../../assets/meal5.jpg";
import meal6 from "../../assets/meal6.jpg";
import meal7 from "../../assets/meal7.jpg";
import meal8 from "../../assets/meal8.jpg";

// ✅ Breakfast images
import break1 from "../../assets/break1.jpg";
import break2 from "../../assets/break2.jpg";
import break3 from "../../assets/break3.jpg";
import break4 from "../../assets/break4.jpg";
import break5 from "../../assets/break5.jpg";
import break6 from "../../assets/break6.jpg";
import break7 from "../../assets/break7.jpg";
import break8 from "../../assets/break8.jpg";

// ✅ Snack images
import snack1 from "../../assets/snack1.jpg";
import snack2 from "../../assets/snack2.jpg";
import snack3 from "../../assets/snack3.jpg";
import snack4 from "../../assets/snack4.jpg";
import snack5 from "../../assets/snack5.jpg";
import snack6 from "../../assets/snack6.jpg";
import snack7 from "../../assets/snack7.jpg";
import snack8 from "../../assets/snack8.jpg";

// ✅ Drink images
import drink1 from "../../assets/drink1.jpg";
import drink2 from "../../assets/drink2.jpg";
import drink3 from "../../assets/drink3.jpg";
import drink4 from "../../assets/drink4.jpg";
import drink5 from "../../assets/drink5.jpg";
import drink6 from "../../assets/drink6.jpg";
import drink7 from "../../assets/drink7.jpg";
import drink8 from "../../assets/drink8.jpg";

// ✅ Images grouped by category
const categoryImages = {
  Meals: [meal1, meal2, meal3, meal4, meal5, meal6, meal7, meal8],
  Breakfast: [break1, break2, break3, break4, break5, break6, break7, break8],
  Snacks: [snack1, snack2, snack3, snack4, snack5, snack6, snack7, snack8],
  Drinks: [drink1, drink2, drink3, drink4, drink5, drink6, drink7, drink8],
};

// ✅ Pick a random thumbnail for category cards
const getCategoryThumbnail = (cat) => {
  const images = categoryImages[cat];
  if (!images || images.length === 0) return meal1; // fallback
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await API.get("/v1/menu-items/");
        if (Array.isArray(response.data)) {
          setMenuItems(response.data);

          // Extract unique categories
          const uniqueCats = [
            ...new Set(response.data.map((item) => item.category || "Uncategorized")),
          ];
          setCategories(uniqueCats);
        } else {
          throw new Error("Menu data is not an array");
        }
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError("Failed to fetch menu items");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading menu...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  const filteredItems = selectedCategory
    ? menuItems.filter(
        (item) =>
          item.category &&
          item.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
      )
    : [];

  return (
    <div className="menu-page">
      <h1>Our Menu</h1>

      {/* Category grid */}
      {!selectedCategory ? (
        <div className="category-grid">
          {categories.map((cat) => (
            <div
              key={cat}
              className="category-card"
              onClick={() => setSelectedCategory(cat)}
            >
              <img
                src={getCategoryThumbnail(cat)}
                alt={cat}
                className="category-image"
              />
              <h3>{cat}</h3>
            </div>
          ))}
        </div>
      ) : (
        <>
          <button
            className="back-button"
            onClick={() => setSelectedCategory(null)}
          >
            ← Back to Categories
          </button>

          <h2>{selectedCategory}</h2>
          <div className="menu-grid">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div key={item.id} className="menu-card">
                  <img
                    src={
                      categoryImages[selectedCategory]
                        ? categoryImages[selectedCategory][
                            index % categoryImages[selectedCategory].length
                          ]
                        : meal1
                    }
                    alt={item.name}
                  />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="price">UGX {item.price.toLocaleString()}</div>
                  <button
                    className="order-button"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p>No items found in this category.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MenuPage;
