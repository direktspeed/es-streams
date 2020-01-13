class STEALComponent extends HTMLElement {
  constructor () {
    super();
    // create a shadow root
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback () {
          // build a <template> element to inject
          //const template = document.createElement('template')
          // Helper to get HTMLDecoded Version of HTML Element Content
          //const htmlDecode = innerHTML => Object.assign(document.createElement('textarea'), {innerHTML}).value;
          // add the JS last, in a <script> tag, as well as wrapped by an IIFE
          // the IIFE ensures nothing leaks to the window
          //const JS = htmlDecode(this.innerHTML)
          //console.log(JS,{template});
          //template.innerHTML = '<script>(() => {})()</script>';
          //document.createElement('script')
          //console.log(template)

  }
}
//customElements.define('steal-module', STEALComponent)