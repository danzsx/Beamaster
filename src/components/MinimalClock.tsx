import React, { useEffect, useState } from 'react';

export const MinimalClock: React.FC = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;

  const secDeg = seconds * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  return (
    <div
      className="w-24 h-24 rounded-full bg-[#1E2430] shadow-[0_14px_30px_-10px_rgba(30,36,48,0.35)] relative flex items-center justify-center select-none border border-white/20"
      title={now.toLocaleTimeString('pt-BR')}
    >
      {/* Marcadores minimalistas das horas */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute inset-1.5 flex justify-center"
          style={{ transform: `rotate(${i * 30}deg)` }}
        >
          <div
            className={`rounded-full ${
              i % 3 === 0 ? 'w-0.5 h-2 bg-white/75' : 'w-px h-1.5 bg-white/35'
            }`}
          />
        </div>
      ))}

      {/* Ponteiro das horas */}
      <div
        className="absolute w-1 h-6 bg-white rounded-full origin-bottom"
        style={{
          bottom: '50%',
          transform: `rotate(${hourDeg}deg)`,
        }}
      />
      {/* Ponteiro dos minutos */}
      <div
        className="absolute w-0.5 h-8 bg-white/85 rounded-full origin-bottom"
        style={{
          bottom: '50%',
          transform: `rotate(${minDeg}deg)`,
        }}
      />
      {/* Ponteiro dos segundos luminoso */}
      <div
        className="absolute w-[1.5px] h-9 bg-[#93C5FD] rounded-full origin-bottom"
        style={{
          bottom: '50%',
          transform: `rotate(${secDeg}deg)`,
        }}
      />
      <div className="w-2 h-2 rounded-full bg-white z-10" />
    </div>
  );
};

