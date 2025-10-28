<<<<<<< HEAD
import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
=======
// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👉 الاستدعاء
import "../GlobalStyles.css"; // التنسيقات العامة

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 👉 استخدم النافيجيشن
>>>>>>> 350325d8e15b32a7db7a380c842fdc5ef847a422

  const handleLogin = (e) => {
    e.preventDefault();

<<<<<<< HEAD
    // بيانات مؤقتة لتجربة الدخول
    if (username === "admin" && password === "1234") {
      setError("");
      onLogin(); // بعدين هنوصلها بالنظام
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة ❌");
=======
    // تقدر تحط هنا تحقق من بيانات المستخدم
    if (username === "admin" && password === "1234") {
      // لو البيانات صح ودي المستخدم على صفحة الهوم
      navigate("/home");
    } else {
      alert("⚠️ اسم المستخدم أو كلمة السر غير صحيحة");
>>>>>>> 350325d8e15b32a7db7a380c842fdc5ef847a422
    }
  };

  return (
    <div className="login-page">
<<<<<<< HEAD
      <div className="login-card">
        <h2>تسجيل الدخول</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="اسم المستخدم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">دخول</button>
        </form>
      </div>
=======
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
>>>>>>> 350325d8e15b32a7db7a380c842fdc5ef847a422
    </div>
  );
};

export default Login;
