class ValidacionesHelper {
    getIntegerOrDefault = (value, defaultValue) => {
        const int = parseInt(value);
        return int ? int !== NaN : defaultValue;
    };
    getDateOrDefault = (value, defaultValue) => { return null};
    getStringOrDefault = (value, defaultValue) => { return null};
    getBooleanOrDefault = (value, defaultValue) => { return null};
    isEmail = (value) => { return null};
}

export default new ValidacionesHelper();