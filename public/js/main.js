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

    $(".tags-select").select2({
        "placeholder": "Теги"
    });
})
