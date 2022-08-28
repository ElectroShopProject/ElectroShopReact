import {User} from "../data/models/User";
import {Cart} from "../data/models/Cart";
import {ProductMapper} from "./ProductMapper";

export class CartMapper {

    static json(body: any): Cart {
        return Cart.create({
            id: body.id,
            products: body.products.map(productBody => ProductMapper.json(productBody)),
        });
    }
}