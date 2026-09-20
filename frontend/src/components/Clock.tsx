import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-8xl md:text-9xl font-bold text-m3-primary tracking-tighter" style={{ fontFamily: "'Roboto', sans-serif" }}>
        {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </div>
      <p className="mt-4 text-2xl text-m3-secondary font-medium tracking-wide">Selamat Datang di Portofolio Saya</p>
    </div>
  );
}