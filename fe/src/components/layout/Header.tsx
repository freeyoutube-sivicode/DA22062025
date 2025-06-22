import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const cartState = useSelector((state: RootState) => state.cart);
  const cart = cartState.cart;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const itemCount = cart?.items?.length || 0;

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // CSS-in-JS Styles
  const headerStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 1000,
    transition: "all 0.3s ease",
  };

  const authBarStyle: React.CSSProperties = {
    backgroundColor: theme.colors.palette.secondary,
    color: theme.colors.text.white,
    padding: "0.5rem 0",
    fontSize: "0.875rem",
    transition: "all 0.3s ease",
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
  };

  const authContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  };

  const authLinksStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  };

  const authLinkStyle: React.CSSProperties = {
    color: theme.colors.text.white,
    textDecoration: "none",
    padding: "0.25rem 0.5rem",
    borderRadius: "4px",
    transition: "all 0.3s ease",
  };

  const authButtonStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    border: "none",
    color: theme.colors.text.white,
    cursor: "pointer",
    padding: "0.25rem 0.5rem",
    borderRadius: "4px",
    transition: "all 0.3s ease",
  };

  const mainBarStyle: React.CSSProperties = {
    backgroundColor: theme.colors.background.paper,
    borderBottom: `1px solid ${theme.colors.surface.border}`,
    padding: "1rem 0",
    transition: "all 0.3s ease",
  };

  const rowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
  };

  const logoStyle: React.CSSProperties = {
    height: "40px",
    width: "auto",
  };

  const navStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  };

  const navLinkStyle: React.CSSProperties = {
    color: theme.colors.text.primary,
    textDecoration: "none",
    fontWeight: 500,
    padding: "0.5rem 0",
    borderBottom: "2px solid transparent",
    transition: "all 0.3s ease",
  };

  const searchContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    border: `2px solid ${theme.colors.surface.border}`,
    borderRadius: "24px",
    overflow: "hidden",
    backgroundColor: theme.colors.background.light,
    transition: "all 0.3s ease",
  };

  const searchBoxStyle: React.CSSProperties = {
    border: "none",
    outline: "none",
    padding: "0.5rem 1rem",
    backgroundColor: "transparent",
    color: theme.colors.text.primary,
    fontSize: "0.875rem",
    width: "200px",
  };

  const searchButtonStyle: React.CSSProperties = {
    backgroundColor: theme.colors.palette.primary,
    border: "none",
    color: theme.colors.text.white,
    padding: "0.5rem 1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const cartLinkStyle: React.CSSProperties = {
    position: "relative",
    color: theme.colors.text.primary,
    fontSize: "1.25rem",
    padding: "0.5rem",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const cartCountStyle: React.CSSProperties = {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    backgroundColor: theme.colors.palette.primary,
    color: theme.colors.text.white,
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    fontWeight: "bold",
  };

  const mobileMenuButtonStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    border: "none",
    color: theme.colors.text.primary,
    fontSize: "1.25rem",
    cursor: "pointer",
    padding: "0.5rem",
  };

  const mobileMenuStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    right: isMobileMenuOpen ? 0 : "-100%",
    width: "280px",
    height: "100vh",
    backgroundColor: theme.colors.background.paper,
    borderLeft: `1px solid ${theme.colors.surface.border}`,
    transition: "right 0.3s ease",
    zIndex: 1001,
    display: "flex",
    flexDirection: "column",
  };

  const mobileMenuHeaderStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    padding: "1rem",
    borderBottom: `1px solid ${theme.colors.surface.border}`,
  };

  const mobileMenuCloseStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    border: "none",
    color: theme.colors.text.primary,
    fontSize: "1.25rem",
    cursor: "pointer",
    padding: "0.5rem",
  };

  const mobileMenuNavStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    padding: "1rem 0",
    flex: 1,
  };

  const mobileMenuLinkStyle: React.CSSProperties = {
    color: theme.colors.text.primary,
    textDecoration: "none",
    padding: "1rem 1.5rem",
    borderBottom: `1px solid ${theme.colors.surface.border}`,
    transition: "all 0.3s ease",
  };

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.background.overlay,
    zIndex: 1000,
    opacity: isMobileMenuOpen ? 1 : 0,
    visibility: isMobileMenuOpen ? "visible" : "hidden",
    transition: "all 0.3s ease",
  };

  const handleAuthLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = theme.colors.palette.primaryDark;
  };

  const handleAuthLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
  };

  const handleAuthButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = theme.colors.palette.primaryDark;
  };

  const handleAuthButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
  };

  const handleNavLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = theme.colors.palette.primary;
    e.currentTarget.style.borderBottomColor = theme.colors.palette.primary;
  };

  const handleNavLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = theme.colors.text.primary;
    e.currentTarget.style.borderBottomColor = "transparent";
  };

  const handleCartHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = theme.colors.background.light;
    e.currentTarget.style.color = theme.colors.palette.primary;
  };

  const handleCartLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = theme.colors.text.primary;
  };

  const handleMobileLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = theme.colors.background.light;
    e.currentTarget.style.color = theme.colors.palette.primary;
  };

  const handleMobileLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = theme.colors.text.primary;
  };

  const handleSearchFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const container = e.currentTarget.parentElement;
    if (container) {
      container.style.borderColor = theme.colors.palette.primary;
    }
  };

  const handleSearchBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const container = e.currentTarget.parentElement;
    if (container) {
      container.style.borderColor = theme.colors.surface.border;
    }
  };

  return (
    <header style={headerStyle} data-theme="header">
      <div style={authBarStyle} data-theme="auth-bar">
        <div style={{ ...containerStyle, ...authContainerStyle }}>
          <div style={authLinksStyle}>
            {user ? (
              <>
                <span>Xin chào {user.Username}</span>
                <button
                  onClick={handleLogout}
                  style={authButtonStyle}
                  onMouseEnter={handleAuthButtonHover}
                  onMouseLeave={handleAuthButtonLeave}
                  data-theme="auth-link"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={authLinkStyle}
                  onClick={closeMobileMenu}
                  onMouseEnter={handleAuthLinkHover}
                  onMouseLeave={handleAuthLinkLeave}
                  data-theme="auth-link"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  style={authLinkStyle}
                  onClick={closeMobileMenu}
                  onMouseEnter={handleAuthLinkHover}
                  onMouseLeave={handleAuthLinkLeave}
                  data-theme="auth-link"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div style={mainBarStyle} data-theme="main-bar">
        <div style={containerStyle}>
          <div style={rowStyle}>
            <Link to="/" onClick={closeMobileMenu}>
              <img
                src="./images/BMW_logo_(gray).svg.png"
                alt="Logo"
                style={logoStyle}
              />
            </Link>

            <nav style={navStyle}>
              <Link
                to="/"
                style={navLinkStyle}
                onClick={closeMobileMenu}
                onMouseEnter={handleNavLinkHover}
                onMouseLeave={handleNavLinkLeave}
                data-theme="nav-link"
              >
                Trang chủ
              </Link>
              <Link
                to="/san-pham"
                style={navLinkStyle}
                onClick={closeMobileMenu}
                onMouseEnter={handleNavLinkHover}
                onMouseLeave={handleNavLinkLeave}
                data-theme="nav-link"
              >
                Sản phẩm
              </Link>
              <Link
                to="/dich-vu"
                style={navLinkStyle}
                onClick={closeMobileMenu}
                onMouseEnter={handleNavLinkHover}
                onMouseLeave={handleNavLinkLeave}
                data-theme="nav-link"
              >
                Dịch vụ
              </Link>
              <Link
                to="/bang-gia"
                style={navLinkStyle}
                onClick={closeMobileMenu}
                onMouseEnter={handleNavLinkHover}
                onMouseLeave={handleNavLinkLeave}
                data-theme="nav-link"
              >
                Bảng giá
              </Link>
              <Link
                to="/tin-tuc"
                style={navLinkStyle}
                onClick={closeMobileMenu}
                onMouseEnter={handleNavLinkHover}
                onMouseLeave={handleNavLinkLeave}
                data-theme="nav-link"
              >
                Tin tức
              </Link>
              <Link
                to="/dat-hen-lai-thu"
                style={navLinkStyle}
                onClick={closeMobileMenu}
                onMouseEnter={handleNavLinkHover}
                onMouseLeave={handleNavLinkLeave}
                data-theme="nav-link"
              >
                Đăng ký lái thử
              </Link>
            </nav>

            <div style={searchContainerStyle} data-theme="search-container">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                style={searchBoxStyle}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                data-theme="search-box"
              />
              <button
                type="button"
                style={searchButtonStyle}
                data-theme="search-button"
              >
                <SearchOutlined />
              </button>
            </div>

            <Link
              to="/cart"
              style={cartLinkStyle}
              onClick={closeMobileMenu}
              onMouseEnter={handleCartHover}
              onMouseLeave={handleCartLeave}
              data-theme="cart-link"
            >
              <FaShoppingCart />
              {itemCount > 0 && (
                <span style={cartCountStyle} data-theme="cart-count">
                  {itemCount}
                </span>
              )}
            </Link>

            <button style={mobileMenuButtonStyle} onClick={toggleMobileMenu}>
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      <div style={mobileMenuStyle} data-theme="mobile-menu">
        <div style={mobileMenuHeaderStyle}>
          <button style={mobileMenuCloseStyle} onClick={toggleMobileMenu}>
            <FaTimes />
          </button>
        </div>
        <nav style={mobileMenuNavStyle}>
          <Link
            to="/"
            style={mobileMenuLinkStyle}
            onClick={closeMobileMenu}
            onMouseEnter={handleMobileLinkHover}
            onMouseLeave={handleMobileLinkLeave}
            data-theme="mobile-menu-link"
          >
            Trang chủ
          </Link>
          <Link
            to="/san-pham"
            style={mobileMenuLinkStyle}
            onClick={closeMobileMenu}
            onMouseEnter={handleMobileLinkHover}
            onMouseLeave={handleMobileLinkLeave}
            data-theme="mobile-menu-link"
          >
            Sản phẩm
          </Link>
          <Link
            to="/dich-vu"
            style={mobileMenuLinkStyle}
            onClick={closeMobileMenu}
            onMouseEnter={handleMobileLinkHover}
            onMouseLeave={handleMobileLinkLeave}
            data-theme="mobile-menu-link"
          >
            Dịch vụ
          </Link>
          <Link
            to="/bang-gia"
            style={mobileMenuLinkStyle}
            onClick={closeMobileMenu}
            onMouseEnter={handleMobileLinkHover}
            onMouseLeave={handleMobileLinkLeave}
            data-theme="mobile-menu-link"
          >
            Bảng giá
          </Link>
          <Link
            to="/tin-tuc"
            style={mobileMenuLinkStyle}
            onClick={closeMobileMenu}
            onMouseEnter={handleMobileLinkHover}
            onMouseLeave={handleMobileLinkLeave}
            data-theme="mobile-menu-link"
          >
            Tin tức
          </Link>
          <Link
            to="/dat-hen-lai-thu"
            style={mobileMenuLinkStyle}
            onClick={closeMobileMenu}
            onMouseEnter={handleMobileLinkHover}
            onMouseLeave={handleMobileLinkLeave}
            data-theme="mobile-menu-link"
          >
            Đăng ký lái thử
          </Link>
        </nav>
        <div
          style={{
            padding: "1rem",
            borderTop: `1px solid ${theme.colors.surface.border}`,
          }}
        >
          {user ? (
            <>
              <Link
                to="/profile"
                style={mobileMenuLinkStyle}
                onClick={closeMobileMenu}
                onMouseEnter={handleMobileLinkHover}
                onMouseLeave={handleMobileLinkLeave}
                data-theme="mobile-menu-link"
              >
                Thông tin cá nhân
              </Link>
              {user.Role === "admin" && (
                <Link
                  to="/admin"
                  style={mobileMenuLinkStyle}
                  onClick={closeMobileMenu}
                  onMouseEnter={handleMobileLinkHover}
                  onMouseLeave={handleMobileLinkLeave}
                  data-theme="mobile-menu-link"
                >
                  Quản trị
                </Link>
              )}
              <button
                onClick={handleLogout}
                style={{
                  ...mobileMenuLinkStyle,
                  width: "100%",
                  textAlign: "left",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={handleAuthButtonHover}
                onMouseLeave={handleAuthButtonLeave}
                data-theme="mobile-menu-link"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={mobileMenuLinkStyle}
                onClick={closeMobileMenu}
                onMouseEnter={handleMobileLinkHover}
                onMouseLeave={handleMobileLinkLeave}
                data-theme="mobile-menu-link"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                style={mobileMenuLinkStyle}
                onClick={closeMobileMenu}
                onMouseEnter={handleMobileLinkHover}
                onMouseLeave={handleMobileLinkLeave}
                data-theme="mobile-menu-link"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          style={overlayStyle}
          onClick={toggleMobileMenu}
          data-theme="overlay"
        ></div>
      )}
    </header>
  );
};

export default Header;
