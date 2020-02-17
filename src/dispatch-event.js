export function dispatchEvent( element, event ){
    setTimeout(() =>{ return element && element.dispatchEvent(event) }, 0)
}
