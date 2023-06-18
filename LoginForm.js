import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // 로그인 상태 관리

  useEffect(() => {
    // 페이지 로드 시 로그인 상태 확인
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });

      if (response.data.success) {
        const jwt = response.data.jwt;
        localStorage.setItem('jwt', jwt);
        setLoggedIn(true); // 로그인 상태 업데이트

        console.log('로그인 성공');
        // 여기에서 자동 로그인을 위한 추가 작업을 수행할 수 있습니다.
        // 예를 들어 사용자 정보를 가져와서 화면에 표시하는 등의 작업을 수행할 수 있습니다.
      } else {
        console.log('로그인 실패');
      }
    } catch (error) {
      console.log('로그인 과정에서 오류 발생:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/logout'); // 서버로 로그아웃 요청
      localStorage.removeItem('jwt'); // 로컬 스토리지의 JWT 제거
      setLoggedIn(false); // 로그인 상태 업데이트
      console.log('로그아웃 성공');
    } catch (error) {
      console.log('로그아웃 과정에서 오류 발생:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
      {loggedIn && <button onClick={handleLogout}>로그아웃</button>}
    </div>
  );
};

export default LoginForm;
