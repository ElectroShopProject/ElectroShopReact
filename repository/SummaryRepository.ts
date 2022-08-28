import {ElectroShopApi} from "../api/ElectroShopApi";

export class SummaryRepository {

    static async paymentOptions(): Promise<any> {
        const options = await ElectroShopApi.getPaymentOptions();
        console.log(options);
        return options;
    }

    static async complete() {
        const response = await ElectroShopApi.complete(
            JSON.stringify({cartId: global.cartId})
        );
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