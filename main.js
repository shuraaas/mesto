(()=>{"use strict";var e={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".btn_type_save",inactiveButtonClass:"btn_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"},t=document.querySelector(".page"),n=t.querySelector(".btn_type_edit"),r=t.querySelector(".btn_type_add"),o=t.querySelector(".btn_type_edit-avatar"),i=t.querySelector(".form_type_edit"),a=t.querySelector(".form_type_add-card"),c=t.querySelector(".form_type_edit-avatar"),u=a.querySelector(".form__input_type_place-name"),l=a.querySelector(".form__input_type_url"),s={id:""},f={id:""};function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var h=function(){function e(t,n,r){var o=t.data,i=t.cardSelector,a=t.handleCardClick,c=t.handleDeleteClick,u=t.handleLikeClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.data=o,this._name=o.name,this._link=o.link,this._likes=o.likes?o.likes:0,this._myId=n.id,this._newCardId=r,this._cardId=o._id,this._cardOwnerId=o.owner?o.owner._id:null,this._cardSelector=i,this._handleCardClick=a,this._handleDeleteClick=c,this._handleLikeClick=u,this._element=this._getTemplate(),this._cardImageElement=this._element.querySelector(".card__img"),this._cardLikeElement=this._element.querySelector(".btn_type_like"),this._cardDescriptionElement=this._element.querySelector(".card__place"),this._cardLikesCounterElement=this._element.querySelector(".card__like-counter"),this._cardDeleteBtnElement=this._element.querySelector(".btn_type_delete")}var t,n;return t=e,(n=[{key:"_checkCardOwner",value:function(){this._cardOwnerId&&this._cardOwnerId!=this._myId&&this._cardDeleteBtnElement.classList.add("btn_hidden")}},{key:"_checkMyLikes",value:function(){var e=this;this._likes.length>0&&this._likes.forEach((function(t){t._id===e._myId&&e._cardLikeElement.classList.add("btn_type_like-active")}))}},{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}},{key:"generateCard",value:function(){return this._setEventListeners(),this._checkCardOwner(),this._checkMyLikes(),this._cardImageElement.src=this._link,this._cardImageElement.alt="Место: ".concat(this._name),this._cardDescriptionElement.textContent=this._name,this._cardLikesCounterElement.textContent=this._likes.length>0?this._likes.length:"",this._element}},{key:"_checkActiveLike",value:function(e){return!!e.classList.contains("btn_type_like-active")}},{key:"_likeCard",value:function(e){e?this._checkActiveLike(this._cardLikeElement)?this._handleLikeClick(!1,this._cardId,this._cardLikeElement,this._cardLikesCounterElement):this._handleLikeClick(!0,this._cardId,this._cardLikeElement,this._cardLikesCounterElement):this._checkActiveLike(this._cardLikeElement)?this._handleLikeClick(!1,this._newCardId.id,this._cardLikeElement,this._cardLikesCounterElement):this._handleLikeClick(!0,this._newCardId.id,this._cardLikeElement,this._cardLikesCounterElement)}},{key:"deleteCard",value:function(){this._element.remove(),this._element=null}},{key:"_setEventListeners",value:function(){var e=this;this._cardImageElement.addEventListener("click",(function(){return e._handleCardClick(e._link,e._name)})),this._cardLikeElement.addEventListener("click",(function(){return e._likeCard(e._cardId)})),this._cardDeleteBtnElement.addEventListener("click",(function(){return e._handleDeleteClick(e._cardId,e._newCardId.id)}))}}])&&p(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var _=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._settings=t,this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._settings.inputSelector)),this._button=this._formElement.querySelector(this._settings.submitButtonSelector)}var t,n;return t=e,(n=[{key:"_showInputError",value:function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(this._settings.inputErrorClass),r.textContent=n,r.classList.add(this._settings.errorClass)}},{key:"_hideInputError",value:function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(this._settings.inputErrorClass),n.classList.remove(this._settings.errorClass),n.textContent=""}},{key:"_checkInputValidity",value:function(e,t){t.validity.valid?this._hideInputError(e,t):this._showInputError(e,t,t.validationMessage)}},{key:"_setEventListeners",value:function(e){var t=this;this._toggleButtonState(),this._inputList.forEach((function(n){n.addEventListener("input",(function(){t._checkInputValidity(e,n),t._toggleButtonState()}))}))}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._button.classList.add(this._settings.inactiveButtonClass),this._button.disabled=!0):(this._button.classList.remove(this._settings.inactiveButtonClass),this._button.disabled=!1)}},{key:"validatePopup",value:function(){this._toggleButtonState()}},{key:"enableValidation",value:function(){var e=this._formElement.querySelector(".form__content");this._setEventListeners(e)}}])&&d(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var m=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._container.prepend(e)}},{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){return t._renderer(e)}))}}])&&y(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var b=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._boundHandleEscClose=this._handleEscClose.bind(this)}var n,r;return n=e,(r=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"open",value:function(){this._popup.classList.add("popup_opened"),t.classList.add("page_no-scroll"),document.addEventListener("keydown",this._boundHandleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),t.classList.remove("page_no-scroll"),document.removeEventListener("keydown",this._boundHandleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&e.close(),t.target.classList.contains("btn_type_close")&&e.close()}))}}])&&v(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),e}();function k(e){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(e)}function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function w(){return w="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=E(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},w.apply(this,arguments)}function E(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=C(e)););return e}function S(e,t){return S=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},S(e,t)}function L(e,t){if(t&&("object"===k(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function C(e){return C=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},C(e)}var O=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&S(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=C(r);if(o){var n=C(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return L(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._popupImgElement=t._popup.querySelector(".popup__img"),t._popupImgNameElement=t._popup.querySelector(".popup__img-name"),t}return t=a,(n=[{key:"open",value:function(e,t){this._popupImgElement.src=e,this._popupImgElement.alt=t,this._popupImgNameElement.textContent=t,w(C(a.prototype),"open",this).call(this)}}])&&g(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(b);function I(e){return I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},I(e)}function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function P(){return P="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=R(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},P.apply(this,arguments)}function R(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=B(e)););return e}function q(e,t){return q=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},q(e,t)}function T(e,t){if(t&&("object"===I(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return A(e)}function A(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function B(e){return B=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},B(e)}var x=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&q(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=B(r);if(o){var n=B(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return T(this,e)});function a(e){var t,n=e.popupSelector,r=e.handleFormSubmit,o=e.handleFormPrefill;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,n))._handleFormSubmit=r,t._handleFormPrefill=o,t._boundGetInputValues=t._getInputValues.bind(A(t)),t._form=t._popup.querySelector(".form"),t._inputList=t._popup.querySelectorAll(".form__input"),t._submitBtn=t._popup.querySelector(".btn_type_save"),t._submitBtnText=t._submitBtn.textContent,t}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this.inputValues={},this._inputList.forEach((function(t){e.inputValues[t.name]=t.value})),this.inputValues}},{key:"renderLoading",value:function(e){this._submitBtn.textContent=e?"Сохранение...":this._submitBtnText}},{key:"open",value:function(){this._handleFormPrefill&&this._handleFormPrefill(this._inputList),P(B(a.prototype),"open",this).call(this)}},{key:"close",value:function(){P(B(a.prototype),"close",this).call(this),this._form.reset()}},{key:"setEventListeners",value:function(){var e=this;P(B(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._getInputValues())}))}}])&&j(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(b);function D(e){return D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},D(e)}function U(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function N(){return N="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=V(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},N.apply(this,arguments)}function V(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=M(e)););return e}function F(e,t){return F=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},F(e,t)}function H(e,t){if(t&&("object"===D(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return J(e)}function J(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function M(e){return M=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},M(e)}var z=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&F(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=M(r);if(o){var n=M(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return H(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._form=t._popup.querySelector(".form"),t._boundSubmitHandler=t._submitHandler.bind(J(t)),t}return t=a,(n=[{key:"onSubmit",value:function(e){this._confirmCallback=e}},{key:"_submitHandler",value:function(e){e.preventDefault(),this._confirmCallback()}},{key:"setEventListeners",value:function(){N(M(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",this._boundSubmitHandler)}}])&&U(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(b);function G(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var $=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userAvatar=document.querySelector(t.profileAvatarSelector),this._userName=document.querySelector(t.profileNameSelector),this._userJob=document.querySelector(t.profileJobSelector)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._userName.textContent,job:this._userJob.textContent}}},{key:"setUserAvatar",value:function(e){this._userAvatar.src=e.avatar}},{key:"setUserInfo",value:function(e){e.avatar&&(this._userAvatar.src=e.avatar),this._userName.textContent=e.name,this._userJob.textContent=e.about?e.about:e.job}}])&&G(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function K(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function Q(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var W=new(function(){function e(t){var n,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},(n="_checkResult")in this?Object.defineProperty(this,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[n]=r,this._url=t.baseUrl,this._tokenId=t.tokenId,this._headers={authorization:this._tokenId,"Content-Type":"application/json"}}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return fetch("".concat(this._url,"users/me"),{headers:this._headers}).then(this._checkResult)}},{key:"setUserInfo",value:function(e){return fetch("".concat(this._url,"users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.job})}).then(this._checkResult)}},{key:"getInitialCards",value:function(){return fetch("".concat(this._url,"cards"),{headers:this._headers}).then(this._checkResult)}},{key:"setNewCard",value:function(e){var t=e.name,n=e.link;return fetch("".concat(this._url,"cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:n})}).then(this._checkResult)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._url,"cards/").concat(e),{method:"DELETE",headers:this._headers}).then(this._checkResult)}},{key:"setLike",value:function(e){return fetch("".concat(this._url,"cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then(this._checkResult)}},{key:"deleteLike",value:function(e){return fetch("".concat(this._url,"cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then(this._checkResult)}},{key:"changeAvatar",value:function(e){return fetch("".concat(this._url,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e.avatar})}).then(this._checkResult)}}])&&K(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}())({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-48/",tokenId:"1a0fcad2-374c-4a16-bc60-ad5ac7325d61"}),X=new $({profileAvatarSelector:".profile__avatar",profileNameSelector:".profile__name",profileJobSelector:".profile__job"}),Y=W.getUserInfo(),Z=W.getInitialCards();Promise.all([Y,Z]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return Q(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Q(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];s.id=o._id,X.setUserInfo(o),le.renderItems(i)})).catch((function(e){return console.error(e)}));var ee=new x({popupSelector:".popup_type_edit",handleFormSubmit:function(e){ee.renderLoading(!0),W.setUserInfo(e).then((function(){return ee.close()})).catch((function(e){return console.error(e)})).finally((function(){return ee.renderLoading(!1)})),X.setUserInfo(e)},handleFormPrefill:function(e){var t=X.getUserInfo();e.forEach((function(e){return e.value=t[e.name]}))}}),te=new x({popupSelector:".popup_type_edit-avatar",handleFormSubmit:function(e){te.renderLoading(!0),W.changeAvatar(e).then((function(){return te.close()})).catch((function(e){return console.error(e)})).finally((function(){return te.renderLoading(!1)})),X.setUserAvatar(e)}}),ne=new x({popupSelector:".popup_type_new-card",handleFormSubmit:function(){se()}}),re=new O(".popup_type_zoom-img"),oe=new z(".popup_type_delete-card"),ie=new _(e,i),ae=new _(e,a),ce=new _(e,c),ue=function(e){var t=new h({data:e,cardSelector:".card-template",handleCardClick:function(e,t){return re.open(e,t)},handleDeleteClick:function(e,n){var r=e||n;oe.open(),oe.onSubmit((function(){W.deleteCard(r).then((function(){oe.close(),t.deleteCard()})).catch((function(e){return console.error(e)}))}))},handleLikeClick:function(e,t,n,r){e?W.setLike(t).then((function(e){n.classList.add("btn_type_like-active"),r.textContent=e.likes.length})).catch((function(e){return console.error(e)})):W.deleteLike(t).then((function(e){n.classList.remove("btn_type_like-active"),r.textContent=e.likes.length||""})).catch((function(e){return console.error(e)}))}},s,f);return t.generateCard()},le=new m({renderer:function(e){return le.addItem(ue(e))}},".cards__list"),se=function(){var e=u.value,t=l.value;return ne.renderLoading(!0),W.setNewCard({name:e,link:t}).then((function(e){f.id=e._id,ne.close()})).catch((function(e){return console.error(e)})).finally((function(){return ne.renderLoading(!1)})),le.addItem(ue({name:e,link:t})),f};ie.enableValidation(),ae.enableValidation(),ce.enableValidation(),ee.setEventListeners(),ne.setEventListeners(),re.setEventListeners(),oe.setEventListeners(),te.setEventListeners(),n.addEventListener("click",(function(){ee.open(),X.setUserInfo(X.getUserInfo())})),o.addEventListener("click",(function(){te.open()})),r.addEventListener("click",(function(){a.reset(),ne.open(),ae.validatePopup()}))})();