import $ from 'jquery';
import Swiper, { Pagination, Navigation, Thumbs } from 'swiper';

import { debounce } from 'lodash-es';
import baseNth from 'lodash-es/_baseNth';
import Stats from 'stats-js';

import EVENTS from '~/constants/event-names';
// import { set } from 'core-js/core/dict';

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
  // ////////////////////////////////////////////////////////  header
  // === javascript ===
  const header = () => {
    const bgrBtn = document.querySelector('.p-header__bgr');
    const menu = document.querySelector('.p-menu');
    const menuClose = document.querySelector('.js-menu-close');

    // ハンバーガーメニューのhover Action ----------------
    const btnTitle = document.querySelector('.p-header__bgr-title');
    const btnLine = document.querySelectorAll('.p-header__bgr > span');
    bgrBtn.addEventListener('mouseover', () => {
      btnTitle.classList.add('fadeout');
      btnTitle.style.display = 'none';
      btnLine.forEach(function (e, i) {
        e.style.transform = 'translate(-50%, -1rem)';
      });
    });
    bgrBtn.addEventListener('mouseleave', () => {
      btnTitle.classList.replace('fadeout', 'fadein');
      btnTitle.style.display = 'block';
      btnLine.forEach(function (e, i) {
        e.style.transform = 'translate(-50%, 0)';
      });
    });

    // menuの表示 --------------------------------------
    bgrBtn.addEventListener('click', () => {
      const disabledScroll = (e) => {
        e.preventDefault();
      };
      menu.classList.add('fadein');
      menu.classList.remove('fadeout');
      menu.style.display = 'block';
      document.addEventListener('touchmove', disabledScroll);
      document.addEventListener('mousewheel', disabledScroll);
    });

    menuClose.addEventListener('click', () => {
      menu.classList.remove('fadein');
      menu.classList.add('fadeout');
      menu.style.display = 'none';
    });

    // -- key visualを超えたらfixedで固定 --------------------
    const keyElem = document.querySelector('.p-key');
    const body = document.querySelector('body');

    function FixedAnime() {
      const keyHeight = keyElem.offsetHeight;
      const scrollHeight = window.pageYOffset;

      if (scrollHeight >= keyHeight) {
        body.classList.add('is-in');
      } else {
        body.classList.remove('is-in');
      }
    }
    window.addEventListener('scroll', () => {
      FixedAnime();
    });
  };
  header();

  // === jquery ===
  // const header = () => {

  //   const $bgrBtn = $('.p-header__bgr');
  //   const $menu = $('.p-menu');
  //   const $menuClose = $('.js-menu-close');

  //   // ハンバーガーメニューのhover Action ----------------
  //   $bgrBtn.on('mouseenter', () => {
  //     $bgrBtn.find('.p-header__bgr-title').fadeOut();
  //     $('.p-header__bgr span').css('transform', 'translate(-50%, -1rem)');
  //   });
  //   $bgrBtn.on('mouseleave', () => {
  //     $bgrBtn.find('.p-header__bgr-title').fadeIn();
  //     $('.p-header__bgr span').css('transform', 'translate(-50%, 0)');
  //   });

  //   // menuの表示 --------------------------------------
  //   $bgrBtn.on('click', () => {
  //     const disabledScroll = (event) => {
  //       event.preventDefault();
  //     };
  //     $menu.fadeIn(200);
  //     document.addEventListener('touchmove', disabledScroll);
  //     document.addEventListener('mousewheel', disabledScroll);
  //   });
  //   $menuClose.on('click', () => {
  //     $menu.fadeOut(200);
  //   });

  //   // -- key visualを超えたらfixedで固定 --------------------
  //   const $keyHeight = $('.p-key').height();
  //   function FixedAnime() {
  //     const scrollHeight = $(window).scrollTop();

  //     if (scrollHeight >= $keyHeight) {
  //       $('body').addClass('is-in');
  //     } else {
  //       $('body').removeClass('is-in');
  //     }
  //   }

  //   $(window).scroll(function () {
  //     FixedAnime();
  //   });
  // };
  // header();

  // //////////////////////////////////////////////////// go pagetop btn
  // === javascript ===
  const goTop = document.querySelector('.js-gotop');
  goTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  });

  // === jQuery ===
  // const $goTop = $('.js-gotop');
  // $goTop.on('click', () => {
  //   $('body, html').animate(
  //     {
  //       scrollTop: 0,
  //     },
  //     600
  //   );
  //   return false;
  // });

  // ////////////////////////////////////////////////////  slide up
  // === javascript ===
  const slideUp = () => {
    const upElm = document.querySelectorAll('.slide-up');
    upElm.forEach((val, i) => {
      const observer = new IntersectionObserver((entires) => {
        entires.forEach((entry) => {
          const { isIntersecting } = entry;
          if (isIntersecting) {
            val.classList.add('active');
            observer.disconnect();
          }
        });
      });
      observer.observe(val);
    });
  };
  slideUp();

  // === jquery ===
  // const slideUp = () => {
  //   const $upElm = $('.slide-up'); // .slide-upクラスを定数に

  //   // $.each(対象オブジェクト, function(index繰り返し対象 ,val){ 繰り返し処理 }
  //   $upElm.each((i, e) => {
  //     const observer = new IntersectionObserver((entries) => {
  //       entries.forEach((entry) => {
  //         // 入ってきたら
  //         const { isIntersecting } = entry; // "交わったら"を定数化
  //         if (isIntersecting) {
  //           // もし交わったら以下の処理を実行
  //           $(e).addClass('active'); // クラス名を追加
  //           observer.disconnect(); // 全ての対象要素について状態変化の監視停止
  //         }
  //       });
  //     });
  //     observer.observe(e); // 要素を監視される対象要素として追加
  //   });
  // };
  // slideUp();

  // -- 同一処理
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

  // ////////////////////////////////////////////////////  slideleft
  // === javascript ===
  const slideLeft = () => {
    const upElm = document.querySelectorAll('.slide-left');
    upElm.forEach((val, i) => {
      const observer = new IntersectionObserver((entires) => {
        entires.forEach((entry) => {
          const { isIntersecting } = entry;
          if (isIntersecting) {
            val.classList.add('active');
            observer.disconnect();
          }
        });
      });
      observer.observe(val);
    });
  };
  slideLeft();

  // === jquery ===
  // const slideLeft = () => {
  //   const $leftElm = $('.slide-left');

  //   $leftElm.each((i, e) => {
  //     const observer = new IntersectionObserver((entries) => {
  //       entries.forEach((entry) => {
  //         const { isIntersecting } = entry;
  //         if (isIntersecting) {
  //           $(e).addClass('active');
  //           observer.disconnect();
  //         }
  //       });
  //     });
  //     observer.observe(e);
  //   });
  // };
  // slideLeft();

  // ////////////////////////////////////////////////////  set view width (except scrollbar)
  const setVw = function () {
    const vw = document.documentElement.clientWidth / 100;
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  };
  window.addEventListener('DOMContentLoaded', setVw);
  window.addEventListener('resize', setVw);

  // ////////////////////////////////////////////////////  product
  // === javascript ===
  const product = () => {
    const modal = document.querySelector('.p-modal');
    const card = document.querySelectorAll('.c-product-card');
    const body = document.querySelector('body');
    const disNone = () => {
      modal.style.display = 'none';
    };
    modal.hidden = true;

    // サムネイル生成 --------------------------
    const sliderThumbnail = new Swiper('.slider-thumbnail', {
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });

    // スライダーの処理 --------------------------
    const swiper = new Swiper('.swiper', {
      modules: [Pagination, Navigation, Thumbs],
      loop: true,

      // ページネーション --------------------------
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
      // 前後の矢印 --------------------------
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // サムネイル --------------------------
      thumbs: {
        swiper: sliderThumbnail,
      },
    });

    // モーダルの開閉 --------------------------
    // view more アニメーション --------------------------
    const btnMore = document.querySelectorAll('.p-product__list-item');
    btnMore.forEach((value) => {
      value.addEventListener('mouseenter', (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('hov-active');
      });
      value.addEventListener('mouseleave', (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('hov-active');
      });
    });

    // カードクリックで開く --------------------------
    card.forEach((value, index) => {
      value.addEventListener('click', (e) => {
        const slideNo = e.currentTarget.dataset.slide;
        swiper.slideTo(slideNo);
        modal.classList.add('fadein');
        modal.classList.remove('fadeout');
        modal.style.display = 'block';
        body.style.overflow = 'hidden';
      });
    });

    // closeで閉じる --------------------------
    const closeBtn = document.querySelector('.p-modal__close');
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('fadein');
      modal.classList.add('fadeout');
      modal.style.display = 'none';
      setTimeout(disNone, 300);
      body.style.overflow = 'auto';
    });

    // モーダルの外側をクリックしたら閉じる --------------------------
    const modalInner = document.querySelectorAll('.p-modal__inner');
    modalInner.forEach((value) => {
      modal.addEventListener('click', (e) => {
        if (!$(e.target).closest('.p-modal__inner').length) {
          e.preventDefault();
          modal.classList.add('fadeout');
          modal.classList.remove('fadein');
          setTimeout(disNone, 300);
          body.style.overflow = 'auto';
        }
      });
    });
  };
  product();

  // === jquery ===
  // const product = () => {
  //   const $modal = $('.p-modal');
  //   const $card = $('.c-product-card');
  //   $modal.hide();

  //   // サムネイル生成 --------------------------
  //   const sliderThumbnail = new Swiper('.slider-thumbnail', {
  //     slidesPerView: 4,
  //     freeMode: true,
  //     watchSlidesVisibility: true,
  //     watchSlidesProgress: true,
  //   });

  //   // スライダーの処理 --------------------------
  //   const swiper = new Swiper('.swiper', {
  //     modules: [Pagination, Navigation, Thumbs],
  //     loop: true,

  //     // ページネーション --------------------------
  //     pagination: {
  //       el: '.swiper-pagination',
  //       type: 'fraction',
  //     },
  //     // 前後の矢印 --------------------------
  //     navigation: {
  //       nextEl: '.swiper-button-next',
  //       prevEl: '.swiper-button-prev',
  //     },
  //     // サムネイル --------------------------
  //     thumbs: {
  //       swiper: sliderThumbnail,
  //     },
  //   });

  //   // モーダルの開閉 --------------------------

  //   // view more アニメーション --------------------------
  //   const $btnMore = $('.p-product__list-item');
  //   $btnMore.on('mouseenter', (e) => {
  //     e.preventDefault();
  //     $(e.currentTarget).addClass('hov-active');
  //   });
  //   $btnMore.on('mouseleave', (e) => {
  //     e.preventDefault();
  //     $(e.currentTarget).removeClass('hov-active');
  //   });

  //   // カードクリックで開く --------------------------
  //   $card.on('click', (e) => {
  //     const slideNo = $(e.currentTarget).data('slide');
  //     swiper.slideTo(slideNo, 0);

  //     $modal.fadeIn(300);
  //     $('body').css('overflow', 'hidden');
  //   });

  //   // closeで閉じる --------------------------
  //   const $closeElm = $modal.find('[data-close]');
  //   $closeElm.on('click', (e) => {
  //     $modal.fadeOut(300);
  //     $('body').css('overflow', 'auto');
  //   });

  //   // モーダルの外側をクリックしたら閉じる --------------------------
  //   $modal.on('click', (e) => {
  //     if (!$(e.target).closest('.p-modal__inner').length) {
  //       $modal.fadeOut(300);
  //     }
  //   });
  // };
  // product();
});
