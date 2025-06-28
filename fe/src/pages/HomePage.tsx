import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import FeaturedModels from "../components/FeaturedModels/FeaturedModels";
import BrandExperience from "../components/BrandExperience/BrandExperience";

const HomePage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        padding: "0",
      }}
    >
      <HeroSection />
      <BrandExperience />
      <FeaturedModels />
    </div>
  );
};

export default HomePage;
