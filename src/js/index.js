import $ from 'jquery';
import Swiper, { Pagination, Navigation } from 'swiper';

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

  function disabledScroll(event) {
    event.preventDefault();
  };

  bgrBtn.on('click', function(){
    menu.fadeIn(200);
    document.addEventListener('touchmove', disabledScroll);
    document.addEventListener('mousewheel', disabledScroll);
  });

  menuClose.on('click', function(){
    menu.fadeOut(200);
  });



// header ===============================================






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

// $(window).on('load scroll', function() {
//   const slideUp = $('.slide-up');

//   slideUp.each(function() { 
//     let target = $(this).offset().top;
// 		let scroll = $(window).scrollTop();
// 		let height = $(window).height();
// 		if (scroll > target - height){
// 			$(this).addClass('active');
// 		};
//   });
// });


const slideUp = () => {
  const $upElm = $('.slide-up'); //.slide-upクラスを定数に

  //$.each(対象オブジェクト, function(index繰り返し対象 ,val){ 繰り返し処理 }
  $upElm.each((i,e) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {  //入ってきたら
        const { isIntersecting } = entry; // "交わったら"を定数化
        if (isIntersecting) { //もし交わったら以下の処理を実行
          $(e).addClass('active'); //クラス名を追加
          observer.disconnect(); //全ての対象要素について状態変化の監視停止
        }
      });
    });
    observer.observe(e); //要素を監視される対象要素として追加
  });
};
slideUp();


// slide left ===============================

//  $(window).on('load scroll', function() {
//   const slideLeft = $('.slide-left');

//   slideLeft.each(function() { 
//     let target = $(this).offset().top;
// 		let scroll = $(window).scrollTop();
// 		let height = $(window).height();
// 		if (scroll > target - height){
// 			$(this).addClass('active');
// 		};
//   });
// });

const slideLeft = () => {
  const $leftElm = $('.slide-left');

  $leftElm.each((i,e) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { isIntersecting } = entry;
        if (isIntersecting) {
          $(e).addClass('active');
          observer.disconnect();
        }
      });
    });
    observer.observe(e);
  });
};
slideLeft();



  
// set view width (except scrollbar) ===============================

const setVw = function() {
  const vw = document.documentElement.clientWidth / 100;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
}
window.addEventListener('DOMContentLoaded', setVw);
window.addEventListener('resize', setVw);



// product　============================================
const product = () => {

  const $modal = $('.p-modal');
  const $card = $('.c-product-card');
  $modal.hide();

  //モーダルの開閉

    //view more アニメーション
    const $btnMore = $('.p-product__list-item');
    $btnMore.on('mouseenter', (e) => {
      e.preventDefault();
      $(e.currentTarget).addClass('hov-active');
    });
    $btnMore.on('mouseleave', (e) => {
      e.preventDefault();
      $(e.currentTarget).removeClass('hov-active');
    });


    //カードクリックで開く
    $card.on('click', (e) => {
      const slideNo = $(e.currentTarget).data('slide');
      swiper.slideTo(slideNo, 0);
  
      $modal.fadeIn(300);
    });

    //closeで閉じる
    const $closeElm = $modal.find('[data-close]');
    $closeElm.on('click', (e) => {
      $modal.fadeOut(300);
    });

  //スライダーの処理
    const swiper = new Swiper(".swiper", {  
      modules: [Pagination, Navigation],
      loop: true,

      // ページネーション
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      // 前後の矢印
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      //サムネイル
      thumbs: {
        swiper: sliderThumbnail,
      },
    });

    //サムネイル生成
    const sliderThumbnail = new Swiper('.slider-thumbnail', {
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
};

product();





  




