import {User} from "../data/models/User";

export class UserMapper {

    static json(body: any): User {
        return User.create({name: body.name, id: body.id});
    }
}