class ValidacionesHelper {
    getIntegerOrDefault = (value, defaultValue) => {
        const int = parseInt(value);
        return int !== NaN ? int : defaultValue;
    };
    getDateOrDefault = (value, defaultValue) => {
        let date;
        try {
            date = new Date(value);
            return date;
        } catch (e) {
            date = defaultValue;
        } finally {
            return date;
        }
    };
    getStringOrDefault = (value, defaultValue) => {
        return typeof value === 'string' ? value : defaultValue;
    };
    getBooleanOrDefault = (value, defaultValue) => {
        const isTrue    = value.toLowerCase() === 'true'  || Number(value) === 1;
        const isFalse   = value.toLowerCase() === 'false' || Number(value) === 0;
        return isTrue || isFalse ? isTrue : defaultValue;
    };
    isEmail = (value) => {
        const REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return REGEX.test(value);
    };
}

export default new ValidacionesHelper();