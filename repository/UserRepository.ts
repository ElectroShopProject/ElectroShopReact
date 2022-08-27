import {UserMapper} from "../mapper/UserMapper";

export class UserRepository {

    static async login(name: string) {
        return UserMapper.json(
            ElectroShopApi.login(JSON.stringify({name: name}))
        );
    }

    static async orders() {

    }
}