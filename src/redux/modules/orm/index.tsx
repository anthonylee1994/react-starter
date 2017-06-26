import { ORM } from "redux-orm";
import User from "../user/model";

const orm = new ORM();

orm.register(
    User,
);

export default orm;
