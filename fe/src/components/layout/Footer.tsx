import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const Footer: React.FC = () => {
  const { theme } = useTheme();

  const footerStyle: React.CSSProperties = {
    backgroundColor: theme.colors.palette.secondary,
    color: theme.colors.text.white,
    transition: "all 0.3s ease",
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "3rem 1rem 1rem",
  };

  const contentStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
    marginBottom: "2rem",
  };

  const titleStyle: React.CSSProperties = {
    color: theme.colors.text.white,
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "1rem",
  };

  const descriptionStyle: React.CSSProperties = {
    color: theme.colors.text.white,
    opacity: 0.8,
    lineHeight: "1.6",
    marginBottom: "1rem",
  };

  const listStyle: React.CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: 0,
  };

  const linkStyle: React.CSSProperties = {
    color: theme.colors.text.white,
    textDecoration: "none",
    opacity: 0.8,
    transition: "all 0.3s ease",
    display: "block",
    padding: "0.25rem 0",
  };

  const contactStyle: React.CSSProperties = {
    color: theme.colors.text.white,
    opacity: 0.8,
    marginBottom: "0.5rem",
    lineHeight: "1.6",
  };

  const socialStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };

  const bottomStyle: React.CSSProperties = {
    borderTop: `1px solid ${theme.colors.surface.border}`,
    paddingTop: "1rem",
    marginTop: "2rem",
    textAlign: "center",
  };

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = theme.colors.palette.primaryLight;
    e.currentTarget.style.opacity = "1";
  };

  const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = theme.colors.text.white;
    e.currentTarget.style.opacity = "0.8";
  };

  return (
    <footer className="footer" style={footerStyle} data-theme="footer">
      <div className="footer__container" style={containerStyle}>
        <div className="footer__content" style={contentStyle}>
          <div className="footer__column">
            <h3 className="footer__title" style={titleStyle}>
              BMW SiVi CAR
            </h3>
            <p className="footer__description" style={descriptionStyle}>
              Dịch vụ bán xe BMW chất lượng cao với dịch vụ tư vấn chuyên nghiệp
              và giá cả hợp lý.
            </p>
          </div>

          <div className="footer__column">
            <h3 className="footer__title" style={titleStyle}>
              Liên kết
            </h3>
            <ul className="footer__list" style={listStyle}>
              <li>
                <Link
                  to="/"
                  className="footer__link"
                  style={linkStyle}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                  data-theme="footer-link"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/san-pham"
                  className="footer__link"
                  style={linkStyle}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                  data-theme="footer-link"
                >
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  to="/dich-vu"
                  className="footer__link"
                  style={linkStyle}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                  data-theme="footer-link"
                >
                  Dịch vụ
                </Link>
              </li>
              <li>
                <Link
                  to="/bang-gia"
                  className="footer__link"
                  style={linkStyle}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                  data-theme="footer-link"
                >
                  Bảng giá
                </Link>
              </li>
              <li>
                <Link
                  to="/tin-tuc"
                  className="footer__link"
                  style={linkStyle}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                  data-theme="footer-link"
                >
                  Tin tức
                </Link>
              </li>
              <li>
                <Link
                  to="/dat-hen-lai-thu"
                  className="footer__link"
                  style={linkStyle}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                  data-theme="footer-link"
                >
                  Đăng ký lái thử
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer__column">
            <h3 className="footer__title" style={titleStyle}>
              Liên hệ
            </h3>
            <ul className="footer__list" style={listStyle}>
              <li className="footer__contact-item" style={contactStyle}>
                Email: bmw@sivicode.com
              </li>
              <li className="footer__contact-item" style={contactStyle}>
                Điện thoại: (84) 123-456-789
              </li>
              <li className="footer__contact-item" style={contactStyle}>
                Địa chỉ: 123 Đường BMW, Quận 1, TP. HCM
              </li>
            </ul>
          </div>

          <div className="footer__column">
            <h3 className="footer__title" style={titleStyle}>
              Theo dõi chúng tôi
            </h3>
            <div className="footer__social" style={socialStyle}>
              <a
                href="#"
                className="footer__social-link"
                style={linkStyle}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkLeave}
                data-theme="footer-link"
              >
                Facebook
              </a>
              <a
                href="#"
                className="footer__social-link"
                style={linkStyle}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkLeave}
                data-theme="footer-link"
              >
                Twitter
              </a>
              <a
                href="#"
                className="footer__social-link"
                style={linkStyle}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkLeave}
                data-theme="footer-link"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom" style={bottomStyle}>
          <p style={{ color: theme.colors.text.white, opacity: 0.8 }}>
            &copy; {new Date().getFullYear()} BMW SiVi CAR - Sản phẩm thuộc về
            SiVi CODE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
