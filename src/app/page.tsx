import Image from "next/image";

export default function Home() {
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
