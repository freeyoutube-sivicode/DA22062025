import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useFavorites } from "../../contexts/FavoritesContext";
import { FaShoppingCart, FaBars, FaTimes, FaHeart } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// Hàm chuyển hex sang rgba
function hexToRgba(hex: string, alpha: number) {
  let c = hex.replace("#", "");
  if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  if (c.length !== 6) return hex;
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const { favoritesCount } = useFavorites();
  const location = useLocation();
  const cartState = useSelector((state: RootState) => state.cart);
  const cart = cartState.cart;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSticky, setIsSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFavoritesHovered, setIsFavoritesHovered] = useState(false);
  const mainBarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleFavoritesHover = () => {
    setIsFavoritesHovered(true);
  };

  const handleFavoritesLeave = () => {
    setIsFavoritesHovered(false);
  };

  // Modern CSS-in-JS Styles
  const headerStyle: React.CSSProperties = {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    width: "100%",
    background: "transparent",
    pointerEvents: "auto",
  };

  const authBarStyle: React.CSSProperties = {
    background: `linear-gradient(90deg, ${hexToRgba(theme.colors.palette.primaryDark, 0.16)} 0%, ${hexToRgba(theme.colors.palette.primary, 0.16)} 50%, ${hexToRgba(theme.colors.palette.primaryLight, 0.16)} 100%)`,
    color: "#ffffff",
    padding: "5px 0",
    fontSize: "15px",
    width: "100%",
    display: "block",
    backdropFilter: "blur(32px)",
    WebkitBackdropFilter: "blur(32px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  };

  const authContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  };

  const authLinksStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  const authLinkStyle: React.CSSProperties = {
    color: "#ffffff",
    textDecoration: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    transition: "all 0.3s ease",
    fontSize: "15px",
    fontWeight: 500,
  };

  const authButtonStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    border: "none",
    color: "#ffffff",
    cursor: "pointer",
    padding: "6px 12px",
    borderRadius: "6px",
    transition: "all 0.3s ease",
    fontSize: "15px",
    fontWeight: 500,
  };

  const mainBarStyle: React.CSSProperties = {
    background: isSticky
      ? "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.04) 100%)"
      : "linear-gradient(90deg, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.06) 100%)",
    backdropFilter: isSticky ? "blur(48px)" : "blur(40px)",
    WebkitBackdropFilter: isSticky ? "blur(48px)" : "blur(40px)",
    padding: "10px 0",
    width: "100%",
    borderBottom: isSticky
      ? "1px solid rgba(0, 0, 0, 0.06)"
      : "1px solid rgba(0, 0, 0, 0.08)",
    boxShadow: isSticky
      ? "0 12px 40px rgba(0, 0, 0, 0.08)"
      : "0 8px 32px rgba(0, 0, 0, 0.12)",
    display: "block",
    position: isSticky ? "fixed" : "relative",
    top: isSticky ? 0 : "auto",
    zIndex: isSticky ? 1000 : "auto",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const rowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    width: "100%",
    minHeight: "48px",
  };

  const logoStyle: React.CSSProperties = {
    height: "40px",
    width: "auto",
    flexShrink: 0,
    display: "block",
  };

  const navStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexShrink: 0,
    justifyContent: "center",
    flex: 1,
    margin: "0 20px",
    minHeight: "48px",
  };

  const navLinkStyle: React.CSSProperties = {
    color: theme.colors.text.primary,
    textDecoration: "none",
    fontWeight: 600,
    padding: "12px 20px",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    fontSize: "16px",
    whiteSpace: "nowrap",
    flexShrink: 0,
    textAlign: "center",
    minWidth: "fit-content",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "48px",
    position: "relative",
  };

  const favoritesLinkStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    color: "#ff4757",
    textDecoration: "none",
    fontSize: "18px",
    padding: "10px",
    borderRadius: "10px",
    transition: "all 0.3s ease",
    backgroundColor: isFavoritesHovered
      ? "rgba(255, 71, 87, 0.15)"
      : "rgba(255, 255, 255, 0.1)",
    marginRight: "15px",
    boxShadow: isFavoritesHovered
      ? "0 4px 15px rgba(255, 71, 87, 0.2)"
      : "0 2px 8px rgba(0, 0, 0, 0.1)",
    transform: isFavoritesHovered ? "scale(1.05)" : "scale(1)",
  };

  const favoritesCountStyle: React.CSSProperties = {
    position: "absolute",
    top: "-6px",
    right: "-6px",
    backgroundColor: "#ff4757",
    color: "#ffffff",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    fontSize: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    boxShadow: "0 2px 6px rgba(255, 71, 87, 0.3)",
  };

  const cartLinkStyle: React.CSSProperties = {
    position: "relative",
    color: theme.colors.text.primary,
    fontSize: "18px",
    padding: "8px",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    flexShrink: 0,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  };

  const mobileMenuButtonStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    border: "none",
    color: theme.colors.text.primary,
    fontSize: "20px",
    cursor: "pointer",
    padding: "8px",
    display: "none",
  };

  const mobileMenuStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    right: isMobileMenuOpen ? 0 : "-100%",
    width: "280px",
    height: "100vh",
    backgroundColor: "#ffffff",
    borderLeft: "1px solid rgba(0, 0, 0, 0.1)",
    transition: "right 0.3s ease",
    zIndex: 1001,
    display: "flex",
    flexDirection: "column",
    boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.1)",
  };

  const mobileMenuHeaderStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    padding: "16px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  };

  const mobileMenuCloseStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    border: "none",
    color: theme.colors.text.primary,
    fontSize: "20px",
    cursor: "pointer",
    padding: "8px",
  };

  const mobileMenuNavStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    padding: "16px 0",
    flex: 1,
  };

  const mobileMenuLinkStyle: React.CSSProperties = {
    color: theme.colors.text.primary,
    textDecoration: "none",
    padding: "16px 20px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    fontSize: "16px",
    fontWeight: 500,
  };

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    opacity: isMobileMenuOpen ? 1 : 0,
    visibility: isMobileMenuOpen ? "visible" : "hidden",
    transition: "all 0.3s ease",
  };

  // Responsive styles
  const getResponsiveStyles = () => {
    if (windowWidth <= 768) {
      return {
        navStyle: { ...navStyle, display: "none" },
        mobileMenuButtonStyle: { ...mobileMenuButtonStyle, display: "block" },
      };
    }
    return {
      navStyle,
      mobileMenuButtonStyle,
    };
  };

  const responsiveStyles = getResponsiveStyles();

  // Event handlers
  const handleAuthLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
  };

  const handleAuthLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
  };

  const handleAuthButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
  };

  const handleAuthButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
  };

  const handleNavLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = theme.colors.palette.primary;
    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
  };

  const handleNavLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = theme.colors.text.primary;
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  };

  const handleCartHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    e.currentTarget.style.color = theme.colors.palette.primary;
    e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.2)";
  };

  const handleCartLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    e.currentTarget.style.color = theme.colors.text.primary;
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    e.currentTarget.style.boxShadow = "none";
  };

  const handleMobileLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
    e.currentTarget.style.color = theme.colors.palette.primary;
  };

  const handleMobileLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = theme.colors.text.primary;
  };

  return (
    <div style={headerStyle}>
      {/* AUTH BAR: ẩn/hiện mượt mà */}
      <div
        style={{
          ...authBarStyle,
          opacity: isSticky ? 0 : 1,
          transform: isSticky ? "translateY(-100%)" : "translateY(0)",
          pointerEvents: isSticky ? "none" : "auto",
          height: isSticky ? 0 : "auto",
          overflow: "hidden",
        }}
        data-theme="auth-bar"
      >
        <div style={containerStyle}>
          <div style={authContainerStyle}>
            <div style={authLinksStyle}>
              {user ? (
                <>
                  <Link
                    to="/profile"
                    style={authLinkStyle}
                    onMouseEnter={handleAuthLinkHover}
                    onMouseLeave={handleAuthLinkLeave}
                  >
                    Thông tin cá nhân
                  </Link>
                  {user.Role === "admin" && (
                    <Link
                      to="/admin"
                      style={authLinkStyle}
                      onMouseEnter={handleAuthLinkHover}
                      onMouseLeave={handleAuthLinkLeave}
                    >
                      Quản trị
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    style={authButtonStyle}
                    onMouseEnter={handleAuthButtonHover}
                    onMouseLeave={handleAuthButtonLeave}
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    style={authLinkStyle}
                    onMouseEnter={handleAuthLinkHover}
                    onMouseLeave={handleAuthLinkLeave}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    style={authLinkStyle}
                    onMouseEnter={handleAuthLinkHover}
                    onMouseLeave={handleAuthLinkLeave}
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div ref={mainBarRef} style={mainBarStyle} data-theme="main-bar">
        <div style={containerStyle}>
          <div style={rowStyle}>
            <Link to="/" onClick={closeMobileMenu}>
              <img
                src="./images/BMW_logo_(gray).svg.png"
                alt="Logo"
                style={logoStyle}
              />
            </Link>

            <nav style={responsiveStyles.navStyle}>
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

            {/* Favorites Link */}
            <Link
              to="/cart"
              style={favoritesLinkStyle}
              onClick={closeMobileMenu}
              onMouseEnter={handleFavoritesHover}
              onMouseLeave={handleFavoritesLeave}
              data-theme="favorites-link"
            >
              <FaHeart />
              {favoritesCount > 0 && (
                <span style={favoritesCountStyle} data-theme="favorites-count">
                  {favoritesCount > 99 ? "99+" : favoritesCount}
                </span>
              )}
            </Link>

            <button
              style={responsiveStyles.mobileMenuButtonStyle}
              onClick={toggleMobileMenu}
            >
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
            borderTop: `1px solid rgba(0, 0, 0, 0.1)`,
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
    </div>
  );
};

export default Header;
