define(['jquery'], function($) {
    function init() {
        const tabButtons = $("[data-tab-name]");

        tabButtons.click(function(){
            const tabName = $(this).data('tab-name');

            const siblings = $(this).siblings(`[data-tab-name!='${tabName}'].page-control-active`);
            siblings.removeClass('page-control-active');
            $(this).addClass("page-control-active");

            const tab = $(`[data-tab='${tabName}']`);
            const activeTab = tab.siblings(`[data-tab!='${tabName}'].page-tab-content-active`);
            activeTab.removeClass('page-tab-content-active');
            tab.addClass('page-tab-content-active');
        });


        tabButtons.first().click();
    }
    return {
        init
    }
});