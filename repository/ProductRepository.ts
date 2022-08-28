import {ElectroShopApi} from "../api/ElectroShopApi";
import {Product} from "../data/models/Product";
import {ProductMapper} from "../mapper/ProductMapper";

export class ProductRepository {

    static async products(): Promise<Product[]> {
        const productResponses = await ElectroShopApi.products();
        const products = productResponses.map(productBody => ProductMapper.json(productBody));

        console.log(products);
        return products;
    }
}