import React, { useState, useEffect } from "react";
import "../GlobalStyles.css";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";

const PASSWORD = "1234";
const AVAILABLE_ITEMS = ["سكر", "دقيق", "زبدة", "شوكولاتة", "كريمة"];

const MainStore = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState({ name: "", quantity: "", unit: "" });
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const collectionRef = collection(db, "mainStore");

  useEffect(() => {
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map(docItem => ({
        id: docItem.id,
        ...docItem.data(),
        lastModified: docItem.data().lastModified?.toDate ? docItem.data().lastModified.toDate() : new Date()
      }));
      setItems(data);
    });
    return () => unsubscribe();
  }, []);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setNewItem({ ...newItem, name: value });

    if (value.length > 0) {
      const filtered = AVAILABLE_ITEMS.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions(AVAILABLE_ITEMS);
    }
    setDropdownOpen(true);
  };

  const selectSuggestion = (name) => {
    setNewItem({ ...newItem, name });
    setDropdownOpen(false);
  };

  const addItem = async () => {
    if (!newItem.name || !newItem.quantity || !newItem.unit) return;
    try {
      await addDoc(collectionRef, {
        name: newItem.name,
        quantity: Number(newItem.quantity),
        unit: newItem.unit,
        lastModified: new Date()
      });
      if (!AVAILABLE_ITEMS.includes(newItem.name)) AVAILABLE_ITEMS.push(newItem.name);
      setNewItem({ name: "", quantity: "", unit: "" });
      setDropdownOpen(false);
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  const editItem = async (id) => {
    const password = prompt("ادخل كلمة السر للتعديل:");
    if (password !== PASSWORD) return alert("كلمة السر خطأ!");

    const itemToEdit = items.find(i => i.id === id);
    const name = prompt("اسم الصنف الجديد:", itemToEdit.name);
    const quantity = prompt("الكمية الجديدة:", itemToEdit.quantity);
    const unit = prompt("الوحدة الجديدة:", itemToEdit.unit);

    try {
      const docRef = doc(db, "mainStore", id);
      await updateDoc(docRef, {
        name: name || itemToEdit.name,
        quantity: quantity ? Number(quantity) : itemToEdit.quantity,
        unit: unit || itemToEdit.unit,
        lastModified: new Date()
      });
    } catch (error) {
      console.error("Error editing item: ", error);
    }
  };

  const deleteItem = async (id) => {
    const password = prompt("ادخل كلمة السر للحذف:");
    if (password !== PASSWORD) return alert("كلمة السر خطأ!");
    try {
      const docRef = doc(db, "mainStore", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="factory-page">
      <h1 className="page-title">المخزن العام</h1>

      <div className="add-item-form" style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="اسم الصنف"
          value={newItem.name}
          onChange={handleNameChange}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
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
        <button className="add-button" onClick={addItem}>إضافة صنف</button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="ابحث باسم الصنف..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

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
            <tr key={item.id} style={{ backgroundColor: item.quantity < 5 ? "#ff9999" : "transparent" }}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.unit}</td>
              <td>{new Date(item.lastModified).toLocaleString()}</td>
              <td>
                <button className="edit-button" onClick={() => editItem(item.id)}>تعديل</button>
                <button className="delete-button" onClick={() => deleteItem(item.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainStore;
