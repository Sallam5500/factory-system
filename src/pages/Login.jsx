// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👉 الاستدعاء
import "../GlobalStyles.css"; // التنسيقات العامة

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 👉 استخدم النافيجيشن

  const handleLogin = (e) => {
    e.preventDefault();

    // تقدر تحط هنا تحقق من بيانات المستخدم
    if (username === "admin" && password === "1234") {
      // لو البيانات صح ودي المستخدم على صفحة الهوم
      navigate("/home");
    } else {
      alert("⚠️ اسم المستخدم أو كلمة السر غير صحيحة");
    }
  };

  return (
    <div className="login-page">
      <h2 className="page-title">تسجيل الدخول</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-row">
          <label>اسم المستخدم:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label>كلمة السر:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          تسجيل الدخول
        </button>
      </form>
    </div>
  );
};

export default Login;
