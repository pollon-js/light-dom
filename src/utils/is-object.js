export function isObject( input ){
    return 'object' == Object.prototype.toString.call(input).match(/^\[object\s(.*)\]$/)[1].toLowerCase()
}