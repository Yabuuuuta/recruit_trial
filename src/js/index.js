import $ from 'jquery';
import Swiper, { Pagination, Navigation } from 'swiper';

import { debounce } from 'lodash-es';
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

$(function () {
  // header fix ===================================
  const keyHeight = $('.p-key').height();

  function FixedAnime() {
    const scrollHeight = $(window).scrollTop();

    if (scrollHeight >= keyHeight) {
      $('body').addClass('is-in');
    } else {
      $('body').removeClass('is-in');
    }
  }

  $(window).scroll(function () {
    FixedAnime();
  });

  // burger btn ===================================
  const bgrBtn = $('.p-header__bgr');

  // hover----
  bgrBtn.hover(
    function () {
      $('.p-header__bgr-title').fadeOut();
      $('.p-header__bgr span').css('transform', 'translate(-50%, -1rem)');
    },
    function () {
      $('.p-header__bgr-title').fadeIn();
      $('.p-header__bgr span').css('transform', 'translate(-50%, 0)');
    }
  );

  // menu----
  const menu = $('.p-menu');
  const menuClose = $('.js-menu-close');

  function disabledScroll(event) {
    event.preventDefault();
  }

  bgrBtn.on('click', function () {
    menu.fadeIn(200);
    document.addEventListener('touchmove', disabledScroll);
    document.addEventListener('mousewheel', disabledScroll);
  });

  menuClose.on('click', function () {
    menu.fadeOut(200);
  });

  // go pagetop btn ===============================

  const goTop = $('.js-gotop');

  goTop.on('click', function () {
    $('body, html').animate(
      {
        scrollTop: 0,
      },
      600
    );
    return false;
  });
});

// Product
const product = () => {
  const $card = $('.c-product-card');
  const $modal = $('.p-modal');

  // カルーセルの制御処理

  // サムネイルの生成処理
  const sliderThumbnail = new Swiper('.slider-thumbnail', {
    slidesPerView: 4,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });

  // メインスライダーの生成処理
  const swiper = new Swiper('.swiper', {
    modules: [Pagination, Navigation],
    loop: true,
    // ページネーションの実装
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    // 矢印の実装
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // サムネイルと連動
    thumbs: {
      swiper: sliderThumbnail,
    },
  });

  // モーダルの開閉処理

  // View Moreボタンアニメーション
  const $btnMore = $card.find('.c-product-card__head-btn');
  $btnMore.on('mouseenter', (e) => {
    e.preventDefault();
    $(e.currentTarget).addClass('hov-active');
  });
  $btnMore.on('mouseleave', (e) => {
    e.preventDefault();
    $(e.currentTarget).removeClass('hov-active');
  });

  // カードクリックでモーダルを開く
  $card.on('click', (e) => {
    // クリックしたカードのインデックスのスライドに移動
    const slideNo = $(e.currentTarget).data('slide');
    swiper.slideTo(slideNo, 0);

    $modal.fadeIn(300);
  });

  // Closeクリックでモーダルを閉じる
  const $closeElm = $modal.find('[data-close]');
  $closeElm.on('click', (e) => {
    $modal.fadeOut(300);
  });
};
product();

// slide up ===============================
const slideUp = () => {
  const $elm = $('.slide-up');

  $elm.each((i, e) => {
    const ob = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // 分割代入
        const { isIntersecting } = entry;
        if (isIntersecting) {
          $(e).addClass('active');
          ob.disconnect();
        }
      });
    });
    ob.observe(e);
  });
};
slideUp();

// slide left ===============================

$(window).on('load scroll', function () {
  const slideLeft = $('.slide-left');

  slideLeft.each(function () {
    const target = $(this).offset().top;
    const scroll = $(window).scrollTop();
    const height = $(window).height();
    if (scroll > target - height) {
      $(this).addClass('active');
    }
  });
});

// set view width (except scrollbar) ===============================

const setVw = function () {
  const vw = document.documentElement.clientWidth / 100;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
};
window.addEventListener('DOMContentLoaded', setVw);
window.addEventListener('resize', setVw);
