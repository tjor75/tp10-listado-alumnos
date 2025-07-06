const getIntegerOrDefault = (value, defaultValue) => {
    const int = parseInt(value);
    return int !== NaN ? int : defaultValue;
};
const getDateOrDefault = (value, defaultValue) => {
    let date;
    try {
        date = new Date(value);

        if (/^\d{4}-\d{2}-\d{2}/.test(value))
            date.setDate(date.getDate() + 1);
    } catch (e) {
        date = defaultValue;
    } finally {
        return date;
    }
};
const getBooleanOrDefault = (value, defaultValue) => {
    const isValid = value === 'true' || value === '1' || value === 'false' || value === '0';
    return isValid ? value == true : defaultValue;
};

const isNombreApellido = (value) => {
    return value !== undefined && value.length >= 3;
};

const validateAlumno = (alumno) => {
    let requestError = '';
    if (alumno.id !== undefined && alumno.id <= 0)
        requestError += 'El id del alumno es inválido. ';
    if (!isNombreApellido(alumno.nombre))
        requestError += 'El nombre es inválido. ';
    if (!isNombreApellido(alumno.apellido))
        requestError += 'El apellido es inválido. ';
    if (alumno.idCurso !== null && idCurso <= 0)
        requestError += 'El id del curso es inválido. ';
    return requestError;
};

export { getIntegerOrDefault, getDateOrDefault, getBooleanOrDefault, isNombreApellido, validateAlumno };