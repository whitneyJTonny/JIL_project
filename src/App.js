import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import HomePage from "./components/HomePage";
import AboutUs from "./components/AboutUs/AboutUs";
import MenuPage from "./components/MenuPage/MenuPage";
import CartPage from "./components/CartPage/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ContactPage from "./components/ContactPage/ContactPage";
import FeedbackPage from "./components/FeedbackPage/FeedbackPage";
import GalleryPage from "./components/Gallery/GalleryPage";
import ServicePage from "./components/ServicePage/ServicePage";
import ServiceDetail from "./components/ServiceDetail";
import MoreServices from "./components/MoreServices";
import Header from "./components/Header";

// Admin
import AdminDashboard from './components/admin/AminDashboard';
import DashboardHome from "./components/admin/DashboardHome";
import CustomersPage from "./components/admin/CustomersPage";
import OrdersPage from "./components/admin/OrdersPage";
import StaffPage from "./components/admin/StaffPage";
import MenuItemsPage from "./components/admin/MenuitemsPage";
import AddUser from './components/admin/AddUser';

import CateringEventsPage from "./components/admin/CateringEventsPage/CateringEventsPage";
import CateringEventDetail from "./components/admin/CateringEventsPage/CateringEventDetail";
import AddCateringEvent from "./components/admin/CateringEventsPage/AddCateringEvent";
import EditCateringEvent from "./components/admin/CateringEventsPage/EditCateringEvent";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}

      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="menuitem" element={<MenuItemsPage />} />
          <Route path="/admin/adduser/add" element={<AddUser />} />

          
          {/* Admin Catering Events */}
          <Route path="catering-events" element={<CateringEventsPage />} />
          <Route path="catering-events/new" element={<AddCateringEvent />} />
          <Route path="catering-events/:id/edit" element={<EditCateringEvent />} />
          <Route path="catering-events/:id" element={<CateringEventDetail />} />
        </Route>

        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="services" element={<ServicePage />} />
        <Route path="services/more" element={<MoreServices />} />
        <Route path="services/:serviceId" element={<ServiceDetail />} />
      </Routes>
    </>
  );
}

export default App;
