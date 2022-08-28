import {ElectroShopApi} from "../api/ElectroShopApi";

export class SummaryRepository {

    static async complete() {
        const response = await ElectroShopApi.complete(JSON.stringify({cartId: global.cartId}));
        console.log(response);
    }

    static async payment(type: string) {
        const response = await ElectroShopApi.payment(
            JSON.stringify({
                cartId: global.cartId,
                paymentOptionType: type,
            })
        );
        console.log(response);
    }
}