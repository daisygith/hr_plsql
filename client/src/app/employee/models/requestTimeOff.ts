import { RegisterRequestTimeOff } from './registerRequestTimeOff';

export interface RequestTimeOff extends RegisterRequestTimeOff {
  id: number;
  employeeName: string;
  image?: string;
}
