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

    static async createCart(body: string) {
        return await this.post('/cart', body);
    }

    // Product

    static async products(): Promise<any> {
        return await this.get('/products');
    }



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

    private static async delete() {

    }
}