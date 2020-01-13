import { fromDomEvent, newDefaultScheduler,combine, map, runEffects, startWith, tap, merge, createAdapter } from '../../src/core.mjs'

const fail = (s) => { throw new Error(s) }
const qs = (s, el) => el.querySelector(s) || fail(`${s} not found`)
const toNumber = e => Number(e.target.value || e.key || 0)

function isCapslock(e){
    const IS_MAC = /Mac/.test(navigator.platform);
    const {charCode, shiftKey} = e

    if (charCode >= 97 && charCode <= 122){
      capsLock = shiftKey;
    } else if (charCode >= 65 && charCode <= 90 
               && !(shiftKey && IS_MAC)){
      capsLock = !shiftKey;
    }

    return capsLock;
}

class InputAcceptsOnlyNumbers extends HTMLInputElement  {
    connectedCallback() {
        //Creates a Stream and its emit method
        const [emit, warnings] = createAdapter();
        const inputEventStream = fromDomEvent('input', this)
        const keydownEventStream = fromDomEvent('keydown', this)
        const value = startWith(0, map(toNumber, inputEventStream))
        
        // This should be a Stream but for this example its a function
        // That function calls emit to emit its results to the warnings Stream
        const allowOnlyNumbersToBeEnterd = e => { 
            if (!e.crtlKey) {
                //warningsNode.innerText = ''
                emit('')
                const allowedKeys = ['Slash','Arrow', 'Enter', 'Digit', 'Backspace', 'Delete', 'Home', 'Tab', 'Numpad']
                const isKey = allowedKeys.filter(k => e.code.indexOf(k) !== -1)
              
                if (isKey.length === 1) {                   
                    if (isKey[0] !== 'Digit' && isKey[0] !== 'Numpad') {
                        return
                    }
                    const num = toNumber(e);
                    if (!isNaN(num)) {
                        return e
                    }
                }
            }
            e.preventDefault();
            emit(e.key + ' is not allowed in this fild Only Numbers 1234567890')
            return e
        }
        
        runEffects(map(allowOnlyNumbersToBeEnterd, keydownEventStream), newDefaultScheduler())

        this.streams = {
            //Is Multicast
            warnings,
            //use this to Observe the Value
            value
        }
        
    }
}
customElements.define('input-accepts-only-numbers', InputAcceptsOnlyNumbers,{ extends: 'input' })

class AddInputsElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" })
        this.shadowRoot.innerHTML = `
        <style>
            form, input {
            font-family: "Lucida Console", Courier, monospace;;
            font-size: 42px;
            }
            input {
            width: 25%;
            color: red;
            border: none;
            border-bottom: 1px dotted #ccc;
            text-align: right;
            outline: none;
            }
            input:focus {
            border-bottom: 2px solid #999;
            color: #2a2;
            }
        </style>

        <form>
            <input is="input-accepts-only-numbers" type="number" class="a" autofocus> + <input is="input-accepts-only-numbers" type="number" class="b"> = <span class="sum"></span>
            <p class="warnings"></p>
        </form>`
    }
    connectedCallback() {
        // Display the result of adding two custom inputs that expose Streams.
        // Also Display conditional warnings if wrong input is done
        // The result is reactive its a Stream and updates whenever *either* input changes.
        const add = (a, b) => a + b
        const renderResult = resultNode => result => resultNode.textContent = result;
        const renderWarning = warningsNode => warning => warningsNode.innerText = warning;
        
        // select our dom elements querySelectorAll returns arrayLike we convert it to Array
        const inputs = [...this.shadowRoot.querySelectorAll('input')] //=> [aInput,bInput]
        const resultNode = qs('.sum', this.shadowRoot)
        const warningsNode = qs('.warnings', this.shadowRoot)
         
        // represent the current warnings of Inputs
        const warningsStreams = inputs.map(x => x.streams.warnings)
       
        // Start Observing the input filds
        const allWarnings = merge(...warningsStreams)
        const warningEffects = map(renderWarning(warningsNode), allWarnings);
        runEffects(warningEffects, newDefaultScheduler());

        // represent the current values of Inputs converted to number default value 0
        const valueStreams = inputs.map(x => x.streams.value)

        // result is the live current value of adding a and b
        const result = combine(add, ...valueStreams)

        // render the result
        const outputEffects = tap(renderResult(resultNode), result)

        // Run the app
        runEffects(outputEffects, newDefaultScheduler())
    }
}

customElements.define('add-input',AddInputsElement)