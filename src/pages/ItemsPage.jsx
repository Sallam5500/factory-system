import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import "../GlobalStyles.css";

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  // Fetch items from Firestore
  const fetchItems = async () => {
    const snapshot = await getDocs(collection(db, "storeItems"));
    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(list);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add new item
  const handleAdd = async () => {
    if (newItem.trim() === "") return;
    await addDoc(collection(db, "storeItems"), { name: newItem.trim() });
    setNewItem("");
    fetchItems();
  };

  // Edit item
  const handleEdit = async (id) => {
    const newName = prompt("اكتب الاسم الجديد للصنف:");
    if (!newName) return;
    const itemRef = doc(db, "storeItems", id);
    await updateDoc(itemRef, { name: newName });
    fetchItems();
  };

  // Delete item
  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الصنف؟")) return;
    await deleteDoc(doc(db, "storeItems", id));
    fetchItems();
  };

  return (
    <div className="factory-page">
      <h1 className="page-title">إدارة الأصناف</h1>

      <div className="form-row" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="أدخل اسم صنف جديد"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button className="btn" onClick={handleAdd}>إضافة</button>
      </div>

      <input
        type="text"
        placeholder="بحث..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "15px", padding: "8px", width: "250px", borderRadius: "5px" }}
      />

      <table className="styled-table">
        <thead>
          <tr>
            <th>اسم الصنف</th>
            <th>تعديل</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          {items
            .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
            .map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <button className="btn" onClick={() => handleEdit(item.id)}>Edit</button>
              </td>
              <td>
                <button className="btn" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsPage;
