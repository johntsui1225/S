import React, { useState } from 'react';
import axios from 'axios';



function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/users/login', { username, password });
      localStorage.setItem('token', response.data.token);
      console.log(localStorage)
      setMessage('Login Successful！');

    
      // 这里可以添加重定向到主页的逻辑，例如使用 React Router
    } catch (error) {
      setMessage('Login failed：' + (error.response?.data.message || 'Try it later'));
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="username" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="password" 
          required 
        />
        <button type="submit">登录</button>
      </form>


      {message && <p>{message}</p>} {/* 显示提示信息 */}      


    </div>
  );
}

export default Login;

