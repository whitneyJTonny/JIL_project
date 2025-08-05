import React from 'react';
import { useCart } from '../../context/CartContext';
import './MenuPage.css';

// Asset imports
import orangeJuice from '../../assets/orange-juice.jpg';
import pineappleJuice from '../../assets/pineapple-juice.jpg';
import teaBread from '../../assets/bread-tea.jpg';
import spinach from '../../assets/spinach.jpg';
import okra from '../../assets/okra.jpg';
import bitterleaf from '../../assets/bitterleaf.jpg';
import puffPuff from '../../assets/puff-puff.jpg';
import meatPie from '../../assets/meat-pie.jpg';
import fruitDrink from '../../assets/fruit-drink.jpg';
import water from '../../assets/water.jpg';
import friedRice from '../../assets/fried-rice.jpg';
import jollofRice from '../../assets/jollof-rice.jpg';
import whiteRice from '../../assets/white-rice.jpg';

const menuItems = [
  {
    category: 'BREAKFAST',
    items: [
      { name: 'Orange Juice', image: orangeJuice },
      { name: 'Pineapple Juice', image: pineappleJuice },
      { name: 'Tea and Bread', image: teaBread }
    ]
  },
  {
    category: 'VEGETABLES',
    items: [
      { name: 'Spinach', image: spinach },
      { name: 'Okra', image: okra },
      { name: 'Bitterleaf', image: bitterleaf }
    ]
  },
  {
    category: 'SNACKS',
    items: [
      { name: 'Puff Puff', image: puffPuff },
      { name: 'Meat Pie', image: meatPie }
    ]
  },
  {
    category: 'DRINKS',
    items: [
      { name: 'Fruit Drink', image: fruitDrink },
      { name: 'Water', image: water }
    ]
  },
  {
    category: 'MEALS',
    items: [
      { name: 'Fried Rice', image: friedRice },
      { name: 'Jollof Rice', image: jollofRice },
      { name: 'White Rice & Stew', image: whiteRice }
    ]
  }
];

const MenuPage = () => {
  const { addToCart } = useCart();

  return (
    <div className="menu-page">
      <h1>OUR BEST FOODS</h1>
      {menuItems.map((section) => (
        <div key={section.category} className="menu-section">
          <h2 className="menu-category">{section.category}</h2>
          <div className="menu-grid">
            {section.items.map((item, index) => (
              <div key={index} className="menu-card">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <button
                  className="order-button"
                  onClick={() =>
                    addToCart({ ...item, id: `${section.category}-${index}` })
                  }
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuPage;
