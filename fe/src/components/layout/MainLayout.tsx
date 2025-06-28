import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Header from "./Header";
import Footer from "./Footer";
import ThemeController from "../ThemeController";
import ThemeWrapper from "./ThemeWrapper";

const MainLayout: React.FC = () => {
  const { user } = useAuth();

  // Simple layout structure - let ThemeWrapper handle all theme styling
  const layoutStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
  };

  const mainContentStyle: React.CSSProperties = {
    flex: 1,
    width: "100%",
    margin: 0,
    padding: 0,
  };

  return (
    <ThemeWrapper>
      <div style={layoutStyle}>
        <Header />
        <main style={mainContentStyle}>
          <Outlet />
        </main>
        <Footer />
        <ThemeController />
      </div>
    </ThemeWrapper>
  );
};

export default MainLayout;
