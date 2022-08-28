const baseUrl = 'https://electroshopapi.herokuapp.com';

export class ElectroShopApi {

    // User

    static async login(body: string): Promise<any> {
        return await this.post('/user/login', body);
    }

    static async orders(userId: string): Promise<any> {
        return await this.get('/user/orders' + "?userId=" + userId);
    }

    // Cart

    static async getCart(cartId: string): Promise<any> {
        return await this.get('/cart' + '/' + cartId);
    }

    static async createCart(body: string) {
        return await this.post('/cart', body);
    }

    static async addProduct(body: string) {
        return await this.post('/cart/products/add', body);
    }

    static async removeProduct(body: string) {
        return await this.post('/cart/products/remove', body);
    }

    // Product

    static async products(): Promise<any> {
        return await this.get('/products');
    }

    // Summary

    static async complete(body: string): Promise<any> {
        return (await this.post('/summary/completion', body))
    }

    static async payment(body: string): Promise<any> {
        return (await this.post('/summary/payment', body))
    }

    static async getPaymentOptions(): Promise<any> {
        return (await this.post('/summary/payment/options', undefined))
    }

    // HTTP

    private static async get(endpoint: string): Promise<string> {
        return (await fetch(baseUrl + endpoint)).json();
    }

    private static async post(endpoint: string, body: string) {
        return (await fetch(
            baseUrl + endpoint,
            {
                body: body,
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        )).json();
    }
}