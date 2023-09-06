define(["jquery"], function ($) {
    function listenOpenButton() {
        const button = $('#sidebar-open-button');
        const sidebar = $('#sidebar');
        button.click(function (e) {
            sidebar.toggleClass('sidebar-section-active');
        });
    }

    function listenCloseButton() {
        const button = $('#sidebar-close-button');
        const sidebar = $('#sidebar');
        button.click(function (e) {
            sidebar.removeClass('sidebar-section-active');
        })
    }

    function init() {
        listenOpenButton();
        listenCloseButton();
    }

    return {
        init
    }
})