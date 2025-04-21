
/**
 * Скрипт проверки полноты серий "Сокол" в каталоге
 * Выводит отсутствующие варианты (по мощности, КСС, пр.)
 */

import { catalogPart1 } from "./catalogPart1";

const nameRegexp =
  /^Сокол (\d+)-67-5000-([А-Яа-яA-Za-z\-0-9]+)-220-Скоба$/;

// Все возможные мощности и КСС для Сокол — при необходимости дополните!  
const sokolPowers = [26, 52, 78, 104, 156, 208, 260, 312, 468, 624, 780, 936];
const sokolKss = ["Д", "С", "Г", "К30", "К12"]; // КСС

// Собираем что уже есть
const sokolPresent = new Set(
  catalogPart1
    .filter(f =>
      typeof f.name === "string" &&
      f.name.startsWith("Сокол") &&
      nameRegexp.test(f.name)
    )
    .map(f => {
      const m = f.name.match(nameRegexp);
      if (!m) return "";
      return `${m[1]}-${m[2]}`; // пример: "52-К30"
    })
);

// Соберём все ожидаемые варианты
const sokolExpected: string[] = [];
for (const power of sokolPowers) {
  for (const kss of sokolKss) {
    sokolExpected.push(`${power}-${kss}`);
  }
}

// Проверим чего не хватает
const sokolMissing = sokolExpected.filter(x => !sokolPresent.has(x));

console.log("Найденные варианты серии Сокол (мощность-КСС):", Array.from(sokolPresent).sort());
console.log("Ожидаемые варианты:", sokolExpected);
console.log("Отсутствуют такие варианты (мощность-КСС):", sokolMissing);

if (sokolMissing.length === 0) {
  console.log("Все варианты Сокол присутствуют!");
}
