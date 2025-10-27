import React, { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StockPage from "./pages/StockPage";
import { FaArrowLeft } from "react-icons/fa";
import "./GlobalStyles.css";

// استيراد MainStore إذا موجود، وإلا عرض رسالة تحذير
import MainStoreModule from "./pages/MainStore";

const MainStore = MainStoreModule
  ? MainStoreModule
  : () => (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>MainStore غير موجود 🚨</h2>
      </div>
    );

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedStockSection, setSelectedStockSection] = useState(null);

  const handleLogin = () => setIsLoggedIn(true);
  const handleSelectSection = (sectionId) => setSelectedSection(sectionId);
  const handleSelectStockSection = (sectionId) =>
    setSelectedStockSection(sectionId);

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
  );
}

export default App;
