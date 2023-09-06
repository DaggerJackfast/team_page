requirejs.config({
    paths: {
        jquery: '../vendors/jquery',
        domReady: '../vendors/domReady',
        dayjs: '../vendors/dayjs',
        select2: '../vendors/select2',
        emailsInput: '../vendors/emailsInput',
    }
});

define(['./api', './tabs', './modal', './table', './profile', './inviteForm', './mobileSidebar'], function (api, tabs, modal, table, profile, inviteForm, mobileSidebar) {
    api.clear();
    profile.init();
    table.init();
    tabs.init();
    inviteForm.init();
    modal.init(inviteForm.refresh);
    mobileSidebar.init();
    console.log('main js module is successfully initialized');
});
