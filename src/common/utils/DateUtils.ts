import moment from "moment";


class DateUtils {
    /**
     *
     * @param timeSecond
     * @param localeFormat
     */
    public formatTSDateTimeAtTZ(timeSecond: number, localeFormat: string = "en-US") {
        return new Date(timeSecond * 1000).toLocaleString(localeFormat);
    }

    /**
     *
     * @param isoDate
     * @param localeFormat
     */
    public formatISODateTimeAtTZ(isoDate: string, localeFormat: string = "vi-VN") {
        let lastChar: string = isoDate.substr(isoDate.length - 1);
        if(lastChar !== "Z") {
            isoDate += "Z"
        }
        return new Date(isoDate).toLocaleString(localeFormat);
    }

    /**
     *
     * @param isoDate isoDate UTC
     * @param localeFormat
     */
    public formatISODateAtTZ(isoDate: string, localeFormat: string = "vi-VN") {
        let lastChar: string = isoDate.substr(isoDate.length - 1);
        if(lastChar !== "Z") {
            isoDate += "Z"
        }
        return new Date(isoDate).toLocaleDateString(localeFormat);
    }

    /**
     *
     * @param isoDate isoDate UTC
     * @param localeFormat
     */
    public formatISOTimeAtTZ(isoDate: string, localeFormat: string = "vi-VN") {
        let lastChar: string = isoDate.substr(isoDate.length - 1);
        if(lastChar !== "Z") {
            isoDate += "Z"
        }
        return new Date(isoDate).toLocaleTimeString(localeFormat);
    }

    public formatDate(timeSecond: number) {
        return timeSecond ? moment(timeSecond).format('DD/MM/YYYY HH:mm A') : '';
    }
}

export const dateUtils = new DateUtils();