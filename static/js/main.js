requirejs.config({
    paths: {
        jquery: '/static/vendors/jquery',
        domReady: '/static/vendors/domReady',
        dayjs: '/static/vendors/dayjs'
    }
});

define(['./api', './tabs', './table', './profile'], function (api, tabs, table, profile) {
    console.log('its working');
    api.clear();

    profile.init();
    table.init();
    tabs.init();
});
