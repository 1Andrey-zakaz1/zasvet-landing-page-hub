
export interface FormData {
  old_quantity: string;
  old_power: string;
  maintenance_cost: string;
  led_quantity: string;
  led_power: string;
  led_cost: string;
  hours: string;
  energy_cost: string;
  operation_mode: string;
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
