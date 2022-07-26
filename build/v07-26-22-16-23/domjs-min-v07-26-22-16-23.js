/******************************************
*  Copyright 2022 Alejandro Sebastian Scotti, Scotti Corp.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License.

*  @author Alejandro Sebastian Scotti
*  @version v07-26-22-16-23
*******************************************/
function domJS() { const dom = {};
dom.addClass=(t,e)=>{let r=dom.getTag(t);return dom.hasClass(r,e)||r.classList.add(e),dom};dom.append=(t,e,r)=>{let n=dom,s=n.utils;if(!e||!t){console.error("DOM.addChild(): missing parameter 'selector', 'content' or both.");return}if(typeof e=="string"&&(e=n.parse(e)),s.hasSingleID(t))return t=t.replace("#",""),s.append(document.getElementById(t),e,r),n;if(s.hasSingleClass(t)){let l=document.getElementsByClassName(t);return l&&l.length>0&&s.appendChildAll(l,e,r),n}if(s.isString(t)){let l=document.querySelectorAll(t);return l&&l.length>0&&s.appendChildAll(l,e,r),n}if(s.isElement(t)||s.isNode(t))return s.append(t,e,r),n;if(s.isNodeList(t)||s.isHTMLCollection(t)||s.isArray(t))return s.appendChildAll(t,e,r),n};dom.appendSVG=(t,e,r)=>{if(!e||!t){console.error("DOM.addSVGChild(): missing parameter 'selector', 'content' or both.");return}if(typeof e=="string"){let n=document.createElement("div"),s="<svg>"+e+"</svg>";n.innerHTML=""+s,Array.prototype.slice.call(n.childNodes[0].childNodes).forEach(function(l){dom.append(t,l,r)})}else dom.append(t,el,r)};dom.appendSelfToParentTag=(t,e,r)=>{let n=dom.getTag(t);return n?(dom.append(n,e,r),n):`${e.localName}: parentTag element not found. DOM install failed.`};dom.computeTagHeight=t=>{let e=dom.utils,r=window.getComputedStyle(t,null);if(!r)return;let n=r.getPropertyValue("padding-top"),s=r.getPropertyValue("padding-bottom"),l=r.getPropertyValue("margin-top"),d=r.getPropertyValue("margin-bottom"),g=e.getStyleNumValue(n)+e.getStyleNumValue(s),c=e.getStyleNumValue(l)+e.getStyleNumValue(d);return g+c+t.clientHeight};dom.computeTagWidth=(t,e)=>{let r=dom.utils,n=window.getComputedStyle(t,null);if(!n)return;let s=n.getPropertyValue("padding-left"),l=n.getPropertyValue("padding-right"),d=n.getPropertyValue("margin-left"),g=n.getPropertyValue("margin-right"),c=r.getStyleNumValue(s)+r.getStyleNumValue(l),f=r.getStyleNumValue(d)+r.getStyleNumValue(g),h=0;if(e){let p=window.getComputedStyle(e,null);if(p){let S=p.getPropertyValue("padding-left"),N=p.getPropertyValue("padding-right");h+=r.getStyleNumValue(S)+r.getStyleNumValue(N)+f}}return h+=c+f+t.clientWidth,h};dom.createSVGTag=(t,e)=>{let r=dom.utils,n=r.createTagNS(t,"SVG");if(!(!e||!r.isObject(e)))return dom.setProps(n,e.prop),dom.setAttr(n,e.attr),r.setEvent(n,e.event),e.children&&Array.isArray(e.children)&&e.children.forEach(s=>{let l=dom.createSVGTag(s.name,s.props,s.attrs,s.children);r.append(n,l)}),n};dom.createTag=(t,e)=>{let r=dom.utils,n=r.createTagNS(t);if(!e||!r.isObject(e))return n;switch(t){case"input":case"textarea":case"select":case"option":case"output":n.value=e.text?e.text:"";break;default:n.innerText=e.text?e.text:"";break}return dom.setProps(n,e.prop),dom.setAttr(n,e.attr),r.setEvent(n,e.event),e.class&&e.class!==""&&(n.className=e.class),n};dom.empty=t=>{let e=dom.getTag(t);return e.innerHTML="",self};dom.getTag=(t,e)=>{let r=dom.utils;if(typeof t!="string")return t;let n=e||document;return typeof n=="string"&&(n=r.getElement(n)),r.hasSingleID(t)?n.getElementById(t.replace("#","")):r.hasSingleClass(t)?n.getElementsByClassName(t.replace(".",""))[0]:r.hasSingleTagName(t)?n.getElementsByTagName(t)[0]:n.querySelector(t)};dom.getTags=(t,e)=>{let r=dom.utils;if(typeof t!="string")return t;if(r.hasSingleID(t))return"For a single #id selector use getTag() method instead (expects a single tag return, not a list).";let n=e||document;return r.hasSingleClass(t)?n.getElementsByClassName(t.replace(".","")):r.hasSingleTagName(t)?n.getElementsByTagName(t):(console.log("DOM.getTags(): you have used document.querySelectorAll('') that returns DOM tags that are not 'LIVE' therefore won't automatically stay in sync with the browser therefore, it's not recommended. Try a direct String selector."),n.querySelectorAll(t))};dom.hasClass=(t,e)=>t.className.indexOf(e)!==-1;dom.parse=t=>{var e=document.createElement("template");return t=t.trim(),e.innerHTML=t,e.content};dom.prepend=(t,e)=>{dom.append(t,e,!0)};dom.remove=t=>{let e=dom.utils;return typeof t=="string"?e.hasSingleID(t)?r(getTag(t)):dom.removeAll(getTags(t)):r(t),self;function r(n){n.parentNode.removeChild&&n.parentNode.removeChild(n)}};dom.removeAll=t=>{for(let e=0;e<t.length;e++)dom.remove(t[e])};dom.removeAttrs=(t,e)=>{let r=dom.utils,n=dom.getTag(t);return n&&!r.isString(n)&&e&&Array.isArray(e)&&e.forEach(s=>{n.removeAttribute(s)}),dom};dom.removeAttrsAll=(t,e)=>{let r=dom.utils,n=dom.getTags(t);if(n&&!r.isString(n)&&e&&Array.isArray(e))for(let s=0;s<n.length;s++)e.forEach(l=>{n[s].removeAttribute(l)});return dom};dom.removeClass=(t,e)=>(dom.getTag(t).classList.remove(e),dom);dom.removeClassAll=(t,e)=>{let r=dom.utils;if(r.isArray(t))for(let n=0;n<t.length;n++)dom.removeClass(t[n],e);else if(r.isObject(t))for(let n in t)dom.removeClass(t[n],e)};dom.setAttr=(t,e)=>{let r=dom.utils,n=dom.getTag(t);if(n&&!r.isString(n)&&e&&r.isObject(e))for(let s in e)n.setAttribute(s,e[s]);return dom};dom.setAttrAll=(t,e)=>{let r=dom.utils,n=dom.getTags(t);if(n&&!r.isString(n)&&e&&r.isObject(e))for(let s=0;s<n.length;s++)for(let l in e)n[s].setAttribute(l,e[l]);return dom};dom.setProps=(t,e)=>{let r=dom.utils,n=dom.getTag(t);if(n&&!r.isString(n)&&e&&r.isObject(e))for(let s in e)n[s]=e[s];return dom};dom.setPropsAll=(t,e)=>{let r=dom.utils,n=dom.getTags(t);if(n&&!r.isString(n)&&e&&r.isObject(e))for(let s=0;s<n.length;s++)for(let l in e)n[s][l]=e[l];return dom};dom.supplantHTML=(t,e)=>t.replace(/{([^{}]*)}/g,function(r,n){let s=dom.utils.getProperty(n,e);return typeof s=="string"||typeof s=="number"?s:r});dom.toggleClass=(t,e)=>(dom.getTag(t).classList.toggle(e),dom);dom.utils=new function(){"use strict";this.append=t,this.appendChildAll=e,this.createTagNS=r,this.getElement=n,this.getProperty=s,this.getStyleNumValue=l,this.hasColon=d,this.hasSingleClass=g,this.hasSingleID=c,this.hasSingleTagName=f,this.isArray=h,this.isElement=p,this.isHTMLCollection=S,this.isNode=N,this.isNodeList=T,this.isObject=C,this.isString=m,this.setEvent=P,this.singleHashChar=A,this.singlePeriodChar=E;function t(i,o,a){o&&i&&(a&&i.firstChild?i.insertBefore(o,i.firstChild):i.appendChild(o))}function e(i,o,a){for(let u=0;u<i.length;u++)t(i[u],o,a)}function r(i,o){switch(o){case"SVG":return document.createElementNS("http://www.w3.org/2000/svg",i);case"MathML":return document.createElementNS("http://www.w3.org/1998/Math/MathML",i);default:return document.createElementNS("http://www.w3.org/1999/xhtml",i)}}function n(i){return typeof i!="string"?i:c(i)?document.getElementById(i.replace("#","")):g(i)?document.getElementsByClassName(i.replace(".",""))[0]:f(i)?document.getElementsByTagName(i)[0]:document.querySelector(i)}function s(i,o){let a=i.split("."),u=o;for(let y=0,V=a.length;y<V;y++){if(!(a[y]in u))return"";u=u[a[y]]}return u}function l(i){return parseInt(i.replace("px",""))}function d(i){if(m(i))return i.includes(":")}function g(i){if(m(i))return i.startsWith(".")&&E(i)&&!d(i)&&!i.includes("#")&&!i.includes(" ")}function c(i){if(m(i))return i.startsWith("#")&&A(i)&&!d(i)&&!i.includes(".")&&!i.includes(" ")}function f(i){if(m(i))return!i.includes("#")&&!i.includes(".")&&!i.includes(" ")&&!d(i)}function h(i){return Array.isArray(i)}function p(i){return i instanceof Element}function S(i){return HTMLCollection.prototype.isPrototypeOf(i)}function N(i){return i instanceof Node}function T(i){return NodeList.prototype.isPrototypeOf(i)}function C(i){return typeof i=="object"}function m(i){return typeof i=="string"}function P(i,o){let a=dom.getTag(i);if(a&&!m(a)&&o&&C(o))for(let u in o)a.addEventListener(u,o[u]);return self}function A(i){if(m(i))return(i.match(RegExp("#","g"))||[]).length===1}function E(i){if(m(i))return(i.match(RegExp("\\.","g"))||[]).length===1}};
return dom;}
//# sourceMappingURL=domjs-min-v07-26-22-16-23.js.map
