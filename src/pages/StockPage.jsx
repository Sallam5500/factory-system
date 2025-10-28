<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

const StockPage = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", in: 0, out: 0 });
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState(false);

  const stockCol = (d) => collection(db, "stock", d, "items");

  // تحميل بيانات اليوم
  const loadItems = async (currentDate) => {
    const todayRef = stockCol(currentDate);
    const snapshot = await getDoc(doc(db, "stock", currentDate));
    
    if (!snapshot.exists()) {
      // لو اليوم فاضي، انسخ أصناف اليوم السابق
      const prevDate = new Date(new Date(currentDate).getTime() - 24*60*60*1000)
        .toISOString()
        .slice(0,10);

      const prevSnapshot = await getDoc(doc(db, "stock", prevDate));
      if (prevSnapshot.exists()) {
        const prevItems = prevSnapshot.data().items || [];
        const todayItems = prevItems.map(item => ({
          name: item.name,
          in: 0,
          out: 0,
          remaining: item.remaining
        }));

        // إنشاء اليوم الجديد في Firestore
        await setDoc(doc(db, "stock", currentDate), { items: todayItems });
        setItems(todayItems);
        return;
      }
    }

    // لو اليوم موجود بالفعل
    if (snapshot.exists()) {
      setItems(snapshot.data().items || []);
    } else {
      setItems([]);
    }
  };

  useEffect(() => {
    loadItems(date);
  }, [date]);

  const updateFirestore = async (updatedItems) => {
    await setDoc(doc(db, "stock", date), { items: updatedItems });
  };

  // تعديل القيم مباشرة في الجدول
  const handleChange = (index, field, value) => {
    const temp = [...items];
    temp[index][field] = Number(value);
    temp[index].remaining = temp[index].in - temp[index].out;
    setItems(temp);
  };

  // تحديث صنف محدد
  const handleUpdate = async (index) => {
    const temp = [...items];
    temp[index].remaining = temp[index].in - temp[index].out;
    setItems(temp);
    await updateFirestore(temp);
    alert("تم تحديث الصنف!");
  };

  // حذف صنف
  const handleDelete = async (index) => {
    if(window.confirm("هل تريد حذف هذا الصنف؟")){
      const temp = [...items];
      temp.splice(index, 1);
      setItems(temp);
      await updateFirestore(temp);
    }
  };

  // إضافة صنف جديد
  const handleAddItem = async () => {
    if(!newItem.name) return;
    const temp = [
      ...items,
      {
        name: newItem.name,
        in: Number(newItem.in),
        out: Number(newItem.out),
        remaining: Number(newItem.in) - Number(newItem.out)
      }
    ];
    setItems(temp);
    await updateFirestore(temp);
    setNewItem({ name: "", in: 0, out: 0 });
    setAdding(false);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="factory-page">
      <h1 className="page-title">المخزن - {date}</h1>

      {!adding && (
        <>
          <div style={{ marginBottom: "15px" }}>
            <label>اختر اليوم: </label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="ابحث عن صنف"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="btn" onClick={() => setAdding(true)}>تسجيل صنف جديد</button>

          <table className="styled-table" style={{ width: "100%", marginTop: "15px" }}>
            <thead>
              <tr>
                <th>اسم الصنف</th>
                <th>الكمية الواردة</th>
                <th>الكمية الصادرة</th>
                <th>المتبقي</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>
                    <input type="number" value={item.in} onChange={(e) => handleChange(idx, "in", e.target.value)} />
                  </td>
                  <td>
                    <input type="number" value={item.out} onChange={(e) => handleChange(idx, "out", e.target.value)} />
                  </td>
                  <td>{item.remaining}</td>
                  <td>
                    <button className="btn" onClick={() => handleUpdate(idx)}>Update</button>
                    <button className="btn" onClick={() => handleDelete(idx)} style={{ marginLeft: "5px" }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {adding && (
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="اسم الصنف"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="الكمية الواردة"
            value={newItem.in}
            onChange={(e) => setNewItem({ ...newItem, in: e.target.value })}
          />
          <input
            type="number"
            placeholder="الكمية الصادرة"
            value={newItem.out}
            onChange={(e) => setNewItem({ ...newItem, out: e.target.value })}
          />
          <div style={{ marginTop: "10px" }}>
            <button className="btn" onClick={handleAddItem}>حفظ الصنف</button>
            <button className="btn" onClick={() => setAdding(false)} style={{ marginLeft: "10px" }}>إلغاء</button>
          </div>
        </div>
      )}
>>>>>>> 350325d8e15b32a7db7a380c842fdc5ef847a422
    </div>
  );
};

export default StockPage;
