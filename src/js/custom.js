;(function ($) {
  'use strict'

  // Header Type = Fixed
  $(window).scroll(function () {
    var scroll = $(window).scrollTop()
    var box = $('.header-text').height()
    var header = $('header').height()

    if (scroll >= box - header) {
      $('header').addClass('background-header')
    } else {
      $('header').removeClass('background-header')
    }
  })

  // OwlCarousel
  $('.loop').owlCarousel({
    center: true,
    items: 1,
    loop: true,
    autoplay: true,
    nav: true,
    margin: 0,
    responsive: {
      1200: {
        items: 5,
      },
      992: {
        items: 3,
      },
      760: {
        items: 2,
      },
    },
  })

  // Menu Dropdown Toggle
  $(document).on('click', '.menu-trigger', function () {
    $(this).toggleClass('active')
    $('.header-area .nav').slideToggle(200)
  })

  // Smooth Scroll To Section
  $(document).on('click', '.scroll-to-section a[href*=\\#]:not([href=\\#])', function (e) {
    e.preventDefault()
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash)
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
      if (target.length) {
        var width = $(window).width()
        if (width < 991) {
          $('.menu-trigger').removeClass('active')
          $('.header-area .nav').slideUp(200)
        }
        $('html,body').animate(
          {
            scrollTop: target.offset().top + 1,
          },
          700,
        )
        return false
      }
    }
  })

  // Smooth Scroll Click Event (với active class)
  $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function () {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash)
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
      if (target.length) {
        var width = $(window).width()
        if (width < 991) {
          $('.menu-trigger').removeClass('active')
          $('.header-area .nav').slideUp(200)
        }
        $('html,body').animate(
          {
            scrollTop: target.offset().top + 1,
          },
          700,
        )
        return false
      }
    }
  })

  // On Scroll Event (for Active Link Highlighting)
  function onScroll() {
    var scrollPos = $(document).scrollTop()
    $('.nav a').each(function () {
      var currLink = $(this)
      var refElement = $(currLink.attr('href'))
      if (
        refElement.position().top <= scrollPos &&
        refElement.position().top + refElement.height() > scrollPos
      ) {
        $('.nav ul li a').removeClass('active')
        currLink.addClass('active')
      } else {
        currLink.removeClass('active')
      }
    })
  }

  // Accordion Click Event
  $(document).on('click', '.naccs .menu div', function () {
    var numberIndex = $(this).index()
    console.log('Accordion menu clicked:', numberIndex) // Kiểm tra sự kiện click

    if (!$(this).hasClass('active')) {
      $('.naccs .menu div').removeClass('active')
      $('.naccs ul li').removeClass('active')

      $(this).addClass('active')
      $('.naccs ul')
        .find('li:eq(' + numberIndex + ')')
        .addClass('active')

      var listItemHeight = $('.naccs ul')
        .find('li:eq(' + numberIndex + ')')
        .innerHeight()
      $('.naccs ul').height(listItemHeight + 'px')
    }
  })

  // Page loading animation
  $(window).on('load', function () {
    console.log('Page loaded') // Kiểm tra khi trang load
    $('#js-preloader').addClass('loaded')
  })

  // Mobile Nav - Resize Mobile Menu Fix
  function mobileNav() {
    var width = $(window).width()
    $('.submenu').on('click', function () {
      console.log('Mobile submenu clicked') // Kiểm tra sự kiện click
      if (width < 767) {
        $('.submenu ul').removeClass('active')
        $(this).find('ul').toggleClass('active')
      }
    })
  }

  $(document).ready(function () {
    mobileNav() // Call for mobile menu fix
  })
})(window.jQuery)
