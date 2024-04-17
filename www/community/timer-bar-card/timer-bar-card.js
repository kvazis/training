/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function t(t,e,r,i){var n,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,r,i);else for(var o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s<3?n(a):s>3?n(e,r,a):n(e,r))||a);return s>3&&a&&Object.defineProperty(e,r,a),a
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const e=window,r=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;class s{constructor(t,e,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const r=void 0!==e&&1===e.length;r&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&n.set(e,t))}return t}toString(){return this.cssText}}const a=(t,...e)=>{const r=1===t.length?t[0]:e.reduce(((e,r,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[i+1]),t[0]);return new s(r,t,i)},o=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const c=window,u=c.trustedTypes,h=u?u.emptyScript:"",d=c.reactiveElementPolyfillSupport,g={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch(t){r=null}}return r}},m=(t,e)=>e!==t&&(e==e||t==t),f={attribute:!0,type:String,converter:g,reflect:!1,hasChanged:m};class p extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,r)=>{const i=this._$Ep(r,e);void 0!==i&&(this._$Ev.set(i,r),t.push(i))})),t}static createProperty(t,e=f){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const r="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,r,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){return{get(){return this[e]},set(i){const n=this[t];this[e]=i,this.requestUpdate(t,n,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||f}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const r of e)this.createProperty(r,t[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const t of r)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Ep(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,r;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(r=t.hostConnected)||void 0===r||r.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{r?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((r=>{const i=document.createElement("style"),n=e.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=r.cssText,t.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$EO(t,e,r=f){var i;const n=this.constructor._$Ep(t,r);if(void 0!==n&&!0===r.reflect){const s=(void 0!==(null===(i=r.converter)||void 0===i?void 0:i.toAttribute)?r.converter:g).toAttribute(e,r.type);this._$El=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$El=null}}_$AK(t,e){var r;const i=this.constructor,n=i._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=i.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(r=t.converter)||void 0===r?void 0:r.fromAttribute)?t.converter:g;this._$El=n,this[n]=s.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,r){let i=!0;void 0!==t&&(((r=r||this.constructor.getPropertyOptions(t)).hasChanged||m)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===r.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,r))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(r)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(r)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var v;p.finalized=!0,p.elementProperties=new Map,p.elementStyles=[],p.shadowRootOptions={mode:"open"},null==d||d({ReactiveElement:p}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.5.0");const b=window,y=b.trustedTypes,_=y?y.createPolicy("lit-html",{createHTML:t=>t}):void 0,$=`lit$${(Math.random()+"").slice(9)}$`,w="?"+$,S=`<${w}>`,x=document,C=(t="")=>x.createComment(t),A=t=>null===t||"object"!=typeof t&&"function"!=typeof t,E=Array.isArray,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,k=/-->/g,D=/>/g,O=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),N=/'/g,H=/"/g,z=/^(?:script|style|textarea|title)$/i,T=(t=>(e,...r)=>({_$litType$:t,strings:e,values:r}))(1),R=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),P=new WeakMap,U=x.createTreeWalker(x,129,null,!1);class I{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let n=0,s=0;const a=t.length-1,o=this.parts,[l,c]=((t,e)=>{const r=t.length-1,i=[];let n,s=2===e?"<svg>":"",a=M;for(let e=0;e<r;e++){const r=t[e];let o,l,c=-1,u=0;for(;u<r.length&&(a.lastIndex=u,l=a.exec(r),null!==l);)u=a.lastIndex,a===M?"!--"===l[1]?a=k:void 0!==l[1]?a=D:void 0!==l[2]?(z.test(l[2])&&(n=RegExp("</"+l[2],"g")),a=O):void 0!==l[3]&&(a=O):a===O?">"===l[0]?(a=null!=n?n:M,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,o=l[1],a=void 0===l[3]?O:'"'===l[3]?H:N):a===H||a===N?a=O:a===k||a===D?a=M:(a=O,n=void 0);const h=a===O&&t[e+1].startsWith("/>")?" ":"";s+=a===M?r+S:c>=0?(i.push(o),r.slice(0,c)+"$lit$"+r.slice(c)+$+h):r+$+(-2===c?(i.push(void 0),e):h)}const o=s+(t[r]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==_?_.createHTML(o):o,i]})(t,e);if(this.el=I.createElement(l,r),U.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=U.nextNode())&&o.length<a;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith($)){const r=c[s++];if(t.push(e),void 0!==r){const t=i.getAttribute(r.toLowerCase()+"$lit$").split($),e=/([.?@])?(.*)/.exec(r);o.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?B:"?"===e[1]?Z:"@"===e[1]?J:q})}else o.push({type:6,index:n})}for(const e of t)i.removeAttribute(e)}if(z.test(i.tagName)){const t=i.textContent.split($),e=t.length-1;if(e>0){i.textContent=y?y.emptyScript:"";for(let r=0;r<e;r++)i.append(t[r],C()),U.nextNode(),o.push({type:2,index:++n});i.append(t[e],C())}}}else if(8===i.nodeType)if(i.data===w)o.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf($,t+1));)o.push({type:7,index:n}),t+=$.length-1}n++}}static createElement(t,e){const r=x.createElement("template");return r.innerHTML=t,r}}function Y(t,e,r=t,i){var n,s,a,o;if(e===R)return e;let l=void 0!==i?null===(n=r._$Co)||void 0===n?void 0:n[i]:r._$Cl;const c=A(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,r,i)),void 0!==i?(null!==(a=(o=r)._$Co)&&void 0!==a?a:o._$Co=[])[i]=l:r._$Cl=l),void 0!==l&&(e=Y(t,l._$AS(t,e.values),l,i)),e}class L{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:r},parts:i}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:x).importNode(r,!0);U.currentNode=n;let s=U.nextNode(),a=0,o=0,l=i[0];for(;void 0!==l;){if(a===l.index){let e;2===l.type?e=new W(s,s.nextSibling,this,t):1===l.type?e=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(e=new V(s,this,t)),this.u.push(e),l=i[++o]}a!==(null==l?void 0:l.index)&&(s=U.nextNode(),a++)}return n}p(t){let e=0;for(const r of this.u)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class W{constructor(t,e,r,i){var n;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cm=null===(n=null==i?void 0:i.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),A(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==R&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>E(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==j&&A(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){var e;const{values:r,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=I.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.p(r);else{const t=new L(n,this),e=t.v(this.options);t.p(r),this.T(e),this._$AH=t}}_$AC(t){let e=P.get(t.strings);return void 0===e&&P.set(t.strings,e=new I(t)),e}k(t){E(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,i=0;for(const n of t)i===e.length?e.push(r=new W(this.O(C()),this.O(C()),this,this.options)):r=e[i],r._$AI(n),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var r;for(null===(r=this._$AP)||void 0===r||r.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class q{constructor(t,e,r,i,n){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,r,i){const n=this.strings;let s=!1;if(void 0===n)t=Y(this,t,e,0),s=!A(t)||t!==this._$AH&&t!==R,s&&(this._$AH=t);else{const i=t;let a,o;for(t=n[0],a=0;a<n.length-1;a++)o=Y(this,i[r+a],e,a),o===R&&(o=this._$AH[a]),s||(s=!A(o)||o!==this._$AH[a]),o===j?t=j:t!==j&&(t+=(null!=o?o:"")+n[a+1]),this._$AH[a]=o}s&&!i&&this.j(t)}j(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class B extends q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===j?void 0:t}}const F=y?y.emptyScript:"";class Z extends q{constructor(){super(...arguments),this.type=4}j(t){t&&t!==j?this.element.setAttribute(this.name,F):this.element.removeAttribute(this.name)}}class J extends q{constructor(t,e,r,i,n){super(t,e,r,i,n),this.type=5}_$AI(t,e=this){var r;if((t=null!==(r=Y(this,t,e,0))&&void 0!==r?r:j)===R)return;const i=this._$AH,n=t===j&&i!==j||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==j&&(i===j||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,r;"function"==typeof this._$AH?this._$AH.call(null!==(r=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==r?r:this.element,t):this._$AH.handleEvent(t)}}class V{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const K=b.litHtmlPolyfillSupport;null==K||K(I,W),(null!==(v=b.litHtmlVersions)&&void 0!==v?v:b.litHtmlVersions=[]).push("2.5.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var G,X;class Q extends p{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const r=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=r.firstChild),r}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,r)=>{var i,n;const s=null!==(i=null==r?void 0:r.renderBefore)&&void 0!==i?i:e;let a=s._$litPart$;if(void 0===a){const t=null!==(n=null==r?void 0:r.renderBefore)&&void 0!==n?n:null;s._$litPart$=a=new W(e.insertBefore(C(),t),t,void 0,null!=r?r:{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return R}}Q.finalized=!0,Q._$litElement$=!0,null===(G=globalThis.litElementHydrateSupport)||void 0===G||G.call(globalThis,{LitElement:Q});const tt=globalThis.litElementPolyfillSupport;null==tt||tt({LitElement:Q}),(null!==(X=globalThis.litElementVersions)&&void 0!==X?X:globalThis.litElementVersions=[]).push("3.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(r){r.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(r){r.createProperty(e.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function rt(t){return(e,r)=>void 0!==r?((t,e,r)=>{e.constructor.createProperty(r,t)})(t,e,r):et(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function it(t){return rt({...t,state:!0})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var nt;null===(nt=window.HTMLSlotElement)||void 0===nt||nt.prototype.assignedElements;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st=1,at=t=>(...e)=>({_$litDirective$:t,values:e});class ot{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lt=at(class extends ot{constructor(t){var e;if(super(t),t.type!==st||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const i=t[r];return null==i?e:e+`${r=r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`}),"")}update(t,[e]){const{style:r}=t.element;if(void 0===this.vt){this.vt=new Set;for(const t in e)this.vt.add(t);return this.render(e)}this.vt.forEach((t=>{null==e[t]&&(this.vt.delete(t),t.includes("-")?r.removeProperty(t):r[t]="")}));for(const t in e){const i=e[t];null!=i&&(this.vt.add(t),t.includes("-")?r.setProperty(t,i):r[t]=i)}return R}});var ct=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,ut="[1-9]\\d?",ht="\\d\\d",dt="[^\\s]+",gt=/\[([^]*?)\]/gm;function mt(t,e){for(var r=[],i=0,n=t.length;i<n;i++)r.push(t[i].substr(0,e));return r}var ft=function(t){return function(e,r){var i=r[t].map((function(t){return t.toLowerCase()})),n=i.indexOf(e.toLowerCase());return n>-1?n:null}};function pt(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];for(var i=0,n=e;i<n.length;i++){var s=n[i];for(var a in s)t[a]=s[a]}return t}var vt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],bt=["January","February","March","April","May","June","July","August","September","October","November","December"],yt=mt(bt,3),_t={dayNamesShort:mt(vt,3),dayNames:vt,monthNamesShort:yt,monthNames:bt,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},$t=pt({},_t),wt=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},St={D:function(t){return String(t.getDate())},DD:function(t){return wt(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return wt(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return wt(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return wt(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return wt(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return wt(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return wt(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return wt(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return wt(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return wt(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return wt(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+wt(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+wt(Math.floor(Math.abs(e)/60),2)+":"+wt(Math.abs(e)%60,2)}},xt=function(t){return+t-1},Ct=[null,ut],At=[null,dt],Et=["isPm",dt,function(t,e){var r=t.toLowerCase();return r===e.amPm[0]?0:r===e.amPm[1]?1:null}],Mt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var r=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?r:-r}return 0}],kt=(ft("monthNamesShort"),ft("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var Dt=function(t,e,r){if(void 0===e&&(e=kt.default),void 0===r&&(r={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var i=[];e=(e=kt[e]||e).replace(gt,(function(t,e){return i.push(e),"@@@"}));var n=pt(pt({},$t),r);return(e=e.replace(ct,(function(e){return St[e](t,n)}))).replace(/@@@/g,(function(){return i.shift()}))};var Ot,Nt,Ht=function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleDateString(e.language,{year:"numeric",month:"long",day:"numeric"})}:function(t){return Dt(t,"mediumDate")},zt=function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleString(e.language,{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"})}:function(t){return Dt(t,"haDateTime")},Tt=function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleTimeString(e.language,{hour:"numeric",minute:"2-digit"})}:function(t){return Dt(t,"shortTime")};!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(Ot||(Ot={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(Nt||(Nt={}));var Rt=function(t,e,r){var i;switch(null==e?void 0:e.number_format){case Ot.comma_decimal:i=["en-US","en"];break;case Ot.decimal_comma:i=["de","es","it"];break;case Ot.space_comma:i=["fr","sv","cs"];break;case Ot.system:i=void 0;break;default:i=null==e?void 0:e.language}if(Number.isNaN=Number.isNaN||function t(e){return"number"==typeof e&&t(e)},!Number.isNaN(Number(t))&&Intl&&(null==e?void 0:e.number_format)!==Ot.none)try{return new Intl.NumberFormat(i,jt(t,r)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,jt(t,r)).format(Number(t))}return t?t.toString():""},jt=function(t,e){var r=e||{};if("string"!=typeof t)return r;if(!e||!e.minimumFractionDigits&&!e.maximumFractionDigits){var i=t.indexOf(".")>-1?t.split(".")[1].length:0;r.minimumFractionDigits=i,r.maximumFractionDigits=i}return r};function Pt(t){return void 0!==t&&"none"!==t.action}function Ut(t){return Date.now()+t}function It(t,e){try{const r=function(t){var e=t.split(":").map(Number);return 3600*e[0]+60*e[1]+e[2]}(t);if(isNaN(r))throw new Error(`Error parsing ${e} ${t}: check it matches the format 0:10:00`);return r}catch(r){throw new Error(`Could not convert ${e}: ${t} is not of format 0:10:00. If you are passing in a number, specify the units property.`)}}function Yt(t,e,r){const i=Zt(t,r,e.duration);if(i)return i;const n=Ft(t,r,e.start_time),s=Ft(t,r,e.end_time);if(n&&s)return(Date.parse(s)-Date.parse(n))/1e3;if(!r)throw new Error("If there is neither a duration nor start and end times, an entity is required.");return s?(Date.parse(s)-Date.parse(r.last_changed))/1e3:null}const Lt=(t,e,r,i)=>{const n=r&&Date.parse(r.last_changed);if(null==r?void 0:r.attributes.remaining){let t=It(r.attributes.remaining,"remaining");return qt(r,e.active_state,e)&&(t=Math.max(t-(Ut(i)-n)/1e3,0)),t}const s=Ft(t,r,e.end_time);if(s)return(Date.parse(s)-Ut(i))/1e3;const a=Ft(t,r,e.start_time),o=Zt(t,r,e.duration);if(a&&o)return(Date.parse(a)-Ut(i))/1e3+o;const l=Zt(t,r,e.remain_time);if(null!=l)return l;if(!n)throw new Error("If you don't pass an entity, you must specify 2 time/duration properties");return o?(n-Ut(i))/1e3+o:void 0},Wt=(t,e,r,i)=>{const n=Lt(t,e,r,i),s=Yt(t,e,r);if(s&&n)return(s-Math.floor(n))/s*100},qt=(t,e,r)=>{if(!t)return!1;const i=r.state_attribute?t.attributes[r.state_attribute]:t.state;return"string"==typeof e?i===e:e.includes(i)};function Bt(t){return"unavailable"==t?null:t}const Ft=(t,e,r)=>{var i;if(!r)throw new Error("One of duration, remain_time, start_time, or end_time was not fully specified. Make sure you set entity, fixed, or attribute");if("fixed"in r)return r.fixed;if("script"in r){const e=null===(i=t.states[r.script].attributes.last_action)||void 0===i?void 0:i.match(/[\d:]+$/);return e?e[0]:void 0}return"entity"in r?"attribute"in r?t.states[r.entity].attributes[r.attribute]:Bt(t.states[r.entity].state):e?"state"in r?Bt(e.state):e.attributes[r.attribute]:void 0},Zt=(t,e,r)=>{const i=Ft(t,e,r);if(!i)return i;if("hours"===r.units||"minutes"===r.units||"seconds"===r.units){const t=parseFloat(i);if(isNaN(t))throw new Error(`Expected duration ${i} to be a number since units is ${r.units}`);if("hours"==r.units)return 3600*t;if("minutes"==r.units)return 60*t;if("seconds"==r.units)return 1*t}return It(i,"duration")};function Jt(t,e,r){const i=t.states[e.entity],n=Ft(t,i,e.end_time);if(function(t,e,r){const i=Zt(t,r,e.duration),n=Zt(t,r,e.remain_time),s=Ft(t,r,e.start_time),a=Ft(t,r,e.end_time);return!i&&!a||!i&&!s||!i&&!n||!a&&!s}(t,e,i)&&!n)return;const s=Vt(t,e,r);if("pause"===s||"waiting"===s)return;const a=Yt(t,e,i),o=Lt(t,e,i,r);return a&&o&&o>=0&&o<=a+500?"active":void 0}function Vt(t,e,r){var i,n;if(null===(i=e.state)||void 0===i?void 0:i.fixed)return null===(n=e.state)||void 0===n?void 0:n.fixed.replace("paused","pause");const s=t.states[e.entity];return qt(s,e.active_state,e)&&(Lt(t,e,s,r)||0)>0?"active":qt(s,e.pause_state,e)?"pause":qt(s,e.waiting_state,e)?"waiting":"idle"}function Kt(t,e,r){return e.guess_mode&&Jt(t,e,r)||Vt(t,e,r)}function Gt(t){const e=[],r=t=>{t&&"entity"in t&&e.push(t.entity),t&&"script"in t&&e.push(t.script)};return(t=>{t&&e.push(t)})(t.entity),r(t.duration),r(t.remain_time),r(t.start_time),r(t.end_time),e}function Xt(t,e,r){for(const i of t)if(e.states[i]!=r.states[i])return!0;return!1}function Qt(){return document.querySelector("hc-main")?document.querySelector("hc-main").hass:document.querySelector("home-assistant")?document.querySelector("home-assistant").hass:void 0}function te(t,e,r=null){if((t=new Event(t,{bubbles:!0,cancelable:!1,composed:!0})).detail=e||{},r)r.dispatchEvent(t);else{var i=function(){var t=document.querySelector("hc-main");return t?(t=(t=(t=t&&t.shadowRoot)&&t.querySelector("hc-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-view")||t.querySelector("hui-panel-view"):(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=document.querySelector("home-assistant"))&&t.shadowRoot)&&t.querySelector("home-assistant-main"))&&t.shadowRoot)&&t.querySelector("app-drawer-layout partial-panel-resolver"))&&t.shadowRoot||t)&&t.querySelector("ha-panel-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-root"))&&t.shadowRoot)&&t.querySelector("ha-app-layout"))&&t.querySelector("#view"))&&t.firstElementChild}();i&&i.dispatchEvent(t)}}const ee="custom:";let re=window.cardHelpers;const ie=new Promise((async(t,e)=>{re&&t();const r=async()=>{re=await window.loadCardHelpers(),window.cardHelpers=re,t()};window.loadCardHelpers?r():window.addEventListener("load",(async()=>{!async function(){if(customElements.get("hui-view"))return!0;await customElements.whenDefined("partial-panel-resolver");const t=document.createElement("partial-panel-resolver");if(t.hass={panels:[{url_path:"tmp",component_name:"lovelace"}]},t._updateRoutes(),await t.routerOptions.routes.tmp.load(),!customElements.get("ha-panel-lovelace"))return!1;const e=document.createElement("ha-panel-lovelace");e.hass=Qt(),void 0===e.hass&&(await new Promise((t=>{window.addEventListener("connection-status",(e=>{console.log(e),t()}),{once:!0})})),e.hass=Qt()),e.panel={config:{mode:null}},e._fetchConfig()}(),window.loadCardHelpers&&r()}))}));function ne(t,e){const r={type:"error",error:t,origConfig:e},i=document.createElement("hui-error-card");return customElements.whenDefined("hui-error-card").then((()=>{const t=document.createElement("hui-error-card");t.setConfig(r),i.parentElement&&i.parentElement.replaceChild(t,i)})),ie.then((()=>{te("ll-rebuild",{},i)})),i}function se(t,e){if(!e||"object"!=typeof e||!e.type)return ne(`No ${t} type configured`,e);let r=e.type;if(r=r.startsWith(ee)?r.substr(ee.length):`hui-${r}-${t}`,customElements.get(r))return function(t,e){let r=document.createElement(t);try{r.setConfig(JSON.parse(JSON.stringify(e)))}catch(t){r=ne(t,e)}return ie.then((()=>{te("ll-rebuild",{},r)})),r}(r,e);const i=ne(`Custom element doesn't exist: ${r}.`,e);i.style.display="None";const n=setTimeout((()=>{i.style.display=""}),2e3);return customElements.whenDefined(r).then((()=>{clearTimeout(n),te("ll-rebuild",{},i)})),i}const ae=(t,e)=>{const r=(()=>{const t=document.body;if(t.querySelector("action-handler"))return t.querySelector("action-handler");const e=document.createElement("action-handler");return t.appendChild(e),e})();r&&r.bind(t,e)},oe=at(class extends ot{update(t,[e]){return ae(t.element,e),R}render(t){}}),le=(t,e,r,i)=>{!function(t,e,r,i){i=i||{},r=null==r?{}:r;var n=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});n.detail=r,t.dispatchEvent(n)}(t,"hass-action",{config:r,action:i})};function ce(t){return oe({hasHold:Pt(t.hold_action),hasDoubleClick:Pt(t.double_tap_action)})}function ue(t,e){return t=>{le(t.target,0,e,t.detail.action)}}function he(t,e){if(!t||t.position!=e)return"";const r=function(t){if(re)return re.createRowElement(t);const e=new Set(["call-service","cast","conditional","divider","section","select","weblink"]),r={alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime",none:void 0};if(!t)return ne("Invalid configuration given.",t);if("string"==typeof t&&(t={entity:t}),"object"!=typeof t||!t.entity&&!t.type)return ne("Invalid configuration given.",t);const i=t.type||"default";return e.has(i)||i.startsWith(ee)?se("row",t):se("entity-row",{type:r[t.entity?t.entity.split(".",1)[0]:"none"]||"text",...t})}(Object.assign({type:"custom:paper-buttons-row"},t));var i;return i=r,document.querySelector("hc-main")?document.querySelector("hc-main").provideHass(i):document.querySelector("home-assistant")&&document.querySelector("home-assistant").provideHass(i),r}const de=a`
  .generic-entity-row {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
  .info {
    margin-left: 16px;
    margin-right: 8px;
    flex: 1 1 30%;
  }
  .info,
  .info > * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  state-badge {
    flex: 0 0 40px;
  }
`,ge=t=>t<10?`0${t}`:t;function me(t,e,r){return t>0?`${t}:${ge(e)}:${ge(r)}`:e>0?`${e}:${ge(r)}`:""+r}const fe=t=>me(Math.floor(t/3600),Math.floor(t%3600/60),Math.floor(t%3600%60)),pe=t=>me(0,Math.floor(t/3600),Math.ceil(t%3600/60));function ve(t){return Object.assign(Object.assign({active_state:["active","on","manual","program","once_program"],pause_state:"paused",waiting_state:"waiting",guess_mode:!1,end_time:{attribute:"end_time"},start_time:{attribute:"start_time"},duration:{attribute:"duration"},remain_time:{attribute:"remain_time"},sync_issues:"show",bar_width:"calc(70% - 7em)",bar_height:"8px",text_width:"3.5em",bar_background:"#eee",bar_foreground:"var(--mdc-theme-primary, #6200ee);",bar_radius:"0",layout:"normal",resolution:"seconds"},t),{translations:Object.assign({scheduled_for:"Scheduled for",once_program:"Once Program",program:"Program",manual:"Manual",waiting:"Waiting"},t.translations)})}function be(t,e,r,i,n=!0){if(!e)return"";if(i&&i[e])return i[e];if(r){const i=function(t,e,r,i){var n=void 0!==i?i:e.state;if("unknown"===n||"unavailable"===n)return t("state.default."+n);if(e.attributes.unit_of_measurement)return Rt(n,r)+" "+e.attributes.unit_of_measurement;var s=function(t){return function(t){return t.substr(0,t.indexOf("."))}(t.entity_id)}(e);if("input_datetime"===s){var a;if(!e.attributes.has_time)return a=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day),Ht(a,r);if(!e.attributes.has_date){var o=new Date;return a=new Date(o.getFullYear(),o.getMonth(),o.getDay(),e.attributes.hour,e.attributes.minute),Tt(a,r)}return a=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day,e.attributes.hour,e.attributes.minute),zt(a,r)}return"humidifier"===s&&"on"===n&&e.attributes.humidity?e.attributes.humidity+" %":"counter"===s||"number"===s?Rt(n,r):e.attributes.device_class&&t("component."+s+".state."+e.attributes.device_class+"."+e.state)||t("component."+s+".state._."+e.state)||e.state}(t.localize,r,t.locale,e);if(i!==e)return n?i:i.toLowerCase()}const s=function(t,e){return"idle"===e?t.localize("component.timer.state._.idle"):"paused"===e?t.localize("component.timer.state._.paused"):"active"===e?t.localize("component.timer.state._.active"):"on"===e?t.localize("component.switch.state._.on"):void 0}(t,e);return s?n?s:s.toLowerCase():n?e[0].toUpperCase()+e.substring(1):e}class ye extends Q{constructor(){super(...arguments),this._previousClockCorrection=0,this._browserClockCorrection=0}disconnectedCallback(){super.disconnectedCallback(),this._clearInterval()}connectedCallback(){var t;if(super.connectedCallback(),this.config){const e=null===(t=this.hass)||void 0===t?void 0:t.states[this.config.entity];this._startInterval(e)}}_mode(){return Kt(this.hass,this.config,this._browserClockCorrection)}render(){var t,e,r;const i=this.hass.states[this.config.entity];if(this._error)return T`<hui-warning>${this._error.message}</hui-warning>`;let n,s=0;try{s=null!==(t=Wt(this.hass,this.config,i,this._browserClockCorrection))&&void 0!==t?t:0}catch(t){return T`<hui-warning>${t}</hui-warning>`}s>100&&(s=100);try{n=Object.assign(Object.assign({},this.modConfig),{icon:null!==(e=this.modConfig.active_icon)&&void 0!==e?e:this.modConfig.icon})}catch(t){return T`<div>${t}</div>`}const a="none"!==(null===(r=n.tap_action)||void 0===r?void 0:r.action)?"pointer":"";switch(this._mode()){case"active":return this._renderRow(n,T`
        ${this._renderBar(s)}
        ${this._renderTime(a)}
      `);case"pause":return this._renderRow(n,T`
        ${this._renderStatus(a,"")}
        ${this._renderTime(a)}
      `);case"waiting":return this._renderRow(this.modConfig,T`
        ${this._renderStatus(a,((t,e,r)=>{const i=Ft(t,r,e.start_time),n=new Date(i),s=JSON.parse(localStorage.getItem("selectedLanguage")||'"en"')||"en";return Tt(n,s)})(this.hass,this.config,i))}
      `);default:const t=this.modConfig.text_width&&0===parseInt(this.modConfig.text_width)?"visibility: hidden":"";return this._renderRow(this.modConfig,T`
        <div class="text-content value ${a}" style=${t}
        @action=${ue(this.hass,this.config)}
       .actionHandler=${ce(this.config)}
        >${this._renderState()}</div>
      `)}}_renderState(){var t,e;const r=this.hass.states[this.config.entity],i=null!==(e=null===(t=this.config.state)||void 0===t?void 0:t.fixed.replace(/^pause$/,"paused"))&&void 0!==e?e:r.state;return this.localize(i,r)}localize(t,e,r=!0){return be(this.hass,t,e,this.config.translations,r)}_renderRow(t,e){const r=this._warning?T`<hui-warning>${this._warning}</hui-warning>`:"";return this.modConfig.full_row||"full_row"===this.modConfig.layout?T`${r}<div class="flex" @action=${ue(this.hass,t)} .actionHandler=${ce(t)}> ${e}</div>${this._renderDebug()}`:("hide_name"===this.modConfig.layout&&(t=Object.assign(Object.assign({},t),{name:""})),T`
      ${r}
      ${function(t,e,r){var i,n;if(!e||!r)return T``;const s=r.entity?e.states[r.entity]:void 0;if(!s&&!r.name&&!r.state)return T`<hui-warning>Entity ${r.entity} not found.  To use without an entity, specify name and state.</hui-warning>`;const a=null!==(i=r.name)&&void 0!==i?i:(t=>{return void 0===t.attributes.friendly_name?(e=t.entity_id,e.substring(e.indexOf(".")+1)).replace(/_/g," "):t.attributes.friendly_name||"";var e})(s),o="none"!==(null===(n=r.tap_action)||void 0===n?void 0:n.action)?"pointer":"";return T`<div class="generic-entity-row">
    <state-badge
      class="${o}"
      .hass=${e}
      .stateObj=${s}
      .overrideIcon=${r.icon}
      .overrideImage=${r.image}
      .stateColor=${r.state_color}
      tabindex="${o?"0":void 0}"
      @action=${ue(0,r)}
      .actionHandler=${ce(r)}
    ></state-badge>
    ${a?T`<div class="info ${o}" .title=${a}
        @action=${ue(0,r)}
        .actionHandler=${ce(r)}
        >${a}</div>`:""}
    ${he(r.extend_paper_buttons_row,"center")}
    ${t}
    ${he(r.extend_paper_buttons_row,"right")}
  </div>`}(e,this.hass,t)}
      ${this._renderDebug()}
    `)}_renderTime(t){const e=this.modConfig.format?this.modConfig.format:function(t,e){switch("automatic"===e?function(t){return t>=3600?"minutes":"seconds"}(t):e){case"seconds":return"hms";case"minutes":return"hm"}}(this._timeRemaining||0,this.modConfig.resolution);return T`<div class="text-content value ${t}" style=${this._textStyle()}
      @action=${ue(this.hass,this.config)}
      .actionHandler=${ce(this.config)}>
      ${function(t,e){return"hms"==e?fe(t):"hm"==e?pe(t):"d"==e?""+Math.ceil(t/24/3600):"h"==e?""+Math.ceil(t/3600):"m"==e?""+Math.ceil(t/60):"s"==e?""+Math.ceil(t):e.replace(/%(\w+)/g,((e,r)=>{const i=r.toLowerCase();return i.startsWith("hms")?fe(t)+r.substring(3):i.startsWith("hm")?pe(t)+r.substring(2):r.startsWith("d")?Math.ceil(t/24/3600)+r.substring(1):r.startsWith("h")?Math.ceil(t/3600)+r.substring(1):r.startsWith("m")?Math.ceil(t/60)+r.substring(1):r.startsWith("s")?Math.ceil(t)+r.substring(1):r.startsWith("HH")?ge(Math.floor(t%86400/3600))+r.substring(2):r.startsWith("MM")?ge(Math.floor(t%3600/60))+r.substring(2):r.startsWith("SS")?ge(Math.floor(t%60))+r.substring(2):r.startsWith("D")?Math.floor(t/24/3600)+r.substring(1):r.startsWith("H")?Math.floor(t%86400/3600)+r.substring(1):r.startsWith("M")?Math.floor(t%3600/60)+r.substring(1):r.startsWith("S")?Math.floor(t%60)+r.substring(1):e}))}(this._timeRemaining||0,e)}
    </div>`}_renderStatus(t,e){var r,i;const n=this.hass.states[this.config.entity];return null!==(i=null===(r=this.config.state)||void 0===r?void 0:r.fixed)&&void 0!==i||n.state,T`
      <div class="status ${t}" style=${this._statusStyle(!!e)}
        @action=${ue(this.hass,this.config)}
        .actionHandler=${ce(this.config)}>
      ${this._renderState()}
      ${e}
    </div>`}get _bar_width(){return this.modConfig.full_row||"full_row"===this.modConfig.layout?`calc(100% - ${this.modConfig.text_width})`:"hide_name"===this.modConfig.layout?"auto":this.modConfig.bar_width}_renderBar(t){var e;this.modConfig.invert&&(t=100-t);let r={width:this._bar_width,direction:this.modConfig.bar_direction};"hide_name"===this.modConfig.layout&&(r=Object.assign(Object.assign({},r),{"flex-grow":"1","margin-left":"8px"}));const i=lt(r),n=this._barStyle("100%",this.modConfig.bar_background),s=this._barStyle(t+"%",this.modConfig.bar_foreground),a="none"!==(null===(e=this.config.tap_action)||void 0===e?void 0:e.action)?"pointer":"";return T`<div class="bar-container ${a}" style=${i}
      @action=${ue(this.hass,this.config)}
      .actionHandler=${ce(this.config)}>
      <div class="bar" style=${n}>
        <div style=${s}>
      </div>
    </div>`}_renderDebug(){var t;if(!this.config.debug)return;const e=this.hass.states[this.config.entity];let r,i="err",n="err",s=!1,a="err",o="err",l="";try{n=this.config.guess_mode?"guessed":"explicit",r="idle"!=this._mode()?Lt(this.hass,this.config,e,this._browserClockCorrection):void 0,s=!!r&&r>0&&"active"!=this._mode(),i=Vt(this.hass,this.config,this._browserClockCorrection)||"N/A",a=Jt(this.hass,this.config,this._browserClockCorrection)||"N/A",o=Yt(this.hass,this.config,e)}catch(t){l="Error calculating duration:"+t}return T`<code>
      State: ${null!==(t=null==e?void 0:e.state)&&void 0!==t?t:"No entity specified"} (state mode = ${i})<br>
      Mode: ${this._mode()} (${n}; guess mode produces ${a})<br>
      Duration: ${o} second<br>
      Time remaining: ${r}<br>
      Counter: ${this._timeRemaining}<br>
      ${s?T`<b>Did you set active_state?</b>`:""}
      ${l||""}
      ${e?T`<small>Attr: ${JSON.stringify(e.attributes)}</small>`:""}
    </code>`}_checkForSyncIssues(t){if(!t||!this.config.entity)return;const e=this.hass.states[this.config.entity];if(t.states[this.config.entity]==e)return;const r=Date.parse(e.last_changed)-Date.now();"show"==this.config.sync_issues&&Math.abs(r)>500?(Math.abs(r-this._previousClockCorrection)<500&&(this._warning=this._generateSyncWarning(r)),this._previousClockCorrection=r):"fix"==this.config.sync_issues&&Math.abs(r)<6e4&&(this._browserClockCorrection=r)}_generateSyncWarning(t){const e=t>0?"ahead of":"behind",r=Math.abs(t)/1e3;return T`${`Detected sync issues: Home Assistant clock is ${r}s ${e} app time.`} <a href="https://github.com/rianadon/timer-bar-card#sync-issues">Learn more.</a>`}shouldUpdate(t){if(!this.config)return!1;if(t.has("_timeRemaining"))return!0;const e=t.get("hass");if(this._checkForSyncIssues(e),!e||!this.hass)return!0;return Xt(Gt(this.config),e,this.hass)}updated(t){if(super.updated(t),t.has("hass")){const t=this.hass.states[this.config.entity];this._startInterval(t)}}_clearInterval(){this._interval&&(window.clearInterval(this._interval),this._interval=void 0)}_startInterval(t){this._clearInterval(),this._calculateRemaining(t),"active"===this._mode()&&(this._interval=window.setInterval((()=>this._calculateRemaining(t)),1e3))}_calculateRemaining(t){try{this._timeRemaining="idle"!=this._mode()?Lt(this.hass,this.config,t,this._browserClockCorrection):void 0,this._error=void 0}catch(t){console.error(t),this._error=t}}_barStyle(t,e){return lt({width:t,background:e,height:this.modConfig.bar_height,"border-radius":this.modConfig.bar_radius})}_textStyle(){return lt({width:this.modConfig.text_width,"flex-shrink":"0"})}_statusStyle(t){let e=this._bar_width;return t&&(e=`calc(${this._bar_width} + ${this.modConfig.text_width})`),lt({width:e,color:"var(--secondary-text-color, #eee)"})}static get styles(){return[a`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .pointer { cursor: pointer; }
      .flex { display: flex; height: 40px; align-items: center; justify-content: flex-end; }
      .bar-container {
        min-height: 1.5em;
        display: flex;
        flex-shrink: 0;
        align-items: center;
      }
      .bar { margin-top: 2px; overflow: hidden; }
      .status { line-height: 1.5em; flex-shrink: 0; }
      .text-content { text-align: right; text-align: end; overflow: hidden; }
      code {
        display: block;
        background-color: var(--secondary-background-color);
        margin: 0.5em 0 0 0;
        padding: 0.7rem;
        font-size: 0.9em;
        word-break: break-all;
      }
    `,de]}get modConfig(){var t,e,r;if(!this.config.modifications)return this.config;const i=this.hass.states[this.config.entity],n=null!==(t="idle"!=this._mode()?Lt(this.hass,this.config,i,this._browserClockCorrection):void 0)&&void 0!==t?t:1/0,s=(null!==(e=Yt(this.hass,this.config,i))&&void 0!==e?e:0)-n,a=null!==(r=Wt(this.hass,this.config,i,this._browserClockCorrection))&&void 0!==r?r:0,o=100-a;let l=this.config;for(const t of this.config.modifications){if(t.greater_than_eq||t.greater_than)throw new Error("Mod format has changed! See the release notes and readme for details");t.remaining&&"string"==typeof t.remaining&&t.remaining.endsWith("%")?o<=parseFloat(t.remaining)&&(l=Object.assign(Object.assign({},l),t)):t.remaining?n<=It(t.remaining,"remaining")&&(l=Object.assign(Object.assign({},l),t)):t.elapsed&&"string"==typeof t.elapsed&&t.elapsed.endsWith("%")?a>=parseFloat(t.elapsed)&&(l=Object.assign(Object.assign({},l),t)):t.elapsed&&s>=It(t.elapsed,"elapsed")&&(l=Object.assign(Object.assign({},l),t))}return l}}t([rt()],ye.prototype,"hass",void 0),t([rt()],ye.prototype,"config",void 0),t([it()],ye.prototype,"_interval",void 0),t([it()],ye.prototype,"_timeRemaining",void 0),t([it()],ye.prototype,"_previousClockCorrection",void 0),t([it()],ye.prototype,"_browserClockCorrection",void 0),t([it()],ye.prototype,"_error",void 0),t([it()],ye.prototype,"_warning",void 0);const _e=a`
    --default-red: 244, 67, 54;
    --default-pink: 233, 30, 99;
    --default-purple: 156, 39, 176;
    --default-deep-purple: 103, 58, 183;
    --default-indigo: 63, 81, 181;
    --default-blue: 33, 150, 243;
    --default-light-blue: 3, 169, 244;
    --default-cyan: 0, 188, 212;
    --default-teal: 0, 150, 136;
    --default-green: 76, 175, 80;
    --default-light-green: 139, 195, 74;
    --default-lime: 205, 220, 57;
    --default-yellow: 255, 235, 59;
    --default-amber: 255, 193, 7;
    --default-orange: 255, 152, 0;
    --default-deep-orange: 255, 87, 34;
    --default-brown: 121, 85, 72;
    --default-grey: 158, 158, 158;
    --default-blue-grey: 96, 125, 139;
    --default-black: 0, 0, 0;
    --default-white: 255, 255, 255;
    --default-disabled: 189, 189, 189;
`,$e=a`
    --default-disabled: 111, 111, 111;
`,we=a`
    --spacing: var(--mush-spacing, 12px);

    /* Title */
    --title-padding: var(--mush-title-padding, 24px 12px 8px);
    --title-spacing: var(--mush-title-spacing, 8px);
    --title-font-size: var(--mush-title-font-size, 24px);
    --title-font-weight: var(--mush-title-font-weight, normal);
    --title-line-height: var(--mush-title-line-height, 32px);
    --title-color: var(--mush-title-color, var(--primary-text-color));
    --title-letter-spacing: var(--mush-title-letter-spacing, -0.288px);
    --subtitle-font-size: var(--mush-subtitle-font-size, 16px);
    --subtitle-font-weight: var(--mush-subtitle-font-weight, normal);
    --subtitle-line-height: var(--mush-subtitle-line-height, 24px);
    --subtitle-color: var(--mush-subtitle-color, var(--secondary-text-color));
    --subtitle-letter-spacing: var(--mush-subtitle-letter-spacing, 0px);

    /* Card */
    --card-primary-font-size: var(--mush-card-primary-font-size, 14px);
    --card-secondary-font-size: var(--mush-card-secondary-font-size, 12px);
    --card-primary-font-weight: var(--mush-card-primary-font-weight, 500);
    --card-secondary-font-weight: var(--mush-card-secondary-font-weight, 400);
    --card-primary-line-height: var(--mush-card-primary-line-height, 20px);
    --card-secondary-line-height: var(--mush-card-secondary-line-height, 16px);
    --card-primary-color: var(--mush-card-primary-color, var(--primary-text-color));
    --card-secondary-color: var(--mush-card-secondary-color, var(--primary-text-color));
    --card-primary-letter-spacing: var(--mush-card-primary-letter-spacing, 0.1px);
    --card-secondary-letter-spacing: var(--mush-card-secondary-letter-spacing, 0.4px);

    /* Chips */
    --chip-spacing: var(--mush-chip-spacing, 8px);
    --chip-padding: var(--mush-chip-padding, 0 0.25em);
    --chip-height: var(--mush-chip-height, 36px);
    --chip-border-radius: var(--mush-chip-border-radius, 19px);
    --chip-border-width: var(--mush-chip-border-width, var(--ha-card-border-width, 1px));
    --chip-border-color: var(
        --mush-chip-border-color,
        var(--ha-card-border-color, var(--divider-color))
    );
    --chip-box-shadow: var(--mush-chip-box-shadow, var(--ha-card-box-shadow, "none"));
    --chip-font-size: var(--mush-chip-font-size, 0.3em);
    --chip-font-weight: var(--mush-chip-font-weight, bold);
    --chip-icon-size: var(--mush-chip-icon-size, 0.5em);
    --chip-avatar-padding: var(--mush-chip-avatar-padding, 0.1em);
    --chip-avatar-border-radius: var(--mush-chip-avatar-border-radius, 50%);
    --chip-background: var(
        --mush-chip-background,
        var(--ha-card-background, var(--card-background-color, white))
    );
    /* Controls */
    --control-border-radius: var(--mush-control-border-radius, 12px);
    --control-height: var(--mush-control-height, 40px);
    --control-button-ratio: var(--mush-control-button-ratio, 1);
    --control-icon-size: var(--mush-control-icon-size, 0.5em);

    /* Slider */
    --slider-threshold: var(--mush-slider-threshold);

    /* Input Number */
    --input-number-debounce: var(--mush-input-number-debounce);

    /* Layout */
    --layout-align: var(--mush-layout-align, center);

    /* Badge */
    --badge-size: var(--mush-badge-size, 16px);
    --badge-icon-size: var(--mush-badge-icon-size, 0.75em);
    --badge-border-radius: var(--mush-badge-border-radius, 50%);

    /* Icon */
    --icon-border-radius: var(--mush-icon-border-radius, 50%);
    --icon-size: var(--mush-icon-size, 40px);
    --icon-symbol-size: var(--mush-icon-symbol-size, 0.6em);
`,Se=a`
    /* RGB */
    /* Standard colors */
    --rgb-red: var(--mush-rgb-red, var(--default-red));
    --rgb-pink: var(--mush-rgb-pink, var(--default-pink));
    --rgb-purple: var(--mush-rgb-purple, var(--default-purple));
    --rgb-deep-purple: var(--mush-rgb-deep-purple, var(--default-deep-purple));
    --rgb-indigo: var(--mush-rgb-indigo, var(--default-indigo));
    --rgb-blue: var(--mush-rgb-blue, var(--default-blue));
    --rgb-light-blue: var(--mush-rgb-light-blue, var(--default-light-blue));
    --rgb-cyan: var(--mush-rgb-cyan, var(--default-cyan));
    --rgb-teal: var(--mush-rgb-teal, var(--default-teal));
    --rgb-green: var(--mush-rgb-green, var(--default-green));
    --rgb-light-green: var(--mush-rgb-light-green, var(--default-light-green));
    --rgb-lime: var(--mush-rgb-lime, var(--default-lime));
    --rgb-yellow: var(--mush-rgb-yellow, var(--default-yellow));
    --rgb-amber: var(--mush-rgb-amber, var(--default-amber));
    --rgb-orange: var(--mush-rgb-orange, var(--default-orange));
    --rgb-deep-orange: var(--mush-rgb-deep-orange, var(--default-deep-orange));
    --rgb-brown: var(--mush-rgb-brown, var(--default-brown));
    --rgb-light-grey: var(--mush-rgb-light-grey, var(--default-light-grey));
    --rgb-grey: var(--mush-rgb-grey, var(--default-grey));
    --rgb-dark-grey: var(--mush-rgb-dark-grey, var(--default-dark-grey));
    --rgb-blue-grey: var(--mush-rgb-blue-grey, var(--default-blue-grey));
    --rgb-black: var(--mush-rgb-black, var(--default-black));
    --rgb-white: var(--mush-rgb-white, var(--default-white));
    --rgb-disabled: var(--mush-rgb-disabled, var(--default-disabled));

    /* Action colors */
    --rgb-info: var(--mush-rgb-info, var(--rgb-blue));
    --rgb-success: var(--mush-rgb-success, var(--rgb-green));
    --rgb-warning: var(--mush-rgb-warning, var(--rgb-orange));
    --rgb-danger: var(--mush-rgb-danger, var(--rgb-red));

    /* State colors */
    --rgb-state-vacuum: var(--mush-rgb-state-vacuum, var(--rgb-teal));
    --rgb-state-fan: var(--mush-rgb-state-fan, var(--rgb-green));
    --rgb-state-light: var(--mush-rgb-state-light, var(--rgb-orange));
    --rgb-state-entity: var(--mush-rgb-state-entity, var(--rgb-blue));
    --rgb-state-media-player: var(--mush-rgb-state-media-player, var(--rgb-indigo));
    --rgb-state-lock: var(--mush-rgb-state-lock, var(--rgb-blue));
    --rgb-state-number: var(--mush-rgb-state-number, var(--rgb-blue));
    --rgb-state-humidifier: var(--mush-rgb-state-humidifier, var(--rgb-purple));

    /* State alarm colors */
    --rgb-state-alarm-disarmed: var(--mush-rgb-state-alarm-disarmed, var(--rgb-info));
    --rgb-state-alarm-armed: var(--mush-rgb-state-alarm-armed, var(--rgb-success));
    --rgb-state-alarm-triggered: var(--mush-rgb-state-alarm-triggered, var(--rgb-danger));

    /* State person colors */
    --rgb-state-person-home: var(--mush-rgb-state-person-home, var(--rgb-success));
    --rgb-state-person-not-home: var(--mush-rgb-state-person-not-home, var(--rgb-danger));
    --rgb-state-person-zone: var(--mush-rgb-state-person-zone, var(--rgb-info));
    --rgb-state-person-unknown: var(--mush-rgb-state-person-unknown, var(--rgb-grey));

    /* State update colors */
    --rgb-state-update-on: var(--mush-rgb-state-update-on, var(--rgb-orange));
    --rgb-state-update-off: var(--mush-rgb-update-off, var(--rgb-green));
    --rgb-state-update-installing: var(--mush-rgb-update-installing, var(--rgb-blue));

    /* State lock colors */
    --rgb-state-lock-locked: var(--mush-rgb-state-lock-locked, var(--rgb-green));
    --rgb-state-lock-unlocked: var(--mush-rgb-state-lock-unlocked, var(--rgb-red));
    --rgb-state-lock-pending: var(--mush-rgb-state-lock-pending, var(--rgb-orange));

    /* State cover colors */
    --rgb-state-cover-open: var(--mush-rgb-state-cover-open, var(--rgb-blue));
    --rgb-state-cover-closed: var(--mush-rgb-state-cover-closed, var(--rgb-disabled));

    /* State climate colors */
    --rgb-state-climate-auto: var(--mush-rgb-state-climate-auto, var(--rgb-green));
    --rgb-state-climate-cool: var(--mush-rgb-state-climate-cool, var(--rgb-blue));
    --rgb-state-climate-dry: var(--mush-rgb-state-climate-dry, var(--rgb-orange));
    --rgb-state-climate-fan-only: var(--mush-rgb-state-climate-fan-only, var(--rgb-teal));
    --rgb-state-climate-heat: var(--mush-rgb-state-climate-heat, var(--rgb-deep-orange));
    --rgb-state-climate-heat-cool: var(--mush-rgb-state-climate-heat-cool, var(--rgb-green));
    --rgb-state-climate-idle: var(--mush-rgb-state-climate-idle, var(--rgb-disabled));
    --rgb-state-climate-off: var(--mush-rgb-state-climate-off, var(--rgb-disabled));
`,xe=a`
    ha-card {
        box-sizing: border-box;
        padding: var(--spacing);
        display: flex;
        flex-direction: column;
        justify-content: var(--layout-align);
        height: auto;
    }
    ha-card.fill-container {
        height: 100%;
    }
    :host([in-grid]) ha-card {
        height: 100%;
    }
    :host([in-grid]) ha-card mushroom-card {
        height: 100%;
    }
    .actions {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE 10+ */
    }
    .actions::-webkit-scrollbar {
        background: transparent; /* Chrome/Safari/Webkit */
        height: 0px;
    }
    .actions *:not(:last-child) {
        margin-right: var(--spacing);
    }
    .actions[rtl] *:not(:last-child) {
        margin-right: initial;
        margin-left: var(--spacing);
    }
    .unavailable {
        --main-color: rgb(var(--rgb-warning));
    }
    .not-found {
        --main-color: rgb(var(--rgb-danger));
    }
    mushroom-state-item[disabled] {
        cursor: initial;
    }
`,Ce=["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","grey","blue-grey","black","white","disabled"];function Ae(t){if("primary"===t||"accent"===t)return`var(--rgb-${t}-color)`;if(Ce.includes(t))return`var(--rgb-${t})`;if(t.startsWith("#")){const e=parseInt(t.substring(1),16);return isNaN(e)?"":[e>>16&255,e>>8&255,255&e].join(", ")}return t}const Ee=["button","input_button","scene"];function Me(t,e,r,i,n){switch(t){case"name":return e;case"state":const t=i.entity_id.split(".")[0];return"timestamp"!==i.attributes.device_class&&!Ee.includes(t)||!function(t){return"unavailable"!==t.state}(i)||function(t){return"unknown"===t.state}(i)?r:T`
                    <ha-relative-time
                        .hass=${n}
                        .datetime=${i.state}
                        capitalize
                    ></ha-relative-time>
                `;case"last-changed":return T`
                <ha-relative-time
                    .hass=${n}
                    .datetime=${i.last_changed}
                    capitalize
                ></ha-relative-time>
            `;case"last-updated":return T`
                <ha-relative-time
                    .hass=${n}
                    .datetime=${i.last_updated}
                    capitalize
                ></ha-relative-time>
            `;case"none":return}}const ke=t=>{return void 0===t.attributes.friendly_name?(e=t.entity_id,e.substring(e.indexOf(".")+1)).replace(/_/g," "):t.attributes.friendly_name||"";var e},De=t=>t&&!!t.themes.darkMode;class Oe extends ye{constructor(){super(...arguments),this.mushroom={}}updated(t){if(super.updated(t),t.has("hass")&&this.hass){const e=De(t.get("hass")),r=De(this.hass);e!==r&&this.toggleAttribute("dark-mode",r)}}_renderRow(t,e){var r;if(!this.hass)return T``;const i=this._warning?T`<hui-warning>${this._warning}</hui-warning>`:"",n=function(t){var e=t.locale.language||"en";return t.translationMetadata.translations[e]&&t.translationMetadata.translations[e].isRTL||!1}(this.hass),s=this.hass.states[this.config.entity],a=null!==(r=t.name)&&void 0!==r?r:ke(s);"hide_name"===this.modConfig.layout&&(t=Object.assign(Object.assign({},t),{name:""}));const o=this.appearance(),l=Me(o.primary_info,a,super._renderState(),s,this.hass);return T`
      <ha-card class=${o.fill_container?"fill-container":""}>
        <mushroom-card ?rtl=${n} .appearance=${o}>
          <mushroom-state-item
          .appearance=${o}
          ?rtl=${n}
          @action=${ue(this.hass,t)}
          .actionHandler=${ce(t)}
          >
            ${i}
            ${this._renderIcon(s)}
            ${this._renderBadge(s)}
            <div class="container" slot="info">
              <span class="primary">${l}</span>
              <span class="secondary ${this.appearance().layout}">${e}</span>
            </div>
          </mushroom-state-item>
        </mushroom-card>
        ${this._renderDebug()}
      </ha-card>`}_renderState(){var t;const e=this.hass.states[this.config.entity],r=null!==(t=this.config.name)&&void 0!==t?t:ke(e),i=this.appearance(),n=super._renderState();return Me(i.secondary_info,r,n,e,this.hass)}_renderIcon(t){const e=this.config.icon,r="active"==this._mode();let i="";if(this.mushroom.icon_color||this.mushroom.color){const t=Ae(this.mushroom.color||this.mushroom.icon_color);i+=`--icon-color:rgb(${t});`,i+=`--shape-color:rgba(${t}, 0.2);`}return T`<mushroom-shape-icon slot="icon" .disabled=${!r} style=${i}>
      <ha-state-icon .hass=${this.hass} .stateObj=${t} .state=${t} .icon=${e}></ha-state-icon>
    </mushroom-shape-icon>`}_renderBadge(t){return"unavailable"===t.state?T`<mushroom-badge-icon class="unavailable" slot="badge" icon="mdi:help"></mushroom-badge-icon>`:j}appearance(){var t,e,r,i,n;return{layout:null!==(t=this.mushroom.layout)&&void 0!==t?t:"default",fill_container:null!==(e=this.mushroom.fill_container)&&void 0!==e&&e,primary_info:null!==(r=this.mushroom.primary_info)&&void 0!==r?r:"name",secondary_info:null!==(i=this.mushroom.secondary_info)&&void 0!==i?i:"state",icon_type:null!==(n=this.mushroom.icon_type)&&void 0!==n?n:"icon"}}localize(t,e,r){return super.localize(t,e,!1)}static get styles(){return[super.styles,a`
            :host {
                ${_e}
            }
            :host([dark-mode]) {
                ${$e}
            }
            :host {
                ${Se}
                ${we}
            }
        `,xe,a`
                mushroom-state-item {
                    cursor: pointer;
                }
                mushroom-shape-icon {
                    --icon-color: rgb(var(--rgb-state-entity));
                    --shape-color: rgba(var(--rgb-state-entity), 0.2);
                }
            .container {
                min-width: 0;
                flex: 1;
                display: flex;
                flex-direction: column;
            }
            .primary {
                font-weight: var(--card-primary-font-weight);
                font-size: var(--card-primary-font-size);
                line-height: var(--card-primary-line-height);
                color: var(--card-primary-color);
                letter-spacing: var(--card-primary-letter-spacing);
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .secondary {
                font-weight: var(--card-secondary-font-weight);
                font-size: var(--card-secondary-font-size);
                line-height: var(--card-secondary-line-height);
                color: var(--card-secondary-color);
                letter-spacing: var(--card-secondary-letter-spacing);
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                display: flex;
                flex-direction: row-reverse;
                justify-content: start;
                align-items: center;
            }
            .secondary.vertical { flex-direction: column-reverse; justify-content: center; }
            .secondary.vertical > .text-content { width: 100% !important; text-align: center; }
            .bar { margin-top: 0; }
            .bar-container { flex-grow: 1 }
            .text-content { text-align: start; }
        `]}}t([rt()],Oe.prototype,"mushroom",void 0);window.customCards=window.customCards||[],window.customCards.push({type:"timer-bar-card",name:"Timer Bar Card",description:"Display timer-related information as a progress bar"}),window.customElements.define("timer-bar-entity-row",ye),window.customElements.define("timer-bar-mushroom-row",Oe),console.info("%c TIMER-BAR-CARD %c Version 1.30.2 ","font-weight: bold; color: #000; background: #aeb","font-weight: bold; color: #000; background: #ddd");let Ne=class extends Q{static getStubConfig(){return{}}setConfig(t){if(!t)throw new Error("Invalid configuration");"mushroom"in t&&t.mushroom?this.config=function(t,e){let r="var(--rgb-state-entity)";return e.icon_color&&(r=Ae(e.icon_color)),e.color&&(r=Ae(e.color)),Object.assign(Object.assign(Object.assign({},ve(t)),{bar_background:`rgba(${r}, 0.2)`,bar_foreground:`rgb(${r})`,bar_radius:"2px",translations:t.translations}),t)}(t,t.mushroom):this.config=ve(t)}render(){var t,e;const r=this.config;if(r.entity&&r.entities)return T`<hui-warning>Both entity and entities cannot be defined</hui-warning>`;if(r.entity)return"mushroom"in r?T`<timer-bar-mushroom-row .config=${r} .mushroom=${null!==(t=r.mushroom)&&void 0!==t?t:{}} style=${function(t){if(t.fill_container)return"height: 100%"}(null!==(e=r.mushroom)&&void 0!==e?e:{})} .hass=${this.hass}></timer-bar-mushroom-row>`:T`<timer-bar-entity-row .config=${r} .hass=${this.hass}></timer-bar-entity-row>`;if(r.entities&&!this._filteredEntities().length){if(this.editMode||r.show_empty){const t=void 0===r.show_empty?"No entities match the filter. This card will disappear when you finish editing.":r.show_empty;return T`<ha-card>
          <h1 class="card-header">${r.name}</h1>
          <div class="card-content">${t}</div>
        </ha-card>`}return T``}return r.entities?T`<ha-card>
        ${r.name&&!r.header_entity?T`<h1 class="card-header">${this.config.name}</h1>`:""}
        <div class="card-content">
          ${r.header_entity?this._renderTitle():""}
          ${this._renderContent()}
        </div>
      </ha-card>`:T`<hui-warning>Neither entity nor entities are defined</hui-warning>`}_hasEntityChanged(t,...e){for(const r of e)if(r)if("string"==typeof r){if(t.states[r]!==this.hass.states[r])return!0}else if("entity"in r){if(r.entity&&t.states[r.entity]!==this.hass.states[r.entity])return!0}else if("script"in r&&r.script&&t.states[r.script]!==this.hass.states[r.script])return!0;return!1}shouldUpdate(t){if(!this.config)return!1;if(t.has("config"))return!0;if(this.config.entity)return function(t,e,r){if(e.has("config")||r)return!0;if(t.config.entity){var i=e.get("hass");return!i||i.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!1);this.updateComplete.then((()=>this._patchFontSize()));const e=t.get("hass");if(!e||!this.hass)return!0;const r=Gt(this.config);this.config.header_entity&&r.push(this.config.header_entity);for(const t of this.config.entities)"string"==typeof t?r.push(t):r.push(...Gt(t));return Xt(r,e,this.hass)}_configFor(t){let e=Object.assign({},this.config);return delete e.name,"string"==typeof t?e.entity=t:e=Object.assign(Object.assign({},e),t),e}_renderContent(){return this._filteredEntities().map((t=>{const e=this.config.compressed?{height:"36px"}:{};return T`<timer-bar-entity-row
                    .config=${this._configFor(t)}
                    .hass=${this.hass}
                    style=${lt(e)}
                  ></timer-bar-entity-row>`}))}_renderTitle(){const t=this._filteredEntities().length>0?{"margin-bottom":"12px"}:{},e={entity:this.config.header_entity,secondary_info:this.config.header_secondary};return T`<hui-generic-entity-row
                  style=${lt(t)}
                  .config=${e}
                  .hass=${this.hass}
                ></generic-entity-header>`}_patchFontSize(){var t;const e=this.renderRoot.querySelector("hui-generic-entity-row"),r=null===(t=null==e?void 0:e.shadowRoot)||void 0===t?void 0:t.querySelector(".info");if(!r)return;const i=[...r.childNodes].filter((t=>t.nodeType===Node.TEXT_NODE&&t.textContent.trim()));if(i[0]){const t=document.createElement("span");t.style.fontSize="1.1em",r.insertBefore(t,i[0]),r.removeChild(i[0]),t.appendChild(i[0])}}_entitiesOfMode(t,e){return t.filter((t=>Kt(this.hass,this._configFor(t),0)===e))}_filteredEntities(){return this.config.filter&&this.hass?this._entitiesOfMode(this.config.entities,"active").concat(this._entitiesOfMode(this.config.entities,"pause")).concat(this._entitiesOfMode(this.config.entities,"waiting")):this.config.entities}async getCardSize(){if(this.config.entity)return 1;let t=0;return this.config.header_entity?t+=1:this.config.name&&(t+=2),t+this._filteredEntities().length}};Ne.styles=a`
    .card-header {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `,t([rt()],Ne.prototype,"hass",void 0),t([rt({attribute:!1})],Ne.prototype,"editMode",void 0),t([it()],Ne.prototype,"config",void 0),Ne=t([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:r,elements:i}=e;return{kind:r,elements:i,finisher(e){customElements.define(t,e)}}})(t,e))("timer-bar-card")],Ne);export{Ne as TimerBarCard};
