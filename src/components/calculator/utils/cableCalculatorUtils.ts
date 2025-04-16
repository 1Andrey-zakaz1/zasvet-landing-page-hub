/**
 * Модуль для расчета сечения кабеля
 * ПК "Zасвет"
 */

// Типы и интерфейсы
export type MaterialType = 'copper' | 'aluminum';
export type InstallationType = 'air' | 'ground' | 'pipe';
export type PhaseType = 'single' | 'three';

export interface CableCalculationInputs {
  power: number;
  voltage: number;
  length: number;
  material: MaterialType;
  phaseType: PhaseType;
  installation: InstallationType;
}

export interface CableCalculationResult {
  current: number;
  currentSection: number;
  lossSection: number;
  requiredSection: number;
  finalSection: number;
  inputData: CableCalculationInputs;
  error?: string;
}

// Таблицы допустимых токов (медь/алюминий) с учетом способа прокладки
const cableAmpacity: Record<MaterialType, Record<InstallationType, Record<number, number>>> = {
  'copper': {
    'air': {1.5: 19, 2.5: 27, 4: 38, 6: 50, 10: 70, 16: 90, 25: 115, 35: 140, 50: 175},
    'ground': {1.5: 22, 2.5: 30, 4: 41, 6: 53, 10: 73, 16: 93, 25: 118, 35: 143, 50: 178},
    'pipe': {1.5: 17, 2.5: 25, 4: 36, 6: 48, 10: 68, 16: 88, 25: 113, 35: 138, 50: 173}
  },
  'aluminum': {
    'air': {1.5: 16, 2.5: 22, 4: 30, 6: 40, 10: 55, 16: 75, 25: 95, 35: 120, 50: 145},
    'ground': {1.5: 19, 2.5: 25, 4: 33, 6: 43, 10: 58, 16: 78, 25: 98, 35: 123, 50: 148},
    'pipe': {1.5: 14, 2.5: 20, 4: 28, 6: 38, 10: 53, 16: 73, 25: 93, 35: 118, 50: 143}
  }
};

// Удельное сопротивление
const resistivity: Record<MaterialType, number> = {
  'copper': 0.0175,
  'aluminum': 0.028
};

/**
 * Расчет тока нагрузки
 */
export function calculateCurrent(power: number, voltage: number, phaseType: PhaseType): number {
  const powerW = power * 1000;
  if (phaseType === 'single') {
    return powerW / (voltage * 0.9); // cosφ = 0.9
  } else {
    return powerW / (1.732 * voltage * 0.9 * 0.95); // cosφ = 0.9, КПД = 0.95
  }
}

/**
 * Расчет сечения по допустимому току
 */
export function calculateByCurrentLoad(
  current: number, 
  material: MaterialType, 
  installationType: InstallationType
): number {
  // Отсортированные ключи сечений
  const sections = Object.keys(cableAmpacity[material][installationType])
    .map(Number)
    .sort((a, b) => a - b);
  
  // Поиск подходящего сечения по току
  for (const section of sections) {
    if (cableAmpacity[material][installationType][section] >= current) {
      return section;
    }
  }
  
  // Если не найдено, возвращаем максимальное из доступных
  return Math.max(...sections);
}

/**
 * Расчет сечения по потерям напряжения
 */
export function calculateByVoltageLoss(
  current: number, 
  length: number, 
  material: MaterialType, 
  voltage: number, 
  phaseType: PhaseType, 
  maxLoss: number = 5
): number {
  const rho = resistivity[material];
  if (phaseType === 'single') {
    return (2 * current * length * rho) / (voltage * maxLoss * 0.01 * 1000);
  } else {
    return (1.732 * current * length * rho) / (voltage * maxLoss * 0.01 * 1000);
  }
}

/**
 * Выбор ближайшего стандартного сечения
 */
export function selectFinalSection(
  requiredSection: number, 
  material: MaterialType, 
  installationType: InstallationType
): number {
  // Получаем доступные сечения для данного материала и способа прокладки
  const sections = Object.keys(cableAmpacity[material][installationType])
    .map(Number)
    .sort((a, b) => a - b);
  
  // Выбираем сечения, ��оторые больше или равны требуемому
  const sectionsAboveRequired = sections.filter(s => s >= requiredSection);
  
  if (sectionsAboveRequired.length > 0) {
    return Math.min(...sectionsAboveRequired);
  } else {
    return Math.max(...sections);
  }
}

/**
 * Расчет сечения кабеля на основе входных данных
 */
export function calculateCableSection(data: CableCalculationInputs): CableCalculationResult {
  try {
    // Расчет тока
    const current = calculateCurrent(data.power, data.voltage, data.phaseType);

    // Расчет сечения по току
    const currentSection = calculateByCurrentLoad(current, data.material, data.installation);
    
    // Расчет сечения по потерям напряжения
    const requiredSection = calculateByVoltageLoss(current, data.length, data.material, data.voltage, data.phaseType);
    
    // Выбор стандартного сечения по потерям
    const lossSection = selectFinalSection(requiredSection, data.material, data.installation);
    
    // Выбираем итоговое сечение – наибольшее из требуемых по току и по потерям
    const finalSection = Math.max(currentSection, lossSection);

    // Формирование результата
    return {
      current: Math.round(current * 100) / 100,
      currentSection: currentSection,
      lossSection: lossSection,
      requiredSection: requiredSection,
      finalSection: finalSection,
      inputData: data
    };
  } catch (e: any) {
    // Возвращаем ошибку
    return { 
      current: 0,
      currentSection: 0,
      lossSection: 0,
      requiredSection: 0,
      finalSection: 0,
      inputData: data,
      error: e.message 
    };
  }
}

export function validateCableFormData(data: {
  power: string;
  voltage: string;
  length: string;
  material: MaterialType;
  phaseType: PhaseType;
  installation: InstallationType;
}): Record<string, string> {
  const errors: Record<string, string> = {};
  
  // Validate power
  if (!data.power) {
    errors.power = 'Мощность нагрузки обязательна для заполнения';
  } else if (parseFloat(data.power) <= 0) {
    errors.power = 'Мощность нагрузки должна быть положительным числом';
  } else if (parseFloat(data.power) > 1000) {
    errors.power = 'Мощность слишком велика для этого калькулятора (макс. 1000 кВт)';
  }
  
  // Validate voltage
  if (!data.voltage) {
    errors.voltage = 'Напряжение сети обязательно для заполнения';
  } else if (parseFloat(data.voltage) < 110) {
    errors.voltage = 'Напряжение сети должно быть не менее 110 В';
  } else if (parseFloat(data.voltage) > 1000) {
    errors.voltage = 'Напряжение слишком велико для этого калькулятора (макс. 1000 В)';
  }
  
  // Validate length
  if (!data.length) {
    errors.length = 'Длина кабеля обязательна для заполнения';
  } else if (parseFloat(data.length) <= 0) {
    errors.length = 'Длина кабеля должна быть положительным числом';
  } else if (parseFloat(data.length) > 10000) {
    errors.length = 'Длина слишком велика для этого калькулятора (макс. 10000 м)';
  }
  
  return errors;
}
