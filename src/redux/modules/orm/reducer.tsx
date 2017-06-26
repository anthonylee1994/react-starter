const { createReducer } = require("redux-orm");
import orm from "./index";

export const ormReducer = createReducer(orm);
