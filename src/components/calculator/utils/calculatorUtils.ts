
// Calculator utility functions

// Calculator validation functions
export const validatePositiveInteger = (value: string) => {
  const num = parseInt(value);
  return !isNaN(num) && num > 0 && num === parseFloat(value);
};

export const validatePositiveNumber = (value: string) => {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
};

export const validateNonNegativeNumber = (value: string) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0;
};

export const validateRange = (value: string, min: number, max: number) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= min && num <= max;
};

// Operation mode helpers
export const getDaysPerYear = (mode: string): number => {
  switch (mode) {
    case 'continuous':
      return 365;
    case 'daily':
      return 365;
    case 'workdays':
      return 250;
    case 'seasonal':
      return 183;
    default:
      return 365;
  }
};

// Calculation function
export interface CalculationInputs {
  oldQuantity: number;
  oldPower: number;
  maintenanceCost: number;
  ledQuantity: number;
  ledPower: number;
  ledCost: number;
  hoursPerDay: number;
  energyCost: number;
  operationMode: string;
}

export interface CalculationResult {
  oldEnergyConsumption: string;
  ledEnergyConsumption: string;
  oldEnergyCost: string;
  ledEnergyCost: string;
  energySavings: string;
  oldMaintenanceCostPerYear: string;
  totalSavingsPerYear: string;
  ledInvestment: string;
  paybackPeriod: string;
  paybackPeriodMonths: number;
  savingsFiveYears: string;
  powerReduction: string;
}

export const calculateResults = (inputs: CalculationInputs): CalculationResult => {
  const daysPerYear = getDaysPerYear(inputs.operationMode);
  
  const oldEnergyConsumption = inputs.oldQuantity * inputs.oldPower * inputs.hoursPerDay * daysPerYear / 1000;
  const ledEnergyConsumption = inputs.ledQuantity * inputs.ledPower * inputs.hoursPerDay * daysPerYear / 1000;
  
  const oldEnergyCost = oldEnergyConsumption * inputs.energyCost;
  const ledEnergyCost = ledEnergyConsumption * inputs.energyCost;
  
  const energySavings = oldEnergyCost - ledEnergyCost;
  
  const oldMaintenanceCostPerYear = inputs.oldQuantity * inputs.maintenanceCost;
  
  const totalSavingsPerYear = energySavings + oldMaintenanceCostPerYear;
  
  const ledInvestment = inputs.ledQuantity * inputs.ledCost;
  
  const paybackPeriod = ledInvestment / totalSavingsPerYear;
  
  const paybackPeriodMonths = paybackPeriod * 12;
  
  const savingsFiveYears = totalSavingsPerYear * 5 - ledInvestment;
  
  const powerReduction = (inputs.oldQuantity * inputs.oldPower) - (inputs.ledQuantity * inputs.ledPower);
  
  return {
    oldEnergyConsumption: oldEnergyConsumption.toFixed(2),
    ledEnergyConsumption: ledEnergyConsumption.toFixed(2),
    oldEnergyCost: oldEnergyCost.toFixed(2),
    ledEnergyCost: ledEnergyCost.toFixed(2),
    energySavings: energySavings.toFixed(2),
    oldMaintenanceCostPerYear: oldMaintenanceCostPerYear.toFixed(2),
    totalSavingsPerYear: totalSavingsPerYear.toFixed(2),
    ledInvestment: ledInvestment.toFixed(2),
    paybackPeriod: paybackPeriod.toFixed(2),
    paybackPeriodMonths: Math.ceil(paybackPeriodMonths),
    savingsFiveYears: savingsFiveYears.toFixed(2),
    powerReduction: powerReduction.toFixed(2)
  };
};
