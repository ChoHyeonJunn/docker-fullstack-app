// 필요한 모듈들을 가져오기
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db"); // db.js 에서 만든거 가져옴

// express 서버를 생성
const app = express();

// json 형태로 오는 요청의 본문을 해석해줄수있게 등록
app.use(bodyParser.json());

// db테이블 생성하기
// db.pool.query(
//   `CREATE TABLE lists(
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
// )`,
//   (err, results, fields) => {
//     console.log("results", results);
//   }
// );

// DB lists 테이블에 있는 모든 데이터를 프론트 서버에 보내주기
app.get("/api/values", (req, res) => {
  // db 에서 모든 정보 가져오기
  db.pool.query("SELECT * FROM lists;", (err, result, fields) => {
    if (err) return res.status(500).err();
    else return res.json(result);
  });
});

// 클라이언트에서 입력한 값을 데이터베이스 lists테이블에 넣어주기
app.post("/api/value", (req, res, next) => {
  // db에 값 넣어주기
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, result, fields) => {
      if (err) return res.status(500).send();
      else return res.json({ success: true, value: req.body.value });
    }
  );
});

app.listen(5000, () => {
  console.log("express 애플리케이션이 5000번 포트에서 시작되었습니다.");
});
