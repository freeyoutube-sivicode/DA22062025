import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import styles from "./Footer.module.scss"; // Import SCSS module

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          {/* Contact Column */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>LIÊN HỆ VỚI CHÚNG TÔI</h4>
            <div className={styles.footerContactItem}>
              <FaPhone className={styles.footerIcon} />
              <span>Hotline: 1800 8123</span>
            </div>
            <div className={styles.footerContactItem}>
              <FaEnvelope className={styles.footerIcon} />
              <span>Email: info@bmw.com.vn</span>
            </div>
            <div className={styles.footerContactItem}>
              <FaMapMarkerAlt className={styles.footerIcon} />
              <span>
                Trụ sở chính: Tầng 15, Tòa nhà Capital Place, 29 Liễu Giai, Ba
                Đình, Hà Nội
              </span>
            </div>
            <div className={styles.footerSocial}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialLink}
              >
                <FaFacebook />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialLink}
              >
                <FaYoutube />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialLink}
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* About Column */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>TÌM HIỂU VỀ BMW</h4>
            <div className={styles.footerList}>
              <Link to="/bmw-xtra" className={styles.footerLink}>
                BMW Xtra
              </Link>
              <Link to="/bmw-m" className={styles.footerLink}>
                BMW M
              </Link>
              <Link to="/bmw-i" className={styles.footerLink}>
                BMW i
              </Link>
              <Link to="/bmw-motorrad" className={styles.footerLink}>
                BMW Motorrad
              </Link>
              <Link to="/bmw-m-performance" className={styles.footerLink}>
                BMW M Performance
              </Link>
            </div>
          </div>

          {/* Products Column */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>SẢN PHẨM</h4>
            <div className={styles.footerList}>
              <Link to="/san-pham/sedan" className={styles.footerLink}>
                Sedan
              </Link>
              <Link to="/san-pham/suv" className={styles.footerLink}>
                SUV
              </Link>
              <Link to="/san-pham/coupe" className={styles.footerLink}>
                Coupe
              </Link>
              <Link to="/san-pham/gran-coupe" className={styles.footerLink}>
                Gran Coupe
              </Link>
              <Link to="/san-pham/gran-turismo" className={styles.footerLink}>
                Gran Turismo
              </Link>
            </div>
          </div>

          {/* Utilities Column */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>TIỆN ÍCH</h4>
            <div className={styles.footerList}>
              <Link to="/so-sach-xe" className={styles.footerLink}>
                Sổ sách xe
              </Link>
              <Link to="/bang-gia" className={styles.footerLink}>
                Bảng giá chi tiết
              </Link>
              <Link to="/dat-lich-hen" className={styles.footerLink}>
                Đặt lịch hẹn
              </Link>
              <Link to="/dat-lich-lai-thu" className={styles.footerLink}>
                Đặt lịch lái thử
              </Link>
              <Link to="/tinh-toan-tra-gop" className={styles.footerLink}>
                Tính toán trả góp
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.footerBottom}>
          © {new Date().getFullYear()} BMW Vietnam.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
