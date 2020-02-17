import { isObject } from './utils/is-object'
import { isNode } from './utils/is-node'
import { NodeCollection } from './node-collection'


let Query = function( scope ){
    if( !isNode(scope) ){
        throw 'Light DOM: the given scope is not an Element nor a DocumentFragment'
    }
    return {
        asCollection: ( () => new NodeCollection([scope]) ),
        one: ( selector => new NodeCollection([scope.querySelector(selector)]) ),
        all: ( selector => new NodeCollection(scope.querySelectorAll(selector)) ),
        in: ( selector ) => {
            let sub = scope.querySelector(selector)
            
            if( scope && !scope.contains(sub) ){
                throw 'Light DOM: '+ selector +' is not in the current scope'
            }                           
            return Query(sub)
        }
    }
}

Query.element = function( tagName, attrs ){
    let element

    element = document.createElement(tagName)
    attrs = isObject(attrs)? attrs : {}
    Object.keys(attrs).forEach((name) => element.setAttribute(name, attrs[name]))

    return new NodeCollection([element])
}

export {
    Query
}