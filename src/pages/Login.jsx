import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // بيانات مؤقتة لتجربة الدخول
    if (username === "admin" && password === "1234") {
      setError("");
      onLogin(); // بعدين هنوصلها بالنظام
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة ❌");
    }
  };

  return (
    <div className="login-page">
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
    </div>
  );
};

export default Login;
