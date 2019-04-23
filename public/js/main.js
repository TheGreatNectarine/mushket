$(function () {
    // const navCollapse = 767;
    const $mainDiv = $('#main-div')

    function addNavbarPadding () {
        $mainDiv.css('padding-top', $('nav').outerHeight())
    }

    function addFooterPadding () {
        $mainDiv.css('padding-bottom', $('footer').outerHeight())
    }

    $(window).on('resize', addFooterPadding)

    addNavbarPadding()
    addFooterPadding()
})
