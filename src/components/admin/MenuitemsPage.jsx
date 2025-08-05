import React, { useEffect, useState } from 'react';
import './admin.css';

const MenuItemsPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/menuitem`)
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching menu items:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="menuitems-page">
      <h2 className="menuitems-title">Menu Items</h2>
      {loading ? (
        <p>Loading menu items...</p>
      ) : (
        <div className="menuitems-table-container">
          <table className="menuitems-table">
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price (UGX)</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.length > 0 ? (
                menuItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.category || 'N/A'}</td>
                    <td>{item.price}</td>
                    <td>{item.description || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-menuitems">No menu items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MenuItemsPage;
