import {Order} from "../data/models/Order";
import {UserMapper} from "./UserMapper";
import {ProductMapper} from "./ProductMapper";
import {PaymentMapper} from "./PaymentMapper";

export class OrderMapper {

    static json(body: any): Order {
        return Order.create({
            cartId: body.cartId,
            user: UserMapper.json(body.user),
            payment: PaymentMapper.json(body.payment),
            products: body.products.map(productBody => ProductMapper.json(productBody)),
            id: body.id,
        });
    }
}