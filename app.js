const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: false
}));

function generateJWT(username) {
  const token = jwt.sign({ username }, 'secretKey');
  return token;
}

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'asdf' && password === '1234') {
    const jwt = generateJWT(username);
    req.session.jwt = jwt; // 세션에 JWT 저장
    res.json({ success: true, jwt });
  } else {
    res.status(401).json({ success: false, message: '인증 실패' });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(); // 세션 삭제
  res.json({ success: true, message: '로그아웃 성공' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
