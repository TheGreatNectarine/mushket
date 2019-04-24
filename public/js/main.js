$(function () {
    const $nav = $('nav')
    const $mainDiv = $('#main-div')

    function addNavbarPadding () {
        if ($nav.hasClass('transparent'))
            return
        $mainDiv.css('padding-top', $nav.outerHeight())
    }

    function addFooterPadding () {
        $mainDiv.css('padding-bottom', $('footer').outerHeight())
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
})
