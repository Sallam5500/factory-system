<<<<<<< HEAD
// src/App.jsx
import React, { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StockPage from "./pages/StockPage";
import { FaArrowLeft } from "react-icons/fa";
import "./GlobalStyles.css";

// الصفحات الفرعية
import MainStoreModule from "./pages/MainStore";
import IssuePageModule from "./pages/IssuePage";
import IncomingPageModule from "./pages/IncomingPage"; // الوارد

// fallback لو الملفات مش موجودة
const MainStore = MainStoreModule
  ? MainStoreModule
  : () => (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>MainStore غير موجود 🚨</h2>
      </div>
    );

const IssuePage = IssuePageModule
  ? IssuePageModule
  : () => (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>IssuePage غير موجود 🚨</h2>
      </div>
    );

const IncomingPage = IncomingPageModule
  ? IncomingPageModule
  : () => (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>IncomingPage غير موجود 🚨</h2>
      </div>
    );

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedStockSection, setSelectedStockSection] = useState(null);

  // تسجيل الدخول
  const handleLogin = () => setIsLoggedIn(true);

  // اختيار قسم من الـ Dashboard
  const handleSelectSection = (sectionId) => setSelectedSection(sectionId);

  // اختيار قسم من المخزن
  const handleSelectStockSection = (sectionId) =>
    setSelectedStockSection(sectionId);

  // زر الرجوع
  const handleBack = () => {
    if (selectedStockSection) setSelectedStockSection(null);
    else if (selectedSection) setSelectedSection(null);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          {/* زر الرجوع */}
          {(selectedSection || selectedStockSection) && (
            <button className="back-button" onClick={handleBack}>
              <FaArrowLeft className="back-icon" />
              رجوع
            </button>
          )}

          {/* عرض الصفحات حسب الاختيار */}
          {!selectedSection ? (
            <Dashboard onSelectSection={handleSelectSection} />
          ) : selectedSection === "store" ? (
            !selectedStockSection ? (
              <StockPage onSelectStockSection={handleSelectStockSection} />
            ) : selectedStockSection === "main" ? (
              <MainStore />
            ) : selectedStockSection === "out" ? (
              <IssuePage />
            ) : selectedStockSection === "in" ? (
              <IncomingPage />
            ) : (
              <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>تم اختيار: {selectedStockSection} ✅</h2>
              </div>
            )
          ) : (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <h2>تم اختيار قسم: {selectedSection} ✅</h2>
            </div>
          )}
        </>
      )}
    </div>
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import StockPage from "./pages/StockPage";
import ItemsPage from "./pages/ItemsPage"; // ✅ استيراد صفحة الأصناف

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/stock" element={<StockPage />} />
        <Route path="/items" element={<ItemsPage />} /> {/* ✅ Route للأصناف */}
      </Routes>
    </Router>
>>>>>>> 350325d8e15b32a7db7a380c842fdc5ef847a422
  );
}

export default App;
