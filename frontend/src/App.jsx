import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BuildPage from './pages/BuildPage';
import DashboardPage from './pages/DashboardPage';
import CheckoutPage from './pages/CheckoutPage';
import EnhancedCheckoutPage from './pages/EnhancedCheckoutPage';
import PaymentTestPage from './pages/PaymentTestPage';
import MyOrdersPage from './pages/MyOrdersPage';
import ProfilePage from './pages/ProfilePage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminComponents from './pages/admin/AdminComponents';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app-shell">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <Header />
            <main className="app-main">
              <LandingPage />
            </main>
          </>
        } />
        <Route path="/login" element={
          <>
            <Header />
            <main className="app-main">
              <LoginPage />
            </main>
          </>
        } />
        <Route path="/register" element={
          <>
            <Header />
            <main className="app-main">
              <RegisterPage />
            </main>
          </>
        } />

        {/* Protected User Routes */}
        <Route path="/build" element={
          <ProtectedRoute>
            <Header />
            <main className="app-main">
              <BuildPage />
            </main>
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Header />
            <main className="app-main">
              <DashboardPage />
            </main>
          </ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Header />
            <main className="app-main">
              <EnhancedCheckoutPage />
            </main>
          </ProtectedRoute>
        } />
        <Route path="/checkout-old" element={
          <ProtectedRoute>
            <Header />
            <main className="app-main">
              <CheckoutPage />
            </main>
          </ProtectedRoute>
        } />
        <Route path="/my-orders" element={
          <ProtectedRoute>
            <Header />
            <main className="app-main">
              <MyOrdersPage />
            </main>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Header />
            <main className="app-main">
              <ProfilePage />
            </main>
          </ProtectedRoute>
        } />
        <Route path="/payment-test" element={
          <ProtectedRoute>
            <Header />
            <main className="app-main">
              <PaymentTestPage />
            </main>
          </ProtectedRoute>
        } />

        {/* Admin Routes (No Header) */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/admin/components" element={
          <AdminRoute>
            <AdminComponents />
          </AdminRoute>
        } />
        <Route path="/admin/orders" element={
          <AdminRoute>
            <AdminOrders />
          </AdminRoute>
        } />
        <Route path="/admin/users" element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        } />
        <Route path="/admin/analytics" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

