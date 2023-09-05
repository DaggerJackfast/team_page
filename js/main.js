requirejs.config({
    paths: {
        jquery: '/vendors/jquery',
        domReady: '/vendors/domReady'
    }
});

define(['./config', './api', 'jquery' ], function (config, api, $) {
    console.log('its working');
    console.log('config', config);
    api.clear();
    const tableElement = $.find("#team-table");
    const invitationsCountElement = $('#invitations-count');
    const teamCountElement = $('#team-count');
    console.log('teamCountElement: ', teamCountElement);
    const team = api.getTeam();
    const invitations = api.getInvitations();
    invitationsCountElement.html(`(${invitations.length})`);
    teamCountElement.html(`(${team.length})`);
});