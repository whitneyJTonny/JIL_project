import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [editId, setEditId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    setLoading(true);
    setError('');
    API.get('/customer')
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        setError('Failed to fetch customers');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const apiCall = editId
      ? API.put(`/customer/${editId}`, form)
      : API.post('/customer', form);

    apiCall
      .then(() => {
        fetchCustomers();
        setForm({ name: '', email: '', phone: '' });
        setEditId(null);
      })
      .catch((err) => {
        setError('Failed to save customer');
        console.error(err.response || err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleEdit = (customer) => {
    setForm({ name: customer.name, email: customer.email, phone: customer.phone });
    setEditId(customer.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      API.delete(`/customer/${id}`)
        .then(() => {
          fetchCustomers();
        })
        .catch((err) => {
          setError('Failed to delete customer');
          console.error(err.response || err.message);
        });
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '20px auto', padding: 20, backgroundColor: '#fff', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center' }}>{editId ? 'Edit Customer' : 'Add Customer'}</h2>
      {error && (
        <p style={{ color: 'red', textAlign: 'center' }}>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} style={{ marginBottom: 30, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <input
          style={{ flex: '1 1 200px', padding: 8 }}
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleInputChange}
          required
        />
        <input
          style={{ flex: '1 1 200px', padding: 8 }}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleInputChange}
          required
        />
        <input
          style={{ flex: '1 1 150px', padding: 8 }}
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleInputChange}
          required
        />
        <button
          type="submit"
          disabled={submitting}
          style={{ padding: '8px 16px', backgroundColor: '#991616ff', color: 'white', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer' }}
        >
          {submitting ? 'Saving...' : editId ? 'Update' : 'Add'}
        </button>
      </form>

      <h2 style={{ textAlign: 'center' }}>Customer List</h2>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading customers...</p>
      ) : customers.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No customers found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#7c1313', color: 'white' }}>
              <th style={{ padding: 10, border: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: 10, border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: 10, border: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: 10, border: '1px solid #ddd' }}>Phone</th>
              <th style={{ padding: 10, border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td style={{ padding: 10, border: '1px solid #ddd', textAlign: 'center' }}>{customer.id}</td>
                <td style={{ padding: 10, border: '1px solid #ddd' }}>{customer.name}</td>
                <td style={{ padding: 10, border: '1px solid #ddd' }}>{customer.email}</td>
                <td style={{ padding: 10, border: '1px solid #ddd' }}>{customer.phone}</td>
                <td style={{ padding: 10, border: '1px solid #ddd', textAlign: 'center' }}>
                  <button
                    onClick={() => handleEdit(customer)}
                    style={{ marginRight: 10, padding: '4px 8px', cursor: 'pointer' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    style={{ padding: '4px 8px', cursor: 'pointer', backgroundColor: '#c0392b', color: 'white', border: 'none' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomersPage;
