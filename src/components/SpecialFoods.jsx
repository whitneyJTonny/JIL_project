// SpecialFoods.jsx
import React from "react";
import "./SpecialFoods.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

import food1 from "../assets/food1.png"; 
import food2 from "../assets/food2.png";
import food3 from "../assets/food3.png";      
import food4 from "../assets/food4.png";
import food5 from "../assets/food5.png";
import food6 from "../assets/food6.png";
import food7 from "../assets/food7.png";
import food8 from "../assets/food8.png";

const foodItems = [
  { name: "Jollof", image: food1 },
  { name: "White Rice", image: food2 },
  { name: "Swallow", image: food3 },
  { name: "Yam Porridge", image: food4 },
  { name: "Snacks", image: food5 },
  { name: "African Salad", image: food6 },
  { name: "Fruit Mix", image: food7 },
  { name: "Fried Rice", image: food8 },
];

const SpecialFoods = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <section className="special-foods">
      <h2>OUR SPECIAL FOODS</h2>
      <div className="food-grid">
        {foodItems.map((item, idx) => (
          <div className="food-card" key={idx}>
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <button
              className="order-button"
              onClick={() => addToCart({ ...item, id: idx })}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="view-more-container">
        <button
          className="view-more-button"
          onClick={() => navigate("/menu")}
        >
          View More
        </button>
      </div>
    </section>
  );
};

export default SpecialFoods;
