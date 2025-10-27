// src/pages/StockPage.jsx
import React from "react";
import "../GlobalStyles.css"; // ✅ تأكد إن الملف موجود في src

const StockPage = ({ onSelectStockSection }) => {
  // أقسام المخزن
  const stockSections = [
    { id: "main", title: "المخزن العام", icon: "🏪" },
    { id: "out", title: "الصادر من المخزن", icon: "📤" },
    { id: "in", title: "الوارد إلى المخزن", icon: "📥" },
  ];

  return (
    <div className="factory-page">
      <h1 className="page-title">قسم المخزن</h1>

      <div className="cards-container">
        {stockSections.map((section) => (
          <div
            key={section.id}
            className="section-card"
            onClick={() => onSelectStockSection(section.id)}
          >
            <div className="icon">{section.icon}</div>
            <h3>{section.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockPage;
