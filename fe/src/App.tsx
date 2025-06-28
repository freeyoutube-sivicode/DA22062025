import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import { Provider } from "react-redux";
import { store } from "./store";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import MainLayout from "./components/layout/MainLayout";
import ScrollToTop from "./components/ScrollToTop";

// Admin Pages
import DashboardPage from "./pages/admin/DashboardPage";
import AdminProductListPage from "./pages/admin/ProductListPage";
import ProductFormPage from "./pages/admin/ProductFormPage";
import OrderListPage from "./pages/admin/OrderListPage";
import OrderDetailPage from "./pages/admin/OrderDetailPage";
import UserListPage from "./pages/admin/UserListPage";
import CategoryListPage from "./pages/admin/CategoryListPage";
import ServiceListPage from "./pages/admin/ServiceListPage";
import TestDriveBookingListPage from "./pages/admin/TestDriveBookingListPage";

// Public Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import PublicProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import PriceListPage from "./pages/PriceListPage";
import ServicePage from "./pages/ServicePage";
import TestDrivePage from "./pages/TestDrivePage";
import NewsPage from "./pages/NewsPage";
import PriceListDetailPage from "./pages/PriceListDetailPage";
import "./styles/main.scss";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <FavoritesProvider>
            <ConfigProvider
              locale={viVN}
              theme={{
                token: {
                  colorPrimary: "#1890ff",
                },
              }}
            >
              <Router>
                <ScrollToTop />
                <Routes>
                  {/* Public Routes */}
                  <Route
                    path="/"
                    element={
                      <MainLayout>
                        <HomePage />
                      </MainLayout>
                    }
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route
                    path="/san-pham"
                    element={
                      <MainLayout>
                        <PublicProductListPage />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/san-pham/:id"
                    element={
                      <MainLayout>
                        <ProductDetailPage />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/tin-tuc"
                    element={
                      <MainLayout>
                        <NewsPage />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/dich-vu"
                    element={
                      <MainLayout>
                        <ServicePage />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/lai-thu"
                    element={
                      <MainLayout>
                        <TestDrivePage />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/bang-gia"
                    element={
                      <MainLayout>
                        <PriceListPage />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/bang-gia/:id"
                    element={
                      <MainLayout>
                        <PriceListDetailPage />
                      </MainLayout>
                    }
                  />

                  {/* Protected Routes */}
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <MainLayout>
                          <CartPage />
                        </MainLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <MainLayout>
                          <CheckoutPage />
                        </MainLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <MainLayout>
                          <ProfilePage />
                        </MainLayout>
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout>
                          <DashboardPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/products"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout>
                          <AdminProductListPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/products/add"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout>
                          <ProductFormPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/products/edit/:id"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout>
                          <ProductFormPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/orders"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout>
                          <OrderListPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/orders/:id"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout>
                          <OrderDetailPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/users"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout>
                          <UserListPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/categories"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout>
                          <CategoryListPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/services"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout>
                          <ServiceListPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/test-drive-bookings"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout>
                          <TestDriveBookingListPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Router>
            </ConfigProvider>
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
