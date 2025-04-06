/* -------------------------------------------

Name: 		Ruizarch
Version:    1.0
Developer:	Nazar gofler (goflerDigitalDesign)
Portfolio:  https://themeforest.net/user/goflerdigitaldesign/portfolio?ref=goflerDigitalDesign

p.s. I am available for Freelance hire (UI design, web development). email: gofler.themes@gmail.com

------------------------------------------- */

$(function () {

    "use strict";

    /***************************

    swup

    ***************************/
    // const options = {
    //     containers: ['#swupMain', '#swupMenu'],
    //     animateHistoryBrowsing: true,
    //     linkSelector: 'a:not([data-no-swup])',
    //     animationSelector: '[class="gof-main-transition"]'
    // };
    // const swup = new Swup(options);

    /***************************

    register gsap plugins

    ***************************/
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    /***************************

    color variables

    ***************************/

    var accent = 'rgba(255, 152, 0, 1)';
    var dark = '#000';
    var light = '#fff';

    /***************************

    preloader
    
    ***************************/

    var timeline = gsap.timeline();

    timeline.to(".gof-preloader-animation", {
        opacity: 1,
    });

    timeline.fromTo(
        ".gof-animation-1 .gof-h3", {
            y: "30px",
            opacity: 0
        }, {
            y: "0px",
            opacity: 1,
            stagger: 0.4
        },
    );

    timeline.to(".gof-animation-1 .gof-h3", {
        opacity: 0,
        y: '-30',
    }, "+=.3");

    timeline.fromTo(".gof-reveal-box", 0.1, {
        opacity: 0,
    }, {
        opacity: 1,
        x: '-30',
    });

    timeline.to(".gof-reveal-box", 0.45, {
        width: "100%",
        x: 0,
    }, "+=.1");
    timeline.to(".gof-reveal-box", {
        right: "0"
    });
    timeline.to(".gof-reveal-box", 0.3, {
        width: "0%"
    });
    timeline.fromTo(".gof-animation-2 .gof-h3", {
        opacity: 0,
    }, {
        opacity: 1,
    }, "-=.5");
    timeline.to(".gof-animation-2 .gof-h3", 0.6, {
        opacity: 0,
        y: '-30'
    }, "+=.5");
    timeline.to(".gof-preloader", 0.8, {
        opacity: 0,
        ease: 'sine',
    }, "+=.2");
    timeline.fromTo(".gof-up", 0.8, {
        opacity: 0,
        y: 40,
        scale: .98,
        ease: 'sine',

    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        onComplete: function () {
            $('.gof-preloader').addClass("gof-hidden");
        },
    }, "-=1");
    /***************************

    anchor scroll

    ***************************/
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        var target = $($.attr(this, 'href'));
        var offset = 0;

        if ($(window).width() < 1200) {
            offset = 90;
        }

        $('html, body').animate({
            scrollTop: target.offset().top - offset
        }, 400);
    });
    /***************************

    append

    ***************************/
    $(document).ready(function () {
        $(".gof-arrow").clone().appendTo(".gof-arrow-place");
        $(".gof-dodecahedron").clone().appendTo(".gof-animation");
        $(".gof-lines").clone().appendTo(".gof-lines-place");
        $(".gof-main-menu ul li.gof-active > a").clone().appendTo(".gof-current-page");
    });
    /***************************

    accordion

    ***************************/

    let groups = gsap.utils.toArray(".gof-accordion-group");
    let menus = gsap.utils.toArray(".gof-accordion-menu");
    let menuToggles = groups.map(createAnimation);

    menus.forEach((menu) => {
        menu.addEventListener("click", () => toggleMenu(menu));
    });

    function toggleMenu(clickedMenu) {
        menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
    }

    function createAnimation(element) {
        let menu = element.querySelector(".gof-accordion-menu");
        let box = element.querySelector(".gof-accordion-content");
        let symbol = element.querySelector(".gof-symbol");
        let minusElement = element.querySelector(".gof-minus");
        let plusElement = element.querySelector(".gof-plus");

        gsap.set(box, {
            height: "auto",
        });

        let animation = gsap
            .timeline()
            .from(box, {
                height: 0,
                duration: 0.4,
                ease: "sine"
            })
            .from(minusElement, {
                duration: 0.4,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .to(plusElement, {
                duration: 0.4,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .to(symbol, {
                background: accent,
                ease: "none",
            }, 0)
            .reverse();

        return function (clickedMenu) {
            if (clickedMenu === menu) {
                animation.reversed(!animation.reversed());
            } else {
                animation.reverse();
            }
        };
    }
    /***************************

    back to top

    ***************************/
    const btt = document.querySelector(".gof-back-to-top .gof-link");

    gsap.set(btt, {
        x: -30,
        opacity: 0,
    });

    gsap.to(btt, {
        x: 0,
        opacity: 1,
        ease: 'sine',
        scrollTrigger: {
            trigger: "body",
            start: "top -40%",
            end: "top -40%",
            toggleActions: "play none reverse none"
        }
    });
    /***************************

    cursor

    ***************************/
    const cursor = document.querySelector('.gof-ball');

    gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
    });

    document.addEventListener('pointermove', movecursor);

    function movecursor(e) {
        gsap.to(cursor, {
            duration: 0.3,
            ease: 'sine',
            x: e.clientX,
            y: e.clientY,
        });
    }

    $('.gof-drag, .gof-more, .gof-choose').mouseover(function () {
        gsap.to($(cursor), .2, {
            width: 90,
            height: 90,
            opacity: 1,
            ease: 'sine',
        });
    });

    $('.gof-drag, .gof-more, .gof-choose').mouseleave(function () {
        gsap.to($(cursor), .2, {
            width: 20,
            height: 20,
            opacity: .1,
            ease: 'sine',
        });
    });

    $('.gof-accent-cursor').mouseover(function () {
        gsap.to($(cursor), .2, {
            background: accent,
            ease: 'sine',
        });
        $(cursor).addClass('gof-accent');
    });

    $('.gof-accent-cursor').mouseleave(function () {
        gsap.to($(cursor), .2, {
            background: dark,
            ease: 'sine',
        });
        $(cursor).removeClass('gof-accent');
    });

    $('.gof-drag').mouseover(function () {
        gsap.to($('.gof-ball .gof-icon-1'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.gof-drag').mouseleave(function () {
        gsap.to($('.gof-ball .gof-icon-1'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('.gof-more').mouseover(function () {
        gsap.to($('.gof-ball .gof-more-text'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.gof-more').mouseleave(function () {
        gsap.to($('.gof-ball .gof-more-text'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('.gof-choose').mouseover(function () {
        gsap.to($('.gof-ball .gof-choose-text'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.gof-choose').mouseleave(function () {
        gsap.to($('.gof-ball .gof-choose-text'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('a:not(".gof-choose , .gof-more , .gof-drag , .gof-accent-cursor"), input , textarea, .gof-accordion-menu').mouseover(function () {
        gsap.to($(cursor), .2, {
            scale: 0,
            ease: 'sine',
        });
        gsap.to($('.gof-ball svg'), .2, {
            scale: 0,
        });
    });

    $('a:not(".gof-choose , .gof-more , .gof-drag , .gof-accent-cursor"), input, textarea, .gof-accordion-menu').mouseleave(function () {
        gsap.to($(cursor), .2, {
            scale: 1,
            ease: 'sine',
        });

        gsap.to($('.gof-ball svg'), .2, {
            scale: 1,
        });
    });

    $('body').mousedown(function () {
        gsap.to($(cursor), .2, {
            scale: .1,
            ease: 'sine',
        });
    });
    $('body').mouseup(function () {
        gsap.to($(cursor), .2, {
            scale: 1,
            ease: 'sine',
        });
    });
    /***************************

     menu

    ***************************/
    $('.gof-menu-btn').on("click", function () {
        $('.gof-menu-btn').toggleClass('gof-active');
        $('.gof-menu').toggleClass('gof-active');
        $('.gof-menu-frame').toggleClass('gof-active');
    });
    /***************************

    main menu

    ***************************/
    $('.gof-has-children a').on('click', function () {
        $('.gof-has-children ul').removeClass('gof-active');
        $('.gof-has-children a').removeClass('gof-active');
        $(this).toggleClass('gof-active');
        $(this).next().toggleClass('gof-active');
    });
    /***************************

    progressbar

    ***************************/
    gsap.to('.gof-progress', {
        height: '100%',
        ease: 'sine',
        scrollTrigger: {
            scrub: 0.3
        }
    });
    /***************************

    scroll animations

    ***************************/

    const appearance = document.querySelectorAll(".gof-up");

    appearance.forEach((section) => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 50,
            scale: .95,
            ease: 'sine',

        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: .65,
            scrollTrigger: {
                trigger: section,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const scaleImage = document.querySelectorAll(".gof-scale");

    scaleImage.forEach((section) => {
        var value1 = $(section).data("value-1");
        var value2 = $(section).data("value-2");
        gsap.fromTo(section, {
            ease: 'sine',
            scale: value1,

        }, {
            scale: value2,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const parallaxImage = document.querySelectorAll(".gof-parallax");


    if ($(window).width() > 960) {
        parallaxImage.forEach((section) => {
            var value1 = $(section).data("value-1");
            var value2 = $(section).data("value-2");
            gsap.fromTo(section, {
                ease: 'sine',
                y: value1,

            }, {
                y: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
    }

    const rotate = document.querySelectorAll(".gof-rotate");

    rotate.forEach((section) => {
        var value = $(section).data("value");
        gsap.fromTo(section, {
            ease: 'sine',
            rotate: 0,

        }, {
            rotate: value,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });

    /***************************

    fslightbox

    ***************************/
       // inner videos slider
    new Swiper(".jo-inner-videos-slider", {
        slidesPerView: "auto",
        centeredSlides: true,
        loop: true,
        autoplay: true,
        navigation: {
            prevEl: ".jo-inner-videos-slider-nav .prev",
            nextEl: ".jo-inner-videos-slider-nav .next"
        },
        breakpoints: {
            0: {
                spaceBetween: 15,
            },
            992: {
                spaceBetween: 20,
            },
            1200: {
                spaceBetween: 30,
            }
        }
    });

    new Swiper(".jo-related-videos-slider", {
        // slidesPerView: 3,
        // spaceBetween: 30,
        slidesPerView: 1,
        spaceBetween: 15,
        breakpoints: {
            480: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            }
        },
        navigation: {
            prevEl: ".jo-related-videos-slider-nav .prev",
            nextEl: ".jo-related-videos-slider-nav .next"
        },
    });


    /***************************

    fancybox

    ***************************/
    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            "slideShow",
            "zoom",
            "fullScreen",
            "close"
          ],
        loop: false,
        protect: true
    });
    $.fancybox.defaults.hash = false;
    /***************************

    reviews slider

    ***************************/

    var menu = ['<div class="gof-custom-dot gof-slide-1"></div>', '<div class="gof-custom-dot gof-slide-2"></div>', '<div class="gof-custom-dot gof-slide-3"></div>', '<div class="gof-custom-dot gof-slide-4"></div>', '<div class="gof-custom-dot gof-slide-5"></div>', '<div class="gof-custom-dot gof-slide-6"></div>', '<div class="gof-custom-dot gof-slide-7"></div>']
    var mySwiper = new Swiper('.gof-reviews-slider', {
        // If we need pagination
        pagination: {
            el: '.gof-revi-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (menu[index]) + '</span>';
            },
        },
        speed: 800,
        effect: 'fade',
        parallax: true,
        navigation: {
            nextEl: '.gof-revi-next',
            prevEl: '.gof-revi-prev',
        },
    })

    /***************************

    infinite slider

    ***************************/
    var swiper = new Swiper('.gof-infinite-show', {
        slidesPerView: 2,
        spaceBetween: 30,
        speed: 5000,
        autoplay: true,
        autoplay: {
            delay: 0,
        },
        loop: true,
        freeMode: true,
        breakpoints: {
            992: {
                slidesPerView: 4,
            },
        },
    });

    /***************************

    portfolio slider

    ***************************/
    var swiper = new Swiper('.gof-portfolio-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        parallax: true,
        mousewheel: {
            enable: true
        },
        navigation: {
            nextEl: '.gof-portfolio-next',
            prevEl: '.gof-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
    });
    /***************************

    1 item slider

    ***************************/
    var swiper = new Swiper('.gof-1-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            nextEl: '.gof-portfolio-next',
            prevEl: '.gof-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
    });
    /***************************

    2 item slider

    ***************************/
    var swiper = new Swiper('.gof-2-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            nextEl: '.gof-portfolio-next',
            prevEl: '.gof-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
        breakpoints: {
            992: {
                slidesPerView: 2,
            },
        },
    });

    /*----------------------------------------------------------
    ------------------------------------------------------------

    REINIT

    ------------------------------------------------------------
    ----------------------------------------------------------*/
    document.addEventListener("swup:contentReplaced", function () {

        $('html, body').animate({
            scrollTop: 0,
        }, 0);

        gsap.to('.gof-progress', {
            height: 0,
            ease: 'sine',
            onComplete: () => {
                ScrollTrigger.refresh()
            },
        });
        /***************************

         menu

        ***************************/
        $('.gof-menu-btn').removeClass('gof-active');
        $('.gof-menu').removeClass('gof-active');
        $('.gof-menu-frame').removeClass('gof-active');
        /***************************

        append

        ***************************/
        $(document).ready(function () {
            $(".gof-arrow-place .gof-arrow, .gof-animation .gof-dodecahedron, .gof-current-page a").remove();
            $(".gof-arrow").clone().appendTo(".gof-arrow-place");
            $(".gof-dodecahedron").clone().appendTo(".gof-animation");
            $(".gof-lines").clone().appendTo(".gof-lines-place");
            $(".gof-main-menu ul li.gof-active > a").clone().appendTo(".gof-current-page");
        });
        /***************************

        accordion

        ***************************/

        let groups = gsap.utils.toArray(".gof-accordion-group");
        let menus = gsap.utils.toArray(".gof-accordion-menu");
        let menuToggles = groups.map(createAnimation);

        menus.forEach((menu) => {
            menu.addEventListener("click", () => toggleMenu(menu));
        });

        function toggleMenu(clickedMenu) {
            menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
        }

        function createAnimation(element) {
            let menu = element.querySelector(".gof-accordion-menu");
            let box = element.querySelector(".gof-accordion-content");
            let symbol = element.querySelector(".gof-symbol");
            let minusElement = element.querySelector(".gof-minus");
            let plusElement = element.querySelector(".gof-plus");

            gsap.set(box, {
                height: "auto",
            });

            let animation = gsap
                .timeline()
                .from(box, {
                    height: 0,
                    duration: 0.4,
                    ease: "sine"
                })
                .from(minusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(plusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(symbol, {
                    background: accent,
                    ease: "none",
                }, 0)
                .reverse();

            return function (clickedMenu) {
                if (clickedMenu === menu) {
                    animation.reversed(!animation.reversed());
                } else {
                    animation.reverse();
                }
            };
        }

        /***************************

        cursor

        ***************************/

        $('.gof-drag, .gof-more, .gof-choose').mouseover(function () {
            gsap.to($(cursor), .2, {
                width: 90,
                height: 90,
                opacity: 1,
                ease: 'sine',
            });
        });

        $('.gof-drag, .gof-more, .gof-choose').mouseleave(function () {
            gsap.to($(cursor), .2, {
                width: 20,
                height: 20,
                opacity: .1,
                ease: 'sine',
            });
        });

        $('.gof-accent-cursor').mouseover(function () {
            gsap.to($(cursor), .2, {
                background: accent,
                ease: 'sine',
            });
            $(cursor).addClass('gof-accent');
        });

        $('.gof-accent-cursor').mouseleave(function () {
            gsap.to($(cursor), .2, {
                background: dark,
                ease: 'sine',
            });
            $(cursor).removeClass('gof-accent');
        });

        $('.gof-drag').mouseover(function () {
            gsap.to($('.gof-ball .gof-icon-1'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.gof-drag').mouseleave(function () {
            gsap.to($('.gof-ball .gof-icon-1'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('.gof-more').mouseover(function () {
            gsap.to($('.gof-ball .gof-more-text'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.gof-more').mouseleave(function () {
            gsap.to($('.gof-ball .gof-more-text'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('.gof-choose').mouseover(function () {
            gsap.to($('.gof-ball .gof-choose-text'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.gof-choose').mouseleave(function () {
            gsap.to($('.gof-ball .gof-choose-text'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('a:not(".gof-choose , .gof-more , .gof-drag , .gof-accent-cursor"), input , textarea, .gof-accordion-menu').mouseover(function () {
            gsap.to($(cursor), .2, {
                scale: 0,
                ease: 'sine',
            });
            gsap.to($('.gof-ball svg'), .2, {
                scale: 0,
            });
        });

        $('a:not(".gof-choose , .gof-more , .gof-drag , .gof-accent-cursor"), input, textarea, .gof-accordion-menu').mouseleave(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });

            gsap.to($('.gof-ball svg'), .2, {
                scale: 1,
            });
        });

        $('body').mousedown(function () {
            gsap.to($(cursor), .2, {
                scale: .1,
                ease: 'sine',
            });
        });
        $('body').mouseup(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });
        });
        /***************************

        main menu

        ***************************/
        $('.gof-has-children a').on('click', function () {
            $('.gof-has-children ul').removeClass('gof-active');
            $('.gof-has-children a').removeClass('gof-active');
            $(this).toggleClass('gof-active');
            $(this).next().toggleClass('gof-active');
        });
        /***************************

        scroll animations

        ***************************/

        const appearance = document.querySelectorAll(".gof-up");

        appearance.forEach((section) => {
            gsap.fromTo(section, {
                opacity: 0,
                y: 40,
                scale: .98,
                ease: 'sine',

            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: .4,
                scrollTrigger: {
                    trigger: section,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        const scaleImage = document.querySelectorAll(".gof-scale");

        scaleImage.forEach((section) => {
            var value1 = $(section).data("value-1");
            var value2 = $(section).data("value-2");
            gsap.fromTo(section, {
                ease: 'sine',
                scale: value1,

            }, {
                scale: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        const parallaxImage = document.querySelectorAll(".gof-parallax");


        if ($(window).width() > 960) {
            parallaxImage.forEach((section) => {
                var value1 = $(section).data("value-1");
                var value2 = $(section).data("value-2");
                gsap.fromTo(section, {
                    ease: 'sine',
                    y: value1,

                }, {
                    y: value2,
                    scrollTrigger: {
                        trigger: section,
                        scrub: true,
                        toggleActions: 'play none none reverse',
                    }
                });
            });
        }

        const rotate = document.querySelectorAll(".gof-rotate");

        rotate.forEach((section) => {
            var value = $(section).data("value");
            gsap.fromTo(section, {
                ease: 'sine',
                rotate: 0,

            }, {
                rotate: value,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
        /***************************

        fancybox

        ***************************/
        $('[data-fancybox="gallery"]').fancybox({
            buttons: [
            "slideShow",
            "zoom",
            "fullScreen",
            "close"
          ],
            loop: false,
            protect: true
        });
        $.fancybox.defaults.hash = false;
        /***************************

        reviews slider

        ***************************/

        var menu = ['<div class="gof-custom-dot gof-slide-1"></div>', '<div class="gof-custom-dot gof-slide-2"></div>', '<div class="gof-custom-dot gof-slide-3"></div>', '<div class="gof-custom-dot gof-slide-4"></div>', '<div class="gof-custom-dot gof-slide-5"></div>', '<div class="gof-custom-dot gof-slide-6"></div>', '<div class="gof-custom-dot gof-slide-7"></div>']
        var mySwiper = new Swiper('.gof-reviews-slider', {
            // If we need pagination
            pagination: {
                el: '.gof-revi-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (menu[index]) + '</span>';
                },
            },
            speed: 800,
            effect: 'fade',
            parallax: true,
            navigation: {
                nextEl: '.gof-revi-next',
                prevEl: '.gof-revi-prev',
            },
        })

        /***************************

        infinite slider

        ***************************/
        var swiper = new Swiper('.gof-infinite-show', {
            slidesPerView: 2,
            spaceBetween: 30,
            speed: 5000,
            autoplay: true,
            autoplay: {
                delay: 0,
            },
            loop: true,
            freeMode: true,
            breakpoints: {
                992: {
                    slidesPerView: 4,
                },
            },
        });

        /***************************

        portfolio slider

        ***************************/
        var swiper = new Swiper('.gof-portfolio-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
            parallax: true,
            mousewheel: {
                enable: true
            },
            navigation: {
                nextEl: '.gof-portfolio-next',
                prevEl: '.gof-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
        });
        /***************************

        1 item slider

        ***************************/
        var swiper = new Swiper('.gof-1-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.gof-portfolio-next',
                prevEl: '.gof-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
        });
        /***************************

        2 item slider

        ***************************/
        var swiper = new Swiper('.gof-2-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.gof-portfolio-next',
                prevEl: '.gof-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
            breakpoints: {
                992: {
                    slidesPerView: 2,
                },
            },
        });

    });

});
