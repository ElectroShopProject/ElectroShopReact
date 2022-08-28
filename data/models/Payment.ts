import {Data} from "dataclass";

export class Payment extends Data {
  amount: number;
  paymentStatus: string;
  type: string;
  id: string;
}
