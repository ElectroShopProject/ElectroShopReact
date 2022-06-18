import {Manufacturer} from './Manufacturer';
import {TaxRate} from './TaxRate';
import {Data} from 'dataclass';

export class Product extends Data {
  id: string;
  name: string;
  category: string;
  manufacturer: Manufacturer;
  netPrice: number;
  grossPrice: number;
  taxRate: TaxRate;
}
