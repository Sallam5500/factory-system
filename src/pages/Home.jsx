import React from "react";
import { useNavigate } from "react-router-dom";
import "../GlobalStyles.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="factory-page">
      <h1 className="page-title text-center">مرحبًا بكم في نظام إدارة المصنع 🍰</h1>

      <div className="cards-container">
        <div className="home-card" onClick={() => navigate("/stock")}>
          المخزن
        </div>
        <div className="home-card" onClick={() => navigate("/factory")}>
          المصنع
        </div>
        <div className="home-card" onClick={() => navigate("/shops")}>
          المحلات
        </div>
        <div className="home-card" onClick={() => navigate("/cleaning")}>
          النظافة والصيانة
        </div>
        <div className="home-card" onClick={() => navigate("/items")}>
          إدارة الأصناف
        </div>
      </div>
    </div>
  );
};

export default Home;
