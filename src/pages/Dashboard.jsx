import React from "react";
import "./Dashboard.css";

const Dashboard = ({ onSelectSection }) => {
  const sections = [
    { id: "store", name: "المخزن", icon: "🏭" },
    { id: "production", name: "الإنتاج", icon: "⚙️" },
    { id: "employees", name: "الموظفين", icon: "👷‍♂️" },
    { id: "maintenance", name: "الصيانة", icon: "🧹" },
    { id: "purchases", name: "المشتريات", icon: "🛒" },
    { id: "shops", name: "المحلات", icon: "🏪" },
  ];

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">نظام إدارة مصنع الحلويات 🍰</h1>

      <div className="cards-container">
        {sections.map((section) => (
          <div
            key={section.id}
            className="section-card"
            onClick={() => onSelectSection(section.id)} // ✅ استخدم id بدل name
          >
            <div className="icon">{section.icon}</div>
            <h2>{section.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
