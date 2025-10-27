import React, { useState } from "react";
import "../GlobalStyles.css";

const PASSWORD = "1234"; // كلمة السر للتحكم بالتعديل والحذف
const AVAILABLE_ITEMS = ["سكر", "دقيق", "زبدة", "شوكولاتة", "كريمة"];

const MainStore = () => {
  const [items, setItems] = useState([
    { id: 1, name: "سكر", quantity: 50, unit: "كجم", lastModified: new Date() },
    { id: 2, name: "دقيق", quantity: 100, unit: "كجم", lastModified: new Date() },
    { id: 3, name: "زبدة", quantity: 3, unit: "كجم", lastModified: new Date() },
  ]);

  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState({ name: "", quantity: "", unit: "" });
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // معالجة الكتابة في حقل الاسم
  const handleNameChange = (e) => {
    const value = e.target.value;
    setNewItem({ ...newItem, name: value });

    if (value.length > 0) {
      const filtered = AVAILABLE_ITEMS.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions(AVAILABLE_ITEMS); // عرض كل العناصر لو الحقل فارغ
    }
    setDropdownOpen(true);
  };

  // اختيار صنف من القائمة
  const selectSuggestion = (name) => {
    setNewItem({ ...newItem, name });
    setDropdownOpen(false);
  };

  // إضافة صنف جديد
  const addItem = () => {
    if (!newItem.name || !newItem.quantity || !newItem.unit) return;
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    setItems([
      ...items,
      { ...newItem, id, quantity: Number(newItem.quantity), lastModified: new Date() },
    ]);

    // إضافة إلى قائمة autocomplete لو مش موجود
    if (!AVAILABLE_ITEMS.includes(newItem.name)) {
      AVAILABLE_ITEMS.push(newItem.name);
    }

    setNewItem({ name: "", quantity: "", unit: "" });
    setDropdownOpen(false);
  };

  // تعديل صنف
  const editItem = (id) => {
    const password = prompt("ادخل كلمة السر للتعديل:");
    if (password !== PASSWORD) return alert("كلمة السر خطأ!");

    const name = prompt("اسم الصنف الجديد:");
    const quantity = prompt("الكمية الجديدة:");
    const unit = prompt("الوحدة الجديدة:");

    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              name: name || item.name,
              quantity: quantity ? Number(quantity) : item.quantity,
              unit: unit || item.unit,
              lastModified: new Date(),
            }
          : item
      )
    );
  };

  // حذف صنف
  const deleteItem = (id) => {
    const password = prompt("ادخل كلمة السر للحذف:");
    if (password !== PASSWORD) return alert("كلمة السر خطأ!");
    setItems(items.filter((item) => item.id !== id));
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="factory-page">
      <h1 className="page-title">المخزن العام</h1>

      {/* إضافة صنف جديد مع autocomplete */}
      <div className="add-item-form" style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="اسم الصنف"
          value={newItem.name}
          onChange={handleNameChange}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setTimeout(() => setDropdownOpen(false), 200)} // تأخير لإتاحة النقر على الاقتراح
        />
        {dropdownOpen && suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((item, index) => (
              <li key={index} onClick={() => selectSuggestion(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}

        <input
          type="number"
          placeholder="الكمية"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <input
          type="text"
          placeholder="الوحدة"
          value={newItem.unit}
          onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
        />
        <button className="add-button" onClick={addItem}>
          إضافة صنف
        </button>
      </div>

      {/* بحث */}
      <div className="search-box">
        <input
          type="text"
          placeholder="ابحث باسم الصنف..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* جدول الأصناف */}
      <table className="styled-table">
        <thead>
          <tr>
            <th>رقم</th>
            <th>اسم الصنف</th>
            <th>الكمية</th>
            <th>الوحدة</th>
            <th>آخر تعديل</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr
              key={item.id}
              style={{ backgroundColor: item.quantity < 5 ? "#ff9999" : "transparent" }}
            >
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.unit}</td>
              <td>{item.lastModified.toLocaleString()}</td>
              <td>
                <button className="edit-button" onClick={() => editItem(item.id)}>
                  تعديل
                </button>
                <button className="delete-button" onClick={() => deleteItem(item.id)}>
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainStore;
