(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{7167:function(e,t,r){"use strict";r.d(t,{Z:function(){return re}});var n=function(){function e(e){var t=this;this._insertTag=function(e){var r;r=0===t.tags.length?t.prepend?t.container.firstChild:t.before:t.tags[t.tags.length-1].nextSibling,t.container.insertBefore(e,r),t.tags.push(e)},this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.before=null}var t=e.prototype;return t.hydrate=function(e){e.forEach(this._insertTag)},t.insert=function(e){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(function(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),void 0!==e.nonce&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}(this));var t=this.tags[this.tags.length-1];if(this.isSpeedy){var r=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}(t);try{r.insertRule(e,r.cssRules.length)}catch(n){0}}else t.appendChild(document.createTextNode(e));this.ctr++},t.flush=function(){this.tags.forEach((function(e){return e.parentNode&&e.parentNode.removeChild(e)})),this.tags=[],this.ctr=0},e}(),o=Math.abs,a=String.fromCharCode;function i(e){return e.trim()}function c(e,t,r){return e.replace(t,r)}function s(e,t){return e.indexOf(t)}function l(e,t){return 0|e.charCodeAt(t)}function u(e,t,r){return e.slice(t,r)}function p(e){return e.length}function f(e){return e.length}function d(e,t){return t.push(e),e}var h=1,m=1,y=0,g=0,v=0,b="";function w(e,t,r,n,o,a,i){return{value:e,root:t,parent:r,type:n,props:o,children:a,line:h,column:m,length:i,return:""}}function k(e,t,r){return w(e,t.root,t.parent,r,t.props,t.children,0)}function O(){return v=g>0?l(b,--g):0,m--,10===v&&(m=1,h--),v}function x(){return v=g<y?l(b,g++):0,m++,10===v&&(m=1,h++),v}function G(){return l(b,g)}function E(){return g}function S(e,t){return u(b,e,t)}function _(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function C(e){return h=m=1,y=p(b=e),g=0,[]}function A(e){return b="",e}function P(e){return i(S(g-1,M(91===e?e+2:40===e?e+1:e)))}function $(e){for(;(v=G())&&v<33;)x();return _(e)>2||_(v)>3?"":" "}function j(e,t){for(;--t&&x()&&!(v<48||v>102||v>57&&v<65||v>70&&v<97););return S(e,E()+(t<6&&32==G()&&32==x()))}function M(e){for(;x();)switch(v){case e:return g;case 34:case 39:return M(34===e||39===e?e:v);case 40:41===e&&M(e);break;case 92:x()}return g}function T(e,t){for(;x()&&e+v!==57&&(e+v!==84||47!==G()););return"/*"+S(t,g-1)+"*"+a(47===e?e:x())}function I(e){for(;!_(G());)x();return S(e,g)}var N="-ms-",H="-moz-",W="-webkit-",D="comm",R="rule",V="decl";function B(e,t){for(var r="",n=f(e),o=0;o<n;o++)r+=t(e[o],o,e,t)||"";return r}function Z(e,t,r,n){switch(e.type){case"@import":case V:return e.return=e.return||e.value;case D:return"";case R:e.value=e.props.join(",")}return p(r=B(e.children,n))?e.return=e.value+"{"+r+"}":""}function F(e,t){switch(function(e,t){return(((t<<2^l(e,0))<<2^l(e,1))<<2^l(e,2))<<2^l(e,3)}(e,t)){case 5103:return W+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return W+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return W+e+H+e+N+e+e;case 6828:case 4268:return W+e+N+e+e;case 6165:return W+e+N+"flex-"+e+e;case 5187:return W+e+c(e,/(\w+).+(:[^]+)/,"-webkit-box-$1$2-ms-flex-$1$2")+e;case 5443:return W+e+N+"flex-item-"+c(e,/flex-|-self/,"")+e;case 4675:return W+e+N+"flex-line-pack"+c(e,/align-content|flex-|-self/,"")+e;case 5548:return W+e+N+c(e,"shrink","negative")+e;case 5292:return W+e+N+c(e,"basis","preferred-size")+e;case 6060:return W+"box-"+c(e,"-grow","")+W+e+N+c(e,"grow","positive")+e;case 4554:return W+c(e,/([^-])(transform)/g,"$1-webkit-$2")+e;case 6187:return c(c(c(e,/(zoom-|grab)/,W+"$1"),/(image-set)/,W+"$1"),e,"")+e;case 5495:case 3959:return c(e,/(image-set\([^]*)/,W+"$1$`$1");case 4968:return c(c(e,/(.+:)(flex-)?(.*)/,"-webkit-box-pack:$3-ms-flex-pack:$3"),/s.+-b[^;]+/,"justify")+W+e+e;case 4095:case 3583:case 4068:case 2532:return c(e,/(.+)-inline(.+)/,W+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(p(e)-1-t>6)switch(l(e,t+1)){case 109:if(45!==l(e,t+4))break;case 102:return c(e,/(.+:)(.+)-([^]+)/,"$1-webkit-$2-$3$1"+H+(108==l(e,t+3)?"$3":"$2-$3"))+e;case 115:return~s(e,"stretch")?F(c(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(115!==l(e,t+1))break;case 6444:switch(l(e,p(e)-3-(~s(e,"!important")&&10))){case 107:return c(e,":",":"+W)+e;case 101:return c(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+W+(45===l(e,14)?"inline-":"")+"box$3$1"+W+"$2$3$1"+N+"$2box$3")+e}break;case 5936:switch(l(e,t+11)){case 114:return W+e+N+c(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return W+e+N+c(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return W+e+N+c(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return W+e+N+e+e}return e}function z(e){return A(L("",null,null,null,[""],e=C(e),0,[0],e))}function L(e,t,r,n,o,i,s,l,u){for(var f=0,h=0,m=s,y=0,g=0,v=0,b=1,w=1,k=1,S=0,_="",C=o,A=i,M=n,N=_;w;)switch(v=S,S=x()){case 34:case 39:case 91:case 40:N+=P(S);break;case 9:case 10:case 13:case 32:N+=$(v);break;case 92:N+=j(E()-1,7);continue;case 47:switch(G()){case 42:case 47:d(X(T(x(),E()),t,r),u);break;default:N+="/"}break;case 123*b:l[f++]=p(N)*k;case 125*b:case 59:case 0:switch(S){case 0:case 125:w=0;case 59+h:g>0&&p(N)-m&&d(g>32?J(N+";",n,r,m-1):J(c(N," ","")+";",n,r,m-2),u);break;case 59:N+=";";default:if(d(M=U(N,t,r,f,h,o,l,_,C=[],A=[],m),i),123===S)if(0===h)L(N,t,M,M,C,i,m,l,A);else switch(y){case 100:case 109:case 115:L(e,M,M,n&&d(U(e,M,M,0,0,o,l,_,o,C=[],m),A),o,A,m,l,n?C:A);break;default:L(N,M,M,M,[""],A,m,l,A)}}f=h=g=0,b=k=1,_=N="",m=s;break;case 58:m=1+p(N),g=v;default:if(b<1)if(123==S)--b;else if(125==S&&0==b++&&125==O())continue;switch(N+=a(S),S*b){case 38:k=h>0?1:(N+="\f",-1);break;case 44:l[f++]=(p(N)-1)*k,k=1;break;case 64:45===G()&&(N+=P(x())),y=G(),h=p(_=N+=I(E())),S++;break;case 45:45===v&&2==p(N)&&(b=0)}}return i}function U(e,t,r,n,a,s,l,p,d,h,m){for(var y=a-1,g=0===a?s:[""],v=f(g),b=0,k=0,O=0;b<n;++b)for(var x=0,G=u(e,y+1,y=o(k=l[b])),E=e;x<v;++x)(E=i(k>0?g[x]+" "+G:c(G,/&\f/g,g[x])))&&(d[O++]=E);return w(e,t,r,0===a?R:p,d,h,m)}function X(e,t,r){return w(e,t,r,D,a(v),u(e,2,-2),0)}function J(e,t,r,n){return w(e,t,r,V,u(e,0,n),u(e,n+1,-1),n)}var q=function(e,t,r){for(var n=0,o=0;n=o,o=G(),38===n&&12===o&&(t[r]=1),!_(o);)x();return S(e,g)},Y=function(e,t){return A(function(e,t){var r=-1,n=44;do{switch(_(n)){case 0:38===n&&12===G()&&(t[r]=1),e[r]+=q(g-1,t,r);break;case 2:e[r]+=P(n);break;case 4:if(44===n){e[++r]=58===G()?"&\f":"",t[r]=e[r].length;break}default:e[r]+=a(n)}}while(n=x());return e}(C(e),t))},Q=new WeakMap,K=function(e){if("rule"===e.type&&e.parent&&e.length){for(var t=e.value,r=e.parent,n=e.column===r.column&&e.line===r.line;"rule"!==r.type;)if(!(r=r.parent))return;if((1!==e.props.length||58===t.charCodeAt(0)||Q.get(r))&&!n){Q.set(e,!0);for(var o=[],a=Y(t,o),i=r.props,c=0,s=0;c<a.length;c++)for(var l=0;l<i.length;l++,s++)e.props[s]=o[c]?a[c].replace(/&\f/g,i[l]):i[l]+" "+a[c]}}},ee=function(e){if("decl"===e.type){var t=e.value;108===t.charCodeAt(0)&&98===t.charCodeAt(2)&&(e.return="",e.value="")}},te=[function(e,t,r,n){if(!e.return)switch(e.type){case V:e.return=F(e.value,e.length);break;case"@keyframes":return B([k(c(e.value,"@","@"+W),e,"")],n);case R:if(e.length)return function(e,t){return e.map(t).join("")}(e.props,(function(t){switch(function(e,t){return(e=t.exec(e))?e[0]:e}(t,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return B([k(c(t,/:(read-\w+)/,":-moz-$1"),e,"")],n);case"::placeholder":return B([k(c(t,/:(plac\w+)/,":-webkit-input-$1"),e,""),k(c(t,/:(plac\w+)/,":-moz-$1"),e,""),k(c(t,/:(plac\w+)/,N+"input-$1"),e,"")],n)}return""}))}}],re=function(e){var t=e.key;if("css"===t){var r=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(r,(function(e){-1!==e.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(e),e.setAttribute("data-s",""))}))}var o=e.stylisPlugins||te;var a,i,c={},s=[];a=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),(function(e){for(var t=e.getAttribute("data-emotion").split(" "),r=1;r<t.length;r++)c[t[r]]=!0;s.push(e)}));var l,u,p=[Z,(u=function(e){l.insert(e)},function(e){e.root||(e=e.return)&&u(e)})],d=function(e){var t=f(e);return function(r,n,o,a){for(var i="",c=0;c<t;c++)i+=e[c](r,n,o,a)||"";return i}}([K,ee].concat(o,p));i=function(e,t,r,n){l=r,B(z(e?e+"{"+t.styles+"}":t.styles),d),n&&(h.inserted[t.name]=!0)};var h={key:t,sheet:new n({key:t,container:a,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend}),nonce:e.nonce,inserted:c,registered:{},insert:i};return h.sheet.hydrate(s),h}},5610:function(e,t,r){"use strict";r.d(t,{HY:function(){return h},tZ:function(){return m},BX:function(){return y}});var n=r(7294),o=r(7167);var a=r(961),i=Object.prototype.hasOwnProperty,c=(0,n.createContext)("undefined"!==typeof HTMLElement?(0,o.Z)({key:"css"}):null);c.Provider;var s=function(e){return(0,n.forwardRef)((function(t,r){var o=(0,n.useContext)(c);return e(t,o,r)}))},l=(0,n.createContext)({});var u="__EMOTION_TYPE_PLEASE_DO_NOT_USE__",p=function(e,t){var r={};for(var n in t)i.call(t,n)&&(r[n]=t[n]);return r[u]=e,r},f=s((function(e,t,r){var o=e.css;"string"===typeof o&&void 0!==t.registered[o]&&(o=t.registered[o]);var c=e[u],s=[o],p="";"string"===typeof e.className?p=function(e,t,r){var n="";return r.split(" ").forEach((function(r){void 0!==e[r]?t.push(e[r]+";"):n+=r+" "})),n}(t.registered,s,e.className):null!=e.className&&(p=e.className+" ");var f=(0,a.O)(s,void 0,(0,n.useContext)(l));!function(e,t,r){var n=e.key+"-"+t.name;if(!1===r&&void 0===e.registered[n]&&(e.registered[n]=t.styles),void 0===e.inserted[t.name]){var o=t;do{e.insert(t===o?"."+n:"",o,e.sheet,!0),o=o.next}while(void 0!==o)}}(t,f,"string"===typeof c);p+=t.key+"-"+f.name;var d={};for(var h in e)i.call(e,h)&&"css"!==h&&h!==u&&(d[h]=e[h]);return d.ref=r,d.className=p,(0,n.createElement)(c,d)}));r(8679);var d=r(5893),h=d.Fragment;function m(e,t,r){return i.call(t,"css")?(0,d.jsx)(f,p(e,t),r):(0,d.jsx)(e,t,r)}function y(e,t,r){return i.call(t,"css")?(0,d.jsxs)(f,p(e,t),r):(0,d.jsxs)(e,t,r)}},961:function(e,t,r){"use strict";r.d(t,{O:function(){return h}});var n=function(e){for(var t,r=0,n=0,o=e.length;o>=4;++n,o-=4)t=1540483477*(65535&(t=255&e.charCodeAt(n)|(255&e.charCodeAt(++n))<<8|(255&e.charCodeAt(++n))<<16|(255&e.charCodeAt(++n))<<24))+(59797*(t>>>16)<<16),r=1540483477*(65535&(t^=t>>>24))+(59797*(t>>>16)<<16)^1540483477*(65535&r)+(59797*(r>>>16)<<16);switch(o){case 3:r^=(255&e.charCodeAt(n+2))<<16;case 2:r^=(255&e.charCodeAt(n+1))<<8;case 1:r=1540483477*(65535&(r^=255&e.charCodeAt(n)))+(59797*(r>>>16)<<16)}return(((r=1540483477*(65535&(r^=r>>>13))+(59797*(r>>>16)<<16))^r>>>15)>>>0).toString(36)},o={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};var a=/[A-Z]|^ms/g,i=/_EMO_([^_]+?)_([^]*?)_EMO_/g,c=function(e){return 45===e.charCodeAt(1)},s=function(e){return null!=e&&"boolean"!==typeof e},l=function(e){var t=Object.create(null);return function(r){return void 0===t[r]&&(t[r]=e(r)),t[r]}}((function(e){return c(e)?e:e.replace(a,"-$&").toLowerCase()})),u=function(e,t){switch(e){case"animation":case"animationName":if("string"===typeof t)return t.replace(i,(function(e,t,r){return f={name:t,styles:r,next:f},t}))}return 1===o[e]||c(e)||"number"!==typeof t||0===t?t:t+"px"};function p(e,t,r){if(null==r)return"";if(void 0!==r.__emotion_styles)return r;switch(typeof r){case"boolean":return"";case"object":if(1===r.anim)return f={name:r.name,styles:r.styles,next:f},r.name;if(void 0!==r.styles){var n=r.next;if(void 0!==n)for(;void 0!==n;)f={name:n.name,styles:n.styles,next:f},n=n.next;return r.styles+";"}return function(e,t,r){var n="";if(Array.isArray(r))for(var o=0;o<r.length;o++)n+=p(e,t,r[o])+";";else for(var a in r){var i=r[a];if("object"!==typeof i)null!=t&&void 0!==t[i]?n+=a+"{"+t[i]+"}":s(i)&&(n+=l(a)+":"+u(a,i)+";");else if(!Array.isArray(i)||"string"!==typeof i[0]||null!=t&&void 0!==t[i[0]]){var c=p(e,t,i);switch(a){case"animation":case"animationName":n+=l(a)+":"+c+";";break;default:n+=a+"{"+c+"}"}}else for(var f=0;f<i.length;f++)s(i[f])&&(n+=l(a)+":"+u(a,i[f])+";")}return n}(e,t,r);case"function":if(void 0!==e){var o=f,a=r(e);return f=o,p(e,t,a)}break;case"string":}if(null==t)return r;var i=t[r];return void 0!==i?i:r}var f,d=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var h=function(e,t,r){if(1===e.length&&"object"===typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var o=!0,a="";f=void 0;var i=e[0];null==i||void 0===i.raw?(o=!1,a+=p(r,t,i)):a+=i[0];for(var c=1;c<e.length;c++)a+=p(r,t,e[c]),o&&(a+=i[c]);d.lastIndex=0;for(var s,l="";null!==(s=d.exec(a));)l+="-"+s[1];return{name:n(a)+l,styles:a,next:f}}},8679:function(e,t,r){"use strict";var n=r(1296),o={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},a={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},i={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},c={};function s(e){return n.isMemo(e)?i:c[e.$$typeof]||o}c[n.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},c[n.Memo]=i;var l=Object.defineProperty,u=Object.getOwnPropertyNames,p=Object.getOwnPropertySymbols,f=Object.getOwnPropertyDescriptor,d=Object.getPrototypeOf,h=Object.prototype;e.exports=function e(t,r,n){if("string"!==typeof r){if(h){var o=d(r);o&&o!==h&&e(t,o,n)}var i=u(r);p&&(i=i.concat(p(r)));for(var c=s(t),m=s(r),y=0;y<i.length;++y){var g=i[y];if(!a[g]&&(!n||!n[g])&&(!m||!m[g])&&(!c||!c[g])){var v=f(r,g);try{l(t,g,v)}catch(b){}}}}return t}},6103:function(e,t){"use strict";var r="function"===typeof Symbol&&Symbol.for,n=r?Symbol.for("react.element"):60103,o=r?Symbol.for("react.portal"):60106,a=r?Symbol.for("react.fragment"):60107,i=r?Symbol.for("react.strict_mode"):60108,c=r?Symbol.for("react.profiler"):60114,s=r?Symbol.for("react.provider"):60109,l=r?Symbol.for("react.context"):60110,u=r?Symbol.for("react.async_mode"):60111,p=r?Symbol.for("react.concurrent_mode"):60111,f=r?Symbol.for("react.forward_ref"):60112,d=r?Symbol.for("react.suspense"):60113,h=r?Symbol.for("react.suspense_list"):60120,m=r?Symbol.for("react.memo"):60115,y=r?Symbol.for("react.lazy"):60116,g=r?Symbol.for("react.block"):60121,v=r?Symbol.for("react.fundamental"):60117,b=r?Symbol.for("react.responder"):60118,w=r?Symbol.for("react.scope"):60119;function k(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case n:switch(e=e.type){case u:case p:case a:case c:case i:case d:return e;default:switch(e=e&&e.$$typeof){case l:case f:case y:case m:case s:return e;default:return t}}case o:return t}}}function O(e){return k(e)===p}t.AsyncMode=u,t.ConcurrentMode=p,t.ContextConsumer=l,t.ContextProvider=s,t.Element=n,t.ForwardRef=f,t.Fragment=a,t.Lazy=y,t.Memo=m,t.Portal=o,t.Profiler=c,t.StrictMode=i,t.Suspense=d,t.isAsyncMode=function(e){return O(e)||k(e)===u},t.isConcurrentMode=O,t.isContextConsumer=function(e){return k(e)===l},t.isContextProvider=function(e){return k(e)===s},t.isElement=function(e){return"object"===typeof e&&null!==e&&e.$$typeof===n},t.isForwardRef=function(e){return k(e)===f},t.isFragment=function(e){return k(e)===a},t.isLazy=function(e){return k(e)===y},t.isMemo=function(e){return k(e)===m},t.isPortal=function(e){return k(e)===o},t.isProfiler=function(e){return k(e)===c},t.isStrictMode=function(e){return k(e)===i},t.isSuspense=function(e){return k(e)===d},t.isValidElementType=function(e){return"string"===typeof e||"function"===typeof e||e===a||e===p||e===c||e===i||e===d||e===h||"object"===typeof e&&null!==e&&(e.$$typeof===y||e.$$typeof===m||e.$$typeof===s||e.$$typeof===l||e.$$typeof===f||e.$$typeof===v||e.$$typeof===b||e.$$typeof===w||e.$$typeof===g)},t.typeOf=k},1296:function(e,t,r){"use strict";e.exports=r(6103)},2962:function(e,t,r){"use strict";r.d(t,{lX:function(){return s},PB:function(){return l}});var n=r(9008),o=r(7294);function a(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var i={templateTitle:"",noindex:!1,nofollow:!1,defaultOpenGraphImageWidth:0,defaultOpenGraphImageHeight:0,defaultOpenGraphVideoWidth:0,defaultOpenGraphVideoHeight:0},c=function(e){var t=[];e.titleTemplate&&(i.templateTitle=e.titleTemplate);var r="";e.title&&(r=e.title,i.templateTitle&&(r=i.templateTitle.replace(/%s/g,(function(){return r}))),t.push(o.createElement("title",{key:"title"},r)));var n=e.noindex||i.noindex||e.dangerouslySetAllPagesToNoIndex,a=e.nofollow||i.nofollow||e.dangerouslySetAllPagesToNoFollow;if(n||a?(e.dangerouslySetAllPagesToNoIndex&&(i.noindex=!0),e.dangerouslySetAllPagesToNoFollow&&(i.nofollow=!0),t.push(o.createElement("meta",{key:"robots",name:"robots",content:(n?"noindex":"index")+","+(a?"nofollow":"follow")})),t.push(o.createElement("meta",{key:"googlebot",name:"googlebot",content:(n?"noindex":"index")+","+(a?"nofollow":"follow")}))):(t.push(o.createElement("meta",{key:"robots",name:"robots",content:"index,follow"})),t.push(o.createElement("meta",{key:"googlebot",name:"googlebot",content:"index,follow"}))),e.description&&t.push(o.createElement("meta",{key:"description",name:"description",content:e.description})),e.mobileAlternate&&t.push(o.createElement("link",{rel:"alternate",key:"mobileAlternate",media:e.mobileAlternate.media,href:e.mobileAlternate.href})),e.languageAlternates&&e.languageAlternates.length>0&&e.languageAlternates.forEach((function(e){t.push(o.createElement("link",{rel:"alternate",key:"languageAlternate-"+e.hrefLang,hrefLang:e.hrefLang,href:e.href}))})),e.twitter&&(e.twitter.cardType&&t.push(o.createElement("meta",{key:"twitter:card",name:"twitter:card",content:e.twitter.cardType})),e.twitter.site&&t.push(o.createElement("meta",{key:"twitter:site",name:"twitter:site",content:e.twitter.site})),e.twitter.handle&&t.push(o.createElement("meta",{key:"twitter:creator",name:"twitter:creator",content:e.twitter.handle}))),e.facebook&&e.facebook.appId&&t.push(o.createElement("meta",{key:"fb:app_id",property:"fb:app_id",content:e.facebook.appId})),e.openGraph){if((e.openGraph.url||e.canonical)&&t.push(o.createElement("meta",{key:"og:url",property:"og:url",content:e.openGraph.url||e.canonical})),e.openGraph.type){var c=e.openGraph.type.toLowerCase();t.push(o.createElement("meta",{key:"og:type",property:"og:type",content:c})),"profile"===c&&e.openGraph.profile?(e.openGraph.profile.firstName&&t.push(o.createElement("meta",{key:"profile:first_name",property:"profile:first_name",content:e.openGraph.profile.firstName})),e.openGraph.profile.lastName&&t.push(o.createElement("meta",{key:"profile:last_name",property:"profile:last_name",content:e.openGraph.profile.lastName})),e.openGraph.profile.username&&t.push(o.createElement("meta",{key:"profile:username",property:"profile:username",content:e.openGraph.profile.username})),e.openGraph.profile.gender&&t.push(o.createElement("meta",{key:"profile:gender",property:"profile:gender",content:e.openGraph.profile.gender}))):"book"===c&&e.openGraph.book?(e.openGraph.book.authors&&e.openGraph.book.authors.length&&e.openGraph.book.authors.forEach((function(e,r){t.push(o.createElement("meta",{key:"book:author:0"+r,property:"book:author",content:e}))})),e.openGraph.book.isbn&&t.push(o.createElement("meta",{key:"book:isbn",property:"book:isbn",content:e.openGraph.book.isbn})),e.openGraph.book.releaseDate&&t.push(o.createElement("meta",{key:"book:release_date",property:"book:release_date",content:e.openGraph.book.releaseDate})),e.openGraph.book.tags&&e.openGraph.book.tags.length&&e.openGraph.book.tags.forEach((function(e,r){t.push(o.createElement("meta",{key:"book:tag:0"+r,property:"book:tag",content:e}))}))):"article"===c&&e.openGraph.article?(e.openGraph.article.publishedTime&&t.push(o.createElement("meta",{key:"article:published_time",property:"article:published_time",content:e.openGraph.article.publishedTime})),e.openGraph.article.modifiedTime&&t.push(o.createElement("meta",{key:"article:modified_time",property:"article:modified_time",content:e.openGraph.article.modifiedTime})),e.openGraph.article.expirationTime&&t.push(o.createElement("meta",{key:"article:expiration_time",property:"article:expiration_time",content:e.openGraph.article.expirationTime})),e.openGraph.article.authors&&e.openGraph.article.authors.length&&e.openGraph.article.authors.forEach((function(e,r){t.push(o.createElement("meta",{key:"article:author:0"+r,property:"article:author",content:e}))})),e.openGraph.article.section&&t.push(o.createElement("meta",{key:"article:section",property:"article:section",content:e.openGraph.article.section})),e.openGraph.article.tags&&e.openGraph.article.tags.length&&e.openGraph.article.tags.forEach((function(e,r){t.push(o.createElement("meta",{key:"article:tag:0"+r,property:"article:tag",content:e}))}))):"video.movie"!==c&&"video.episode"!==c&&"video.tv_show"!==c&&"video.other"!==c||!e.openGraph.video||(e.openGraph.video.actors&&e.openGraph.video.actors.length&&e.openGraph.video.actors.forEach((function(e,r){e.profile&&t.push(o.createElement("meta",{key:"video:actor:0"+r,property:"video:actor",content:e.profile})),e.role&&t.push(o.createElement("meta",{key:"video:actor:role:0"+r,property:"video:actor:role",content:e.role}))})),e.openGraph.video.directors&&e.openGraph.video.directors.length&&e.openGraph.video.directors.forEach((function(e,r){t.push(o.createElement("meta",{key:"video:director:0"+r,property:"video:director",content:e}))})),e.openGraph.video.writers&&e.openGraph.video.writers.length&&e.openGraph.video.writers.forEach((function(e,r){t.push(o.createElement("meta",{key:"video:writer:0"+r,property:"video:writer",content:e}))})),e.openGraph.video.duration&&t.push(o.createElement("meta",{key:"video:duration",property:"video:duration",content:e.openGraph.video.duration.toString()})),e.openGraph.video.releaseDate&&t.push(o.createElement("meta",{key:"video:release_date",property:"video:release_date",content:e.openGraph.video.releaseDate})),e.openGraph.video.tags&&e.openGraph.video.tags.length&&e.openGraph.video.tags.forEach((function(e,r){t.push(o.createElement("meta",{key:"video:tag:0"+r,property:"video:tag",content:e}))})),e.openGraph.video.series&&t.push(o.createElement("meta",{key:"video:series",property:"video:series",content:e.openGraph.video.series})))}(e.openGraph.title||e.title)&&t.push(o.createElement("meta",{key:"og:title",property:"og:title",content:e.openGraph.title||r})),(e.openGraph.description||e.description)&&t.push(o.createElement("meta",{key:"og:description",property:"og:description",content:e.openGraph.description||e.description})),e.defaultOpenGraphImageWidth&&(i.defaultOpenGraphImageWidth=e.defaultOpenGraphImageWidth),e.defaultOpenGraphImageHeight&&(i.defaultOpenGraphImageHeight=e.defaultOpenGraphImageHeight),e.openGraph.images&&e.openGraph.images.length&&e.openGraph.images.forEach((function(e,r){t.push(o.createElement("meta",{key:"og:image:0"+r,property:"og:image",content:e.url})),e.alt&&t.push(o.createElement("meta",{key:"og:image:alt0"+r,property:"og:image:alt",content:e.alt})),e.width?t.push(o.createElement("meta",{key:"og:image:width0"+r,property:"og:image:width",content:e.width.toString()})):i.defaultOpenGraphImageWidth&&t.push(o.createElement("meta",{key:"og:image:width0"+r,property:"og:image:width",content:i.defaultOpenGraphImageWidth.toString()})),e.height?t.push(o.createElement("meta",{key:"og:image:height"+r,property:"og:image:height",content:e.height.toString()})):i.defaultOpenGraphImageHeight&&t.push(o.createElement("meta",{key:"og:image:height"+r,property:"og:image:height",content:i.defaultOpenGraphImageHeight.toString()}))})),e.defaultOpenGraphVideoWidth&&(i.defaultOpenGraphVideoWidth=e.defaultOpenGraphVideoWidth),e.defaultOpenGraphVideoHeight&&(i.defaultOpenGraphVideoHeight=e.defaultOpenGraphVideoHeight),e.openGraph.videos&&e.openGraph.videos.length&&e.openGraph.videos.forEach((function(e,r){t.push(o.createElement("meta",{key:"og:video:0"+r,property:"og:video",content:e.url})),e.alt&&t.push(o.createElement("meta",{key:"og:video:alt0"+r,property:"og:video:alt",content:e.alt})),e.width?t.push(o.createElement("meta",{key:"og:video:width0"+r,property:"og:video:width",content:e.width.toString()})):i.defaultOpenGraphVideoWidth&&t.push(o.createElement("meta",{key:"og:video:width0"+r,property:"og:video:width",content:i.defaultOpenGraphVideoWidth.toString()})),e.height?t.push(o.createElement("meta",{key:"og:video:height"+r,property:"og:video:height",content:e.height.toString()})):i.defaultOpenGraphVideoHeight&&t.push(o.createElement("meta",{key:"og:video:height"+r,property:"og:video:height",content:i.defaultOpenGraphVideoHeight.toString()}))})),e.openGraph.locale&&t.push(o.createElement("meta",{key:"og:locale",property:"og:locale",content:e.openGraph.locale})),e.openGraph.site_name&&t.push(o.createElement("meta",{key:"og:site_name",property:"og:site_name",content:e.openGraph.site_name}))}return e.canonical&&t.push(o.createElement("link",{rel:"canonical",href:e.canonical,key:"canonical"})),e.additionalMetaTags&&e.additionalMetaTags.length>0&&e.additionalMetaTags.forEach((function(e){t.push(o.createElement("meta",Object.assign({key:e.name?e.name:e.property},e)))})),t},s=function(e){function t(){return e.apply(this,arguments)||this}return a(t,e),t.prototype.render=function(){var e=this.props,t=e.title,r=e.titleTemplate,a=e.dangerouslySetAllPagesToNoIndex,i=void 0!==a&&a,s=e.dangerouslySetAllPagesToNoFollow,l=void 0!==s&&s,u=e.description,p=e.canonical,f=e.facebook,d=e.openGraph,h=e.additionalMetaTags,m=e.twitter,y=e.defaultOpenGraphImageWidth,g=e.defaultOpenGraphImageHeight,v=e.defaultOpenGraphVideoWidth,b=e.defaultOpenGraphVideoHeight,w=e.mobileAlternate,k=e.languageAlternates;return o.createElement(n.default,null,c({title:t,titleTemplate:r,dangerouslySetAllPagesToNoIndex:i,dangerouslySetAllPagesToNoFollow:l,description:u,canonical:p,facebook:f,openGraph:d,additionalMetaTags:h,twitter:m,defaultOpenGraphImageWidth:y,defaultOpenGraphImageHeight:g,defaultOpenGraphVideoWidth:v,defaultOpenGraphVideoHeight:b,mobileAlternate:w,languageAlternates:k}))},t}(o.Component),l=function(e){function t(){return e.apply(this,arguments)||this}return a(t,e),t.prototype.render=function(){var e=this.props,t=e.title,r=e.noindex,a=void 0!==r&&r,i=e.nofollow,s=e.description,l=e.canonical,u=e.openGraph,p=e.facebook,f=e.twitter,d=e.additionalMetaTags,h=e.titleTemplate,m=e.mobileAlternate,y=e.languageAlternates;return o.createElement(n.default,null,c({title:t,noindex:a,nofollow:i,description:s,canonical:l,facebook:p,openGraph:u,additionalMetaTags:d,twitter:f,titleTemplate:h,mobileAlternate:m,languageAlternates:y}))},t}(o.Component)},8e3:function(e,t,r){"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var o=((n=r(7294))&&n.__esModule?n:{default:n}).default.createContext({});t.AmpStateContext=o},5646:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=i,t.useAmp=function(){return i(o.default.useContext(a.AmpStateContext))};var n,o=(n=r(7294))&&n.__esModule?n:{default:n},a=r(8e3);function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,r=void 0!==t&&t,n=e.hybrid,o=void 0!==n&&n,a=e.hasQuery,i=void 0!==a&&a;return r||o&&i}},2717:function(e,t,r){"use strict";var n=r(1682);function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=p,t.default=void 0;var a,i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};n.get||n.set?Object.defineProperty(t,r,n):t[r]=e[r]}return t.default=e,t}(r(7294)),c=(a=r(1585))&&a.__esModule?a:{default:a},s=r(8e3),l=r(5850),u=r(5646);function p(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[i.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(i.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function f(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===i.default.Fragment?e.concat(i.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var d=["name","httpEquiv","charSet","itemProp"];function h(e,t){return e.reduce((function(e,t){var r=i.default.Children.toArray(t.props.children);return e.concat(r)}),[]).reduce(f,[]).reverse().concat(p(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,r=new Set,n={};return function(o){var a=!0,i=!1;if(o.key&&"number"!==typeof o.key&&o.key.indexOf("$")>0){i=!0;var c=o.key.slice(o.key.indexOf("$")+1);e.has(c)?a=!1:e.add(c)}switch(o.type){case"title":case"base":t.has(o.type)?a=!1:t.add(o.type);break;case"meta":for(var s=0,l=d.length;s<l;s++){var u=d[s];if(o.props.hasOwnProperty(u))if("charSet"===u)r.has(u)?a=!1:r.add(u);else{var p=o.props[u],f=n[u]||new Set;"name"===u&&i||!f.has(p)?(f.add(p),n[u]=f):a=!1}}}return a}}()).reverse().map((function(e,r){var a=e.key||r;if(!t.inAmpMode&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some((function(t){return e.props.href.startsWith(t)}))){var c=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e.props||{});return c["data-href"]=c.href,c.href=void 0,c["data-optimized-fonts"]=!0,i.default.cloneElement(e,c)}return i.default.cloneElement(e,{key:a})}))}var m=function(e){var t=e.children,r=i.useContext(s.AmpStateContext),n=i.useContext(l.HeadManagerContext);return i.default.createElement(c.default,{reduceComponentsToState:h,headManager:n,inAmpMode:u.isInAmpMode(r)},t)};t.default=m},1585:function(e,t,r){"use strict";var n=r(3115),o=r(2553),a=r(2012),i=(r(450),r(9807)),c=r(7690),s=r(9828);function l(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=s(e);if(t){var o=s(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return c(this,r)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};n.get||n.set?Object.defineProperty(t,r,n):t[r]=e[r]}return t.default=e,t}(r(7294));var p=function(e){i(r,e);var t=l(r);function r(e){var a;return o(this,r),(a=t.call(this,e)).emitChange=function(){a._hasHeadManager&&a.props.headManager.updateHead(a.props.reduceComponentsToState(n(a.props.headManager.mountedInstances),a.props))},a._hasHeadManager=a.props.headManager&&a.props.headManager.mountedInstances,a}return a(r,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),r}(u.Component);t.default=p},8459:function(e,t,r){"use strict";r.d(t,{JA:function(){return n},lB:function(){return o}});var n={title:"chooblarin's blog",description:"Sympathy driven development",url:"https://chooblarin.github.io"},o={light:{backgroundColor:"#ffffff",textColor:"#232323",subTextColor:"#767676",primaryColor:"#932ab5"},dark:{backgroundColor:"#1e1e1e",textColor:"#ffffff",subTextColor:"#8a8a8a",primaryColor:"#d88dff"}}},3959:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a=[],i=!0,c=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);i=!0);}catch(s){c=!0,o=s}finally{try{i||null==r.return||r.return()}finally{if(c)throw o}}return a}}(e,t)||function(e,t){if(e){if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}r.d(t,{v:function(){return s},i:function(){return l}});var a=r(7294),i=r(8459),c=r(5610),s=a.createContext(null),l=function(e){var t=e.children,r=o(a.useState(void 0),2),n=r[0],l=r[1];a.useEffect((function(){var e=window.document.documentElement.style.getPropertyValue("--initial-color-mode");l(e)}),[]);return(0,c.tZ)(s.Provider,{value:n?{colorMode:n,changeColorMode:function(e){l(e),window.localStorage.setItem("color-mode",e);var t=window.document.documentElement;t.style.setProperty("--initial-color-mode",e),t.style.setProperty("--color-text","light"===e?i.lB.light.textColor:i.lB.dark.textColor),t.style.setProperty("--color-sub-text","light"===e?i.lB.light.subTextColor:i.lB.dark.subTextColor),t.style.setProperty("--color-background","light"===e?i.lB.light.backgroundColor:i.lB.dark.backgroundColor),t.style.setProperty("--color-primary","light"===e?i.lB.light.primaryColor:i.lB.dark.primaryColor)}}:null,children:t})}},8415:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return v}});var n=r(2809),o=r(3959),a=r(2962),i=r(9008),c=r(1163),s=r(7294),l=r(8459),u=(r(4233),r(5610));function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function d(e,t){var r="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"===typeof e)return h(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return h(e,t)}(e))||t&&e&&"number"===typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return i=e.done,e},e:function(e){c=!0,a=e},f:function(){try{i||null==r.return||r.return()}finally{if(c)throw a}}}}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var m=l.JA.title,y=l.JA.description,g=l.JA.url;var v=function(e){var t=e.Component,r=e.pageProps,n=(0,c.useRouter)();return s.useEffect((function(){var e="routeChangeComplete",t=function(e){return function(e){(0,window.gtag)("config","UA-62520326-2",{page_path:e})}(e)};return n.events.on(e,t),function(){return n.events.off(e,t)}}),[n.events]),s.useEffect((function(){"serviceWorker"in navigator&&navigator.serviceWorker.getRegistrations().then((function(e){var t,r=d(e);try{for(r.s();!(t=r.n()).done;){t.value.unregister()}}catch(n){r.e(n)}finally{r.f()}})).catch((function(e){return console.error("Service Worker registration failed:",e)}))}),[]),(0,u.BX)(u.HY,{children:[(0,u.tZ)(a.lX,{title:m,description:y,openGraph:{type:"website",title:m,description:y,url:g,site_name:m,images:[{url:"og-default.png",width:1280,height:675,alt:m}]}}),(0,u.tZ)(i.default,{children:(0,u.tZ)("meta",{name:"google-site-verification",content:"5MMy9toPN2P8O6xmRyiBp-l97-pCGSnLGS2AwiUdWpI"})}),(0,u.BX)(i.default,{children:[(0,u.tZ)("meta",{name:"theme-color",content:"#ffffff"}),(0,u.tZ)("link",{rel:"icon",type:"image/svg+xml",href:"favicon.svg"}),(0,u.tZ)("link",{rel:"mask-icon",href:"mask-icon.svg",color:"#000000"}),(0,u.tZ)("link",{rel:"apple-touch-icon",href:"apple-touch-icon.png"}),(0,u.tZ)("link",{rel:"manifest",href:"/site.webmanifest"})]}),(0,u.tZ)(o.i,{children:(0,u.tZ)(t,f({},r))})]})}},6363:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(8415)}])},4233:function(){},9008:function(e,t,r){e.exports=r(2717)},8164:function(e,t,r){var n=r(4360);e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.default=e.exports,e.exports.__esModule=!0},7381:function(e){e.exports=function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},5725:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},3115:function(e,t,r){var n=r(8164),o=r(7381),a=r(3585),i=r(5725);e.exports=function(e){return n(e)||o(e)||a(e)||i()},e.exports.default=e.exports,e.exports.__esModule=!0},1163:function(e,t,r){e.exports=r(9898)},2809:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,{Z:function(){return n}})}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],(function(){return t(6363),t(9898)}));var r=e.O();_N_E=r}]);