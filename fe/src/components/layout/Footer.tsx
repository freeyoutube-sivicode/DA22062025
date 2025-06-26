import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaCar,
  FaTools,
  FaShieldAlt,
  FaCalculator,
  FaCalendarAlt,
} from "react-icons/fa";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.bmwFooterContainer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          {/* Company Information */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerMainTitle}>BMW SiVi CAR</h3>
            <p className={styles.footerDescription}>
              Đại lý BMW chính hãng hàng đầu tại Việt Nam, chuyên cung cấp xe
              BMW mới 100% với dịch vụ bảo hành, bảo dưỡng chính hãng. Trải
              nghiệm đẳng cấp Đức với đội ngũ tư vấn chuyên nghiệp và giá cả
              cạnh tranh.
            </p>

            <div className={styles.footerSocial}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialLink}
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialLink}
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialLink}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* BMW Models */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>TÌM HIỂU VỀ BMW</h4>
            <div className={styles.footerList}>
              <Link to="/bmw-xtra" className={styles.footerLink}>
                <FaCar className={styles.linkIcon} />
                BMW Xtra
              </Link>
              <Link to="/bmw-m" className={styles.footerLink}>
                <FaCar className={styles.linkIcon} />
                BMW M
              </Link>
              <Link to="/bmw-i" className={styles.footerLink}>
                <FaCar className={styles.linkIcon} />
                BMW i
              </Link>
              <Link to="/bmw-motorrad" className={styles.footerLink}>
                <FaCar className={styles.linkIcon} />
                BMW Motorrad
              </Link>
              <Link to="/bmw-m-performance" className={styles.footerLink}>
                <FaCar className={styles.linkIcon} />
                BMW M Performance
              </Link>
            </div>
          </div>

          {/* Products */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>SẢN PHẨM</h4>
            <div className={styles.footerList}>
              <Link to="/san-pham/sedan" className={styles.footerLink}>
                <FaCar className={styles.linkIcon} />
                Sedan
              </Link>
              <Link to="/san-pham/suv" className={styles.footerLink}>
                <FaCar className={styles.linkIcon} />
                SUV
              </Link>
              <Link to="/san-pham/coupe" className={styles.footerLink}>
                <FaCar className={styles.linkIcon} />
                Coupe
              </Link>
              <Link to="/san-pham/gran-coupe" className={styles.footerLink}>
                <FaCar className={styles.linkIcon} />
                Gran Coupe
              </Link>
              <Link to="/san-pham/gran-turismo" className={styles.footerLink}>
                <FaCar className={styles.linkIcon} />
                Gran Turismo
              </Link>
            </div>
          </div>

          {/* Services & Utilities */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>DỊCH VỤ & TIỆN ÍCH</h4>
            <div className={styles.footerList}>
              <Link to="/services" className={styles.footerLink}>
                <FaTools className={styles.linkIcon} />
                Bảo hành & Bảo dưỡng
              </Link>
              <Link to="/services" className={styles.footerLink}>
                <FaShieldAlt className={styles.linkIcon} />
                Sửa chữa & Phụ tùng
              </Link>
              <Link to="/bang-gia" className={styles.footerLink}>
                <FaCalculator className={styles.linkIcon} />
                Bảng giá chi tiết
              </Link>
              <Link to="/dat-lich-hen" className={styles.footerLink}>
                <FaCalendarAlt className={styles.linkIcon} />
                Đặt lịch hẹn
              </Link>
              <Link to="/test-drive" className={styles.footerLink}>
                <FaCar className={styles.linkIcon} />
                Đặt lịch lái thử
              </Link>
              <Link to="/tinh-toan-tra-gop" className={styles.footerLink}>
                <FaCalculator className={styles.linkIcon} />
                Tính toán trả góp
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Section - Moved to bottom */}
        <div className={styles.footerContactSection}>
          <h4 className={styles.footerTitle}>LIÊN HỆ VỚI CHÚNG TÔI</h4>
          <div className={styles.contactGrid}>
            <div className={styles.footerContactItem}>
              <FaPhone className={styles.footerIcon} />
              <div>
                <span className={styles.contactLabel}>Hotline:</span>
                <span className={styles.contactValue}>1800 8123</span>
              </div>
            </div>
            <div className={styles.footerContactItem}>
              <FaEnvelope className={styles.footerIcon} />
              <div>
                <span className={styles.contactLabel}>Email:</span>
                <span className={styles.contactValue}>sivicode@gmail.com</span>
              </div>
            </div>
            <div className={styles.footerContactItem}>
              <FaMapMarkerAlt className={styles.footerIcon} />
              <div>
                <span className={styles.contactLabel}>Địa chỉ:</span>
                <span className={styles.contactValue}>
                  123 Nguyễn Văn Linh, Quận Hải Châu, TP. Đà Nẵng
                </span>
              </div>
            </div>
            <div className={styles.footerContactItem}>
              <FaClock className={styles.footerIcon} />
              <div>
                <span className={styles.contactLabel}>Giờ làm việc:</span>
                <span className={styles.contactValue}>
                  8:00 - 18:00 (Thứ 2 - Thứ 7)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.footerBottom}>
          <div className={styles.footerBottomContent}>
            <p className={styles.copyright}>
              © {currentYear} BMW SiVi CAR - Sản phẩm thuộc về SiVi CODE
            </p>
            <div className={styles.footerLegal}>
              <Link to="/privacy" className={styles.legalLink}>
                Chính Sách Bảo Mật
              </Link>
              <span className={styles.separator}>|</span>
              <Link to="/terms" className={styles.legalLink}>
                Điều Khoản Sử Dụng
              </Link>
              <span className={styles.separator}>|</span>
              <Link to="/sitemap" className={styles.legalLink}>
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
