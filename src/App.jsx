import { useState } from "react";
import "./App.css";
import Picture from "./components/Picture";

function App() {
  const [keyword, setKeyword] = useState("");
  const [picture, setPicture] = useState([]);

  function searchPicture(e) {
    e.preventDefault();
    if (!keyword) {
      alert("กรุณาใส่ชื่อรูปภาพ");
    } else {
      fetchPictureFromAPI();
    }
  }
  async function fetchPictureFromAPI() {
    const url = `${import.meta.env.VITE_API_URL}?page=1&query=${keyword}&client_id=${import.meta.env.VITE_API_KEY}&per_page=15`;
    const res = await fetch(url);
    const data = await res.json();
    const result = data.results;
    if (result.length == 0) {
      alert("ไม่มีข้อมูลรูปภาพ");
      setKeyword("");
    } else {
      setPicture(result);
    }
  }
  return (
    <>
      <h1>ระบบค้นหารูปภาพ</h1>
      <form onSubmit={searchPicture}>
        <input
          type="text"
          placeholder="พิมพ์ชื่อรูปภาพที่ต้องการค้นหา"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">ค้นหา</button>
      </form>
      <div className="search-result">
        {picture.map((data, index) => {
          return <Picture {...data} key={index} />;
        })}
      </div>
    </>
  );
}

export default App;
