const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM(<div><span>Old Text</span></div>);
const span = dom.window.document.querySelector('span');
span.textContent = "";
console.log(dom.window.document.body.innerHTML);
