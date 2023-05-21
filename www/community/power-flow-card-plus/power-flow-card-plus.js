function t(t,e,i,o){var n,l=arguments.length,r=l<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(l<3?n(r):l>3?n(e,i,r):n(e,i))||r);return l>3&&r&&Object.defineProperty(e,i,r),r}var e,i;function o(){return(o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o])}return t}).apply(this,arguments)}!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(e||(e={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(i||(i={}));var n=function(t,i,o){var n=i?function(t){switch(t.number_format){case e.comma_decimal:return["en-US","en"];case e.decimal_comma:return["de","es","it"];case e.space_comma:return["fr","sv","cs"];case e.system:return;default:return t.language}}(i):void 0;if(Number.isNaN=Number.isNaN||function t(e){return"number"==typeof e&&t(e)},(null==i?void 0:i.number_format)!==e.none&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(n,l(t,o)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,l(t,o)).format(Number(t))}return"string"==typeof t?t:function(t,e){return void 0===e&&(e=2),Math.round(t*Math.pow(10,e))/Math.pow(10,e)}(t,null==o?void 0:o.maximumFractionDigits).toString()+("currency"===(null==o?void 0:o.style)?" "+o.currency:"")},l=function(t,e){var i=o({maximumFractionDigits:2},e);if("string"!=typeof t)return i;if(!e||!e.minimumFractionDigits&&!e.maximumFractionDigits){var n=t.indexOf(".")>-1?t.split(".")[1].length:0;i.minimumFractionDigits=n,i.maximumFractionDigits=n}return i};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const r=window,a=r.ShadowRoot&&(void 0===r.ShadyCSS||r.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),d=new WeakMap;class c{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(a&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=d.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&d.set(e,t))}return t}toString(){return this.cssText}}const v=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1]),t[0]);return new c(i,t,s)},u=a?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new c("string"==typeof t?t:t+"",void 0,s))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var h;const p=window,y=p.trustedTypes,m=y?y.emptyScript:"",f=p.reactiveElementPolyfillSupport,_={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},g=(t,e)=>e!==t&&(e==e||t==t),b={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:g};class $ extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const o=this._$Ep(i,e);void 0!==o&&(this._$Ev.set(o,i),t.push(o))})),t}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const n=this[t];this[e]=o,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||b}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(u(t))}else void 0!==t&&e.push(u(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{a?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),o=r.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=b){var o;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const l=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:_).toAttribute(e,i.type);this._$El=t,null==l?this.removeAttribute(n):this.setAttribute(n,l),this._$El=null}}_$AK(t,e){var i;const o=this.constructor,n=o._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=o.getPropertyOptions(n),l="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:_;this._$El=n,this[n]=l.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let o=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||g)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var w;$.finalized=!0,$.elementProperties=new Map,$.elementStyles=[],$.shadowRootOptions={mode:"open"},null==f||f({ReactiveElement:$}),(null!==(h=p.reactiveElementVersions)&&void 0!==h?h:p.reactiveElementVersions=[]).push("1.6.1");const x=window,k=x.trustedTypes,E=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,C="?"+A,M=`<${C}>`,P=document,D=()=>P.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,j=Array.isArray,N="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,T=/>/g,H=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,I=/"/g,F=/^(?:script|style|textarea|title)$/i,W=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),L=W(1),V=W(2),B=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),G=new WeakMap,K=P.createTreeWalker(P,129,null,!1),Y=(t,e)=>{const i=t.length-1,o=[];let n,l=2===e?"<svg>":"",r=z;for(let e=0;e<i;e++){const i=t[e];let a,s,d=-1,c=0;for(;c<i.length&&(r.lastIndex=c,s=r.exec(i),null!==s);)c=r.lastIndex,r===z?"!--"===s[1]?r=R:void 0!==s[1]?r=T:void 0!==s[2]?(F.test(s[2])&&(n=RegExp("</"+s[2],"g")),r=H):void 0!==s[3]&&(r=H):r===H?">"===s[0]?(r=null!=n?n:z,d=-1):void 0===s[1]?d=-2:(d=r.lastIndex-s[2].length,a=s[1],r=void 0===s[3]?H:'"'===s[3]?I:U):r===I||r===U?r=H:r===R||r===T?r=z:(r=H,n=void 0);const v=r===H&&t[e+1].startsWith("/>")?" ":"";l+=r===z?i+M:d>=0?(o.push(a),i.slice(0,d)+S+i.slice(d)+A+v):i+A+(-2===d?(o.push(void 0),e):v)}const a=l+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==E?E.createHTML(a):a,o]};class q{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let n=0,l=0;const r=t.length-1,a=this.parts,[s,d]=Y(t,e);if(this.el=q.createElement(s,i),K.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(o=K.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes()){const t=[];for(const e of o.getAttributeNames())if(e.endsWith(S)||e.startsWith(A)){const i=d[l++];if(t.push(e),void 0!==i){const t=o.getAttribute(i.toLowerCase()+S).split(A),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?et:"?"===e[1]?ot:"@"===e[1]?nt:tt})}else a.push({type:6,index:n})}for(const e of t)o.removeAttribute(e)}if(F.test(o.tagName)){const t=o.textContent.split(A),e=t.length-1;if(e>0){o.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],D()),K.nextNode(),a.push({type:2,index:++n});o.append(t[e],D())}}}else if(8===o.nodeType)if(o.data===C)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=o.data.indexOf(A,t+1));)a.push({type:7,index:n}),t+=A.length-1}n++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,o){var n,l,r,a;if(e===B)return e;let s=void 0!==o?null===(n=i._$Co)||void 0===n?void 0:n[o]:i._$Cl;const d=O(e)?void 0:e._$litDirective$;return(null==s?void 0:s.constructor)!==d&&(null===(l=null==s?void 0:s._$AO)||void 0===l||l.call(s,!1),void 0===d?s=void 0:(s=new d(t),s._$AT(t,i,o)),void 0!==o?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[o]=s:i._$Cl=s),void 0!==s&&(e=J(t,s._$AS(t,e.values),s,o)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:o}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:P).importNode(i,!0);K.currentNode=n;let l=K.nextNode(),r=0,a=0,s=o[0];for(;void 0!==s;){if(r===s.index){let e;2===s.type?e=new X(l,l.nextSibling,this,t):1===s.type?e=new s.ctor(l,s.name,s.strings,this,t):6===s.type&&(e=new lt(l,this,t)),this._$AV.push(e),s=o[++a]}r!==(null==s?void 0:s.index)&&(l=K.nextNode(),r++)}return n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{constructor(t,e,i,o){var n;this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cp=null===(n=null==o?void 0:o.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),O(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>j(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==Z&&O(this._$AH)?this._$AA.nextSibling.data=t:this.$(P.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:o}=t,n="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=q.createElement(o.h,this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new Q(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new q(t)),e}T(t){j(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const n of t)o===e.length?e.push(i=new X(this.k(D()),this.k(D()),this,this.options)):i=e[o],i._$AI(n),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class tt{constructor(t,e,i,o,n){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Z}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,o){const n=this.strings;let l=!1;if(void 0===n)t=J(this,t,e,0),l=!O(t)||t!==this._$AH&&t!==B,l&&(this._$AH=t);else{const o=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=J(this,o[i+r],e,r),a===B&&(a=this._$AH[r]),l||(l=!O(a)||a!==this._$AH[r]),a===Z?t=Z:t!==Z&&(t+=(null!=a?a:"")+n[r+1]),this._$AH[r]=a}l&&!o&&this.j(t)}j(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Z?void 0:t}}const it=k?k.emptyScript:"";class ot extends tt{constructor(){super(...arguments),this.type=4}j(t){t&&t!==Z?this.element.setAttribute(this.name,it):this.element.removeAttribute(this.name)}}class nt extends tt{constructor(t,e,i,o,n){super(t,e,i,o,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=J(this,t,e,0))&&void 0!==i?i:Z)===B)return;const o=this._$AH,n=t===Z&&o!==Z||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,l=t!==Z&&(o===Z||n);n&&this.element.removeEventListener(this.name,this,o),l&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class lt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const rt=x.litHtmlPolyfillSupport;null==rt||rt(q,X),(null!==(w=x.litHtmlVersions)&&void 0!==w?w:x.litHtmlVersions=[]).push("2.7.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var at,st;class dt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var o,n;const l=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:e;let r=l._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;l._$litPart$=r=new X(e.insertBefore(D(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return B}}dt.finalized=!0,dt._$litElement$=!0,null===(at=globalThis.litElementHydrateSupport)||void 0===at||at.call(globalThis,{LitElement:dt});const ct=globalThis.litElementPolyfillSupport;null==ct||ct({LitElement:dt}),(null!==(st=globalThis.litElementVersions)&&void 0!==st?st:globalThis.litElementVersions=[]).push("3.3.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vt=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:o}=e;return{kind:i,elements:o,finisher(e){customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,ut=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function ht(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):ut(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function pt(t){return ht({...t,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function yt(t,e){return(({finisher:t,descriptor:e})=>(i,o)=>{var n;if(void 0===o){const o=null!==(n=i.originalKey)&&void 0!==n?n:i.key,l=null!=e?{kind:"method",placement:"prototype",key:o,descriptor:e(i.key)}:{...i,key:o};return null!=t&&(l.finisher=function(e){t(e,o)}),l}{const n=i.constructor;void 0!==e&&Object.defineProperty(i,o,e(o)),null==t||t(n,o)}})({descriptor:i=>{const o={get(){var e,i;return null!==(i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(e){const e="symbol"==typeof i?Symbol():"__"+i;o.get=function(){var i,o;return void 0===this[e]&&(this[e]=null!==(o=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(t))&&void 0!==o?o:null),this[e]}}return o}})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var mt;null===(mt=window.HTMLSlotElement)||void 0===mt||mt.prototype.assignedElements;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft=1;class _t{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends _t{constructor(t){var e;if(super(t),t.type!==ft||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){var i,o;if(void 0===this.it){this.it=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!(null===(i=this.nt)||void 0===i?void 0:i.has(t))&&this.it.add(t);return this.render(e)}const n=t.element.classList;this.it.forEach((t=>{t in e||(n.remove(t),this.it.delete(t))}));for(const t in e){const i=!!e[t];i===this.it.has(t)||(null===(o=this.nt)||void 0===o?void 0:o.has(t))||(i?(n.add(t),this.it.add(t)):(n.remove(t),this.it.delete(t)))}return B}}),bt=(t,e)=>Number(`${Math.round(Number(`${t}e${e}`))}e-${e}`)
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */;function $t(t){return!isNaN(parseFloat(t))&&!isNaN(Number(t))}function wt(t,e=0){return $t(t)?Number(t):e}function xt(t,e=/\s+/){const i=[];if(null!=t){const o=Array.isArray(t)?t:`${t}`.split(e);for(const t of o){const e=`${t}`.trim();e&&i.push(e)}}return i}var kt="0.1beta";console.groupCollapsed(`%c⚡ Power Flow Card Plus v${kt} is installed`,"color: #488fc2; font-weight: bold"),console.log("Readme:","https://github.com/flixlix/power-flow-card-plus"),console.groupEnd();const Et=function(t,e,i){var o;return void 0===i&&(i=!1),function(){var n=[].slice.call(arguments),l=this,r=i&&!o;clearTimeout(o),o=setTimeout((function(){o=null,i||t.apply(l,n)}),e),r&&t.apply(l,n)}}((t=>{console.log(`%c⚡ Power Flow Card Plus v${kt} %cError: ${t}`,"color: #488fc2; font-weight: bold","color: #b33a3a; font-weight: normal")}),6e4);const St=v`
  :host {
    --mdc-icon-size: 24px;
    --clickable-cursor: pointer;
    --individualone-color: #d0cc5b;
    --individualtwo-color: #964cb5;
    --non-fossil-color: var(--energy-non-fossil-color, #0f9d58);
    --icon-non-fossil-color: var(--non-fossil-color, #0f9d58);
    --icon-solar-color: var(--energy-solar-color, #ff9800);
    --icon-individualone-color: var(--individualone-color, #d0cc5b);
    --icon-individualtwo-color: var(--individualtwo-color, #964cb5);
    --icon-grid-color: var(--energy-grid-consumption-color, #488fc2);
    --icon-battery-color: var(--energy-battery-in-color, #f06292);
    --icon-home-color: var(--energy-grid-consumption-color, #488fc2);
    --text-solar-color: var(--primary-text-color);
    --text-non-fossil-color: var(--primary-text-color);
    --text-individualone-color: var(--primary-text-color);
    --text-individualtwo-color: var(--primary-text-color);
    --text-home-color: var(--primary-text-color);
    --secondary-text-individualone-color: var(--primary-text-color);
    --secondary-text-individualtwo-color: var(--primary-text-color);
    --text-battery-state-of-charge-color: var(--primary-text-color);
    --cirlce-grid-color: var(--energy-grid-consumption-color, #488fc2);
    --circle-battery-color: var(--energy-battery-in-color, #f06292);
    --secondary-text-solar-color: var(--primary-text-color);
    --secondary-text-grid-color: var(--primary-text-color);
    --secondary-text-home-color: var(--primary-text-color);
    --secondary-text-non-fossil-color: var(--primary-text-color);
    --lines-svg-not-flat-line-height: 106%;
    --lines-svg-not-flat-line-top: -3%;
  }
  :root {
  }
  .card-content {
    position: relative;
    margin: 0 auto;
  }

  .card-content,
  .row {
    max-width: 470px;
  }
  .lines {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 146px;
    display: flex;
    justify-content: center;
    padding: 0 16px 16px;
    box-sizing: border-box;
  }
  .lines.individual1-individual2 {
    bottom: 110px;
  }
  .lines.high {
    bottom: 100px;
    height: 156px;
  }
  .lines svg {
    width: calc(100% - 160px);
    height: 100%;
    max-width: 340px;
  }

  .lines svg:not(.flat-line) {
    width: calc(103% - 165px);
    height: var(--lines-svg-not-flat-line-height);
    top: var(--lines-svg-not-flat-line-top);
    position: relative;
  }

  .row {
    display: flex;
    justify-content: space-between;
    max-width: 500px;
    margin: 0 auto;
  }
  .circle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
  }
  .circle-container.solar {
    margin: 0 4px;
    height: 130px;
  }
  .circle-container.individual2 {
    margin-left: 4px;
    height: 130px;
  }
  .circle-container.individual1 {
    margin-left: 4px;
    height: 130px;
  }
  .circle-container.individual1.bottom {
    position: relative;
    top: -20px;
    margin-bottom: -20px;
  }
  .circle-container.battery {
    height: 110px;
    justify-content: flex-end;
  }
  .spacer {
    width: 84px;
  }
  .circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    box-sizing: border-box;
    border: 2px solid;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 12px;
    line-height: 12px;
    position: relative;
    text-decoration: none;
    color: var(--primary-text-color);
    // background-color: var(--card-background-color); /* hide overflowing lines behind background */
  }
  .circle-container .circle {
    cursor: var(--clickable-cursor);
  }
  #battery-grid {
    stroke: var(--energy-grid-return-color);
  }
  ha-icon {
    padding-bottom: 2px;
  }
  ha-icon.small {
    --mdc-icon-size: 12px;
  }
  .label {
    color: var(--secondary-text-color);
    font-size: 12px;
    max-width: 80px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  line,
  path {
    stroke: var(--disabled-text-color);
    stroke-width: 1;
    fill: none;
  }
  .circle svg {
    position: absolute;
    fill: none;
    stroke-width: 4px;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  span.secondary-info {
    color: var(--primary-text-color);
    font-size: 12px;
    max-width: 60px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .individual2 path,
  .individual2 circle {
    stroke: var(--individualtwo-color);
  }

  #individual1-icon {
    color: var(--icon-individualone-color);
  }
  #individual2-icon {
    color: var(--icon-individualtwo-color);
  }
  #solar-icon {
    color: var(--icon-solar-color);
  }
  circle.individual2 {
    stroke-width: 4;
    fill: var(--individualtwo-color);
  }
  .individual2 .circle {
    border-color: var(--individualtwo-color);
  }
  .individual1 path,
  .individual1 circle {
    stroke: var(--individualone-color);
  }
  circle.individual1 {
    stroke-width: 4;
    fill: var(--individualone-color);
  }
  .individual1 .circle {
    border-color: var(--individualone-color);
  }
  .circle-container.low-carbon {
    margin-right: 4px;
    height: 130px;
  }
  .low-carbon path {
    stroke: var(--non-fossil-color);
  }
  .low-carbon .circle {
    border-color: var(--non-fossil-color);
  }
  .low-carbon ha-icon:not(.small) {
    color: var(--icon-non-fossil-color);
  }
  circle.low-carbon {
    stroke-width: 4;
    fill: var(--non-fossil-color);
    stroke: var(--non-fossil-color);
  }
  .solar {
    color: var(--primary-text-color);
  }
  .solar .circle {
    border-color: var(--energy-solar-color);
  }
  .solar ha-icon:not(.small) {
    color: var(--icon-solar-color);
  }
  circle.solar,
  path.solar {
    stroke: var(--energy-solar-color);
  }
  circle.solar {
    stroke-width: 4;
    fill: var(--energy-solar-color);
  }
  .battery .circle {
    border-color: var(--circle-battery-color);
  }
  circle.battery,
  path.battery {
    stroke: var(--energy-battery-out-color);
  }
  path.battery-home,
  circle.battery-home {
    stroke: var(--energy-battery-out-color);
  }
  circle.battery-home {
    stroke-width: 4;
    fill: var(--energy-battery-out-color);
  }
  path.battery-solar,
  circle.battery-solar {
    stroke: var(--energy-battery-in-color);
  }
  circle.battery-solar {
    stroke-width: 4;
    fill: var(--energy-battery-in-color);
  }
  .battery-in {
    color: var(--energy-battery-in-color);
  }
  .battery-out {
    color: var(--energy-battery-out-color);
  }
  path.battery-from-grid {
    stroke: var(--energy-grid-consumption-color);
  }
  path.battery-to-grid {
    stroke: var(--energy-grid-return-color);
  }
  .battery ha-icon:not(.small) {
    color: var(--icon-battery-color);
  }

  path.return,
  circle.return,
  circle.battery-to-grid {
    stroke: var(--energy-grid-return-color);
  }
  circle.return,
  circle.battery-to-grid {
    stroke-width: 4;
    fill: var(--energy-grid-return-color);
  }
  .return {
    color: var(--energy-grid-return-color);
  }
  .grid .circle {
    border-color: var(--circle-grid-color);
  }
  .consumption {
    color: var(--energy-grid-consumption-color);
  }
  circle.grid,
  circle.battery-from-grid,
  path.grid {
    stroke: var(--energy-grid-consumption-color);
  }
  circle.grid,
  circle.battery-from-grid {
    stroke-width: 4;
    fill: var(--energy-grid-consumption-color);
  }
  .grid ha-icon:not(.small) {
    color: var(--icon-grid-color);
  }
  .home .circle {
    border-width: 0;
    border-color: var(--primary-color);
  }
  .home .circle.border {
    border-width: 2px;
  }
  .home ha-icon:not(.small) {
    color: var(--icon-home-color);
  }
  .circle svg circle {
    animation: rotate-in 0.6s ease-in;
    transition: stroke-dashoffset 0.4s, stroke-dasharray 0.4s;
    fill: none;
  }
  span.solar {
    color: var(--text-solar-color);
  }

  span.low-carbon {
    color: var(--text-non-fossil-color);
  }

  span.low-carbon.secondary-info {
    color: var(--secondary-text-non-fossil-color);
  }

  #home-circle {
    color: var(--text-home-color);
  }

  .individual1 .circle {
    color: var(--text-individualone-color);
  }

  .individual2 .circle {
    color: var(--text-individualtwo-color);
  }

  .individual1 span.secondary-info {
    color: var(--secondary-text-individualone-color);
  }

  .individual2 span.secondary-info {
    color: var(--secondary-text-individualtwo-color);
  }

  .solar span.secondary-info {
    color: var(--secondary-text-solar-color);
  }

  .grid span.secondary-info {
    color: var(--secondary-text-grid-color);
  }

  .home span.secondary-info {
    color: var(--secondary-text-home-color);
  }

  #battery-state-of-charge-text {
    color: var(--text-battery-state-of-charge-color);
  }

  @keyframes rotate-in {
    from {
      stroke-dashoffset: 238.76104;
      stroke-dasharray: 238.76104;
    }
  }

  .card-actions a {
    text-decoration: none;
  }
`,At=6,Ct=.75,Mt=0,Pt=1,Dt=.01,Ot=2e3,jt=1e3;const Nt=238.76104;!function(t){const e=window;e.customCards=e.customCards||[],e.customCards.push(Object.assign(Object.assign({},t),{preview:!0,documentationURL:"https://github.com/flixlix/power-flow-card-plus"}))}({type:"power-flow-card-plus",name:"Power Flow Card Plus",description:"An extended version of the power flow card with richer options, advanced features and a few small UI enhancements. Inspired by the Energy Dashboard."});let zt=class extends dt{constructor(){super(...arguments),this._config={},this._templateResults={},this._unsubRenderTemplates=new Map,this.unavailableOrMisconfiguredError=t=>Et(`Entity "${null!=t?t:"Unknown"}" is not available or misconfigured`),this.entityExists=t=>t in this.hass.states,this.entityAvailable=t=>{var e;return $t(null===(e=this.hass.states[t])||void 0===e?void 0:e.state)},this.entityInverted=t=>this._config.inverted_entities.includes(t),this.previousDur={},this.circleRate=(t,e)=>{var i,o;if(this._config.use_new_flow_rate_model){const e=this._config.max_expected_power,i=this._config.min_expected_power,o=this._config.max_flow_rate,n=this._config.min_flow_rate;return this.mapRange(t,o,n,i,e)}const n=null===(i=this._config)||void 0===i?void 0:i.min_flow_rate,l=null===(o=this._config)||void 0===o?void 0:o.max_flow_rate;return l-(t/e!=0?e:1)*(l-n)},this.getEntityStateObj=t=>{if(t&&this.entityAvailable(t))return this.hass.states[t];this.unavailableOrMisconfiguredError(t)},this.additionalCircleRate=(t,e)=>!0===t&&e?e:$t(t)?t:1.66,this.getEntityState=t=>t&&this.entityAvailable(t)?wt(this.hass.states[t].state):(this.unavailableOrMisconfiguredError(t),0),this.getEntityStateWatts=t=>{var e;if(!t||!this.entityAvailable(t))return this.unavailableOrMisconfiguredError(t),0;const i=this.hass.states[t],o=wt(i.state);return(null===(e=i.attributes.unit_of_measurement)||void 0===e?void 0:e.toUpperCase().startsWith("KW"))?1e3*o:o},this.displayNonFossilState=(t,e)=>{var i,o,n,l,r;if(!t||!this.entityAvailable(t))return this.unavailableOrMisconfiguredError(t),"NaN";const a=null===(o=null===(i=this._config.entities.fossil_fuel_percentage)||void 0===i?void 0:i.unit_white_space)||void 0===o||o,s="percentage"===(null===(n=this._config.entities.fossil_fuel_percentage)||void 0===n?void 0:n.state_type)?"%":"W",d=1-this.getEntityState(t)/100;let c,v;c="string"==typeof this._config.entities.grid.entity?e:this.getEntityStateWatts(this._config.entities.grid.entity.consumption)||0;const u=null!==(r=null===(l=this._config.entities.fossil_fuel_percentage)||void 0===l?void 0:l.display_zero_tolerance)&&void 0!==r?r:0;if("W"===s){let t=c*d;u&&t<u&&(t=0),v=this.displayValue(t,void 0,a)}else{let e=100-this.getEntityState(t);u&&e<u&&(e=0),v=e.toFixed(0).toString().concat(!1===a?"":" ").concat(s)}return v},this.displayValue=(t,e,i)=>{if(null===t)return"0";if(Number.isNaN(+t))return t;const o=Number(t),l=void 0===e&&o>=this._config.watt_threshold;return`${n(l?bt(o/1e3,this._config.kw_decimals):bt(o,this._config.w_decimals),this.hass.locale)}${!1===i?"":" "}${e||(l?"kW":"W")}`}}setConfig(t){var e,i,o,n,l,r;if(!t.entities||!(null===(i=null===(e=t.entities)||void 0===e?void 0:e.battery)||void 0===i?void 0:i.entity)&&!(null===(n=null===(o=t.entities)||void 0===o?void 0:o.grid)||void 0===n?void 0:n.entity)&&!(null===(r=null===(l=t.entities)||void 0===l?void 0:l.solar)||void 0===r?void 0:r.entity))throw new Error("At least one entity for battery, grid or solar must be defined");this._config=Object.assign(Object.assign({},t),{inverted_entities:xt(t.inverted_entities,","),kw_decimals:wt(t.kw_decimals,Pt),min_flow_rate:wt(t.min_flow_rate,Ct),max_flow_rate:wt(t.max_flow_rate,At),w_decimals:wt(t.w_decimals,Mt),watt_threshold:wt(t.watt_threshold,jt),max_expected_power:wt(t.max_expected_power,Ot),min_expected_power:wt(t.min_expected_power,Dt)})}connectedCallback(){super.connectedCallback(),this._tryConnectAll()}disconnectedCallback(){this._tryDisconnectAll()}static async getConfigElement(){return await Promise.resolve().then((function(){return _e})),document.createElement("power-flow-card-plus-editor")}static getStubConfig(t){return function(t){function e(e,i){const o=t.states[e].attributes.friendly_name;return i.some((t=>e.includes(t)||(null==o?void 0:o.includes(t))))}const i=Object.keys(t.states).filter((e=>{const i=t.states[e];return i.state&&i.attributes&&"power"===i.attributes.device_class||i.entity_id.includes("power")})),o=["grid","utility","net","meter"],n=["solar","pv","photovoltaic","inverter"],l=["battery"],r=["battery_percent","battery_level","state_of_charge","soc","percentage"],a=i.filter((t=>e(t,o)))[0],s=i.filter((t=>e(t,n)))[0],d=i.filter((t=>e(t,l)))[0],c=Object.keys(t.states).filter((e=>{const i=t.states[e];return i&&i.state&&i.attributes&&"%"===i.attributes.unit_of_measurement})).filter((t=>e(t,r)))[0];return{entities:{battery:{entity:null!=d?d:"",state_of_charge:null!=c?c:""},grid:a?{entity:a}:void 0,solar:s?{entity:s,display_zero_state:!0}:void 0},clickable_entities:!0,display_zero_lines:!0,use_new_flow_rate_model:!0,w_decimals:Mt,kw_decimals:Pt,min_flow_rate:Ct,max_flow_rate:At,max_expected_power:Ot,min_expected_power:Dt,watt_threshold:jt}}(t)}getCardSize(){return 3}mapRange(t,e,i,o,n){return t>n?i:(t-o)*(i-e)/(n-o)+e}openDetails(t){if(!t||!this._config.clickable_entities)return;if(!this.entityExists(t))return;const e=new CustomEvent("hass-more-info",{composed:!0,detail:{entityId:t}});this.dispatchEvent(e)}hasField(t,e){var i,o;return!!(void 0!==t&&!0===(null==t?void 0:t.display_zero)||this.getEntityStateWatts(null==t?void 0:t.entity)>(null!==(i=null==t?void 0:t.display_zero_tolerance)&&void 0!==i?i:0)&&this.entityAvailable(null==t?void 0:t.entity)||e)&&"string"==typeof(null===(o=this.hass.states[null==t?void 0:t.entity])||void 0===o?void 0:o.state)}showLine(t){var e;return!1!==(null===(e=this._config)||void 0===e?void 0:e.display_zero_lines)||t>0}render(){var t,e,i,o,l,r,a,s,d,c,v,u,h,p,y,m,f,_,g,b,$,w,x,k,E,S,A,C,M,P,D,O,j,N,z,R,T,H,U,I,F,W,B,Z,G,K,Y,q,J,Q,X,tt,et,it,ot,nt,lt,rt,at,st,dt,ct,vt,ut,ht,pt,yt,mt,ft,_t,bt,$t,xt,kt,Et,St,At,Ct,Mt,Pt,Dt,Ot,jt,zt,Rt,Tt,Ht,Ut,It,Ft,Wt,Lt,Vt,Bt,Zt,Gt,Kt,Yt,qt,Jt,Qt,Xt,te,ee,ie,oe,ne,le,re,ae,se,de,ce,ve,ue,he,pe,ye,me,fe,_e,ge,be,$e,we,xe,ke,Ee,Se,Ae,Ce,Me,Pe,De,Oe,je,Ne,ze,Re,Te,He,Ue,Ie,Fe,We,Le,Ve,Be,Ze,Ge,Ke,Ye,qe,Je,Qe,Xe,ti,ei,ii,oi,ni,li,ri,ai,si,di,ci,vi,ui,hi,pi,yi,mi,fi,_i,gi,bi,$i,wi,xi,ki,Ei,Si,Ai,Ci,Mi,Pi,Di,Oi,ji,Ni,zi,Ri,Ti,Hi,Ui,Ii,Fi,Wi,Li,Vi,Bi,Zi,Gi,Ki,Yi,qi,Ji,Qi,Xi,to,eo,io,oo,no,lo,ro,ao,so,co,vo,uo,ho,po,yo,mo,fo,_o,go,bo,$o,wo,xo,ko,Eo,So,Ao,Co,Mo,Po,Do,Oo,jo,No,zo,Ro,To,Ho,Uo,Io,Fo,Wo,Lo,Vo,Bo,Zo,Go,Ko,Yo,qo,Jo,Qo,Xo;if(!this._config||!this.hass)return L``;const{entities:tn}=this._config;function en(t){return"#".concat(t.map((t=>t.toString(16).padStart(2,"0"))).join(""))}this.style.setProperty("--clickable-cursor",this._config.clickable_entities?"pointer":"default");const on=void 0!==(null===(t=null==tn?void 0:tn.grid)||void 0===t?void 0:t.entity),nn=this.hasField(null===(e=tn.grid)||void 0===e?void 0:e.power_outage,!0)&&this.hass.states[tn.grid.power_outage.entity].state===(null!==(o=null===(i=tn.grid)||void 0===i?void 0:i.power_outage.state_alert)&&void 0!==o?o:"on"),ln=void 0!==(null===(l=null==tn?void 0:tn.battery)||void 0===l?void 0:l.entity),rn=this.hasField(tn.individual2),an=this.hasField(null===(r=tn.individual2)||void 0===r?void 0:r.secondary_info,!0),sn=this.hasField(tn.individual1),dn=this.hasField(null===(a=tn.individual1)||void 0===a?void 0:a.secondary_info,!0),cn=void 0!==tn.solar,vn=this.hasField(null===(s=tn.solar)||void 0===s?void 0:s.secondary_info),un=this.hasField(null===(d=tn.home)||void 0===d?void 0:d.secondary_info),hn=on&&("string"==typeof tn.grid.entity||tn.grid.entity.production);let pn=0,yn=0,mn=null===(v=null===(c=this._config.entities.grid)||void 0===c?void 0:c.color)||void 0===v?void 0:v.consumption;void 0!==mn&&("object"==typeof mn&&(mn=en(mn)),this.style.setProperty("--energy-grid-consumption-color",mn||"var(--energy-grid-consumption-color)")),on&&(pn="string"==typeof tn.grid.entity?this.entityInverted("grid")?Math.abs(Math.min(this.getEntityStateWatts(null===(u=tn.grid)||void 0===u?void 0:u.entity),0)):Math.max(this.getEntityStateWatts(null===(h=tn.grid)||void 0===h?void 0:h.entity),0):this.getEntityStateWatts(tn.grid.entity.consumption)),void 0!==(null===(p=this._config.entities.grid)||void 0===p?void 0:p.display_zero_tolerance)&&(pn=pn>(null===(y=this._config.entities.grid)||void 0===y?void 0:y.display_zero_tolerance)?pn:0);const fn=this.hasField(null===(m=tn.grid)||void 0===m?void 0:m.secondary_info);let _n=null;if(fn){const t=this.hass.states[null!==(g=null===(_=null===(f=this._config.entities.grid)||void 0===f?void 0:f.secondary_info)||void 0===_?void 0:_.entity)&&void 0!==g?g:0],e=Number(t.state);_n=this.entityInverted("gridSecondary")?Math.abs(Math.min(e,0)):Math.max(e,0)}let gn=null===($=null===(b=this._config.entities.grid)||void 0===b?void 0:b.color)||void 0===$?void 0:$.production;void 0!==gn&&("object"==typeof gn&&(gn=en(gn)),this.style.setProperty("--energy-grid-return-color",gn||"#a280db")),hn&&(yn="string"==typeof tn.grid.entity?this.entityInverted("grid")?Math.max(this.getEntityStateWatts(tn.grid.entity),0):Math.abs(Math.min(this.getEntityStateWatts(tn.grid.entity),0)):this.getEntityStateWatts(null===(w=tn.grid)||void 0===w?void 0:w.entity.production)),void 0!==(null===(x=this._config.entities.grid)||void 0===x?void 0:x.display_zero_tolerance)&&(yn=yn>(null===(k=this._config.entities.grid)||void 0===k?void 0:k.display_zero_tolerance)?yn:0);const bn="object"==typeof(null===(E=tn.grid)||void 0===E?void 0:E.entity)?tn.grid.entity.consumption||tn.grid.entity.production:null===(S=tn.grid)||void 0===S?void 0:S.entity,$n=nn?(null===(P=tn.grid)||void 0===P?void 0:P.power_outage.icon_alert)||"mdi:transmission-tower-off":(null===(A=tn.grid)||void 0===A?void 0:A.icon)||(null===(C=tn.grid)||void 0===C?void 0:C.use_metadata)&&(null===(M=this.getEntityStateObj(bn))||void 0===M?void 0:M.attributes.icon)||"mdi:transmission-tower",wn=(null===(D=tn.grid)||void 0===D?void 0:D.name)||(null===(O=tn.grid)||void 0===O?void 0:O.use_metadata)&&(null===(j=this.getEntityStateObj(bn))||void 0===j?void 0:j.attributes.friendly_name)||this.hass.localize("ui.panel.lovelace.cards.energy.energy_distribution.grid"),xn=null===(N=tn.grid)||void 0===N?void 0:N.color_icon;this.style.setProperty("--icon-grid-color","consumption"===xn?"var(--energy-grid-consumption-color)":"production"===xn?"var(--energy-grid-return-color)":!0===xn?pn>=yn?"var(--energy-grid-consumption-color)":"var(--energy-grid-return-color)":"var(--primary-text-color)");const kn=null===(R=null===(z=this._config.entities.grid)||void 0===z?void 0:z.secondary_info)||void 0===R?void 0:R.color_value;this.style.setProperty("--secondary-text-grid-color","consumption"===kn?"var(--energy-grid-consumption-color)":"production"===kn?"var(--energy-grid-return-color)":!0===kn?pn>=yn?"var(--energy-grid-consumption-color)":"var(--energy-grid-return-color)":"var(--primary-text-color)");const En=null===(T=this._config.entities.grid)||void 0===T?void 0:T.color_circle;this.style.setProperty("--circle-grid-color","consumption"===En?"var(--energy-grid-consumption-color)":"production"===En?"var(--energy-grid-return-color)":!0===En?pn>=yn?"var(--energy-grid-consumption-color)":"var(--energy-grid-return-color)":"var(--energy-grid-consumption-color)");const Sn=function(t){const e=getComputedStyle(t||document.body),{width:i}=e,o=parseFloat(i);return Number.isNaN(o)?0:o}(document.getElementById("card-content"))>420;this.style.setProperty("--lines-svg-not-flat-line-height",Sn?"106%":"102%"),this.style.setProperty("--lines-svg-not-flat-line-top",Sn?"-3%":"-1%");let An=null,Cn=null;const Mn=(null===(H=this._config.entities.individual1)||void 0===H?void 0:H.name)||(null===(I=this.getEntityStateObj(null===(U=tn.individual1)||void 0===U?void 0:U.entity))||void 0===I?void 0:I.attributes.friendly_name)||"Car",Pn=(null===(F=this._config.entities.individual1)||void 0===F?void 0:F.icon)||(null===(B=this.getEntityStateObj(null===(W=tn.individual1)||void 0===W?void 0:W.entity))||void 0===B?void 0:B.attributes.icon)||"mdi:car-electric";let Dn=null===(Z=this._config.entities.individual1)||void 0===Z?void 0:Z.color;if(void 0!==Dn&&("object"==typeof Dn&&(Dn=en(Dn)),this.style.setProperty("--individualone-color",Dn)),this.style.setProperty("--icon-individualone-color",(null===(G=this._config.entities.individual1)||void 0===G?void 0:G.color_icon)?"var(--individualone-color)":"var(--primary-text-color)"),sn){const t=this.hass.states[null===(K=this._config.entities.individual1)||void 0===K?void 0:K.entity],e=Number(t.state);An=this.entityInverted("individual1")?Math.abs(Math.min(e,0)):Math.max(e,0)}if(dn){const t=this.hass.states[null===(q=null===(Y=this._config.entities.individual1)||void 0===Y?void 0:Y.secondary_info)||void 0===q?void 0:q.entity].state;"number"==typeof t?Cn=this.entityInverted("individual1Secondary")?Math.abs(Math.min(t,0)):Math.max(t,0):"string"==typeof t&&(Cn=t)}let On=null,jn=null;const Nn=(null===(J=this._config.entities.individual2)||void 0===J?void 0:J.name)||(null===(X=this.getEntityStateObj(null===(Q=tn.individual2)||void 0===Q?void 0:Q.entity))||void 0===X?void 0:X.attributes.friendly_name)||"Motorcycle",zn=(null===(tt=this._config.entities.individual2)||void 0===tt?void 0:tt.icon)||(null===(it=this.getEntityStateObj(null===(et=tn.individual2)||void 0===et?void 0:et.entity))||void 0===it?void 0:it.attributes.icon)||"mdi:motorbike-electric";let Rn=null===(ot=this._config.entities.individual2)||void 0===ot?void 0:ot.color;if(void 0!==Rn&&("object"==typeof Rn&&(Rn=en(Rn)),this.style.setProperty("--individualtwo-color",Rn)),this.style.setProperty("--icon-individualtwo-color",(null===(nt=this._config.entities.individual2)||void 0===nt?void 0:nt.color_icon)?"var(--individualtwo-color)":"var(--primary-text-color)"),rn){const t=this.hass.states[null===(lt=this._config.entities.individual2)||void 0===lt?void 0:lt.entity],e=Number(t.state);On=this.entityInverted("individual2")?Math.abs(Math.min(e,0)):Math.max(e,0)}if(an){const t=this.hass.states[null===(at=null===(rt=this._config.entities.individual2)||void 0===rt?void 0:rt.secondary_info)||void 0===at?void 0:at.entity].state;"number"==typeof t?jn=this.entityInverted("individual2Secondary")?Math.abs(Math.min(t,0)):Math.max(t,0):"string"==typeof t&&(jn=t)}let Tn=null;if(vn){const t=this.hass.states[null===(dt=null===(st=this._config.entities.solar)||void 0===st?void 0:st.secondary_info)||void 0===dt?void 0:dt.entity],e=Number(t.state);Tn=this.entityInverted("solarSecondary")?Math.abs(Math.min(e,0)):Math.max(e,0)}let Hn=null;if(un){const t=this.hass.states[null===(vt=null===(ct=this._config.entities.home)||void 0===ct?void 0:ct.secondary_info)||void 0===vt?void 0:vt.entity],e=Number(t.state);Hn=this.entityInverted("homeSecondary")?Math.abs(Math.min(e,0)):Math.max(e,0)}let Un=0;if(void 0!==(null===(ut=this._config.entities.solar)||void 0===ut?void 0:ut.color)){let t=null===(ht=this._config.entities.solar)||void 0===ht?void 0:ht.color;"object"==typeof t&&(t=en(t)),this.style.setProperty("--energy-solar-color",t||"#ff9800")}this.style.setProperty("--icon-solar-color",(null===(pt=this._config.entities.solar)||void 0===pt?void 0:pt.color_icon)?"var(--energy-solar-color)":"var(--primary-text-color)"),cn&&(Un=this.entityInverted("solar")?Math.abs(Math.min(this.getEntityStateWatts(null===(yt=tn.solar)||void 0===yt?void 0:yt.entity),0)):Math.max(this.getEntityStateWatts(null===(mt=tn.solar)||void 0===mt?void 0:mt.entity),0),(null===(ft=tn.solar)||void 0===ft?void 0:ft.display_zero_tolerance)&&tn.solar.display_zero_tolerance>=Un&&(Un=0));let In=0,Fn=0;ln&&("string"==typeof(null===(_t=tn.battery)||void 0===_t?void 0:_t.entity)?(In=this.entityInverted("battery")?Math.max(this.getEntityStateWatts(tn.battery.entity),0):Math.abs(Math.min(this.getEntityStateWatts(tn.battery.entity),0)),Fn=this.entityInverted("battery")?Math.abs(Math.min(this.getEntityStateWatts(tn.battery.entity),0)):Math.max(this.getEntityStateWatts(tn.battery.entity),0)):(In=this.getEntityStateWatts(null===($t=null===(bt=tn.battery)||void 0===bt?void 0:bt.entity)||void 0===$t?void 0:$t.production),Fn=this.getEntityStateWatts(null===(kt=null===(xt=tn.battery)||void 0===xt?void 0:xt.entity)||void 0===kt?void 0:kt.consumption)),(null===(Et=null==tn?void 0:tn.battery)||void 0===Et?void 0:Et.display_zero_tolerance)&&(tn.battery.display_zero_tolerance>=In&&(In=0),tn.battery.display_zero_tolerance>=Fn&&(Fn=0)));let Wn=null;cn&&(Wn=Un-(null!=yn?yn:0)-(null!=In?In:0));let Ln=null,Vn=null;null!==Wn&&Wn<0&&(ln&&(Ln=Math.abs(Wn),Ln>pn&&(Vn=Math.min(Ln-pn,0),Ln=pn)),Wn=0);let Bn=null;cn&&ln?(Vn||(Vn=Math.max(0,(yn||0)-(Un||0)-(In||0)-(Ln||0))),Bn=In-(Ln||0)):!cn&&ln&&(Vn=yn);let Zn=0;cn&&yn&&(Zn=yn-(null!=Vn?Vn:0));let Gn=0;ln&&(Gn=(null!=Fn?Fn:0)-(null!=Vn?Vn:0));let Kn=null===(At=null===(St=this._config.entities.battery)||void 0===St?void 0:St.color)||void 0===At?void 0:At.consumption;void 0!==Kn&&("object"==typeof Kn&&(Kn=en(Kn)),this.style.setProperty("--energy-battery-out-color",Kn||"#4db6ac"));let Yn=null===(Mt=null===(Ct=this._config.entities.battery)||void 0===Ct?void 0:Ct.color)||void 0===Mt?void 0:Mt.production;void 0!==Yn&&("object"==typeof Yn&&(Yn=en(Yn)),this.style.setProperty("--energy-battery-in-color",Yn||"#a280db"));const qn="object"==typeof(null===(Pt=tn.battery)||void 0===Pt?void 0:Pt.entity)?tn.battery.entity.consumption:null===(Dt=tn.battery)||void 0===Dt?void 0:Dt.entity,Jn=(null===(Ot=tn.battery)||void 0===Ot?void 0:Ot.name)||(null===(jt=tn.battery)||void 0===jt?void 0:jt.use_metadata)&&(null===(zt=this.getEntityStateObj(qn))||void 0===zt?void 0:zt.attributes.friendly_name)||this.hass.localize("ui.panel.lovelace.cards.energy.energy_distribution.battery"),Qn=null===(Rt=this._config.entities.battery)||void 0===Rt?void 0:Rt.color_icon;this.style.setProperty("--icon-battery-color","consumption"===Qn?"var(--energy-battery-in-color)":"production"===Qn?"var(--energy-battery-out-color)":!0===Qn?Fn>=In?"var(--energy-battery-out-color)":"var(--energy-battery-in-color)":"var(--primary-text-color)");const Xn=null===(Tt=this._config.entities.battery)||void 0===Tt?void 0:Tt.color_state_of_charge_value;this.style.setProperty("--text-battery-state-of-charge-color","consumption"===Xn?"var(--energy-battery-in-color)":"production"===Xn?"var(--energy-battery-out-color)":!0===Xn?Fn>=In?"var(--energy-battery-out-color)":"var(--energy-battery-in-color)":"var(--primary-text-color)");const tl=null===(Ht=this._config.entities.battery)||void 0===Ht?void 0:Ht.color_circle;this.style.setProperty("--circle-battery-color","consumption"===tl?"var(--energy-battery-in-color)":"production"===tl||!0===tl&&Fn>=In?"var(--energy-battery-out-color)":"var(--energy-battery-in-color)");const el=Math.max(pn-(null!=Ln?Ln:0),0),il=wt(An,0)+wt(On,0),ol=Math.max(el+(null!=Wn?Wn:0)+(null!=Gn?Gn:0),0);let nl=0;Gn&&(nl=Nt*(Gn/ol));let ll=0;cn&&(ll=Nt*(Wn/ol));const rl=this.hasField(null===(Ut=tn.fossil_fuel_percentage)||void 0===Ut?void 0:Ut.secondary_info,!0);let al=null;if(rl){const t=this.hass.states[null===(Ft=null===(It=this._config.entities.fossil_fuel_percentage)||void 0===It?void 0:It.secondary_info)||void 0===Ft?void 0:Ft.entity].state;"number"==typeof t?al=this.entityInverted("nonFossilSecondary")?Math.abs(Math.min(t,0)):Math.max(t,0):"string"==typeof t&&(al=t)}const sl=1*el-this.getEntityState(null===(Wt=tn.fossil_fuel_percentage)||void 0===Wt?void 0:Wt.entity)/100>0&&void 0!==(null===(Lt=tn.fossil_fuel_percentage)||void 0===Lt?void 0:Lt.entity)&&this.entityAvailable(null===(Vt=tn.fossil_fuel_percentage)||void 0===Vt?void 0:Vt.entity),dl=void 0!==(null===(Bt=tn.fossil_fuel_percentage)||void 0===Bt?void 0:Bt.entity)&&!0===(null===(Zt=tn.fossil_fuel_percentage)||void 0===Zt?void 0:Zt.display_zero)||sl;let cl,vl=0;if(sl){cl=el*(1-this.getEntityState(null===(Gt=tn.fossil_fuel_percentage)||void 0===Gt?void 0:Gt.entity)/100),vl=Nt*(cl/ol)}const ul=Nt*((ol-(null!=cl?cl:0)-(null!=Gn?Gn:0)-(null!=Wn?Wn:0))/ol),hl=el+(null!=Wn?Wn:0)+Zn+(null!=Bn?Bn:0)+(null!=Gn?Gn:0)+(null!=Ln?Ln:0)+(null!=Vn?Vn:0),pl=(null===(Yt=null===(Kt=tn.battery)||void 0===Kt?void 0:Kt.state_of_charge)||void 0===Yt?void 0:Yt.length)?this.getEntityState(null===(qt=tn.battery)||void 0===qt?void 0:qt.state_of_charge):null;let yl="mdi:battery-high";null===pl?yl="mdi:battery":pl<=72&&pl>44?yl="mdi:battery-medium":pl<=44&&pl>16?yl="mdi:battery-low":pl<=16&&(yl="mdi:battery-outline"),void 0!==(null===(Jt=tn.battery)||void 0===Jt?void 0:Jt.icon)&&(yl=null===(Qt=tn.battery)||void 0===Qt?void 0:Qt.icon);const ml={batteryGrid:this.circleRate(null!==(Xt=null!=Ln?Ln:Vn)&&void 0!==Xt?Xt:0,hl),batteryToHome:this.circleRate(null!=Gn?Gn:0,hl),gridToHome:this.circleRate(el,hl),solarToBattery:this.circleRate(null!=Bn?Bn:0,hl),solarToGrid:this.circleRate(Zn,hl),solarToHome:this.circleRate(null!=Wn?Wn:0,hl),individual1:this.circleRate(null!=An?An:0,il),individual2:this.circleRate(null!=On?On:0,il),nonFossil:this.circleRate(null!=cl?cl:0,hl)};["batteryGrid","batteryToHome","gridToHome","solarToBattery","solarToGrid","solarToHome"].forEach((t=>{const e=this[`${t}Flow`];e&&this.previousDur[t]&&this.previousDur[t]!==ml[t]&&(e.pauseAnimations(),e.setCurrentTime(e.getCurrentTime()*(ml[t]/this.previousDur[t])),e.unpauseAnimations()),this.previousDur[t]=ml[t]}));let fl=null===(te=this._config.entities.fossil_fuel_percentage)||void 0===te?void 0:te.color;void 0!==fl&&("object"==typeof fl&&(fl=en(fl)),this.style.setProperty("--non-fossil-color",fl||"var(--energy-non-fossil-color)")),this.style.setProperty("--icon-non-fossil-color",(null===(ee=this._config.entities.fossil_fuel_percentage)||void 0===ee?void 0:ee.color_icon)?"var(--non-fossil-color)":"var(--primary-text-color)");const _l=null===(ie=this._config.entities.home)||void 0===ie?void 0:ie.color_icon,gl={battery:{value:nl,color:"var(--energy-battery-out-color)"},solar:{value:ll,color:"var(--energy-solar-color)"},grid:{value:ul,color:"var(--energy-grid-consumption-color)"},gridNonFossil:{value:vl,color:"var(--energy-non-fossil-color)"}},bl=Object.keys(gl).reduce(((t,e)=>gl[t].value>gl[e].value?t:e));let $l="var(--primary-text-color)";"solar"===_l?$l="var(--energy-solar-color)":"battery"===_l?$l="var(--energy-battery-out-color)":"grid"===_l?$l="var(--energy-grid-consumption-color)":!0===_l&&($l=gl[bl].color),this.style.setProperty("--icon-home-color",$l);const wl=null===(oe=this._config.entities.home)||void 0===oe?void 0:oe.color_value;let xl="var(--primary-text-color)";"solar"===wl?xl="var(--energy-solar-color)":"battery"===wl?xl="var(--energy-battery-out-color)":"grid"===wl?xl="var(--energy-grid-consumption-color)":!0===wl&&(xl=gl[bl].color);const kl=(null===(ne=tn.solar)||void 0===ne?void 0:ne.icon)||(null===(le=tn.solar)||void 0===le?void 0:le.use_metadata)&&(null===(ae=null===(re=this.getEntityStateObj(tn.solar.entity))||void 0===re?void 0:re.attributes)||void 0===ae?void 0:ae.icon)||"mdi:solar-power",El=(null===(se=tn.solar)||void 0===se?void 0:se.name)||(null===(de=tn.solar)||void 0===de?void 0:de.use_metadata)&&(null===(ce=this.getEntityStateObj(tn.solar.entity))||void 0===ce?void 0:ce.attributes.friendly_name)||this.hass.localize("ui.panel.lovelace.cards.energy.energy_distribution.solar"),Sl=(null===(ve=tn.home)||void 0===ve?void 0:ve.icon)||(null===(ue=tn.home)||void 0===ue?void 0:ue.use_metadata)&&(null===(pe=null===(he=this.getEntityStateObj(tn.home.entity))||void 0===he?void 0:he.attributes)||void 0===pe?void 0:pe.icon)||"mdi:home",Al=(null===(ye=tn.home)||void 0===ye?void 0:ye.name)||(null===(me=tn.home)||void 0===me?void 0:me.use_metadata)&&(null===(fe=this.getEntityStateObj(tn.home.entity))||void 0===fe?void 0:fe.attributes.friendly_name)||this.hass.localize("ui.panel.lovelace.cards.energy.energy_distribution.home"),Cl=(null===(_e=tn.fossil_fuel_percentage)||void 0===_e?void 0:_e.icon)||(null===(ge=tn.fossil_fuel_percentage)||void 0===ge?void 0:ge.use_metadata)&&(null===($e=null===(be=this.getEntityStateObj(tn.fossil_fuel_percentage.entity))||void 0===be?void 0:be.attributes)||void 0===$e?void 0:$e.icon)||"mdi:leaf",Ml=(null===(we=tn.fossil_fuel_percentage)||void 0===we?void 0:we.name)||(null===(xe=tn.fossil_fuel_percentage)||void 0===xe?void 0:xe.use_metadata)&&(null===(ke=this.getEntityStateObj(tn.fossil_fuel_percentage.entity))||void 0===ke?void 0:ke.attributes.friendly_name)||this.hass.localize("ui.panel.lovelace.cards.energy.energy_distribution.low_carbon");this.style.setProperty("--text-home-color",xl),this.style.setProperty("--text-solar-color",(null===(Ee=this._config.entities.solar)||void 0===Ee?void 0:Ee.color_value)?"var(--energy-solar-color)":"var(--primary-text-color)"),this.style.setProperty("--text-non-fossil-color",(null===(Se=this._config.entities.fossil_fuel_percentage)||void 0===Se?void 0:Se.color_value)?"var(--energy-non-fossil-color)":"var(--primary-text-color)"),this.style.setProperty("--secondary-text-non-fossil-color",(null===(Ce=null===(Ae=this._config.entities.fossil_fuel_percentage)||void 0===Ae?void 0:Ae.secondary_info)||void 0===Ce?void 0:Ce.color_value)?"var(--energy-non-fossil-color)":"var(--primary-text-color)"),this.style.setProperty("--text-individualone-color",(null===(Me=this._config.entities.individual1)||void 0===Me?void 0:Me.color_value)?"var(--individualone-color)":"var(--primary-text-color)"),this.style.setProperty("--text-individualtwo-color",(null===(Pe=this._config.entities.individual2)||void 0===Pe?void 0:Pe.color_value)?"var(--individualtwo-color)":"var(--primary-text-color)"),this.style.setProperty("--secondary-text-individualone-color",(null===(Oe=null===(De=this._config.entities.individual1)||void 0===De?void 0:De.secondary_info)||void 0===Oe?void 0:Oe.color_value)?"var(--individualone-color)":"var(--primary-text-color)"),this.style.setProperty("--secondary-text-individualtwo-color",(null===(Ne=null===(je=this._config.entities.individual2)||void 0===je?void 0:je.secondary_info)||void 0===Ne?void 0:Ne.color_value)?"var(--individualtwo-color)":"var(--primary-text-color)"),this.style.setProperty("--secondary-text-solar-color",(null===(Re=null===(ze=this._config.entities.solar)||void 0===ze?void 0:ze.secondary_info)||void 0===Re?void 0:Re.color_value)?"var(--energy-solar-color)":"var(--primary-text-color)"),this.style.setProperty("--secondary-text-home-color",(null===(He=null===(Te=this._config.entities.home)||void 0===Te?void 0:Te.secondary_info)||void 0===He?void 0:He.color_value)?"var(--text-home-color)":"var(--primary-text-color)");const Pl=null===(Ue=this._templateResults.gridSecondary)||void 0===Ue?void 0:Ue.result,Dl=null===(Ie=this._templateResults.solarSecondary)||void 0===Ie?void 0:Ie.result,Ol=null===(Fe=this._templateResults.homeSecondary)||void 0===Fe?void 0:Fe.result,jl=null===(We=this._templateResults.individual1Secondary)||void 0===We?void 0:We.result,Nl=null===(Le=this._templateResults.individual2Secondary)||void 0===Le?void 0:Le.result,zl=null===(Ve=this._templateResults.nonFossilFuelSecondary)||void 0===Ve?void 0:Ve.result,Rl=(null===(Be=this._config.entities.home)||void 0===Be?void 0:Be.override_state)&&this._config.entities.home.entity?(null===(Ze=tn.home)||void 0===Ze?void 0:Ze.subtract_individual)?this.displayValue(this.getEntityStateWatts(tn.home.entity)-il):this.displayValue(this.getEntityStateWatts(tn.home.entity)):(null===(Ge=this._config.entities.home)||void 0===Ge?void 0:Ge.subtract_individual)?this.displayValue(ol-il||0):this.displayValue(ol);return L`
      <ha-card .header=${this._config.title}>
        <div class="card-content" id="card-content">
          ${cn||rn||sn||dl?L`<div class="row">
                ${dl?L`<div class="circle-container low-carbon">
                      <span class="label">${Ml}</span>
                      <div
                        class="circle"
                        @click=${t=>{var e;t.stopPropagation(),this.openDetails(null===(e=tn.fossil_fuel_percentage)||void 0===e?void 0:e.entity)}}
                        @keyDown=${t=>{var e;"Enter"===t.key&&(t.stopPropagation(),this.openDetails(null===(e=tn.fossil_fuel_percentage)||void 0===e?void 0:e.entity))}}
                      >
                        ${rl?L`
                              <span
                                class="secondary-info low-carbon"
                                @click=${t=>{var e,i;t.stopPropagation(),this.openDetails(null===(i=null===(e=tn.fossil_fuel_percentage)||void 0===e?void 0:e.secondary_info)||void 0===i?void 0:i.entity)}}
                                @keyDown=${t=>{var e,i;"Enter"===t.key&&(t.stopPropagation(),this.openDetails(null===(i=null===(e=tn.fossil_fuel_percentage)||void 0===e?void 0:e.secondary_info)||void 0===i?void 0:i.entity))}}
                              >
                                ${(null===(Ye=null===(Ke=tn.fossil_fuel_percentage)||void 0===Ke?void 0:Ke.secondary_info)||void 0===Ye?void 0:Ye.icon)?L`<ha-icon
                                      class="secondary-info small"
                                      .icon=${null===(Je=null===(qe=tn.fossil_fuel_percentage)||void 0===qe?void 0:qe.secondary_info)||void 0===Je?void 0:Je.icon}
                                    ></ha-icon>`:""}
                                ${this.displayValue(al,null===(Xe=null===(Qe=tn.fossil_fuel_percentage)||void 0===Qe?void 0:Qe.secondary_info)||void 0===Xe?void 0:Xe.unit_of_measurement,null===(ei=null===(ti=tn.fossil_fuel_percentage)||void 0===ti?void 0:ti.secondary_info)||void 0===ei?void 0:ei.unit_white_space)}
                              </span>
                            `:(null===(oi=null===(ii=tn.fossil_fuel_percentage)||void 0===ii?void 0:ii.secondary_info)||void 0===oi?void 0:oi.template)?L`<span class="secondary-info low-carbon"> ${zl} </span>`:""}
                        <ha-icon
                          .icon=${Cl}
                          class="low-carbon"
                          style="${rl?"padding-top: 2px;":"padding-top: 0px;"}
                          ${!1!==(null===(ni=tn.fossil_fuel_percentage)||void 0===ni?void 0:ni.display_zero_state)||(cl||0)>((null===(li=tn.fossil_fuel_percentage)||void 0===li?void 0:li.display_zero_tolerance)||0)?"padding-bottom: 2px;":"padding-bottom: 0px;"}"
                        ></ha-icon>
                        ${!1!==(null===(ri=tn.fossil_fuel_percentage)||void 0===ri?void 0:ri.display_zero_state)||(cl||0)>((null===(ai=tn.fossil_fuel_percentage)||void 0===ai?void 0:ai.display_zero_tolerance)||0)?L`
                              <span class="low-carbon">${this.displayNonFossilState(tn.fossil_fuel_percentage.entity,pn)}</span>
                            `:""}
                      </div>
                      ${this.showLine(cl||0)?L`
                            <svg width="80" height="30">
                              <path d="M40 -10 v40" class="low-carbon" id="low-carbon" />
                              ${sl?V`<circle
                              r="2.4"
                              class="low-carbon"
                              vector-effect="non-scaling-stroke"
                            >
                                <animateMotion
                                  dur="${this.additionalCircleRate(null===(si=tn.fossil_fuel_percentage)||void 0===si?void 0:si.calculate_flow_rate,ml.nonFossil)}s"
                                  repeatCount="indefinite"
                                  calcMode="linear"
                                >
                                  <mpath xlink:href="#low-carbon" />
                                </animateMotion>
                            </circle>`:""}
                            </svg>
                          `:""}
                    </div>`:L`<div class="spacer"></div>`}
                ${cn?L`<div class="circle-container solar">
                      <span class="label">${El}</span>
                      <div
                        class="circle"
                        @click=${t=>{t.stopPropagation(),this.openDetails(tn.solar.entity)}}
                        @keyDown=${t=>{"Enter"===t.key&&(t.stopPropagation(),this.openDetails(tn.solar.entity))}}
                      >
                        ${vn?L`
                              <span
                                class="secondary-info solar"
                                @click=${t=>{var e,i;t.stopPropagation(),this.openDetails(null===(i=null===(e=tn.solar)||void 0===e?void 0:e.secondary_info)||void 0===i?void 0:i.entity)}}
                                @keyDown=${t=>{var e,i;"Enter"===t.key&&(t.stopPropagation(),this.openDetails(null===(i=null===(e=tn.solar)||void 0===e?void 0:e.secondary_info)||void 0===i?void 0:i.entity))}}
                              >
                                ${(null===(ci=null===(di=tn.solar)||void 0===di?void 0:di.secondary_info)||void 0===ci?void 0:ci.icon)?L`<ha-icon class="secondary-info small" .icon=${null===(ui=null===(vi=tn.solar)||void 0===vi?void 0:vi.secondary_info)||void 0===ui?void 0:ui.icon}></ha-icon>`:""}
                                ${this.displayValue(Tn,null===(pi=null===(hi=tn.solar)||void 0===hi?void 0:hi.secondary_info)||void 0===pi?void 0:pi.unit_of_measurement,null===(mi=null===(yi=tn.solar)||void 0===yi?void 0:yi.secondary_info)||void 0===mi?void 0:mi.unit_white_space)}
                              </span>
                            `:(null===(_i=null===(fi=tn.solar)||void 0===fi?void 0:fi.secondary_info)||void 0===_i?void 0:_i.template)?L`<span class="secondary-info solar"> ${Dl} </span>`:""}

                        <ha-icon
                          id="solar-icon"
                          .icon=${kl}
                          style="${vn?"padding-top: 2px;":"padding-top: 0px;"}
                          ${!1!==(null===(gi=tn.solar)||void 0===gi?void 0:gi.display_zero_state)||(Un||0)>0?"padding-bottom: 2px;":"padding-bottom: 0px;"}"
                        ></ha-icon>
                        ${!1!==(null===(bi=tn.solar)||void 0===bi?void 0:bi.display_zero_state)||(Un||0)>0?L` <span class="solar"> ${this.displayValue(Un)}</span>`:""}
                      </div>
                    </div>`:rn||sn?L`<div class="spacer"></div>`:""}
                ${rn?L`<div class="circle-container individual2">
                      <span class="label">${Nn}</span>
                      <div
                        class="circle"
                        @click=${t=>{var e;t.stopPropagation(),this.openDetails(null===(e=tn.individual2)||void 0===e?void 0:e.entity)}}
                        @keyDown=${t=>{var e;"Enter"===t.key&&(t.stopPropagation(),this.openDetails(null===(e=tn.individual2)||void 0===e?void 0:e.entity))}}
                      >
                        ${an?L`
                              <span
                                class="secondary-info individual2"
                                @click=${t=>{var e,i;t.stopPropagation(),this.openDetails(null===(i=null===(e=tn.individual2)||void 0===e?void 0:e.secondary_info)||void 0===i?void 0:i.entity)}}
                                @keyDown=${t=>{var e,i;"Enter"===t.key&&(t.stopPropagation(),this.openDetails(null===(i=null===(e=tn.individual2)||void 0===e?void 0:e.secondary_info)||void 0===i?void 0:i.entity))}}
                              >
                                ${(null===(wi=null===($i=tn.individual2)||void 0===$i?void 0:$i.secondary_info)||void 0===wi?void 0:wi.icon)?L`<ha-icon class="secondary-info small" .icon=${null===(ki=null===(xi=tn.individual2)||void 0===xi?void 0:xi.secondary_info)||void 0===ki?void 0:ki.icon}></ha-icon>`:""}
                                ${this.displayValue(jn,null===(Si=null===(Ei=tn.individual2)||void 0===Ei?void 0:Ei.secondary_info)||void 0===Si?void 0:Si.unit_of_measurement,null===(Ci=null===(Ai=tn.individual2)||void 0===Ai?void 0:Ai.secondary_info)||void 0===Ci?void 0:Ci.unit_white_space)}
                              </span>
                            `:(null===(Pi=null===(Mi=tn.individual2)||void 0===Mi?void 0:Mi.secondary_info)||void 0===Pi?void 0:Pi.template)?L`<span class="secondary-info individual2"> ${Nl} </span>`:""}
                        <ha-icon
                          id="individual2-icon"
                          .icon=${zn}
                          style="${an?"padding-top: 2px;":"padding-top: 0px;"}
                          ${!1!==(null===(Di=tn.individual2)||void 0===Di?void 0:Di.display_zero_state)||(On||0)>0?"padding-bottom: 2px;":"padding-bottom: 0px;"}"
                        ></ha-icon>
                        ${!1!==(null===(Oi=tn.individual2)||void 0===Oi?void 0:Oi.display_zero_state)||(On||0)>0?L` <span class="individual2"
                              >${this.displayValue(On,null===(ji=this._config.entities.individual2)||void 0===ji?void 0:ji.unit_of_measurement)}
                            </span>`:""}
                      </div>
                      ${this.showLine(On||0)?L`
                            <svg width="80" height="30">
                              <path d="M40 -10 v50" id="individual2" />
                              ${On?V`<circle
                              r="2.4"
                              class="individual2"
                              vector-effect="non-scaling-stroke"
                            >
                              <animateMotion
                                dur="${this.additionalCircleRate(null===(Ni=tn.individual2)||void 0===Ni?void 0:Ni.calculate_flow_rate,ml.individual2)}s"    
                                repeatCount="indefinite"
                                calcMode="linear"
                                keyPoints=${(null===(zi=tn.individual2)||void 0===zi?void 0:zi.inverted_animation)?"0;1":"1;0"}
                                keyTimes="0;1"
                              >
                                <mpath xlink:href="#individual2" />
                              </animateMotion>
                            </circle>`:""}
                            </svg>
                          `:""}
                    </div>`:sn?L`<div class="circle-container individual1">
                      <span class="label">${Mn}</span>
                      <div
                        class="circle"
                        @click=${t=>{var e;t.stopPropagation(),this.openDetails(null===(e=tn.individual1)||void 0===e?void 0:e.entity)}}
                        @keyDown=${t=>{var e;"Enter"===t.key&&(t.stopPropagation(),this.openDetails(null===(e=tn.individual1)||void 0===e?void 0:e.entity))}}
                      >
                        ${dn?L`
                              <span
                                class="secondary-info individual1"
                                @click=${t=>{var e,i;t.stopPropagation(),this.openDetails(null===(i=null===(e=tn.individual1)||void 0===e?void 0:e.secondary_info)||void 0===i?void 0:i.entity)}}
                                @keyDown=${t=>{var e,i;"Enter"===t.key&&(t.stopPropagation(),this.openDetails(null===(i=null===(e=tn.individual1)||void 0===e?void 0:e.secondary_info)||void 0===i?void 0:i.entity))}}
                              >
                                ${(null===(Ti=null===(Ri=tn.individual1)||void 0===Ri?void 0:Ri.secondary_info)||void 0===Ti?void 0:Ti.icon)?L`<ha-icon class="secondary-info small" .icon=${null===(Ui=null===(Hi=tn.individual1)||void 0===Hi?void 0:Hi.secondary_info)||void 0===Ui?void 0:Ui.icon}></ha-icon>`:""}
                                ${this.displayValue(Cn,null===(Fi=null===(Ii=tn.individual1)||void 0===Ii?void 0:Ii.secondary_info)||void 0===Fi?void 0:Fi.unit_of_measurement,null===(Li=null===(Wi=tn.individual1)||void 0===Wi?void 0:Wi.secondary_info)||void 0===Li?void 0:Li.unit_white_space)}
                              </span>
                            `:(null===(Bi=null===(Vi=tn.individual1)||void 0===Vi?void 0:Vi.secondary_info)||void 0===Bi?void 0:Bi.template)?L`<span class="secondary-info individual1"> ${jl} </span>`:""}
                        <ha-icon
                          id="individual1-icon"
                          .icon=${Pn}
                          style="${dn?"padding-top: 2px;":"padding-top: 0px;"}
                          ${!1!==(null===(Zi=tn.individual1)||void 0===Zi?void 0:Zi.display_zero_state)||(An||0)>0?"padding-bottom: 2px;":"padding-bottom: 0px;"}"
                        ></ha-icon>
                        ${!1!==(null===(Gi=tn.individual1)||void 0===Gi?void 0:Gi.display_zero_state)||(An||0)>0?L` <span class="individual1"
                              >${this.displayValue(An,null===(Ki=this._config.entities.individual1)||void 0===Ki?void 0:Ki.unit_of_measurement)}
                            </span>`:""}
                      </div>
                      ${this.showLine(An||0)?L`
                            <svg width="80" height="30">
                              <path d="M40 -10 v40" id="individual1" />
                              ${An?V`<circle
                                r="2.4"
                                class="individual1"
                                vector-effect="non-scaling-stroke"
                              >
                                <animateMotion
                                  dur="${this.additionalCircleRate(null===(Yi=tn.individual1)||void 0===Yi?void 0:Yi.calculate_flow_rate,ml.individual1)}s"
                                  repeatCount="indefinite"
                                  calcMode="linear"
                                  keyPoints=${(null===(qi=tn.individual1)||void 0===qi?void 0:qi.inverted_animation)?"0;1":"1;0"}
                                  keyTimes="0;1"

                                >
                                  <mpath xlink:href="#individual1" />
                                </animateMotion>
                              </circle>`:""}
                            </svg>
                          `:L``}
                    </div> `:L`<div class="spacer"></div>`}
              </div>`:L``}
          <div class="row">
            ${on?L` <div class="circle-container grid">
                  <div
                    class="circle"
                    @click=${t=>{const e="string"==typeof tn.grid.entity?tn.grid.entity:tn.grid.entity.consumption||tn.grid.entity.production;t.stopPropagation(),this.openDetails(e)}}
                    @keyDown=${t=>{if("Enter"===t.key){const e="string"==typeof tn.grid.entity?tn.grid.entity:tn.grid.entity.consumption||tn.grid.entity.production;t.stopPropagation(),this.openDetails(e)}}}
                  >
                    ${fn?L`
                          <span
                            class="secondary-info grid"
                            @click=${t=>{var e,i;t.stopPropagation(),this.openDetails(null===(i=null===(e=tn.grid)||void 0===e?void 0:e.secondary_info)||void 0===i?void 0:i.entity)}}
                            @keyDown=${t=>{var e,i;"Enter"===t.key&&(t.stopPropagation(),this.openDetails(null===(i=null===(e=tn.grid)||void 0===e?void 0:e.secondary_info)||void 0===i?void 0:i.entity))}}
                          >
                            ${(null===(Qi=null===(Ji=tn.grid)||void 0===Ji?void 0:Ji.secondary_info)||void 0===Qi?void 0:Qi.icon)?L`<ha-icon class="secondary-info small" .icon=${null===(to=null===(Xi=tn.grid)||void 0===Xi?void 0:Xi.secondary_info)||void 0===to?void 0:to.icon}></ha-icon>`:""}
                            ${this.displayValue(_n,null===(io=null===(eo=tn.grid)||void 0===eo?void 0:eo.secondary_info)||void 0===io?void 0:io.unit_of_measurement,null===(no=null===(oo=tn.grid)||void 0===oo?void 0:oo.secondary_info)||void 0===no?void 0:no.unit_white_space)}
                          </span>
                        `:(null===(ro=null===(lo=tn.grid)||void 0===lo?void 0:lo.secondary_info)||void 0===ro?void 0:ro.template)?L`<span class="secondary-info grid"> ${Pl} </span>`:""}
                    <ha-icon .icon=${$n}></ha-icon>
                    ${("two_way"===(null===(ao=tn.grid)||void 0===ao?void 0:ao.display_state)||void 0===(null===(so=tn.grid)||void 0===so?void 0:so.display_state)||"one_way"===(null===(co=tn.grid)||void 0===co?void 0:co.display_state)&&yn>0||"one_way_no_zero"===(null===(vo=tn.grid)||void 0===vo?void 0:vo.display_state)&&(null===pn||0===pn)&&0!==yn)&&null!==yn&&!nn?L`<span
                          class="return"
                          @click=${t=>{const e="string"==typeof tn.grid.entity?tn.grid.entity:tn.grid.entity.production;t.stopPropagation(),this.openDetails(e)}}
                          @keyDown=${t=>{if("Enter"===t.key){const e="string"==typeof tn.grid.entity?tn.grid.entity:tn.grid.entity.production;t.stopPropagation(),this.openDetails(e)}}}
                        >
                          <ha-icon class="small" .icon=${"mdi:arrow-left"}></ha-icon>
                          ${this.displayValue(yn)}
                        </span>`:null}
                    ${("two_way"===(null===(uo=tn.grid)||void 0===uo?void 0:uo.display_state)||void 0===(null===(ho=tn.grid)||void 0===ho?void 0:ho.display_state)||"one_way"===(null===(po=tn.grid)||void 0===po?void 0:po.display_state)&&pn>0||"one_way_no_zero"===(null===(yo=tn.grid)||void 0===yo?void 0:yo.display_state)&&(null===yn||0===yn))&&null!==pn&&!nn?L` <span class="consumption">
                          <ha-icon class="small" .icon=${"mdi:arrow-right"}></ha-icon>${this.displayValue(pn)}
                        </span>`:""}
                    ${nn?L`<span class="grid power-outage"> ${(null===(mo=tn.grid)||void 0===mo?void 0:mo.power_outage.label_alert)||L`Power<br />Outage`} </span>`:""}
                  </div>
                  <span class="label">${wn}</span>
                </div>`:L`<div class="spacer"></div>`}
            <div class="circle-container home">
              <div
                class="circle"
                id="home-circle"
                @click=${t=>{var e;t.stopPropagation(),this.openDetails(null===(e=tn.home)||void 0===e?void 0:e.entity)}}
                @keyDown=${t=>{var e;"Enter"===t.key&&(t.stopPropagation(),this.openDetails(null===(e=tn.home)||void 0===e?void 0:e.entity))}}
              >
                ${un?L`
                      <span
                        class="secondary-info home"
                        @click=${t=>{var e,i;t.stopPropagation(),this.openDetails(null===(i=null===(e=tn.home)||void 0===e?void 0:e.secondary_info)||void 0===i?void 0:i.entity)}}
                        @keyDown=${t=>{var e,i;"Enter"===t.key&&(t.stopPropagation(),this.openDetails(null===(i=null===(e=tn.home)||void 0===e?void 0:e.secondary_info)||void 0===i?void 0:i.entity))}}
                      >
                        ${(null===(_o=null===(fo=tn.home)||void 0===fo?void 0:fo.secondary_info)||void 0===_o?void 0:_o.icon)?L`<ha-icon class="secondary-info small" .icon=${null===(bo=null===(go=tn.home)||void 0===go?void 0:go.secondary_info)||void 0===bo?void 0:bo.icon}></ha-icon>`:""}
                        ${this.displayValue(Hn,null===(wo=null===($o=tn.home)||void 0===$o?void 0:$o.secondary_info)||void 0===wo?void 0:wo.unit_of_measurement,null===(ko=null===(xo=tn.home)||void 0===xo?void 0:xo.secondary_info)||void 0===ko?void 0:ko.unit_white_space)}
                      </span>
                    `:(null===(So=null===(Eo=tn.home)||void 0===Eo?void 0:Eo.secondary_info)||void 0===So?void 0:So.template)?L`<span class="secondary-info home"> ${Ol} </span>`:""}
                <ha-icon .icon=${Sl}></ha-icon>
                ${Rl}
                <svg>
                  ${void 0!==ll?V`<circle
                            class="solar"
                            cx="40"
                            cy="40"
                            r="38"
                            stroke-dasharray="${ll} ${Nt-ll}"
                            shape-rendering="geometricPrecision"
                            stroke-dashoffset="-${Nt-ll}"
                          />`:""}
                  ${nl?V`<circle
                            class="battery"
                            cx="40"
                            cy="40"
                            r="38"
                            stroke-dasharray="${nl} ${Nt-nl}"
                            stroke-dashoffset="-${Nt-nl-(ll||0)}"
                            shape-rendering="geometricPrecision"
                          />`:""}
                  ${void 0!==vl?V`<circle
                            class="low-carbon"
                            cx="40"
                            cy="40"
                            r="38"
                            stroke-dasharray="${vl} ${Nt-vl}"
                            stroke-dashoffset="-${Nt-vl-(nl||0)-(ll||0)}"
                            shape-rendering="geometricPrecision"
                          />`:""}
                  <circle
                    class="grid"
                    cx="40"
                    cy="40"
                    r="38"
                    stroke-dasharray="${null!=ul?ul:Nt-ll-(nl||0)} ${void 0!==ul?Nt-ul:ll+(nl||0)}"
                    stroke-dashoffset="0"
                    shape-rendering="geometricPrecision"
                  />
                </svg>
              </div>
              ${this.showLine(An||0)&&rn?"":L` <span class="label">${Al}</span>`}
            </div>
          </div>
          ${ln||sn&&rn?L`<div class="row">
                <div class="spacer"></div>
                ${ln?L` <div class="circle-container battery">
                      <div
                        class="circle"
                        @click=${t=>{var e,i,o,n,l;const r=(null===(e=tn.battery)||void 0===e?void 0:e.state_of_charge)?null===(i=tn.battery)||void 0===i?void 0:i.state_of_charge:"string"==typeof(null===(o=tn.battery)||void 0===o?void 0:o.entity)?null===(n=tn.battery)||void 0===n?void 0:n.entity:null===(l=tn.battery)||void 0===l?void 0:l.entity.production;t.stopPropagation(),this.openDetails(r)}}
                        @keyDown=${t=>{var e,i;if("Enter"===t.key){const o=(null===(e=tn.battery)||void 0===e?void 0:e.state_of_charge)?null===(i=tn.battery)||void 0===i?void 0:i.state_of_charge:"string"==typeof tn.battery.entity?tn.battery.entity:tn.battery.entity.production;t.stopPropagation(),this.openDetails(o)}}}
                      >
                        ${null!==pl?L` <span
                              @click=${t=>{var e;t.stopPropagation(),this.openDetails(null===(e=tn.battery)||void 0===e?void 0:e.state_of_charge)}}
                              @keyDown=${t=>{var e;"Enter"===t.key&&(t.stopPropagation(),this.openDetails(null===(e=tn.battery)||void 0===e?void 0:e.state_of_charge))}}
                              id="battery-state-of-charge-text"
                            >
                              ${n(pl,this.hass.locale,{maximumFractionDigits:0,minimumFractionDigits:0})}${!1===(null===(Co=null===(Ao=this._config.entities)||void 0===Ao?void 0:Ao.battery)||void 0===Co?void 0:Co.state_of_charge_unit_white_space)?"":" "}%
                            </span>`:null}
                        <ha-icon
                          .icon=${yl}
                          style=${"two_way"===(null===(Mo=tn.battery)||void 0===Mo?void 0:Mo.display_state)?"padding-top: 0px; padding-bottom: 2px;":"one_way"===(null===(Po=tn.battery)||void 0===Po?void 0:Po.display_state)&&0===In&&0===Fn?"padding-top: 2px; padding-bottom: 0px;":"padding-top: 2px; padding-bottom: 2px;"}
                          @click=${t=>{var e;t.stopPropagation(),this.openDetails(null===(e=tn.battery)||void 0===e?void 0:e.state_of_charge)}}
                          @keyDown=${t=>{var e;"Enter"===t.key&&(t.stopPropagation(),this.openDetails(null===(e=tn.battery)||void 0===e?void 0:e.state_of_charge))}}
                        ></ha-icon>
                        ${"two_way"===(null===(Do=tn.battery)||void 0===Do?void 0:Do.display_state)||void 0===(null===(Oo=tn.battery)||void 0===Oo?void 0:Oo.display_state)||"one_way"===(null===(jo=tn.battery)||void 0===jo?void 0:jo.display_state)&&In>0||"one_way_no_zero"===(null===(No=tn.battery)||void 0===No?void 0:No.display_state)&&0!==In?L`<span
                              class="battery-in"
                              @click=${t=>{const e="string"==typeof tn.battery.entity?tn.battery.entity:tn.battery.entity.production;t.stopPropagation(),this.openDetails(e)}}
                              @keyDown=${t=>{if("Enter"===t.key){const e="string"==typeof tn.battery.entity?tn.battery.entity:tn.battery.entity.production;t.stopPropagation(),this.openDetails(e)}}}
                            >
                              <ha-icon class="small" .icon=${"mdi:arrow-down"}></ha-icon>
                              ${this.displayValue(In)}</span
                            >`:""}
                        ${"two_way"===(null===(zo=tn.battery)||void 0===zo?void 0:zo.display_state)||void 0===(null===(Ro=tn.battery)||void 0===Ro?void 0:Ro.display_state)||"one_way"===(null===(To=tn.battery)||void 0===To?void 0:To.display_state)&&Fn>0||"one_way_no_zero"===(null===(Ho=tn.battery)||void 0===Ho?void 0:Ho.display_state)&&(0===In||0!==Fn)?L`<span
                              class="battery-out"
                              @click=${t=>{const e="string"==typeof tn.battery.entity?tn.battery.entity:tn.battery.entity.consumption;t.stopPropagation(),this.openDetails(e)}}
                              @keyDown=${t=>{if("Enter"===t.key){const e="string"==typeof tn.battery.entity?tn.battery.entity:tn.battery.entity.consumption;t.stopPropagation(),this.openDetails(e)}}}
                            >
                              <ha-icon class="small" .icon=${"mdi:arrow-up"}></ha-icon>
                              ${this.displayValue(Fn)}</span
                            >`:""}
                      </div>
                      <span class="label">${Jn}</span>
                    </div>`:L`<div class="spacer"></div>`}
                ${rn&&sn?L`<div class="circle-container individual1 bottom">
                      ${this.showLine(An||0)?L`
                            <svg width="80" height="30">
                              <path d="M40 40 v-40" id="individual1" />
                              ${An?V`<circle
                                r="2.4"
                                class="individual1"
                                vector-effect="non-scaling-stroke"
                              >
                                <animateMotion
                                  dur="${this.additionalCircleRate(null===(Uo=tn.individual1)||void 0===Uo?void 0:Uo.calculate_flow_rate,ml.individual1)}s"
                                  repeatCount="indefinite"
                                  calcMode="linear"
                                  keyPoints=${(null===(Io=tn.individual1)||void 0===Io?void 0:Io.inverted_animation)?"0;1":"1;0"}
                                  keyTimes="0;1"
                                >
                                  <mpath xlink:href="#individual1" />
                                </animateMotion>
                              </circle>`:""}
                            </svg>
                          `:L` <svg width="80" height="30"></svg> `}
                      <div
                        class="circle"
                        @click=${t=>{var e;t.stopPropagation(),this.openDetails(null===(e=tn.individual1)||void 0===e?void 0:e.entity)}}
                        @keyDown=${t=>{var e;"Enter"===t.key&&(t.stopPropagation(),this.openDetails(null===(e=tn.individual1)||void 0===e?void 0:e.entity))}}
                      >
                        ${dn?L`
                              <span
                                class="secondary-info individual1"
                                @click=${t=>{var e,i;t.stopPropagation(),this.openDetails(null===(i=null===(e=tn.individual1)||void 0===e?void 0:e.secondary_info)||void 0===i?void 0:i.entity)}}
                                @keyDown=${t=>{var e,i;"Enter"===t.key&&(t.stopPropagation(),this.openDetails(null===(i=null===(e=tn.individual1)||void 0===e?void 0:e.secondary_info)||void 0===i?void 0:i.entity))}}
                              >
                                ${(null===(Wo=null===(Fo=tn.individual1)||void 0===Fo?void 0:Fo.secondary_info)||void 0===Wo?void 0:Wo.icon)?L`<ha-icon class="secondary-info small" .icon=${null===(Vo=null===(Lo=tn.individual1)||void 0===Lo?void 0:Lo.secondary_info)||void 0===Vo?void 0:Vo.icon}></ha-icon>`:""}
                                ${this.displayValue(Cn,null===(Zo=null===(Bo=tn.individual1)||void 0===Bo?void 0:Bo.secondary_info)||void 0===Zo?void 0:Zo.unit_of_measurement,null===(Ko=null===(Go=tn.individual1)||void 0===Go?void 0:Go.secondary_info)||void 0===Ko?void 0:Ko.unit_white_space)}
                              </span>
                            `:(null===(qo=null===(Yo=tn.individual1)||void 0===Yo?void 0:Yo.secondary_info)||void 0===qo?void 0:qo.template)?L`<span class="secondary-info individual1"> ${jl} </span>`:""}
                        <ha-icon
                          id="individual1-icon"
                          .icon=${Pn}
                          style="${dn?"padding-top: 2px;":"padding-top: 0px;"}
                          ${!1!==(null===(Jo=tn.individual1)||void 0===Jo?void 0:Jo.display_zero_state)||(An||0)>0?"padding-bottom: 2px;":"padding-bottom: 0px;"}"
                        ></ha-icon>
                        ${!1!==(null===(Qo=tn.individual1)||void 0===Qo?void 0:Qo.display_zero_state)||(An||0)>0?L` <span class="individual1"
                              >${this.displayValue(An,null===(Xo=this._config.entities.individual1)||void 0===Xo?void 0:Xo.unit_of_measurement)}
                            </span>`:""}
                      </div>
                      <span class="label">${Mn}</span>
                    </div>`:L`<div class="spacer"></div>`}
              </div>`:L`<div class="spacer"></div>`}
          ${cn&&this.showLine(Wn||0)?L`<div
                class="lines ${gt({high:ln,"individual1-individual2":!ln&&rn&&sn})}"
              >
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" id="solar-home-flow">
                  <path
                    id="solar"
                    class="solar"
                    d="M${ln?55:53},0 v${on?15:17} c0,${ln?"30 10,30 30,30":"35 10,35 30,35"} h25"
                    vector-effect="non-scaling-stroke"
                  ></path>
                  ${Wn?V`<circle
                            r="1"
                            class="solar"
                            vector-effect="non-scaling-stroke"
                          >
                            <animateMotion
                              dur="${ml.solarToHome}s"
                              repeatCount="indefinite"
                              calcMode="linear"
                            >
                              <mpath xlink:href="#solar" />
                            </animateMotion>
                          </circle>`:""}
                </svg>
              </div>`:""}
          ${hn&&cn&&this.showLine(Zn)?L`<div
                class="lines ${gt({high:ln,"individual1-individual2":!ln&&rn&&sn})}"
              >
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" id="solar-grid-flow">
                  <path
                    id="return"
                    class="return"
                    d="M${ln?45:47},0 v15 c0,${ln?"30 -10,30 -30,30":"35 -10,35 -30,35"} h-20"
                    vector-effect="non-scaling-stroke"
                  ></path>
                  ${Zn&&cn?V`<circle
                        r="1"
                        class="return"
                        vector-effect="non-scaling-stroke"
                      >
                        <animateMotion
                          dur="${ml.solarToGrid}s"
                          repeatCount="indefinite"
                          calcMode="linear"
                        >
                          <mpath xlink:href="#return" />
                        </animateMotion>
                      </circle>`:""}
                </svg>
              </div>`:""}
          ${ln&&cn&&this.showLine(Bn||0)?L`<div
                class="lines ${gt({high:ln,"individual1-individual2":!ln&&rn&&sn})}"
              >
                <svg
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid slice"
                  id="solar-battery-flow"
                  class="flat-line"
                >
                  <path id="battery-solar" class="battery-solar" d="M50,0 V100" vector-effect="non-scaling-stroke"></path>
                  ${Bn?V`<circle
                            r="1"
                            class="battery-solar"
                            vector-effect="non-scaling-stroke"
                          >
                            <animateMotion
                              dur="${ml.solarToBattery}s"
                              repeatCount="indefinite"
                              calcMode="linear"
                            >
                              <mpath xlink:href="#battery-solar" />
                            </animateMotion>
                          </circle>`:""}
                </svg>
              </div>`:""}
          ${on&&this.showLine(el)?L`<div
                class="lines ${gt({high:ln,"individual1-individual2":!ln&&rn&&sn})}"
              >
                <svg
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid slice"
                  id="grid-home-flow"
                  class="flat-line"
                >
                  <path
                    class="grid"
                    id="grid"
                    d="M0,${ln?50:cn?56:53} H100"
                    vector-effect="non-scaling-stroke"
                  ></path>
                  ${el?V`<circle
                    r="1"
                    class="grid"
                    vector-effect="non-scaling-stroke"
                  >
                    <animateMotion
                      dur="${ml.gridToHome}s"
                      repeatCount="indefinite"
                      calcMode="linear"
                    >
                      <mpath xlink:href="#grid" />
                    </animateMotion>
                  </circle>`:""}
                </svg>
              </div>`:null}
          ${ln&&this.showLine(Gn)?L`<div
                class="lines ${gt({high:ln,"individual1-individual2":!ln&&rn&&sn})}"
              >
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" id="battery-home-flow">
                  <path
                    id="battery-home"
                    class="battery-home"
                    d="M55,100 v-${on?15:17} c0,-30 10,-30 30,-30 h20"
                    vector-effect="non-scaling-stroke"
                  ></path>
                  ${Gn?V`<circle
                        r="1"
                        class="battery-home"
                        vector-effect="non-scaling-stroke"
                      >
                        <animateMotion
                          dur="${ml.batteryToHome}s"
                          repeatCount="indefinite"
                          calcMode="linear"
                        >
                          <mpath xlink:href="#battery-home" />
                        </animateMotion>
                      </circle>`:""}
                </svg>
              </div>`:""}
          ${on&&ln&&this.showLine(Math.max(Ln||0,Vn||0))?L`<div
                class="lines ${gt({high:ln,"individual1-individual2":!ln&&rn&&sn})}"
              >
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" id="battery-grid-flow">
                  <path
                    id="battery-grid"
                    class=${gt({"battery-from-grid":Boolean(Ln),"battery-to-grid":Boolean(Vn)})}
                    d="M45,100 v-15 c0,-30 -10,-30 -30,-30 h-20"
                    vector-effect="non-scaling-stroke"
                  ></path>
                  ${Ln?V`<circle
                    r="1"
                    class="battery-from-grid"
                    vector-effect="non-scaling-stroke"
                  >
                    <animateMotion
                      dur="${ml.batteryGrid}s"
                      repeatCount="indefinite"
                      keyPoints="1;0" keyTimes="0;1"
                      calcMode="linear"
                    >
                      <mpath xlink:href="#battery-grid" />
                    </animateMotion>
                  </circle>`:""}
                  ${Vn?V`<circle
                        r="1"
                        class="battery-to-grid"
                        vector-effect="non-scaling-stroke"
                      >
                        <animateMotion
                          dur="${ml.batteryGrid}s"
                          repeatCount="indefinite"
                          calcMode="linear"
                        >
                          <mpath xlink:href="#battery-grid" />
                        </animateMotion>
                      </circle>`:""}
                </svg>
              </div>`:""}
        </div>
        ${this._config.dashboard_link?L`
              <div class="card-actions">
                <a href=${this._config.dashboard_link}
                  ><mwc-button>
                    ${this._config.dashboard_link_label||this.hass.localize("ui.panel.lovelace.cards.energy.energy_distribution.go_to_energy_dashboard")}
                  </mwc-button></a
                >
              </div>
            `:""}
      </ha-card>
    `}updated(t){super.updated(t),this._config&&this.hass&&this._tryConnectAll()}_tryConnectAll(){var t,e,i,o,n,l,r,a,s,d,c,v;const{entities:u}=this._config,h={gridSecondary:null===(e=null===(t=u.grid)||void 0===t?void 0:t.secondary_info)||void 0===e?void 0:e.template,solarSecondary:null===(o=null===(i=u.solar)||void 0===i?void 0:i.secondary_info)||void 0===o?void 0:o.template,homeSecondary:null===(l=null===(n=u.home)||void 0===n?void 0:n.secondary_info)||void 0===l?void 0:l.template,individual1Secondary:null===(a=null===(r=u.individual1)||void 0===r?void 0:r.secondary_info)||void 0===a?void 0:a.template,individual2Secondary:null===(d=null===(s=u.individual2)||void 0===s?void 0:s.secondary_info)||void 0===d?void 0:d.template,nonFossilFuelSecondary:null===(v=null===(c=u.fossil_fuel_percentage)||void 0===c?void 0:c.secondary_info)||void 0===v?void 0:v.template};for(const[t,e]of Object.entries(h))e&&this._tryConnect(e,t)}async _tryConnect(t,e){var i,o,n,l,r,a;if(this.hass&&this._config&&void 0===(null===(i=this._unsubRenderTemplates)||void 0===i?void 0:i.get(e))&&""!==t)try{const i=(l=this.hass.connection,r=t=>{this._templateResults[e]=t},a={template:t,entity_ids:this._config.entity_id,variables:{config:this._config,user:this.hass.user.name},strict:!0},l.subscribeMessage((t=>r(t)),Object.assign({type:"render_template"},a)));null===(o=this._unsubRenderTemplates)||void 0===o||o.set(e,i),await i}catch(i){this._templateResults=Object.assign(Object.assign({},this._templateResults),{[e]:{result:t,listeners:{all:!1,domains:[],entities:[],time:!1}}}),null===(n=this._unsubRenderTemplates)||void 0===n||n.delete(e)}}async _tryDisconnectAll(){var t,e,i,o,n,l,r,a,s,d;const{entities:c}=this._config,v={gridSecondary:null===(e=null===(t=c.grid)||void 0===t?void 0:t.secondary_info)||void 0===e?void 0:e.template,solarSecondary:null===(o=null===(i=c.solar)||void 0===i?void 0:i.secondary_info)||void 0===o?void 0:o.template,homeSecondary:null===(l=null===(n=c.home)||void 0===n?void 0:n.secondary_info)||void 0===l?void 0:l.template,individual1Secondary:null===(a=null===(r=c.individual1)||void 0===r?void 0:r.secondary_info)||void 0===a?void 0:a.template,individual2Secondary:null===(d=null===(s=c.individual2)||void 0===s?void 0:s.secondary_info)||void 0===d?void 0:d.template};for(const[t,e]of Object.entries(v))e&&this._tryDisconnect(t)}async _tryDisconnect(t){var e,i;const o=null===(e=this._unsubRenderTemplates)||void 0===e?void 0:e.get(t);if(o)try{(await o)(),null===(i=this._unsubRenderTemplates)||void 0===i||i.delete(t)}catch(t){if("not_found"!==t.code&&"template_error"!==t.code)throw t}}};zt.styles=St,t([ht({attribute:!1})],zt.prototype,"hass",void 0),t([pt()],zt.prototype,"_config",void 0),t([pt()],zt.prototype,"_templateResults",void 0),t([pt()],zt.prototype,"_unsubRenderTemplate",void 0),t([pt()],zt.prototype,"_unsubRenderTemplates",void 0),t([yt("#battery-grid-flow")],zt.prototype,"batteryGridFlow",void 0),t([yt("#battery-home-flow")],zt.prototype,"batteryToHomeFlow",void 0),t([yt("#grid-home-flow")],zt.prototype,"gridToHomeFlow",void 0),t([yt("#solar-battery-flow")],zt.prototype,"solarToBatteryFlow",void 0),t([yt("#solar-grid-flow")],zt.prototype,"solarToGridFlow",void 0),t([yt("#solar-home-flow")],zt.prototype,"solarToHomeFlow",void 0),zt=t([vt("power-flow-card-plus")],zt);class Rt extends TypeError{constructor(t,e){let i;const{message:o,explanation:n,...l}=t,{path:r}=t,a=0===r.length?o:`At path: ${r.join(".")} -- ${o}`;super(n??a),null!=n&&(this.cause=a),Object.assign(this,l),this.name=this.constructor.name,this.failures=()=>i??(i=[t,...e()])}}function Tt(t){return"object"==typeof t&&null!=t}function Ht(t){return"symbol"==typeof t?t.toString():"string"==typeof t?JSON.stringify(t):`${t}`}function Ut(t,e,i,o){if(!0===t)return;!1===t?t={}:"string"==typeof t&&(t={message:t});const{path:n,branch:l}=e,{type:r}=i,{refinement:a,message:s=`Expected a value of type \`${r}\`${a?` with refinement \`${a}\``:""}, but received: \`${Ht(o)}\``}=t;return{value:o,type:r,refinement:a,key:n[n.length-1],path:n,branch:l,...t,message:s}}function*It(t,e,i,o){(function(t){return Tt(t)&&"function"==typeof t[Symbol.iterator]})(t)||(t=[t]);for(const n of t){const t=Ut(n,e,i,o);t&&(yield t)}}function*Ft(t,e,i={}){const{path:o=[],branch:n=[t],coerce:l=!1,mask:r=!1}=i,a={path:o,branch:n};if(l&&(t=e.coercer(t,a),r&&"type"!==e.type&&Tt(e.schema)&&Tt(t)&&!Array.isArray(t)))for(const i in t)void 0===e.schema[i]&&delete t[i];let s="valid";for(const o of e.validator(t,a))o.explanation=i.message,s="not_valid",yield[o,void 0];for(let[d,c,v]of e.entries(t,a)){const e=Ft(c,v,{path:void 0===d?o:[...o,d],branch:void 0===d?n:[...n,c],coerce:l,mask:r,message:i.message});for(const i of e)i[0]?(s=null!=i[0].refinement?"not_refined":"not_valid",yield[i[0],void 0]):l&&(c=i[1],void 0===d?t=c:t instanceof Map?t.set(d,c):t instanceof Set?t.add(c):Tt(t)&&(void 0!==c||d in t)&&(t[d]=c))}if("not_valid"!==s)for(const o of e.refiner(t,a))o.explanation=i.message,s="not_refined",yield[o,void 0];"valid"===s&&(yield[void 0,t])}class Wt{constructor(t){const{type:e,schema:i,validator:o,refiner:n,coercer:l=(t=>t),entries:r=function*(){}}=t;this.type=e,this.schema=i,this.entries=r,this.coercer=l,this.validator=o?(t,e)=>It(o(t,e),e,this,t):()=>[],this.refiner=n?(t,e)=>It(n(t,e),e,this,t):()=>[]}assert(t,e){return Lt(t,this,e)}create(t,e){return function(t,e,i){const o=Vt(t,e,{coerce:!0,message:i});if(o[0])throw o[0];return o[1]}(t,this,e)}is(t){return function(t,e){const i=Vt(t,e);return!i[0]}(t,this)}mask(t,e){return function(t,e,i){const o=Vt(t,e,{coerce:!0,mask:!0,message:i});if(o[0])throw o[0];return o[1]}(t,this,e)}validate(t,e={}){return Vt(t,this,e)}}function Lt(t,e,i){const o=Vt(t,e,{message:i});if(o[0])throw o[0]}function Vt(t,e,i={}){const o=Ft(t,e,i),n=function(t){const{done:e,value:i}=t.next();return e?void 0:i}(o);if(n[0]){const t=new Rt(n[0],(function*(){for(const t of o)t[0]&&(yield t[0])}));return[t,void 0]}return[void 0,n[1]]}function Bt(t,e){return new Wt({type:t,schema:null,validator:e})}function Zt(){return Bt("any",(()=>!0))}function Gt(){return Bt("boolean",(t=>"boolean"==typeof t))}function Kt(){return Bt("integer",(t=>"number"==typeof t&&!isNaN(t)&&Number.isInteger(t)||`Expected an integer, but received: ${Ht(t)}`))}function Yt(){return Bt("number",(t=>"number"==typeof t&&!isNaN(t)||`Expected a number, but received: ${Ht(t)}`))}function qt(t){const e=t?Object.keys(t):[],i=Bt("never",(()=>!1));return new Wt({type:"object",schema:t||null,*entries(o){if(t&&Tt(o)){const n=new Set(Object.keys(o));for(const i of e)n.delete(i),yield[i,o[i],t[i]];for(const t of n)yield[t,o[t],i]}},validator:t=>Tt(t)||`Expected an object, but received: ${Ht(t)}`,coercer:t=>Tt(t)?{...t}:t})}function Jt(t){return new Wt({...t,validator:(e,i)=>void 0===e||t.validator(e,i),refiner:(e,i)=>void 0===e||t.refiner(e,i)})}function Qt(){return Bt("string",(t=>"string"==typeof t||`Expected a string, but received: ${Ht(t)}`))}function Xt(t){return{type:"expandable",title:`Combined ${t||"Grid"} Entity (positive & negative values)`,schema:[{name:"entity",selector:{entity:{}}}]}}function te(t){return{type:"expandable",title:`Separated ${t||"Grid"} Entities (One for production, one for consumption)`,name:"entity",schema:[{name:"consumption",label:"Consumption Entity",selector:{entity:{}}},{name:"production",label:"Production Entity",selector:{entity:{}}}]}}const ee={name:"color",title:"Custom Colors",type:"expandable",schema:[{type:"grid",column_min_width:"200px",schema:[{name:"consumption",label:"Consumption",selector:{color_rgb:{}}},{name:"production",label:"Production",selector:{color_rgb:{}}}]}]},ie=[{name:"entity",selector:{entity:{}}},{name:"template",label:"Template (overrides entity, save to update)",selector:{template:{}}},{type:"grid",column_min_width:"200px",schema:[{name:"icon",selector:{icon:{}}},{name:"unit_of_measurement",label:"Unit of Measurement",selector:{text:{}}},{name:"color_value",label:"Color Value",selector:{boolean:{}}},{name:"unit_white_space",label:"Unit White Space",selector:{boolean:{}}},{name:"display_zero",label:"Display Zero",selector:{boolean:{}}},{name:"display_zero_tolerance",label:"Display Zero Tolerance",selector:{number:{mode:"box",min:0,max:1e6,step:.1}}}]}],oe=[{name:"color_icon",label:"Color of Icon",selector:{select:{options:[{value:!1,label:"Do not Color"},{value:!0,label:"Color dynamically"},{value:"production",label:"Production"},{value:"consumption",label:"Consumption"}],custom_value:!0}}},{name:"color_circle",label:"Color of Circle",selector:{select:{options:[{value:!0,label:"Color dynamically"},{value:!1,label:"Consumption"},{value:"production",label:"Production"}],custom_value:!0}}},{name:"display_zero_tolerance",label:"Display Zero Tolerance",selector:{number:{min:0,max:1e6,step:1,mode:"box"}}},{name:"display_state",label:"Display State",selector:{select:{options:[{value:"two_way",label:"Two Way"},{value:"one_way",label:"One Way"},{value:"one_way_no_zero",label:"One Way (Show Zero)"}],custom_value:!0}}}];function ne(t){const e={type:"grid",column_min_width:"200px",schema:[{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]};return"battery"!==t&&"grid"!==t||e.schema.push(...oe),e}const le=[Xt(),te(),ne("grid"),ee,{title:"Secondary Info",name:"secondary_info",type:"expandable",schema:ie},{title:"Power Outage",name:"power_outage",type:"expandable",schema:[{name:"entity",selector:{entity:{}}},{type:"grid",column_min_width:"200px",schema:[{name:"label_alert",label:"Outage Label",selector:{text:{}}},{name:"icon_alert",label:"Outage Icon",selector:{icon:{}}},{name:"state_alert",label:"Outage State",selector:{text:{}}}]}]}],re=Object.assign(Object.assign({},ne("battery")),{schema:[...ne("battery").schema,{name:"color_state_of_charge_value",label:"Color State of Charge Value",selector:{select:{options:[{value:!1,label:"Do Not Color"},{value:!0,label:"Color dynamically"},{value:"consumption",label:"Consumption"},{value:"production",label:"Production"}],custom_value:!0}}}]}),ae=[Xt("battery"),te("battery"),{name:"state_of_charge",label:"State of Charge Entity",selector:{entity:{}}},re,ee],se=[{name:"entity",selector:{entity:{}}},Object.assign(Object.assign({},ne()),{schema:[...ne().schema,{name:"color_value",label:"Color Value",selector:{boolean:{}}},{name:"color_icon",label:"Color Icon",selector:{boolean:{}}},{name:"display_zero_state",label:"Display State When Zero?",selector:{boolean:{}}},{name:"display_zero_tolerance",label:"Display Zero Tolerance",selector:{number:{mode:"box",min:0,max:1e6,step:.1}}}]}),{name:"color",label:"Color",selector:{color_rgb:{}}},{title:"Secondary Info",name:"secondary_info",type:"expandable",schema:ie}],de=[{name:"entity",selector:{entity:{}}},Object.assign(Object.assign({},ne()),{schema:[...ne().schema,{name:"color_value",label:"Color Value",selector:{boolean:{}}},{name:"color_icon",label:"Color Icon",selector:{boolean:{}}},{name:"unit_of_measurement",label:"Unit of Measurement",selector:{text:{}}},{name:"display_zero",label:"Display Zero",selector:{boolean:{}}},{name:"inverted_animation",label:"Invert Animation",selector:{boolean:{}}},{name:"display_zero_tolerance",label:"Display Zero Tolerance",selector:{number:{mode:"box",min:0,max:1e6,step:.1}}},{name:"display_zero_state",label:"Display Zero State",selector:{boolean:{}}}]}),{name:"color",label:"Color",selector:{color_rgb:{}}},{title:"Secondary Info",name:"secondary_info",type:"expandable",schema:ie}],ce=[{name:"entity",selector:{entity:{}}},Object.assign(Object.assign({},ne()),{schema:[...ne().schema,{name:"state_type",label:"State Type",selector:{select:{options:[{value:"power",label:"Power"},{value:"percentage",label:"Percentage"}],custom_value:!0}}},{name:"color_value",label:"Color Value",selector:{boolean:{}}},{name:"color_icon",label:"Color Icon",selector:{boolean:{}}},{name:"display_zero",label:"Display Zero",selector:{boolean:{}}},{name:"display_zero_tolerance",label:"Display Zero Tolerance",selector:{number:{mode:"box",min:0,max:1e6,step:.1}}},{name:"display_zero_state",label:"Display Zero State",selector:{boolean:{}}},{name:"unit_white_space",label:"Unit White Space",selector:{boolean:{}}}]}),{name:"color",label:"Color",selector:{color_rgb:{}}},{title:"Secondary Info",name:"secondary_info",type:"expandable",schema:ie}],ve=[{name:"entity",selector:{entity:{}}},Object.assign(Object.assign({},ne()),{schema:[...ne().schema,{name:"color_value",label:"Color Value",selector:{select:{options:[{value:!0,label:"Color dynamically"},{value:!1,label:"Do Not Color"},{value:"solar",label:"Solar"},{value:"grid",label:"Grid"},{value:"battery",label:"Battery"}],custom_value:!0}}},{name:"color_icon",label:"Color Icon",selector:{select:{options:[{value:!0,label:"Color dynamically"},{value:!1,label:"Do Not Color"},{value:"solar",label:"Solar"},{value:"grid",label:"Grid"},{value:"battery",label:"Battery"}],custom_value:!0}}},{name:"subtract_individual",label:"Subtract Individual",selector:{boolean:{}}},{name:"override_state",label:"Override State (With Home Entity)",selector:{boolean:{}}}]}),{title:"Secondary Info",name:"secondary_info",type:"expandable",schema:ie}],ue=function(...t){const e="type"===t[0].type,i=t.map((t=>t.schema)),o=Object.assign({},...i);return e?function(t){const e=Object.keys(t);return new Wt({type:"type",schema:t,*entries(i){if(Tt(i))for(const o of e)yield[o,i[o],t[o]]},validator:t=>Tt(t)||`Expected an object, but received: ${Ht(t)}`,coercer:t=>Tt(t)?{...t}:t})}(o):qt(o)}(qt({type:Qt(),view_layout:Zt()}),qt({title:Jt(Qt()),theme:Jt(Qt()),dashboard_link:Jt(Qt()),dashboard_link_label:Jt(Qt()),inverted_entities:Jt(Zt()),w_decimals:Jt(Kt()),kw_decimals:Jt(Kt()),min_flow_rate:Jt(Yt()),max_flow_rate:Jt(Yt()),min_expected_power:Jt(Yt()),max_expected_power:Jt(Yt()),watt_threshold:Jt(Yt()),clickable_entities:Jt(Gt()),display_zero_lines:Jt(Gt()),use_new_flow_rate_model:Jt(Gt()),entities:qt({battery:Jt(Zt()),grid:Jt(Zt()),solar:Jt(Zt()),home:Jt(Zt()),fossil_fuel_percentage:Jt(Zt()),individual1:Jt(Zt()),individual2:Jt(Zt())})})),he=[{name:"title",label:"Title",selector:{text:{}}}],pe=[{name:"entities",type:"grid",column_min_width:"400px",schema:[{title:"Grid",name:"grid",type:"expandable",schema:le},{title:"Solar",name:"solar",type:"expandable",schema:se},{title:"Battery",name:"battery",type:"expandable",schema:ae},{title:"Non-Fossil",name:"fossil_fuel_percentage",type:"expandable",schema:ce},{title:"Home",name:"home",type:"expandable",schema:ve},{title:"Individual 1",name:"individual1",type:"expandable",schema:de},{title:"Individual 2",name:"individual2",type:"expandable",schema:de}]}],ye=[{title:"Advanced Options",type:"expandable",schema:[{type:"grid",column_min_width:"200px",schema:[{name:"dashboard_link",label:"Dashboard Link",selector:{navigation:{}}},{name:"dashboard_link_label",label:"Dashboard Link Label",selector:{text:{}}},{name:"w_decimals",label:"Watt Decimals",selector:{number:{mode:"box",min:0,max:5,step:1}}},{name:"kw_decimals",label:"kW Decimals",selector:{number:{mode:"box",min:0,max:5,step:1}}},{name:"max_flow_rate",label:"Max Flow Rate (Sec/Dot)",selector:{number:{mode:"box",min:0,max:1e6,step:.01}}},{name:"min_flow_rate",label:"Min Flow Rate (Sec/Dot)",selector:{number:{mode:"box",min:0,max:1e6,step:.01}}},{name:"max_expected_power",label:"Max Expected Power (in Watts)",selector:{number:{mode:"box",min:0,max:1e6,step:.01}}},{name:"min_expected_power",label:"Min Expected Power (in Watts)",selector:{number:{mode:"box",min:0,max:1e6,step:.01}}},{name:"watt_threshold",label:"Watt to Kilowatt Threshold",selector:{number:{mode:"box",min:0,max:1e6,step:1}}},{name:"display_zero_lines",label:"Display Zero Lines",selector:{boolean:{}}},{name:"clickable_entities",label:"Clickable Entities",selector:{boolean:{}}},{name:"use_new_flow_rate_model",label:"New Flow Model?",selector:{boolean:{}}}]},{name:"inverted_entities",label:"Inverted Entities",selector:{code_editor:{}}}]}],me=async()=>{var t,e;if(customElements.get("ha-form"))return;const i=await(null===(e=(t=window).loadCardHelpers)||void 0===e?void 0:e.call(t));if(!i)return;const o=await i.createCardElement({type:"entity"});o&&await o.getConfigElement()};let fe=class extends dt{constructor(){super(...arguments),this.showOther=!1,this._computeLabelCallback=t=>(null==t?void 0:t.label)||this.hass.localize(`ui.panel.lovelace.editor.card.generic.${null==t?void 0:t.name}`||(null==t?void 0:t.name)||"")}async setConfig(t){Lt(t,ue),this._config=t}connectedCallback(){super.connectedCallback(),me()}render(){if(!this.hass||!this._config)return Z;const t=Object.assign({},this._config);return L`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${t}
          .schema=${he}
          .computeLabel=${this._computeLabelCallback}
          @value-changed=${this._valueChanged}
        ></ha-form>
        <div style="height: 24px"></div>
        <ha-form
          .hass=${this.hass}
          .data=${t}
          .schema=${pe}
          .computeLabel=${this._computeLabelCallback}
          @value-changed=${this._valueChanged}
          class="entities-section"
        ></ha-form>
        <div style="height: 24px"></div>
        <ha-form
          .hass=${this.hass}
          .data=${t}
          .schema=${ye}
          .computeLabel=${this._computeLabelCallback}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `}_valueChanged(t){const e=t.detail.value||"";this._config&&this.hass&&function(t,e,i,o){o=o||{},i=null==i?{}:i;var n=new Event(e,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});n.detail=i,t.dispatchEvent(n)}(this,"config-changed",{config:e})}static get styles(){return v`
      ha-form {
        width: 100%;
      }

      ha-icon-button {
        align-self: center;
      }

      .entities-section * {
        background-color: #f00;
      }

      .card-config {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      .config-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      .config-header.sub-header {
        margin-top: 24px;
      }

      ha-icon {
        padding-bottom: 2px;
        position: relative;
        top: -4px;
        right: 1px;
      }
    `}};t([ht({attribute:!1})],fe.prototype,"hass",void 0),t([pt()],fe.prototype,"_config",void 0),t([pt()],fe.prototype,"showOther",void 0),fe=t([vt("power-flow-card-plus-editor")],fe);var _e=Object.freeze({__proto__:null,loadHaForm:me,get PowerFlowCardPlusEditor(){return fe}});export{zt as PowerFlowCardPlus};
