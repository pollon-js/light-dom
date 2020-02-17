/* @pollon/light-dom - v1.0.0
* https://github.com/pollon-js/light-dom#readme
* 2020 Francesco Lasaracina. Licensed ISC */
function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function n(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var t=[],r=!0,o=!1,i=void 0;try{for(var u,a=e[Symbol.iterator]();!(r=(u=a.next()).done)&&(t.push(u.value),!n||t.length!==n);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return t}(e,n)||function(e,n){if(!e)return;if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return t(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}var r=function(e){var n,t;return n=[],e instanceof o&&e.nodes.forEach((function(e){return n.push(e)})),e instanceof Node&&(n=[e]),"string"==typeof e&&(n=document.querySelectorAll(e)),t=document.createDocumentFragment(),n.forEach((function(e){return t.appendChild(e)})),t},o=function(){function t(e){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.nodes=e||[]}var o,i,u;return o=t,(i=[{key:"get",value:function(e){return this.nodes[e]}},{key:"html",value:function(e){return e?(this.nodes.forEach((function(n){return n.innerHTML=e})),this):this.nodes[0].innerHTML}},{key:"empty",value:function(){this.html("")}},{key:"append",value:function(e){var n;return n=r(e),this.nodes.forEach((function(e){e.appendChild(n)})),this}},{key:"prepend",value:function(e){var n;return n=r(e),this.nodes.forEach((function(e){e.insertBefore(n,e.firstChild)})),this}},{key:"replace",value:function(e){this.nodes.forEach((function(e){for(;e.firstChild;)e.removeChild(e.firstChild)})),this.append(e)}},{key:"attr",value:function(e,n){return void 0===n?this.nodes[0].getAttribute(e):(this.nodes.forEach((function(t){return t.setAttribute(e,n)})),this)}},{key:"addClass",value:function(e){return this.nodes.forEach((function(n){Array.from(n.classList).includes(e)||n.classList.add("".concat(e))})),this}},{key:"removeClass",value:function(e){return this.nodes.forEach((function(n){n.classList.remove(e)})),this}},{key:"toggleClass",value:function(e){this.nodes.forEach((function(n){return n.classList.toggle(e)}))}},{key:"children",value:function(){var e=[];return this.nodes.forEach((function(n){return e=e.concat(Array.from(n.children))})),new t(e)}},{key:"parent",value:function(e){var n=[];return e?(this.nodes.forEach((function(t){for(var r=t.parentNode;r&&r!==document;){if(r.matches(e))return void n.push(r);r=r.parentNode}})),new t(n)):(this.nodes.forEach((function(e){return n.push(e.parentNode)})),new t(n))}},{key:"find",value:function(e){var n=[];return this.nodes.forEach((function(t){n=n.concat(Array.from(t.querySelectorAll(e)))})),new t(n)}},{key:"remove",value:function(){return this.nodes.forEach((function(e){return e.outerHTML=""})),this.nodes=[],this}},{key:"on",value:function(e,n){return this.nodes.forEach((function(t){void 0===t.eventHandlers&&(t.eventHandlers={}),void 0===t.eventHandlers[e]&&(t.eventHandlers[e]=[]),t.eventHandlers[e].push(n),t.addEventListener(e,n)})),this}},{key:"off",value:function(e){return this.nodes.forEach((function(n){void 0!==n.eventHandlers&&void 0!==n.eventHandlers[e]&&(n.eventHandlers[e].forEach((function(t){return n.removeEventListener(e,t)})),n.eventHandlers[e]=[])})),this}},{key:"unbind",value:function(){var e;this.nodes.forEach((function(e){if(e.eventHandlers)for(var t=function(){var t=n(o[r],1)[0];e.eventHandlers[t].forEach((function(n){return e.removeEventListener(t,n)})),e.eventHandlers[t]=[]},r=0,o=Object.entries(e.eventHandlers);r<o.length;r++)t()})),(e=this.children()).length&&e.unbind()}},{key:"serializeForm",value:function(){var e={};return this.nodes.reduce((function(e,n){return e.concat(Array.from(n.querySelectorAll("input, select, textarea")))}),[]).forEach((function(n){var t=n.name,r=n.value;t&&(e[t]=r)})),JSON.stringify(e)}},{key:"length",get:function(){return this.nodes.length}}])&&e(o.prototype,i),u&&e(o,u),t}(),i=function e(n){if(!((t=n)&&1===t.nodeType||t&&11===t.nodeType||t&&9===t.nodeType))throw"Light DOM: the given scope is not an Element nor a DocumentFragment";var t;return{asCollection:function(){return new o([n])},one:function(e){return new o([n.querySelector(e)])},all:function(e){return new o(n.querySelectorAll(e))},in:function(t){var r=n.querySelector(t);if(n&&!n.contains(r))throw"Light DOM: "+t+" is not in the current scope";return e(r)}}};function u(e,n){setTimeout((function(){return e&&e.dispatchEvent(n)}),0)}i.element=function(e,n){var t,r;return t=document.createElement(e),r=n,n="object"==Object.prototype.toString.call(r).match(/^\[object\s(.*)\]$/)[1].toLowerCase()?n:{},Object.keys(n).forEach((function(e){return t.setAttribute(e,n[e])})),new o([t])};export{i as Query,u as dispatchEvent};