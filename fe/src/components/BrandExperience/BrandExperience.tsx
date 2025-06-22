import React from 'react';
import { Button } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import styles from './BrandExperience.module.scss';

const BrandExperience: React.FC = () => {
  return (
    <section className={styles.brandExperience}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.videoSection}>
            <div className={styles.videoWrapper}>
              <video
                className={styles.video}
                poster="/images/brand-video-poster.jpg"
                controls
                autoPlay={true}
                muted={true}
              >
                <source src="/video/intro_2.mp4" type="video/mp4" />
              </video>
              <div className={styles.playButton}>
                {/* <PlayCircleOutlined /> */}
              </div>
            </div>
          </div>
          
          <div className={styles.infoSection}>
            <h2 className={styles.title}>TRẢI NGHIỆM THƯƠNG HIỆU</h2>
            <p className={styles.description}>
              BMW - Thương hiệu xe hơi Đức nổi tiếng với những chiếc xe sang trọng, 
              hiệu suất cao và công nghệ tiên tiến. Với hơn 100 năm lịch sử, 
              BMW đã trở thành biểu tượng của sự đổi mới và chất lượng.
            </p>
            
            <div className={styles.values}>
              <div className={styles.valueItem}>
                <h3>Đổi mới</h3>
                <p>Luôn tiên phong trong công nghệ và thiết kế</p>
              </div>
              <div className={styles.valueItem}>
                <h3>Chất lượng</h3>
                <p>Cam kết về độ bền và độ tin cậy</p>
              </div>
              <div className={styles.valueItem}>
                <h3>Hiệu suất</h3>
                <p>Trải nghiệm lái xe đẳng cấp</p>
              </div>
            </div>
            
            <Button type="primary" size="large" className={styles.learnMoreButton}>
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandExperience; 