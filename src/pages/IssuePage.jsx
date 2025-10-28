import React, { useState, useEffect } from "react";
import "../GlobalStyles.css";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

const IssuePage = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: "", destination: "" });
  const [search, setSearch] = useState("");

  const collectionRef = collection(db, "issuedGoods");

  useEffect(() => {
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      setItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  const addItem = async () => {
    if (!newItem.name || !newItem.quantity || !newItem.destination) return;
    await addDoc(collectionRef, {
      ...newItem,
      quantity: Number(newItem.quantity),
      date: new Date(),
    });
    setNewItem({ name: "", quantity: "", destination: "" });
  };

  const deleteItem = async (id) => {
    const docRef = doc(db, "issuedGoods", id);
    await deleteDoc(docRef);
  };

  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="factory-page">
      <h1 className="page-title">الصادر من المخزن</h1>

      <div className="add-item-form">
        <input
          type="text"
          placeholder="اسم الصنف"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="الكمية"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <input
          type="text"
          placeholder="الجهة المستلمة"
          value={newItem.destination}
          onChange={(e) => setNewItem({ ...newItem, destination: e.target.value })}
        />
        <button onClick={addItem} className="add-button">
          إضافة
        </button>
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
            <th>الجهة</th>
            <th>التاريخ</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.destination}</td>
              <td>{new Date(item.date.seconds * 1000).toLocaleString()}</td>
              <td>
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

export default IssuePage;
