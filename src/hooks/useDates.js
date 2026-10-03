import { useState, useEffect } from "react";

const DATES = {
  hablando: new Date(2026, 5, 18), // 18 jun 2026
  conocimos: new Date(2026, 5, 24), // 24 jun 2026
  novios: new Date(2026, 6, 5), // 5 jul 2026
  cumpleElla: new Date(2006, 1, 1), // 1 feb 2006
  cumpleEl: new Date(2004, 7, 2), // 2 ago 2004
};

function daysSince(from) {
  return Math.max(0, Math.floor((new Date() - from) / 864e5));
}

function nextBirthday(month, day) {
  const now = new Date();
  const thisY = new Date(now.getFullYear(), month, day);
  const next =
    thisY > now ? thisY : new Date(now.getFullYear() + 1, month, day);
  return {
    date: next,
    daysTo: Math.ceil((next - now) / 864e5),
    age: next.getFullYear() - (month === 1 && day === 1 ? 2006 : 2004),
  };
}

function nextMilestone(base) {
  const now = new Date();
  let m = 1;
  while (true) {
    const next = new Date(base);
    next.setMonth(next.getMonth() + m);
    if (next > now) {
      return {
        label: `${m} ${m === 1 ? "mes" : "meses"} juntos`,
        daysTo: Math.ceil((next - now) / 864e5),
        date: next,
      };
    }
    m++;
  }
}

function getAge(birthYear, birthMonth, birthDay) {
  const now = new Date();
  const birth = new Date(birthYear, birthMonth, birthDay);
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
}

export default function useDates() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  const dH = daysSince(DATES.hablando);
  const dC = daysSince(DATES.conocimos);
  const dN = daysSince(DATES.novios);

  return {
    hablando: {
      days: dH,
      weeks: Math.floor(dH / 7),
      months: Math.floor(dH / 30),
    },
    conocimos: {
      days: dC,
      weeks: Math.floor(dC / 7),
      months: Math.floor(dC / 30),
    },
    novios: {
      days: dN,
      weeks: Math.floor(dN / 7),
      months: Math.floor(dN / 30),
    },
    milestone: nextMilestone(DATES.novios),

    cumpleElla: {
      date: DATES.cumpleElla,
      edad: getAge(2006, 1, 1),
      proximoBD: nextBirthday(1, 1), // feb=1, día=1
      signo: "Acuario",
      emoji: "🏺",
    },
    cumpleEl: {
      date: DATES.cumpleEl,
      edad: getAge(2004, 7, 2),
      proximoBD: nextBirthday(7, 2), // ago=7, día=2
      signo: "Leo",
      emoji: "🦁",
    },

    dates: DATES,
  };
}
