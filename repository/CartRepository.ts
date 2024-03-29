import {ElectroShopApi} from "../api/ElectroShopApi";
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

    static async get(): Promise<Cart> {
        const cart = CartMapper.json(
            await ElectroShopApi.getCart(global.cartId)
        );

        console.log(cart);
        return cart;
    }

    static async addProduct(productId: string) {
        await ElectroShopApi.addProduct(
            JSON.stringify({
                cartId: global.cartId,
                productId: productId,
            })
        )
    }

    static async removeProduct(productId: string) {
        await ElectroShopApi.removeProduct(
            JSON.stringify({
                cartId: global.cartId,
                productId: productId,
            })
        )
    }

}