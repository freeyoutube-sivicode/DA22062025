import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import { Provider } from "react-redux";
import { store } from "./store";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import MainLayout from "./components/layout/MainLayout";
import ScrollToTop from "./components/ScrollToTop";

// Admin Pages
import DashboardPage from "./pages/admin/DashboardPage";
import ProductListPage from "./pages/admin/ProductListPage";
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

// Ant Design Theme Configuration Component
const AntdThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useTheme();

  const antdTheme = {
    token: {
      colorPrimary: theme.colors.palette.primary,
      colorSuccess: theme.colors.palette.success,
      colorWarning: theme.colors.palette.warning,
      colorError: theme.colors.palette.error,
      colorInfo: theme.colors.palette.info,
      colorTextBase: theme.colors.text.primary,
      colorBgBase: theme.colors.background.primary,
      fontFamily: theme.typography.fontFamily,
      fontSize: parseInt(theme.typography.fontSize.base),
      borderRadius: parseInt(theme.borderRadius.base),
      boxShadow: theme.shadows.base,
      boxShadowSecondary: theme.shadows.sm,
      boxShadowTertiary: theme.shadows.lg,
    },
    components: {
      Button: {
        colorPrimary: theme.colors.palette.primary,
        colorPrimaryHover: theme.colors.palette.primaryLight,
        colorPrimaryActive: theme.colors.palette.primaryDark,
      },
      Menu: {
        itemSelectedBg: theme.colors.palette.primary,
        itemSelectedColor: theme.colors.text.white,
        itemHoverBg: theme.colors.palette.primaryLight,
      },
      Layout: {
        siderBg: theme.colors.palette.secondary,
        headerBg: theme.colors.background.primary,
        triggerBg: theme.colors.palette.primary,
        triggerColor: theme.colors.text.white,
      },
    },
  };

  return (
    <ConfigProvider locale={viVN} theme={antdTheme}>
      {children}
    </ConfigProvider>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AntdThemeProvider>
          <AuthProvider>
            <Router>
              <ScrollToTop />
              <Routes>
                {/* Public Routes */}
                <Route element={<MainLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="san-pham" element={<PublicProductListPage />} />
                  <Route path="san-pham/:id" element={<ProductDetailPage />} />
                  <Route path="bang-gia" element={<PriceListPage />} />
                  <Route
                    path="bang-gia/:id"
                    element={<PriceListDetailPage />}
                  />
                  <Route path="dich-vu" element={<ServicePage />} />
                  <Route path="dat-hen-lai-thu" element={<TestDrivePage />} />
                  <Route path="tin-tuc" element={<NewsPage />} />
                  <Route
                    path="profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="cart"
                    element={
                      <ProtectedRoute>
                        <CartPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="checkout"
                    element={
                      <ProtectedRoute>
                        <CheckoutPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                </Route>

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
                        <ProductListPage />
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
          </AuthProvider>
        </AntdThemeProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
