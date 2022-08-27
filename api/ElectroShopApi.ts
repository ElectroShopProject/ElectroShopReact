const baseUrl = 'https://electroshopapi.herokuapp.com';

class ElectroShopApi {

    static async login(body: BodyInit): Promise<any> {
        return await this.post('/user/login', body);
    }

    static async products(): Promise<any> {
        return await this.get('/products');
    }



    private static async get(endpoint: string): Promise<string> {
        return (await fetch(baseUrl + endpoint)).json();
    }

    private static async post(endpoint: string, body: BodyInit) {
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