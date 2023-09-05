define(['./config', './api','jquery', 'dayjs'], function(config, api, $, dayjs){
    const state = this;

    function initState() {
        state.team = api.getTeam();
        state.invitations = api.getInvitations();
        state.me = api.getMe();
    }

    function renderAvailableSeats() {
        const team = state.team;
        const invitations = state.invitations;

        const teamTotalCount = config.teamCount;
        const availableCount = teamTotalCount - team.length - invitations.length;
        const freeSeatsMessage = availableCount > 0 ? `(${availableCount} seats available)` : '(No seats available)';

        const tableAvailableSeatsElement = $('#team-available-seats');
        tableAvailableSeatsElement.html(freeSeatsMessage);
    }

    function renderTeamCount() {
        const team = state.team;

        const teamCountElement = $('#team-count');
        teamCountElement.html(`(${team.length})`);
    }

    function renderInvitationCount() {
        const invitations = state.invitations;

        const invitationsCountElement = $('#invitations-count');
        invitationsCountElement.html(`(${invitations.length})`);
    }

    function renderTeamTable(){
        const team = state.team;
        const me = state.me;

        const teamTable = $("#team-table tbody");
        teamTable.empty();

        team.forEach(function(member){
            const fullName = `${member.firstName} ${member.lastName}`;
            let viewName = `${fullName} (${member.email})`;

            let image = 'static/images/placeholder.png';
            if(member.image) {
                image = member.image;
            }
            let action = '<button class="table-button button-red">delete</button>';
            if(me.id === member.id) {
                action = '';
                viewName += ' (you)'
            }
            const row = `
        <tr>
            <td>
            <span class="user-image">
                <img src="${image}" alt="${fullName}">
            </span>
            </td>
            <td>
                <span>${viewName}</span>
            </td>
            <td>${member.role}</td>
            <td>${member.status}</td>
            <td>${action}</td>
        </tr>
        `;
            teamTable.append(row);
        });
    }

    function renderInvitationsTable() {
        const invitations = state.invitations;
        const invitationsTable = $('#invitations-table tbody');
        invitationsTable.empty();

        invitations.forEach(function(invitation){
            const expired = dayjs(invitation.expirationTime).format('YYYY-MM-DD HH:mm');
            const row = `
            <tr>
                <td>
                    <span>${invitation.email}</span>
                </td>
                <td>${invitation.role}</td>
                <td>${invitation.status}</td>
                <td>${expired}</td>
                <td>
                    <button class="table-button button-red">delete</button>
                    <button class="table-button button-blue">resend</button>
                </td>
            </tr>
        `;
            invitationsTable.append(row);
        });
    }

    function init() {
        initState();
        renderAvailableSeats();
        renderTeamCount();
        renderInvitationCount();
        renderTeamTable();
        renderInvitationsTable();
    }

    return {
        init,
    }

})