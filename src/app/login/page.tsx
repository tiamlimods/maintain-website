"use client";
import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const MAX_ATTEMPTS = 3;
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5分钟

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 获取当前登录尝试信息
    const loginAttempts = JSON.parse(localStorage.getItem('loginAttempts') || '{}');
    const { count = 0, lastAttempt = 0 } = loginAttempts;
    
    // 检查是否超过最大尝试次数
    if (count >= MAX_ATTEMPTS) {
      const timeSinceLastAttempt = Date.now() - lastAttempt;
      if (timeSinceLastAttempt < LOCKOUT_DURATION) {
        alert(`登录尝试次数过多，请等待 ${Math.ceil((LOCKOUT_DURATION - timeSinceLastAttempt) / 1000)} 秒后再试。`);
        return;
      } else {
        // 重置尝试次数
        localStorage.setItem('loginAttempts', JSON.stringify({ count: 0, lastAttempt: 0 }));
      }
    }
    
    // 这里添加登录验证逻辑
    const envUsername = process.env.USERNAME;
const envPassword = process.env.PASSWORD;
const loginSuccess = username === envUsername && password === envPassword;
    
    if (!loginSuccess) {
      // 登录失败，增加尝试次数
      localStorage.setItem('loginAttempts', JSON.stringify({ count: count + 1, lastAttempt: Date.now() }));
      alert('登录失败，请检查用户名和密码。');
      return;
    }
    
    // 登录成功，重置尝试次数
    localStorage.setItem('loginAttempts', JSON.stringify({ count: 0, lastAttempt: 0 }));
    console.log('Login submitted:', username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">登录</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              用户名
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              密码
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
}