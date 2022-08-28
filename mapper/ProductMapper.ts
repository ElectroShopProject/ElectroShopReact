import {Product} from "../data/models/Product";
import {ManufacturerMapper} from "./ManufacturerMapper";

export class ProductMapper {

    static json(body: any): Product {
        return Product.create({
            id: body.id,
            name: body.name,
            category: body.category,
            netPrice: body.netPrice,
            grossPrice: body.grossPrice,
            taxRate: body.taxRate,
            manufacturer: ManufacturerMapper.json(body.manufacturer)
        });
    }
}