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
  );
}

export default App;
