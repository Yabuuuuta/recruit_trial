import { debounce } from 'lodash-es';
import baseNth from 'lodash-es/_baseNth';
import Stats from 'stats-js';

import EVENTS from '~/constants/event-names';

(function () {
  /// /////////////////////////////////////////////////////// Performance Monitor
  const performanceMonitor = () => {
    const stats = new Stats();

    document.body.appendChild(stats.dom);

    function monitor() {
      stats.begin();
      stats.end();

      requestAnimationFrame(monitor);
    }

    requestAnimationFrame(monitor);
  };

  /// /////////////////////////////////////////////////////// Resize
  function onResize() {}
  window.addEventListener(EVENTS.RESIZE, debounce(onResize, 200));

  /// /////////////////////////////////////////////////////// Scroll
  function onScroll() {}
  window.addEventListener(EVENTS.SCROLL, debounce(onScroll, 200));

  /// /////////////////////////////////////////////////////// Load
  function onLoad() {
    // development
    if (process.env.NODE_ENV === 'development') {
      performanceMonitor();
    }
  }
  window.addEventListener(EVENTS.LOAD, onLoad);
})();




$(function() {

// header fix ===================================
  let keyHeight = $('.p-key').height();

  function FixedAnime(){
    let scrollHeight = $(window).scrollTop();

    if (scrollHeight >= keyHeight){
      $('body').addClass('is-in');
    } else {
      $('body').removeClass('is-in');
    }
  };

  $(window).scroll(function() {
    FixedAnime();
  });

// burger btn ===================================
  const bgrBtn = $('.p-header__bgr');

  // hover----
  bgrBtn.hover(
    function(){
      $('.p-header__bgr-title').fadeOut();
      $('.p-header__bgr span').css('transform', 'translate(-50%, -1rem)');
    },
    function(){
      $('.p-header__bgr-title').fadeIn();
      $('.p-header__bgr span').css('transform', 'translate(-50%, 0)');
    }
  );

  // menu----
  const menu = $('.p-menu');
  const menuClose = $('.js-menu-close');

  bgrBtn.on('click', function(){
    menu.fadeIn(200);
  });

  menuClose.on('click', function(){
    menu.fadeOut(200);
  });

// go pagetop btn ===============================

const goTop = $('.js-gotop');

  goTop.on('click', function(){
    $('body, html').animate({
      scrollTop: 0
    }, 600);
    return false;
  });
});


// slide up ===============================

$(window).on('load scroll', function() {
  const slideUp = $('.slide-up');

  slideUp.each(function() { 
    let target = $(this).offset().top;
		let scroll = $(window).scrollTop();
		let height = $(window).height();
		if (scroll > target - height){
			$(this).addClass('active');
		};
  });
});


// slide left ===============================

 $(window).on('load scroll', function() {
  const slideLeft = $('.slide-left');

  slideLeft.each(function() { 
    let target = $(this).offset().top;
		let scroll = $(window).scrollTop();
		let height = $(window).height();
		if (scroll > target - height){
			$(this).addClass('active');
		};
  });
});

// product view more btn ===============================

  let productItem = $('.p-product__list-item');
  productItem.hover(
    function() {
      $(this).addClass('hov-active');
    },
    function() {
      $(this).removeClass('hov-active');
    }
  ) 
  
// set view width (except scrollbar) ===============================

const setVw = function() {
  const vw = document.documentElement.clientWidth / 100;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
}
window.addEventListener('DOMContentLoaded', setVw);
window.addEventListener('resize', setVw);

  




