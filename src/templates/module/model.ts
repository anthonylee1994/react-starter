import {USER_LOGIN} from "./actions";
const {attr, Model} = require("redux-orm");

export default class User extends Model {
    public static modelName = "User";
    public static fields = {
        userId: attr(),
        username: attr(),
        iconPath: attr(),
    };

    public static reducer(action: any, User: any, session: any): any {
        switch (action.type) {
            case USER_LOGIN.SUCCESS:
                User.create(action.payload.result);
                break;
        }
        return undefined;
    }
}
