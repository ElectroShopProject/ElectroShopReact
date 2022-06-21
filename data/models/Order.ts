import {Product} from './Product';
import {User} from './User';
import {Payment} from './Payment';

export class Order {
  cartId: string;
  user: User;
  payment: Payment;
  products: Product[];
  id: string;
}
