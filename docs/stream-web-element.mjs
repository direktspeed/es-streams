/**
 * The Swiss Army Knif for WebComponents / CustomElements and Server Side Rendered Output
 * In a Streaming Reactiv API
 * 
 * This Combines WebComponents with @direktspeed/streams and @direktspeed/tag-html to form Stealify-ui
 */
const HTMLElementExists = typeof HTMLElement !== 'undefined';
const ifHTMLElement = HTMLElementExists ? HTMLElement : class HTMLElement { }
export { ifHTMLElement as HTMLElement };
const ifNode = f => typeof window === 'undefined' ? f() : '';
//import { createAdapter, map, runEffect, now } from '@direktspeed/stream'
import { createAdapter, map, runEffects, now, tap, never, empty, newDefaultScheduler } from '../dist/core.mjs'

//import('../dist/core.mjs').then(({ createAdapter, map, runEffect, now }) => {
const customElementsToStream = (el) => {
    if (HTMLElementExists) {
        /* TODO: Redesign connected to be a stream of connected with disposeable disconnected */
        const [connectedCallback, connected] = createAdapter();
        Object.assign(el, { connectedCallback, connected });
        
        const [disconnectedCallback, disconnected] = createAdapter();
        Object.assign(el, { disconnectedCallback, disconnected });
            
        const [adoptedCallback, adopted] = createAdapter();
        Object.assign(el, { adoptedCallback, adopted })
            
        const [attributeChangedCallback, attributeChanged] = createAdapter();
        // TODO: check if arrow works
        Object.assign(el, { attributeChangedCallback: function (name, oldValue, newValue) {
                attributeChangedCallback({ name, oldValue, newValue })
            }, attributeChanged
        })
        // Additional API Consideration 
        // el.connect = { connected, adopted, disconnected, attributeChanged }
    }
    //return { connected, adopted, disconnected,attributeChanged }
}

const MixInStream = (base) => {
    class StreamElement extends base {
        constructor() {
            super();
            // TODO: For better flexebility we should export target always?
            // TODO: if (super.connectedCallback) { super.connectedCallback().bind(this) } ???
    
            // Maping Callbacks to Streams
            customElementsToStream(this);
            
            // define Effects: render on connected or now
            runEffects(map(this.render, this.connected || now(this)),newDefaultScheduler());
        }
        render() {           
            this.innerHtml = `<h1></h1>`;
            return this.innerHtml;
        }
    }
}

class StreamElement extends ifHTMLElement {
    d = createAdapter();
    constructor() {
        super();
        customElementsToStream(this);
    }
}

// Do more with less :)
class customStreamElement extends StreamElement {
    constructor() {
        super();
        this.rendered = 0
        //async new customStreamElement().renderPromise.then(console.log)
        this.runEffects = runEffects(tap(this.view.bind(this), this.connected || now()), newDefaultScheduler()).then(()=>this)
        this.render = () => runEffects;
        
        //gernic runs update effects if in the browser with a first sync render
        //runEffects(tap(this.render.bind(this), this.connected || empty()), newDefaultScheduler())
        
    }
    //optional view stream that reacts on changes and calls render
    //optional render method
    view() {
        this.rendered++
        // Isomorphic render function that returns html and sets it for web
        return this.innerHTML = `<h1>connected ${this.rendered}</h1>`;
    }
}
// render is the render result of the component
// works also with nativ custom elements
async function registerElement(tag,Class,extend,render) {
    if (typeof customElements !== 'undefined') {
        try {
            customElements.define(tag, Class, extend)
        } catch (e) {
            console.log(e)
            return 
        } 
        //Returns
        return customElements.whenDefined(tag).then(() => customElements.get(tag))
    }    
    return `<${tag}>${typeof render !== 'undefined' ? render : ''}</${tag}>` 
}


function checkIfElementExists(tag) {
    typeof customElements === 'undefined' ? false : typeof customElements.get(tag) !== 'undefined';
}

class inHireCustomStreamElement extends StreamElement {
    constructor(tag,element) {
        super()
        // register custom-element
    }
    render() {
        // register the depdency
        //if (!checkIfElementExists('element-tag'))
        //return `<element-tag>${ifNode(new customStreamElement().render)} `
        const template = ``
    }
}

const m = new customStreamElement()
console.log(m)
setTimeout(() => console.log(m), 500)


//  }).catch(console.log)



// The Bare minimum
const myModule = {
    innerHTML: `<h2></h2>`
}


//extend a Stream element 
// const myElement = new StreamElement()
// tap(()=>myElement..., myElement.connected)