$(function () {
    const $nav = $('nav')
    const $body = $('body')

    function addNavbarPadding () {
        if ($nav.hasClass('transparent'))
            return
        $body.css('padding-top', $nav.outerHeight())
    }

    function addFooterPadding () {
        $body.css('padding-bottom', $('footer').outerHeight())
    }


    function checkScrolled () {
        if ($(window).scrollTop() > 15) {
            $nav.addClass('scrolled')
        } else {
            $nav.removeClass('scrolled')
        }
    }

    addNavbarPadding()
    addFooterPadding()
    checkScrolled()

    $(window).on('resize', function () {
        addNavbarPadding()
        addFooterPadding()
    })
    $(window).on('scroll', checkScrolled)

    $('.tags-select').select2({
        'placeholder': 'Теги',
    })

    $('#pagination-courses').twbsPagination({
        totalPages: $(".course-page").length,
        startPage: 1,
        visiblePages: 8,
        initiateStartPageClick: true,

        href: false,

        first: 'First',
        last: 'Last',

        loop: false,

        onPageClick: function (event, page) {
            $('.course-page').removeClass('active')
            $('#course-page' + (page-1)).addClass('active')
        },

        paginationClass: 'pagination',
        nextClass: 'page-item next',
        prevClass: 'page-item prev',
        lastClass: 'page-item last',
        firstClass: 'page-item first',
        pageClass: 'page-item',
        activeClass: 'active',
        disabledClass: 'disabled',
    })
})
