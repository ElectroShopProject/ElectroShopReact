import {Product} from './Product';
import {User} from './User';
import {Payment} from './Payment';
import {Data} from "dataclass";

export class Order extends Data {
  cartId: string;
  user: User;
  payment: Payment;
  products: Product[];
  id: string;
}
