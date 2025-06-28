import React, { useState } from "react";
import { Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import styles from "./BrandExperience.module.scss";

const BrandExperience: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className={styles.brandExperience}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.videoSection}>
            <div className={styles.videoContainer}>
              <video
                className={styles.video}
                poster="/images/brand-video-poster.jpg"
                controls
                autoPlay={true}
                muted={true}
              >
                <source src="/video/intro_2.mp4" type="video/mp4" />
              </video>
              <div className={styles.playIcon}>
                <PlayCircleOutlined />
              </div>
            </div>
          </div>

          <div className={styles.textSection}>
            <h2 className={styles.title}>TRẢI NGHIỆM THƯƠNG HIỆU</h2>
            <p className={styles.description}>
              BMW - Thương hiệu xe hơi Đức nổi tiếng với những chiếc xe sang
              trọng, hiệu suất cao và công nghệ tiên tiến. Với hơn 100 năm lịch
              sử, BMW đã trở thành biểu tượng của sự đổi mới và chất lượng.
            </p>

            <div className={styles.cardsGrid}>
              <div
                className={`${styles.card} ${hoveredCard === "innovation" ? styles.hovered : ""}`}
                onMouseEnter={() => setHoveredCard("innovation")}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h3 className={styles.cardTitle}>Công nghệ tiên tiến</h3>
                <p className={styles.cardDescription}>
                  Tích hợp AI, tự động lái và kết nối thông minh
                </p>
              </div>
              <div
                className={`${styles.card} ${hoveredCard === "quality" ? styles.hovered : ""}`}
                onMouseEnter={() => setHoveredCard("quality")}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h3 className={styles.cardTitle}>Thiết kế đẳng cấp</h3>
                <p className={styles.cardDescription}>
                  Ngoại thất thể thao, nội thất sang trọng
                </p>
              </div>
              <div
                className={`${styles.card} ${hoveredCard === "performance" ? styles.hovered : ""}`}
                onMouseEnter={() => setHoveredCard("performance")}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h3 className={styles.cardTitle}>Hiệu suất vượt trội</h3>
                <p className={styles.cardDescription}>
                  Động cơ mạnh mẽ, xử lý chính xác
                </p>
              </div>
              <div
                className={`${styles.card} ${hoveredCard === "safety" ? styles.hovered : ""}`}
                onMouseEnter={() => setHoveredCard("safety")}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h3 className={styles.cardTitle}>An toàn tối ưu</h3>
                <p className={styles.cardDescription}>
                  Hệ thống bảo vệ toàn diện, 5 sao Euro NCAP
                </p>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <Button type="primary" size="large" className={styles.ctaButton}>
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandExperience;
