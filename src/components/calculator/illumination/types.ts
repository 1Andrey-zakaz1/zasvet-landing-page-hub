
export interface LuminaireModel {
  model: string;
  flux: number;
  power: number;
  size: number[];
  price: number;
}

export interface IlluminationGrid {
  rows: number;
  cols: number;
  ratioDiff: number;
}

export interface TableData extends LuminaireModel {
  count: number;
  totalCost: number;
  achieved: string;
  grid?: IlluminationGrid;
  perfectGrid?: boolean;
}

export interface IlluminationValues {
  average: number;
  minimum: number;
  uniformity: number;
}

export interface IlluminationFormData {
  roomLength: string;
  roomWidth: string;
  roomHeight: string;
  roomType: string;
  requiredLux: string;
  luminaireType: string;
}
