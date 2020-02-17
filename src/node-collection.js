let collect = ( value ) => {
    let collection, fragment
    collection = []

    if( value instanceof NodeCollection ){
        value.nodes.forEach(node => collection.push(node))
    }
    
    if( value instanceof Node ){
        collection = [value]
    }
    if( typeof value === 'string' ){
        collection = document.querySelectorAll(value)
    }

    fragment = document.createDocumentFragment()
    collection.forEach( node => fragment.appendChild(node) )
    return fragment
}

export class NodeCollection {

    constructor( nodes ){
        this.nodes = nodes || []
    }

    get length(){
        return this.nodes.length
    }

    get( index ){
        return this.nodes[index]
    }

    html( content ){
        if( content ){
            this.nodes.forEach(node => node.innerHTML = content)
            return this
        }
        return this.nodes[0].innerHTML
    }

    empty(){
        this.html('')
    }

    append( content ){
        let collection        
        
        collection = collect(content)
        this.nodes.forEach(node => { node.appendChild(collection) })

        return this
    }

    prepend( content ){
        let collection        
        
        collection = collect(content)
        this.nodes.forEach(node => { node.insertBefore(collection, node.firstChild) })
        
        return this
    }

    replace( content ){
        this.nodes.forEach( node =>{
            while( node.firstChild ){
                node.removeChild(node.firstChild)
            }
        })
        this.append(content)
    }

    attr( name, value ){
        if( value === undefined ){
            return this.nodes[0].getAttribute(name)
        }
        this.nodes.forEach(node => node.setAttribute(name, value))
        return this
    }

    addClass( className ){
        this.nodes.forEach(el => {
            if( !Array.from(el.classList).includes(className)){
                el.classList.add(`${className}`)
            }
        })
        return this
    }

    removeClass( className ){
        this.nodes.forEach(el => {
            el.classList.remove(className)
        })
        return this
    }

    toggleClass( toggleClass ){
        this.nodes.forEach(node => node.classList.toggle(toggleClass))
    }

    children(){
        let childrenArr = []
        this.nodes.forEach(el => childrenArr = childrenArr.concat(Array.from(el.children)))
        return new NodeCollection(childrenArr)
    }

    parent( selector ){
        const parentArr = []
        if( !selector ){
            this.nodes.forEach(el => parentArr.push(el.parentNode))
            return new NodeCollection(parentArr)
        }

        this.nodes.forEach( el =>{
            let parent = el.parentNode
            while( parent && parent !== document ){
                if( parent.matches(selector) ){
                    parentArr.push(parent)
                    return
                }
                parent = parent.parentNode
            }
        })

        return new NodeCollection(parentArr)

    }

    find( selector ){
        let foundNodes = []
        this.nodes.forEach(node => {
            foundNodes = foundNodes.concat(Array.from(node.querySelectorAll(selector)))
        })

        return new NodeCollection(foundNodes)
    }

    remove(){
        this.nodes.forEach(node => node.outerHTML = '')
        this.nodes = []
        return this
    }

    on( eventType, callback ){
        this.nodes.forEach(el => {
            if( el.eventHandlers === undefined) el.eventHandlers = {}
            if( el.eventHandlers[eventType] === undefined) el.eventHandlers[eventType] = []
            el.eventHandlers[eventType].push(callback)

            el.addEventListener(eventType, callback)
        })
        return this
    }

    off( eventType ){
        this.nodes.forEach(el => {
            if( el.eventHandlers !== undefined && el.eventHandlers[eventType] !== undefined ){
                el.eventHandlers[eventType].forEach(callback => el.removeEventListener(eventType, callback))
                el.eventHandlers[eventType] = []
            }
        })
        return this
    }

    unbind(){
        this.nodes.forEach( el => {
            if( el.eventHandlers ){
                for( let [eventType] of Object.entries(el.eventHandlers) ){
                    el.eventHandlers[eventType].forEach(callback => el.removeEventListener(eventType, callback))
                    el.eventHandlers[eventType] = []
                }
            }
        })
        let children
        children = this.children()
        if( children.length ){
            children.unbind()
        }
    }

    serializeForm(){
        let obj = {}
        
        this.nodes.reduce(( sequence, node ) => {
            return sequence.concat(Array.from(node.querySelectorAll('input, select, textarea')))
        }, [])
            .forEach( element =>{
                let name = element.name
                let value = element.value

                if( name ){
                    obj[name] = value
                }
            })

        return JSON.stringify(obj)
    }
}