import {Manufacturer} from './Manufacturer';
import {TaxRate} from './TaxRate';

export class Product {
  id: string;
  name: string;
  category: string;
  manufacturer: Manufacturer;
  netPrice: number;
  grossPrice: number;
  taxRate: TaxRate;
}
