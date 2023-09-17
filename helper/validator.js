
const validator = {
    prepare : function (param) {
        return param ? ` '${param}' `: null
    },
    mustNotEmpty : function (param) {
        if (!param) {
            throw new Error('can not be null or undefined or empty string')
        }
        return;
    }
}
export default validator