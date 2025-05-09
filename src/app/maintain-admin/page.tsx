"use client";
import { useState, useEffect } from 'react';
import { calculateMaintenanceDuration } from '../page';

const INITIAL_DATE = '2025-05-05T11:30:00';

export default function AdminPage() {
  const [newStartDate, setNewStartDate] = useState(INITIAL_DATE);
  const [currentDuration, setCurrentDuration] = useState(calculateMaintenanceDuration(INITIAL_DATE));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authData = localStorage.getItem('authToken');
    if (!authData) {
      alert('请先登录！');
      return;
    }
    const { token, timestamp } = JSON.parse(authData);
    const now = new Date().getTime();
    if (now - timestamp > 86400000) {
      localStorage.removeItem('authToken');
      alert('登录已过期，请重新登录！');
      return;
    }
    if (!token) {
      alert('请先登录！');
      return;
    }
    localStorage.setItem('maintenanceStartDate', newStartDate);
    window.dispatchEvent(new Event('storage'));
    alert('维护时间已更新！');
    setCurrentDuration(calculateMaintenanceDuration(newStartDate));
  };

  useEffect(() => {
    const updateDuration = () => {
      const storedDate = localStorage.getItem('maintenanceStartDate') || INITIAL_DATE;
      setCurrentDuration(calculateMaintenanceDuration(storedDate));
    };

    updateDuration();
    const interval = setInterval(updateDuration, 1000);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'maintenanceStartDate') {
        const storedDate = localStorage.getItem('maintenanceStartDate') || INITIAL_DATE;
        setNewStartDate(storedDate);
        setCurrentDuration(calculateMaintenanceDuration(storedDate));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-4 items-center w-full">
          <h1 className="text-3xl font-bold text-center w-full text-gray-900 dark:text-white">维护时间管理</h1>
          <div className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1">
                <span className="text-gray-600 dark:text-gray-400">设置维护开始时间</span>
                <input
                  type="datetime-local"
                  value={newStartDate}
                  onChange={(e) => setNewStartDate(e.target.value)}
                  className="p-2 border border-gray-300 dark:border-gray-700 rounded"
                />
              </label>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                更新维护时间
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-gray-600 dark:text-gray-400">当前已维护时间</p>
              <div className="text-2xl font-mono my-4 text-gray-800 dark:text-gray-300">
                {currentDuration}
              </div>
            </div>
          </div>
        </div>
        </main>
    </div>
  );
  }