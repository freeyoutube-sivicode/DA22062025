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
import FavoritesPage from "./pages/FavoritesPage";
import ProfilePage from "./pages/ProfilePage";
import PriceListPage from "./pages/PriceListPage";
import ServicePage from "./pages/ServicePage";
import TestDrivePage from "./pages/TestDrivePage";
import NewsPage from "./pages/NewsPage";
import PriceListDetailPage from "./pages/PriceListDetailPage";
import "./styles/main.scss";
import { ROUTERS } from "./utils/constant";

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
                  <Route path={ROUTERS.USER.LOGIN} element={<LoginPage />} />
                  <Route
                    path={ROUTERS.USER.REGISTER}
                    element={<RegisterPage />}
                  />
                  <Route
                    path={ROUTERS.USER.CARS}
                    element={
                      <MainLayout>
                        <PublicProductListPage />
                      </MainLayout>
                    }
                  />
                  <Route
                    path={ROUTERS.USER.CARS_DETAIL}
                    element={
                      <MainLayout>
                        <ProductDetailPage />
                      </MainLayout>
                    }
                  />
                  <Route
                    path={ROUTERS.USER.NEWS}
                    element={
                      <MainLayout>
                        <NewsPage />
                      </MainLayout>
                    }
                  />
                  <Route
                    path={ROUTERS.USER.SERVICE}
                    element={
                      <MainLayout>
                        <ServicePage />
                      </MainLayout>
                    }
                  />
                  <Route
                    path={ROUTERS.USER.TEST_DRIVE}
                    element={
                      <MainLayout>
                        <TestDrivePage />
                      </MainLayout>
                    }
                  />
                  <Route
                    path={ROUTERS.USER.PRICE_LIST}
                    element={
                      <MainLayout>
                        <PriceListPage />
                      </MainLayout>
                    }
                  />
                  <Route
                    path={ROUTERS.USER.PRICE_LIST_DETAIL}
                    element={
                      <MainLayout>
                        <PriceListDetailPage />
                      </MainLayout>
                    }
                  />

                  {/* Protected Routes */}
                  <Route
                    path={ROUTERS.USER.FAVORITES}
                    element={
                      <ProtectedRoute>
                        <MainLayout>
                          <FavoritesPage />
                        </MainLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTERS.USER.PROFILE}
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
                    path={ROUTERS.ADMIN.DASHBOARD}
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout>
                          <DashboardPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTERS.ADMIN.PRODUCTS}
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout>
                          <AdminProductListPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTERS.ADMIN.PRODUCTS_ADD}
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout>
                          <ProductFormPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTERS.ADMIN.PRODUCTS_EDIT}
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout>
                          <ProductFormPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTERS.ADMIN.ORDERS}
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout>
                          <OrderListPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTERS.ADMIN.ORDERS_DETAIL}
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout>
                          <OrderDetailPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTERS.ADMIN.USERS}
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout>
                          <UserListPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTERS.ADMIN.CATEGORIES}
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout>
                          <CategoryListPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTERS.ADMIN.SERVICES}
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout>
                          <ServiceListPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTERS.ADMIN.TEST_DRIVE_BOOKINGS}
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
