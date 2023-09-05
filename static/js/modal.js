define(['jquery'], function ($) {

    const state = this;

    function listenOpenButton() {
        const openButton = $("[data-modal-open]");
        openButton.click(function () {
            state.callback();
            const modalName = $(this).data("modal-open");

            const modal = $(`[data-modal='${modalName}']`);
            modal.addClass("modal-overlay-show");
        })
    }

    function listenCloseButton() {
        const closeButton = $("[data-modal-close]");
        closeButton.click(function () {
            const modalName = $(this).data("modal-close");

            const modal = $(`[data-modal='${modalName}'].modal-overlay-show`);
            modal.removeClass("modal-overlay-show");
        });
    }

    function init(callback = null) {
        listenOpenButton();
        listenCloseButton();
        state.callback = callback ? callback : function() {};
    }


    return {
        init
    }
});