import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../api/types";
import { formatCurrency } from "../../utils/format";
import { FaTachometerAlt, FaGasPump, FaCog, FaHeart } from "react-icons/fa";
import { ROUTERS } from "../../utils/constant";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Responsive breakpoints
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleViewDetail = () => {
    navigate(`${ROUTERS.USER.CARS}/${product._id}`);
  };

  const handleRegisterTestDrive = () => {
    navigate("/dat-hen-lai-thu");
  };

  const unavailable = product.Status === "expired";

  // Responsive CSS-in-JS Styles
  const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    borderRadius: isMobile ? "12px" : "16px",
    boxShadow: isHovered
      ? "0 20px 40px rgba(0, 0, 0, 0.15)"
      : "0 8px 25px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: isHovered ? "translateY(-8px)" : "translateY(0)",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    position: "relative",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  };

  const imageContainerStyle: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    aspectRatio: "16/10",
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
  };

  const tagStyle: React.CSSProperties = {
    position: "absolute",
    top: isMobile ? "8px" : "12px",
    right: isMobile ? "8px" : "12px",
    background: "#ff4757",
    color: "#ffffff",
    padding: isMobile ? "4px 8px" : "6px 12px",
    borderRadius: "20px",
    fontSize: isMobile ? "11px" : "12px",
    fontWeight: "600",
    zIndex: 2,
  };

  const infoStyle: React.CSSProperties = {
    padding: isMobile ? "12px" : isTablet ? "16px" : "20px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: isMobile ? "14px" : isTablet ? "16px" : "18px",
    fontWeight: "600",
    color: "#1a1a1a",
    textDecoration: "none",
    marginBottom: isMobile ? "8px" : "12px",
    lineHeight: 1.3,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    transition: "color 0.3s ease",
  };

  const specsStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: isMobile ? "6px" : "8px",
    marginBottom: isMobile ? "10px" : "15px",
  };

  const specStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: isMobile ? "11px" : "12px",
    color: "#666666",
    background: "#f8f9fa",
    padding: isMobile ? "4px 6px" : "5px 8px",
    borderRadius: "12px",
    whiteSpace: "nowrap",
  };

  const priceStyle: React.CSSProperties = {
    fontSize: isMobile ? "16px" : isTablet ? "18px" : "20px",
    fontWeight: "700",
    color: "#0066B1",
    marginBottom: isMobile ? "12px" : "16px",
  };

  const actionsStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? "8px" : "10px",
    marginTop: "auto",
  };

  const detailButtonStyle: React.CSSProperties = {
    flex: 1,
    background: "transparent",
    border: "2px solid #0066B1",
    color: "#0066B1",
    padding: isMobile ? "8px 12px" : "10px 16px",
    borderRadius: "8px",
    fontSize: isMobile ? "13px" : "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textDecoration: "none",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const testDriveButtonStyle: React.CSSProperties = {
    flex: 1,
    background: unavailable ? "#cccccc" : "#0066B1",
    border: "none",
    color: "#ffffff",
    padding: isMobile ? "8px 12px" : "10px 16px",
    borderRadius: "8px",
    fontSize: isMobile ? "13px" : "14px",
    fontWeight: "600",
    cursor: unavailable ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    opacity: unavailable ? 0.6 : 1,
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDetailHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = "#0066B1";
    e.currentTarget.style.color = "#ffffff";
  };

  const handleDetailLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.color = "#0066B1";
  };

  const handleTestDriveHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!unavailable) {
      e.currentTarget.style.background = "#005599";
      e.currentTarget.style.transform = "translateY(-1px)";
    }
  };

  const handleTestDriveLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = unavailable ? "#cccccc" : "#0066B1";
    e.currentTarget.style.transform = "translateY(0)";
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={imageContainerStyle}>
        <Link to={`/xe/${product._id}`}>
          <img
            src={product.Main_Image}
            alt={product.Product_Name}
            style={imageStyle}
          />
          {unavailable && <div style={tagStyle}>Hết hàng</div>}
        </Link>
      </div>

      <div style={infoStyle}>
        <Link
          to={`/xe/${product._id}`}
          style={titleStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#0066B1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#1a1a1a";
          }}
        >
          {product.Product_Name}
        </Link>

        <div style={specsStyle}>
          <span style={specStyle}>
            <FaTachometerAlt size={isMobile ? 10 : 12} />
            300 HP
          </span>
          <span style={specStyle}>
            <FaGasPump size={isMobile ? 10 : 12} />
            Xăng
          </span>
          <span style={specStyle}>
            <FaCog size={isMobile ? 10 : 12} />
            Tự động
          </span>
        </div>

        <div style={priceStyle}>{formatCurrency(product.Price)}</div>

        <div style={actionsStyle}>
          <Link
            to={`/xe/${product._id}`}
            style={detailButtonStyle}
            onClick={handleViewDetail}
            onMouseEnter={handleDetailHover}
            onMouseLeave={handleDetailLeave}
          >
            Xem chi tiết
          </Link>
          <button
            style={testDriveButtonStyle}
            onClick={handleRegisterTestDrive}
            disabled={unavailable}
            onMouseEnter={handleTestDriveHover}
            onMouseLeave={handleTestDriveLeave}
          >
            Đăng Ký Lái Thử
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
