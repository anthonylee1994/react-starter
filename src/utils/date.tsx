import * as moment from "moment";

/**
 *
 * @param {string} dateTimeString
 * @param {string} displayFormat
 * @return {string} formattedDateTime
 */
export function formatDateTime(dateTimeString: string, displayFormat = "YYYY-MM-DD HH:mm") {
    return moment(dateTimeString, moment.ISO_8601).format(displayFormat);
}
