import React from 'react';
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './HeroSection.module.scss';

const HeroSection: React.FC = () => {
  return (
    <div className={styles.heroSection}>
      <video
        className={styles.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
      >
        <source src="/video/intro.mp4" type="video/mp4" />
      </video>
      
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>LUXURY IN MOTION</h1>
        <p className={styles.heroSubtitle}>Khám phá thế giới BMW</p>
        
        <div className={styles.heroSearch}>
          <Input
            size="large"
            placeholder="Tìm kiếm model, giá, hoặc tính năng..."
            prefix={<SearchOutlined />}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.heroButtons}>
          <Button type="primary" size="large" className={styles.primaryButton}>
            Khám phá ngay
          </Button>
          <Button size="large" onClick={() => window.location.href = '/dat-hen-lai-thu'} className={styles.secondaryButton}>
            Đặt lịch lái thử
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 