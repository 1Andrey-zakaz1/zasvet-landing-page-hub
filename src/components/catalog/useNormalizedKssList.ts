
import { useMemo } from "react";

// Получение числового угла из строки КСС
export function getAngleFromKSS(kss: string): number {
  // КСС Ш (широкая) = 140, Д = 120, С = 90, Г = 60
  if (/^ш$/i.test(kss)) return 140;
  if (/^д/i.test(kss)) return 120;
  if (/^с$/i.test(kss)) return 90;
  if (/^г$/i.test(kss)) return 60;
  if (/^(к|k)[\s\-]?(12)/i.test(kss)) return 12;
  if (/^(к|k)[\s\-]?(30)/i.test(kss)) return 30;
  // Попробовать парсить числовое значение
  const match = kss.match(/(\d+)[°]?/);
  if (match && match[1]) return parseInt(match[1], 10);
  return 0;
}

function makePrettyKSS(kss: string): string | null {
  if (/(к|k)[\s\-]?12/i.test(kss)) return "К - 12°";
  if (/(к|k)[\s\-]?30/i.test(kss)) return "К - 30°";
  if (/^ш$/i.test(kss)) return "Ш";
  if (/^д/i.test(kss)) return "Д-120";
  if (/^с$/i.test(kss)) return "С";
  if (/^г/i.test(kss)) return "Г";
  // Лукая парс к K-XX°
  const match = kss.match(/^(к|k)[\s\-]?(\d+)[°]?/i);
  if (match) return `К - ${match[2]}°`;
  // Просто удалить излишние пробелы и привести к порядку
  return null;
}

export function useNormalizedKssList(rawKssList: string[]): string[] {
  return useMemo(() => {
    // Создаем уникальный список КСС
    const uniqueKss = new Map<string, string>();
    
    // Проходим по всем КСС и добавляем нормализованные значения
    rawKssList.forEach(kss => {
      const pretty = makePrettyKSS(kss);
      const normalized = pretty || kss.replace(/\s+/g, " ").replace("°", "").trim();
      
      // Используем нормализованное значение как ключ, чтобы избежать дубликатов
      uniqueKss.set(normalized.toLowerCase(), normalized);
    });
    
    // Преобразуем Map в массив уникальных значений
    const arr = Array.from(uniqueKss.values());

    // Сортировка:
    // 1. "Ш" всегда в начале
    // 2. "Д-120" сразу после "Ш"
    // 3. дальше по убыванию угла (числового значения)
    // 4. остальные буквы (если вдруг есть)
    return arr.sort((a, b) => {
      if (a === "Ш") return -1;
      if (b === "Ш") return 1;
      if (a === "Д-120") return -1;
      if (b === "Д-120") return 1;
      // Если оба числовые, сортируем по убыванию угла
      const angleA = getAngleFromKSS(a);
      const angleB = getAngleFromKSS(b);
      if (angleA !== angleB) return angleB - angleA;
      return a.localeCompare(b);
    });
  }, [rawKssList]);
}
