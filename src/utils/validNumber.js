
function isValidNumber(obj) {
    let isNumber = false;

    if (obj !== null && obj !== undefined) {
        isNumber = isNaN(obj) ? false : obj > 0 ? true : false;
    }

    return isNumber;
}

export default isValidNumber;
