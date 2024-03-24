




var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/index.html") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('body').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('body').classList.add('_touch');
}
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});
function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

if (document.querySelector('.wrapper')) {
	document.querySelector('.wrapper').classList.add('_loaded');
}

let unlock = true;


//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}


//Menu
let iconMenu = document.querySelector(".menu__icon");
let menulist = document.querySelector(".menu__list");
let body = document.querySelector("body");
let menuBody = document.querySelector(".menu__body");

function clickOff(event) {
  console.log(event);
  iconMenu.classList.remove("_active");
  menuBody.classList.remove("_active");
  html.classList.remove("lock");
}

if (iconMenu) {
   iconMenu.addEventListener("click", function () {
      iconMenu.classList.toggle("_active");
      html.classList.toggle("lock");
      menuBody.classList.toggle("_active");
   });
   menulist.addEventListener("mouseup", clickOff );

document.addEventListener('click', function (e) {
  var target = e.target;
  var its_menu = target == menuBody || menuBody.contains(target);
  var its_iconMenu = target == iconMenu || iconMenu.contains(target);
  var menu_is_active = menuBody.classList.contains('_active');

  if (!its_menu && !its_iconMenu && menu_is_active) {
    clickOff();
  }
});
}

// Вспомогательные модули плавного расскрытия и закрытия объекта ======================================================================================================================================================================
let _slideUp = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = `${target.offsetHeight}px`;
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = !showmore ? true : false;
			!showmore ? target.style.removeProperty('height') : null;
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			!showmore ? target.style.removeProperty('overflow') : null;
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
			// Создаем событие 
			document.dispatchEvent(new CustomEvent("slideUpDone", {
				detail: {
					target: target
				}
			}));
		}, duration);
	}
}
let _slideDown = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.hidden = target.hidden ? false : null;
		showmore ? target.style.removeProperty('height') : null;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
			// Создаем событие 
			document.dispatchEvent(new CustomEvent("slideDownDone", {
				detail: {
					target: target
				}
			}));
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
// Вспомогательные модули блокировки прокрутки и скочка ====================================================================================================================================================================================================================================================================================
let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}
let bodyUnlock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
let bodyLock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}


//================================================================================================================================================================================================================================================================================================================
// Прочие полезные функции ================================================================================================================================================================================================================================================================================================================
//================================================================================================================================================================================================================================================================================================================
// Получение хеша в адресе сайта
function getHash() {
	if (location.hash) { return location.hash.replace('#', ''); }
}

// FLS (Full Logging System)
function FLS(message) {
	setTimeout(() => {
		if (window.FLS) {
			console.log(message);
		}
	}, 0);
}
// Получить цифры из строки
function getDigFromString(item) {
	return parseInt(item.replace(/[^\d]/g, ''))
}
// Форматирование цифр типа 100 000 000
function getDigFormat(item) {
	return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
}
// Убрать класс из всех элементов массива
function removeClasses(array, className) {
	for (var i = 0; i < array.length; i++) {
		array[i].classList.remove(className);
	}
}
// Уникализация массива
function uniqArray(array) {
	return array.filter(function (item, index, self) {
		return self.indexOf(item) === index;
	});
}
// Функция получения индекса внутри родителя
function indexInParent(parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};
// Обработа медиа запросов из атрибутов 
function dataMediaQueries(array, dataSetValue) {
	// Получение объектов с медиа запросами
	const media = Array.from(array).filter(function (item, index, self) {
		if (item.dataset[dataSetValue]) {
			return item.dataset[dataSetValue].split(",")[0];
		}
	});
	// Инициализация объектов с медиа запросами
	if (media.length) {
		const breakpointsArray = [];
		media.forEach(item => {
			const params = item.dataset[dataSetValue];
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});
		// Получаем уникальные брейкпоинты
		let mdQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mdQueries = uniqArray(mdQueries);
		const mdQueriesArray = [];

		if (mdQueries.length) {
			// Работаем с каждым брейкпоинтом
			mdQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(",");
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);
				// Объекты с нужными условиями
				const itemsArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				mdQueriesArray.push({
					itemsArray,
					matchMedia
				})
			});
			return mdQueriesArray;
		}
	}
}
//================================================================================================================================================================================================================================================================================================================
//===Dropdown Block================================================================================================================================

/*
классы для автоматического определения его типа
block-click-on      - по клику на нём у родительского элемента назначится _active
block-click-off     - по клику на нём у родительского элемента снимется _active
block-click-toggle  - по клику на нём у родительского элемента инвертируется _active

block-click-lock    - блокирует прокрутку

Если просто добавить block-click-toggle, то _active добавится родителю

<div class="block-click-toggle" data-target-el='target-4'></div>
класс target-4 - кому нужен _active

Так же скрипт меняет input type с text на password (когда нужен глаз при вводе пароля)
*/

clicksOn  = document.getElementsByClassName('block-click-on')
clicksOff = document.getElementsByClassName('block-click-off')
clicksToggle = document.getElementsByClassName('block-click-toggle')
var alltargets = [];
var touched = 0;
var target;

if (clicksOn)
  for (key in clicksOn) {
    if (!isNaN(key) && clicksOn[key]) {

        //console.log(clicksOn[key], key);
        let targetName = clicksOn[key].dataset['targetEl'];
        
        let el
        if (!targetName) el = clicksToggle[key].parentElement
          else 
           el = document.getElementsByClassName(targetName)[0];


        if (el) {
         //if (alltargets.indexOf(targetName) == -1) alltargets[alltargets.length] = targetName;
         alltargets[alltargets.length] = el; // !

         clicksOn[key].addEventListener('click', (e) => { 
           setActive(el, 1, e.currentTarget); 
           e.stopPropagation; 
           e.preventDefault; 
           touched = 1;

           target = e.currentTarget.className;
         }, false); 
       }
     }
   }


   if (clicksToggle)
    for (key in clicksToggle) {
      if (!isNaN(key) && clicksToggle[key]) {

        //console.log(clicksOn[key], key);
        let targetName = clicksToggle[key].dataset['targetEl'];
        

        let el
        if (!targetName) 
           el = clicksToggle[key].parentElement
          else 
           el = document.getElementsByClassName(targetName)[0];


        if (el) {
//         if (alltargets.indexOf(targetName) == -1) alltargets[alltargets.length] = targetName;
         alltargets[alltargets.length] = el; // !

         clicksToggle[key].addEventListener('click', (e) => { 
           setActive(el, 2, e.currentTarget); 
           touched = 1;
           target = e.currentTarget.className;

           if (e.currentTarget.classList.contains('popup-login-form__eye')) {
             if (e.currentTarget.classList.contains('_active'))
              e.currentTarget.previousElementSibling.type = 'text'
            else
              e.currentTarget.previousElementSibling.type = 'password' 

          }
           //
         }, false); 
       }
     }
   }


 function setActive(el, state, target) {

   if (state == 1) {
      el.classList.add('_active')
   }
   if (state == 0) {
      el.classList.remove('_active');
   }
   if (state == 2) {
      el.classList.toggle('_active');
   }

   let lock

   if (target) 
       lock = (target.classList.contains('block-click-lock')) ? 1:0
      else
       lock = 0;

   if (el.classList.contains('_active')) {
      if (lock) 
         document.body.classList.add('_lock')
   } else {
      if (lock) 
         document.body.classList.remove('_lock')
   }

   return el.classList.contains('_active')

 }



 if (clicksOff)
  for (key in clicksOff) {
    if (!isNaN(key) && clicksOff[key]) {

        //console.log(clicksOff[key], key);
        let targetName = clicksOff[key].dataset['targetEl'];
        
        let el
        if (!targetName) el = clicksToggle[key].parentElement
          else 
           el = document.getElementsByClassName(targetName)[0];

        if (el) {
         alltargets[alltargets.length] = el; // !
         clicksOff[key].addEventListener('click', (e) => {
           setActive(el, 0, e.currentTarget);

           touched = 1;
           target = e.currentTarget.className;
         }, false); 
       }
     }
   }


   document.addEventListener( 'click', (e) => {

     let withinBoundaries;
     if (/*!touched && */target != e.currentTarget.className) {
       for (key in alltargets) {
         if (!isNaN(key) && alltargets[key]) {
          // el = document.getElementsByClassName(alltargets[key])[0];

          withinBoundaries = e.composedPath().includes(alltargets[key]);
          if ( ! withinBoundaries ) {
           setActive(alltargets[key], 0)
         }
       }
     }
   }
   touched = 0;
 })

"use strict";!function(){let t=[],e=document.querySelectorAll("[data-da]"),n=[],i=[];if(e.length>0){let c=0;for(let i=0;i<e.length;i++){const a=e[i],l=a.getAttribute("data-da");if(""!=l){const e=l.split(","),i=e[1]?e[1].trim():"last",d=e[2]?e[2].trim():"767",s=document.querySelector("."+e[0].trim());e.length>0&&s&&(a.setAttribute("data-da-index",c),t[c]={parent:a.parentNode,index:(r=a,o=void 0,o=Array.prototype.slice.call(r.parentNode.children),o.indexOf(r))},n[c]={element:a,destination:document.querySelector("."+e[0].trim()),place:i,breakpoint:d},c++)}}(a=n).sort((function(t,e){return t.breakpoint>e.breakpoint?-1:1})),a.sort((function(t,e){return t.place>e.place?1:-1}));for(let t=0;t<n.length;t++){const e=n[t].breakpoint,a="max";i.push(window.matchMedia("("+a+"-width: "+e+"px)")),i[t].addListener(l)}}var a,r,o;function l(t){for(let t=0;t<n.length;t++){const e=n[t],a=e.element,r=e.destination,o=e.place,l="_dynamic_adapt_"+e.breakpoint;if(i[t].matches){if(!a.classList.contains(l)){let t=d(r)[o];"first"===o?t=d(r)[0]:"last"===o&&(t=d(r)[d(r).length]),r.insertBefore(a,r.children[t]),a.classList.add(l)}}else a.classList.contains(l)&&(c(a),a.classList.remove(l))}Math.max(document.documentElement.clientWidth,window.innerWidth||0)}function c(e){const n=e.getAttribute("data-da-index"),i=t[n],a=i.parent,r=i.index,o=d(a,!0)[r];a.insertBefore(e,a.children[o])}function d(t,e){const n=t.children,i=[];for(let t=0;t<n.length;t++){const a=n[t];(e||null==a.getAttribute("data-da"))&&i.push(t)}return i}l()}();
// Модуль попапов

// Класс Popup
class Popup {
   constructor(options) {
      let config = {
         logging: true,
         init: true,
         // Для кнопок 
         attributeOpenButton: 'data-popup', // Атрибут для кнопки, которая вызывает попап
         attributeCloseButton: 'data-close', // Атрибут для кнопки, которая закрывает попап
         // Для сторонних объектов
         fixElementSelector: '[data-lp]', // Атрибут для элементов с левым паддингом (которые fixed)
         // Для объекта попапа
         youtubeAttribute: 'data-popup-youtube', // Атрибут для кода youtube
         youtubePlaceAttribute: 'data-popup-youtube-place', // Атрибут для вставки ролика youtube
         setAutoplayYoutube: true,
         // Изменение классов
         classes: {
            popup: 'popup',
            // popupWrapper: 'popup__wrapper',
            popupContent: 'popup__content',
            popupActive: 'popup_show', // Добавляется для попапа, когда он открывается
            bodyActive: 'popup-show', // Добавляется для боди, когда попап открыт
         },
         focusCatch: true, // Фокус внутри попапа зациклен
         closeEsc: true, // Закрытие по ESC
         bodyLock: true, // Блокировка скролла
         hashSettings: {
            location: true, // Хэш в адресной строке
            goHash: true, // Переход по наличию в адресной строке
         },
         on: { // События
            beforeOpen: function () { },
            afterOpen: function () { },
            beforeClose: function () { },
            afterClose: function () { },
         },
      }
      this.youTubeCode;
      this.isOpen = false;
      // Текущее окно
      this.targetOpen = {
         selector: false,
         element: false,
      }
      // Предыдущее открытое
      this.previousOpen = {
         selector: false,
         element: false,
      }
      // Последнее закрытое
      this.lastClosed = {
         selector: false,
         element: false,
      }
      this._dataValue = false;
      this.hash = false;

      this._reopen = false;
      this._selectorOpen = false;

      this.lastFocusEl = false;
      this._focusEl = [
      'a[href]',
      'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
      'button:not([disabled]):not([aria-hidden])',
      'select:not([disabled]):not([aria-hidden])',
      'textarea:not([disabled]):not([aria-hidden])',
      'area[href]',
      'iframe',
      'object',
      'embed',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])'
      ];
      //this.options = Object.assign(config, options);
      this.options = {
         ...config,
         ...options,
         classes: {
            ...config.classes,
            ...options?.classes,
         },
         hashSettings: {
            ...config.hashSettings,
            ...options?.hashSettings,
         },
         on: {
            ...config.on,
            ...options?.on,
         }
      }
      this.bodyLock = false;
      this.options.init ? this.initPopups() : null
   }
   initPopups() {
      this.popupLogging(`Проснулся`);
      this.eventsPopup();
   }
   eventsPopup() {
      // Клик на всем документе
      document.addEventListener("click", function (e) {
         // Клик по кнопке "открыть"
         const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
         if (buttonOpen) {
            e.preventDefault();
            this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ?
            buttonOpen.getAttribute(this.options.attributeOpenButton) :
            'error';
            this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ?
            buttonOpen.getAttribute(this.options.youtubeAttribute) :
            null;
            if (this._dataValue !== 'error') {
               if (!this.isOpen) this.lastFocusEl = buttonOpen;
               this.targetOpen.selector = `${this._dataValue}`;
               this._selectorOpen = true;
               this.open();
               return;

            } else this.popupLogging(`Ой ой, не заполнен атрибут у ${buttonOpen.classList}`);

            return;
         } else {

           if (e.target.hash) {
              let addr = e.target.hash.split('-');
              let tabsc = document.querySelectorAll('.tabs__content')
              if (tabsc[addr[1]]) {
                 for (let child of tabsc[addr[1]].children) {
                     child.hidden = 1;
                 }
                 tabsc[addr[1]].children[addr[2]].hidden = 0
              }
           }
         }

         // Закрытие на пустом месте (popup__wrapper) и кнопки закрытия (popup__close) для закрытия
         const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
         if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
            e.preventDefault();
            this.close();
            return;
         }
      }.bind(this));
      // Закрытие по ESC
      document.addEventListener("keydown", function (e) {
         if (this.options.closeEsc && e.which == 27 && e.code === 'Escape' && this.isOpen) {
            e.preventDefault();
            this.close();
            return;
         }
         if (this.options.focusCatch && e.which == 9 && this.isOpen) {
            this._focusCatch(e);
            return;
         }
      }.bind(this))

      // Открытие по хешу
      if (this.options.hashSettings.goHash && !window.location.hash.includes('#tab')) {
         // Проверка изменения адресной строки
         window.addEventListener('hashchange', function () {
            if (window.location.hash) {
               this._openToHash();
            } else {
               this.close(this.targetOpen.selector);
            }
         }.bind(this))

         window.addEventListener('load', function () {
            if (window.location.hash) {
               this._openToHash();
            }
         }.bind(this))
      }
   }
   open(selectorValue) {
      if (bodyLockStatus) {
         
         // -------------------- [
         //this.bodyLock = document.documentElement.classList.contains('lock') ? true : false;
         // -------------------- ]

         // Если ввести значение селектора (селектор настраивается в options)
         if (selectorValue && typeof (selectorValue) === "string" && selectorValue.trim() !== "") {
            this.targetOpen.selector = selectorValue;
            this._selectorOpen = true;
         }
         if (this.isOpen) {
            this._reopen = true;
            this.close();
         } 
         // -------------------- [
         else
         // Если перед открытием попапа был режим lock
         this.bodyLock = document.documentElement.classList.contains('lock') ? true : false;
         // -------------------- ]
         
         if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
         if (!this._reopen) this.previousActiveElement = document.activeElement;

         this.targetOpen.element = document.querySelector(this.targetOpen.selector);

         if (this.targetOpen.element) {
            // YouTube
            if (this.youTubeCode) {
               const codeVideo = this.youTubeCode;
               const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`
               const iframe = document.createElement('iframe');
               iframe.setAttribute('allowfullscreen', '');

               const autoplay = this.options.setAutoplayYoutube ? 'autoplay;' : '';
               iframe.setAttribute('allow', `${autoplay}; encrypted-media`);

               iframe.setAttribute('src', urlVideo);

               if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
                  const youtubePlace = this.targetOpen.element.querySelector('.popup__text').setAttribute(`${this.options.youtubePlaceAttribute}`, '');
               }
               this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
            }
            if (this.options.hashSettings.location) {
               // Получение хэша и его выставление 
               this._getHash();
               this._setHash();
            }

            // До открытия
            this.options.on.beforeOpen(this);
            // Создаем свое событие после открытия попапа
            document.dispatchEvent(new CustomEvent("beforePopupOpen", {
               detail: {
                  popup: this
               }
            }));

            this.targetOpen.element.classList.add(this.options.classes.popupActive);
            document.documentElement.classList.add(this.options.classes.bodyActive);

            if (!this._reopen) {
               !this.bodyLock ? bodyLock() : null;
            }
            else this._reopen = false;

            this.targetOpen.element.setAttribute('aria-hidden', 'false');

            // Запоминаю это открытое окно. Оно будет последним открытым
            this.previousOpen.selector = this.targetOpen.selector;
            this.previousOpen.element = this.targetOpen.element;

            this._selectorOpen = false;

            this.isOpen = true;

            setTimeout(() => {
               this._focusTrap();
            }, 50);

            // После открытия
            this.options.on.afterOpen(this);
            // Создаем свое событие после открытия попапа
            document.dispatchEvent(new CustomEvent("afterPopupOpen", {
               detail: {
                  popup: this
               }
            }));
            this.popupLogging(`Открыл попап`);

         } else this.popupLogging(`Ой ой, такого попапа нет.Проверьте корректность ввода. `);
      }
   }
   close(selectorValue) {
      if (selectorValue && typeof (selectorValue) === "string" && selectorValue.trim() !== "") {
         this.previousOpen.selector = selectorValue;
      }
      if (!this.isOpen || !bodyLockStatus) {
         return;
      }
      // До закрытия
      this.options.on.beforeClose(this);
      // Создаем свое событие перед закрытием попапа
      document.dispatchEvent(new CustomEvent("beforePopupClose", {
         detail: {
            popup: this
         }
      }));

      // YouTube
      if (this.youTubeCode) {
         if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`))
            this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = '';
      }
      this.previousOpen.element.classList.remove(this.options.classes.popupActive);
      // aria-hidden
      this.previousOpen.element.setAttribute('aria-hidden', 'true');
      if (!this._reopen) {
         document.documentElement.classList.remove(this.options.classes.bodyActive);
         !this.bodyLock ? bodyUnlock() : null;
         this.isOpen = false;
      }
      // Очищение адресной строки
      this._removeHash();
      if (this._selectorOpen) {
         this.lastClosed.selector = this.previousOpen.selector;
         this.lastClosed.element = this.previousOpen.element;

      }
      // После закрытия
      this.options.on.afterClose(this);
      // Создаем свое событие после закрытия попапа
      document.dispatchEvent(new CustomEvent("afterPopupClose", {
         detail: {
            popup: this
         }
      }));

      setTimeout(() => {
         this._focusTrap();
      }, 50);

      this.popupLogging(`Закрыл попап`);
   }
   // Получение хэша 
   _getHash() {
      if (this.options.hashSettings.location) {
         this.hash = this.targetOpen.selector.includes('#') ?
         this.targetOpen.selector : this.targetOpen.selector.replace('.', '#')
      }
   }
   _openToHash() {
      let classInHash = document.querySelector(`.${window.location.hash.replace('#', '')}`) ? `.${window.location.hash.replace('#', '')}` :
      document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` :
      null;

      const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace('.', "#")}"]`);
      if (buttons && classInHash) this.open(classInHash);
   }
   // Утсановка хэша
   _setHash() {
      history.pushState('', '', this.hash);
   }
   _removeHash() {
      history.pushState('', '', window.location.href.split('#')[0])
   }
   _focusCatch(e) {
      const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
      const focusArray = Array.prototype.slice.call(focusable);
      const focusedIndex = focusArray.indexOf(document.activeElement);

      if (e.shiftKey && focusedIndex === 0) {
         focusArray[focusArray.length - 1].focus();
         e.preventDefault();
      }
      if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
         focusArray[0].focus();
         e.preventDefault();
      }
   }
   _focusTrap() {
      const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
      if (!this.isOpen && this.lastFocusEl) {
         this.lastFocusEl.focus();
      } else {
         focusable[0].focus();
      }
   }
   // Функция вывода в консоль
   popupLogging(message) {
      this.options.logging ? FLS(`[Попап]: ${message}`) : null;
   }
}

const flsModules = {}

// Запускаем и добавляем в объект модулей
setTimeout(() => {
  var popup = new Popup({});
  flsModules.popup = new Popup({});}
 , 100);


let addWindowScrollEvent = false;
//====================================================================================================================================================================================================================================================================================================
// Плавная навигация по странице
function pageNavigation() {
	// data-goto - указать ID блока
	// data-goto-header - учитывать header
	// data-goto-top - недокрутить на указанный размер
	// data-goto-speed - скорость (только если используется доп плагин)
	// Работаем при клике на пункт
	document.addEventListener("click", pageNavigationAction);
	// Если подключен scrollWatcher, подсвечиваем текущий пукт меню
	document.addEventListener("watcherCallback", pageNavigationAction);
	// Основная функция
	function pageNavigationAction(e) {
		if (e.type === "click") {
			const targetElement = e.target;
			if (targetElement.closest('[data-goto]')) {
				const gotoLink = targetElement.closest('[data-goto]');
				const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : '';
				const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false;
				const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
				const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
				gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
				e.preventDefault();
			}
		} else if (e.type === "watcherCallback" && e.detail) {
			const entry = e.detail.entry;
			const targetElement = entry.target;
			// Обработка пунктов навигации, если указано значение navigator подсвечиваем текущий пукт меню
			if (targetElement.dataset.watch === 'navigator') {
				const navigatorActiveItem = document.querySelector(`[data-goto]._navigator-active`);
				let navigatorCurrentItem;
				if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) {
					navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`);
				} else if (targetElement.classList.length) {
					for (let index = 0; index < targetElement.classList.length; index++) {
						const element = targetElement.classList[index];
						if (document.querySelector(`[data-goto=".${element}"]`)) {
							navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
							break;
						}
					}
				}
				if (entry.isIntersecting) {
					// Видим объект
					// navigatorActiveItem ? navigatorActiveItem.classList.remove('_navigator-active') : null;
					navigatorCurrentItem ? navigatorCurrentItem.classList.add('_navigator-active') : null;
				} else {
					// Не видим объект
					navigatorCurrentItem ? navigatorCurrentItem.classList.remove('_navigator-active') : null;
				}
			}
		}
	}
	// Прокрутка по хешу
	if (getHash()) {
		let goToHash;
		if (document.querySelector(`#${getHash()}`)) {
			goToHash = `#${getHash()}`;
		} else if (document.querySelector(`.${getHash()}`)) {
			goToHash = `.${getHash()}`;
		}
		goToHash ? gotoBlock(goToHash, true, 500, -100) : null;
	}
}
// Работа с шапкой при скроле
function headerScroll() {
	addWindowScrollEvent = true;
	const header = document.querySelector('header.header');
	const headerShow = header.hasAttribute('data-scroll-show');
	const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
	const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
	let scrollDirection = 0;
	let timer;
	document.addEventListener("windowScroll", function (e) {
		const scrollTop = window.scrollY;
		clearTimeout(timer);
		if (scrollTop >= startPoint) {
			!header.classList.contains('_header-scroll') ? header.classList.add('_header-scroll') : null;
			if (headerShow) {
				if (scrollTop > scrollDirection) {
					// downscroll code
					header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
				} else {
					// upscroll code
					!header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
				}
				timer = setTimeout(() => {
					!header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
				}, headerShowTimer);
			}
		} else {
			header.classList.contains('_header-scroll') ? header.classList.remove('_header-scroll') : null;
			if (headerShow) {
				header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
			}
		}
		scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
	});
}
// Прилипающий блок
function stickyBlock() {
	addWindowScrollEvent = true;
	// data-sticky для родителя внутри которого прилипает блок *
	// data-sticky-header для родителя, учитываем высоту хедера
	// data-sticky-top="" для родителя, можно указать отступ сверху
	// data-sticky-bottom="" для родителя, можно указать отступ снизу
	// data-sticky-item для прилипающего блока *
	function stickyBlockInit() {
		const stickyParents = document.querySelectorAll('[data-sticky]');
		if (stickyParents.length) {
			stickyParents.forEach(stickyParent => {
				let stickyConfig = {
					media: stickyParent.dataset.sticky ? parseInt(stickyParent.dataset.sticky) : null,
					top: stickyParent.dataset.stickyTop ? parseInt(stickyParent.dataset.stickyTop) : 0,
					bottom: stickyParent.dataset.stickyBottom ? parseInt(stickyParent.dataset.stickyBottom) : 0,
					header: stickyParent.hasAttribute('data-sticky-header') ? document.querySelector('header.header').offsetHeight : 0
				}
				stickyBlockItem(stickyParent, stickyConfig);
			});
		}
	}
	function stickyBlockItem(stickyParent, stickyConfig) {
		const stickyBlockItem = stickyParent.querySelector('[data-sticky-item]');
		const headerHeight = stickyConfig.header;
		const offsetTop = headerHeight + stickyConfig.top;
		const startPoint = stickyBlockItem.getBoundingClientRect().top + scrollY - offsetTop;

		document.addEventListener("windowScroll", stickyBlockActions);
		//window.addEventListener("resize", stickyBlockActions);

		function stickyBlockActions(e) {
			const endPoint = (stickyParent.offsetHeight + stickyParent.getBoundingClientRect().top + scrollY) - (offsetTop + stickyBlockItem.offsetHeight + stickyConfig.bottom);
			let stickyItemValues = {
				position: "relative",
				bottom: "auto",
				top: "0px",
				left: "0px",
				width: "auto"
			}
			if (!stickyConfig.media || stickyConfig.media < window.innerWidth) {
				if (offsetTop + stickyConfig.bottom + stickyBlockItem.offsetHeight < window.innerHeight) {
					if (scrollY >= startPoint && scrollY <= endPoint) {
						stickyItemValues.position = `fixed`;
						stickyItemValues.bottom = `auto`;
						stickyItemValues.top = `${offsetTop}px`;
						stickyItemValues.left = `${stickyBlockItem.getBoundingClientRect().left}px`; // Учесть разницу в ширине экрана?
						stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
					} else if (scrollY >= endPoint) {
						stickyItemValues.position = `absolute`;
						stickyItemValues.bottom = `${stickyConfig.bottom}px`;
						stickyItemValues.top = `auto`;
						stickyItemValues.left = `0px`;
						stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
					}
				}
			}
			stickyBlockType(stickyBlockItem, stickyItemValues);
		}
	}
	function stickyBlockType(stickyBlockItem, stickyItemValues) {
		stickyBlockItem.style.cssText = `position:${stickyItemValues.position};bottom:${stickyItemValues.bottom};top:${stickyItemValues.top};left:${stickyItemValues.left};width:${stickyItemValues.width};`;
	}
	stickyBlockInit();
}
// При подключении модуля обработчик события запустится автоматически
setTimeout(() => {
	if (addWindowScrollEvent) {
		let windowScroll = new Event("windowScroll");
		window.addEventListener("scroll", function (e) {
			document.dispatchEvent(windowScroll);
		});
	}
}, 0);
// Подключение дополнения для увеличения возможностей
// import SmoothScroll from 'smooth-scroll';
//==============================================================================================================================================================================================================================================================================================================================

// Модуль плавной проктутки к блоку
let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
	const targetBlockElement = document.querySelector(targetBlock);
	if (targetBlockElement) {
		let headerItem = '';
		let headerItemHeight = 0;
		if (noHeader) {
			headerItem = 'header.header';
			headerItemHeight = document.querySelector(headerItem).offsetHeight;
		}
		let options = {
			speedAsDuration: true,
			speed: speed,
			header: headerItem,
			offset: offsetTop,
			easing: 'easeOutQuad',
		};
		// Закрываем меню, если оно открыто
		document.documentElement.classList.contains("menu-open") ? menuClose() : null;

		if (typeof SmoothScroll !== 'undefined') {
			// Прокрутка с использованием дополнения
			new SmoothScroll().animateScroll(targetBlockElement, '', options);
		} else {
			// Прокрутка стандартными средствами
			let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
			targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
			targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
			window.scrollTo({
				top: targetBlockElementPosition,
				behavior: "smooth"
			});
		}
		FLS(`[gotoBlock]: Юхуу...едем к ${targetBlock}`);
	} else {
		FLS(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${targetBlock}`);
	}
};

pageNavigation();
//======================================== Scroll To Top Button + Fixed Header
var html, scrollToTopButton;
window.onload = function() {
  html = document.documentElement;
  body = document.body;
  scrollToTopButton = document.getElementById("scrollToTopButton");

  window.onscroll = function() {
    windowScroll();
    controlScrollToTopButton();
  };
};

function scrollToTop(totalTime, easingPower) {
  //console.log("here");
  var timeInterval = 1; //in ms
  var scrollTop = Math.round(body.scrollTop || html.scrollTop);
  //var by=- scrollTop;
  var timeLeft = totalTime;
  var scrollByPixel = setInterval(function() {
    var percentSpent = (totalTime - timeLeft) / totalTime;
    if (timeLeft >= 0) {
      var newScrollTop = scrollTop * (1 - easeInOut(percentSpent, easingPower));
      body.scrollTop = newScrollTop;
      html.scrollTop = newScrollTop;
      //console.log(easeInOut(percentSpent,easingPower));
      timeLeft--;
    } else {
      clearInterval(scrollByPixel);
      //Add hash to the url after scrolling
      //window.location.hash = hash;
    }
  }, timeInterval);
}

function easeInOut(t, power) {
  if (t < 0.5) {
    return 0.5 * Math.pow(2 * t, power);
  } else {
    return 0.5 * (2 - Math.pow(2 * (1 - t), power));
  }
}

//window.onscroll = controlScrollToTopButton;

function controlScrollToTopButton() {
  
  if (!scrollToTopButton) return;
  var windowInnerHeight = 2 * window.innerHeight;
  if (
    body.scrollTop > windowInnerHeight ||
    html.scrollTop > windowInnerHeight
    ) {
    scrollToTopButton.classList.add("show");
} else {
  scrollToTopButton.classList.remove("show");
}
}


var mainNav = document.querySelector('.header');

function windowScroll() {
  if (!mainNav) return;
  mainNav.classList.toggle("_fixed", mainNav.scrollTop > 50 || 
    document.documentElement.scrollTop > 50);
}


var mainNav = document.querySelector('.header');

window.onscroll = function() {
  windowScroll();
};

function windowScroll() {
  mainNav.classList.toggle("_fixed", mainNav.scrollTop > 50 || document.documentElement.scrollTop > 50);
}
