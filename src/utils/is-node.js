export function isNode( input ){
    return (input && input.nodeType === 1) || (input && input.nodeType === 11) || (input && input.nodeType === 9)
}