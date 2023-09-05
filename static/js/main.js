requirejs.config({
    paths: {
        jquery: '/static/vendors/jquery',
        domReady: '/static/vendors/domReady'
    }
});

define(['./config', './api', './tabs', 'jquery' ], function (config, api, tabs, $) {
    console.log('its working');
    console.log('config', config);
    api.clear();
    const invitationsCountElement = $('#invitations-count');
    const teamCountElement = $('#team-count');
    const team = api.getTeam();
    const invitations = api.getInvitations();
    invitationsCountElement.html(`(${invitations.length})`);
    teamCountElement.html(`(${team.length})`);

    const tableAvailableSeatsElement = $('#team-available-seats');
    const teamTotalCount = config.teamCount;
    const availableCount = teamTotalCount - team.length - invitations.length;
    const freeSeatsMessage = availableCount > 0 ? `(${availableCount} seats available)` : '(No seats available)';
    tableAvailableSeatsElement.html(freeSeatsMessage);
    const tableElement = $("#team-table");
    tabs.init();
});
