import {UserMapper} from "../mapper/UserMapper";
import {ElectroShopApi} from "../api/ElectroShopApi";
import {User} from "../data/models/User";
import {Cart} from "../data/models/Cart";
import {CartMapper} from "../mapper/CartMapper";

export class CartRepository {

    static async create(): Promise<Cart> {
        const cart = CartMapper.json(
            await ElectroShopApi.createCart(JSON.stringify({userId: global.userId}))
        );

        console.log(cart);
        global.cartId = cart.id;

        return cart;
    }

}