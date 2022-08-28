import {Data} from 'dataclass';
import {Product} from "./Product";

export class Cart extends Data {
    id: string;
    products: Product[];
}