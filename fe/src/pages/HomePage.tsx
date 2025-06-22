import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import FeaturedModels from '../components/FeaturedModels/FeaturedModels';
import BrandExperience from '../components/BrandExperience/BrandExperience';
import styles from './HomePage.module.scss';

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <HeroSection />
      <FeaturedModels />
      <BrandExperience />
    </div>
  );
};

export default HomePage; 