import {User} from "../data/models/User";
import {Cart} from "../data/models/Cart";
import {Manufacturer} from "../data/models/Manufacturer";

export class ManufacturerMapper {

    static json(body: any): Manufacturer {
        return Manufacturer.create({
            id: body.id,
            name: body.name,
            country: body.country,
        });
    }
}