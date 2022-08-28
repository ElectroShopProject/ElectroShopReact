import {UserMapper} from "../mapper/UserMapper";
import {ElectroShopApi} from "../api/ElectroShopApi";
import {User} from "../data/models/User";
import {OrderMapper} from "../mapper/OrderMapper";

export class UserRepository {

    static async login(name: string): Promise<User> {
        const user = UserMapper.json(
            await ElectroShopApi.login(JSON.stringify({name: name}))
        );

        console.log(user);
        global.userId = user.id;
        return user;
    }

    static async orders() {
        const orderList = await ElectroShopApi.orders(global.userId);
        const orders = orderList.map(orderResponse => OrderMapper.json(orderResponse));

        console.log(orders);
        return orders;
    }
}