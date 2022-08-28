import {Payment} from "../data/models/Payment";

export class PaymentMapper {

    static json(body: any): Payment {
        return Payment.create({
            amount: body.amount,
            paymentStatus: body.paymentStatus,
            type: body.type,
            id: body.id,
        });
    }
}