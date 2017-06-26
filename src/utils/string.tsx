import * as camelCase from "lodash/camelCase";
import * as startCase from "lodash/startCase";

export const toTitleCase = (str) => startCase(camelCase(str));
