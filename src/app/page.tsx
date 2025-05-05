"use client";
import Image from "next/image";
import { useState, useEffect } from 'react';

export default function Home() {
  const [duration, setDuration] = useState('');

  useEffect(() => {
    const calculateDuration = () => {
      const startDate = new Date('2025-05-05T11:30:00');
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      let result = '';
      if (days > 0) result += `${days}天 `;
      if (hours > 0 || days > 0) result += `${hours}小时 `;
      result += `${minutes}分钟 ${seconds}秒`;
      
      setDuration(result.trim());
    };

    calculateDuration();
    const interval = setInterval(calculateDuration, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-4 items-center w-full">
          <h1 className="text-3xl font-bold text-center w-full text-gray-900 dark:text-white">维护中</h1>
          <div className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700">
            <div className="mt-4 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                已维护时间
              </p>
              <div className="text-2xl font-mono my-4 text-gray-800 dark:text-gray-300">
                {duration}
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                我们会尽快恢复正常服务。
              </p>
          </div>
        </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
