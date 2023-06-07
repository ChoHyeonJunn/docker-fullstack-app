import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  // 여기서 데이터베이스에 있는 값을 가져온다
  useEffect(() => {
    axios.get("/api/values").then((response) => {
      console.log("response", response);
      setLists(response.data);
    });
  }, []);

  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  // input 박스 onchange 이벤트
  const changeHandler = (e) => {
    setValue(e.currentTarget.value);
  };

  // form 섭밋 시 호출
  const submitHandler = (e) => {
    e.preventDefault();

    axios.post("/api/value", { value: value }).then((res) => {
      if (res.data.success) {
        console.log("response", res);
        setLists([...lists, res.data]);
        setValue("");
      } else {
        alert("값을 db에 넣는데 실패했슴다!");
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>React</p>
        <div className="container">
          {lists &&
            lists.map((list, index) => <li key={index}>{list.value}</li>)}
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주셈"
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
