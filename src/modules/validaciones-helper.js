const getIntegerOrDefault = (value, defaultValue) => {
    const int = parseInt(value);
    return int !== NaN ? int : defaultValue;
};
const getDateOrDefault = (value, defaultValue) => {
    let date;
    try {
        date = new Date(value);
    } catch (e) {
        date = defaultValue;
    } finally {
        return date;
    }
};
const getStringOrDefault = (value, defaultValue) => {
    return typeof value === 'string' ? value : defaultValue;
};
const getBooleanOrDefault = (value, defaultValue) => {
    const isTrue    = value.toLowerCase() === 'true'  || Number(value) === 1;
    const isFalse   = value.toLowerCase() === 'false' || Number(value) === 0;
    return isTrue || isFalse ? isTrue : defaultValue;
};
const isEmail = (value) => {
    const REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return REGEX.test(value);
};

export { getIntegerOrDefault, getDateOrDefault, getStringOrDefault, getBooleanOrDefault, isEmail };