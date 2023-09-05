requirejs.config({
    paths: {
        jquery: '/static/vendors/jquery',
        domReady: '/static/vendors/domReady',
        dayjs: '/static/vendors/dayjs',
        select2: '/static/vendors/select2',
        emailsInput: '/static/vendors/emailsInput',
    }
});

define(['./api', './tabs', './modal', './table', './profile', 'inviteForm'], function (api, tabs, modal, table, profile, inviteForm) {
    console.log('its working');
    api.clear();

    profile.init();
    table.init();
    tabs.init();
    modal.init();
    inviteForm.init();
});
