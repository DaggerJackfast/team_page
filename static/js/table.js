define(['./config', './storage', './api', 'jquery', 'dayjs'], function (config, storage, api, $, dayjs) {
    const state = this;

    function initState() {
        state.team = api.getTeam();
        state.invitations = api.getInvitations();
        state.me = api.getMe();
    }

    function calculateAvailableSeats() {
        const team = state.team;
        const invitations = state.invitations;

        const teamTotalCount = config.teamCount;
        return teamTotalCount - team.length - invitations.length;
    }

    function renderAvailableSeats() {
        const availableCount = calculateAvailableSeats();
        const freeSeatsMessage = availableCount > 0 ? `(${availableCount} seats available)` : '(No seats available)';

        const tableAvailableSeatsElement = $('#team-available-seats');
        tableAvailableSeatsElement.html(freeSeatsMessage);
    }

    function renderInviteDisable() {
        const availableCount = calculateAvailableSeats();
        const inviteButton = $('#invite-modal-open-button')
        const availableInvite = availableCount > 0;
        inviteButton.prop('disabled', !availableInvite);
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

    function renderTeamTable() {
        const team = state.team;
        const me = state.me;

        const teamTable = $("#team-table tbody");
        teamTable.empty();

        team.forEach(function (member) {
            const fullName = `${member.firstName} ${member.lastName}`;
            let viewName = `${fullName} <span class="row-email">(${member.email})</span>`;

            let image = 'static/images/placeholder.png';
            if (member.image) {
                image = member.image;
            }
            let action = `
            <span class="table-row-actions">
                <button data-member-id="${member.id}" data-button-name="delete" class="table-button button-red">
                    <icon class="icon icon-delete-white"></icon>
                    <span>delete</span>
                </button>
            </span>
                `;
            let isMe = me.id === member.id;
            if (isMe) {
                action = '';
                viewName += ' <b>(you)</b>'
            }
            const row = $(`
            <tr>
                <td class="hide-on-mobile">
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
        `);
            if (isMe) {
                row.addClass('row-disabled');
            }
            teamTable.append(row);
        });
    }

    function renderInvitationsTable() {
        const invitations = state.invitations;
        const invitationsTable = $('#invitations-table tbody');
        invitationsTable.empty();

        invitations.forEach(function (invitation) {
            const expired = dayjs(invitation.expirationTime).format('YYYY-MM-DD HH:mm');
            const row = `
            <tr>
                <td>
                    <span>${invitation.email}</span>
                </td>
                <td>${invitation.role}</td>
                <td>${invitation.status}</td>
                <td class="hide-on-mobile">${expired}</td>
                <td>
                    <span class="table-row-actions">
                        <button data-invitaiton-id="${invitation.id}" data-button-name="delete" class="table-button button-red">
                            <i class="icon icon-delete-white"></i>
                            <span>delete</span>
                        </button>
                        <button data-invitation-id="${invitation.id}" data-button-name="resend" class="table-button button-blue">
                            <i class="icon icon-resend-white"></i>
                            <span>resend</span>
                        </button>
                    </span>
                </td>
            </tr>
        `;
            invitationsTable.append(row);
        });
    }

    function compare(first, second, col, type) {
        let firstContent = first.children[col].textContent;
        let secondContent = second.children[col].textContent;
        if (type === "number") {
            firstContent *= 1;
            secondContent *= 1;
        } else if (type === "string") {
            firstContent = firstContent.toLowerCase();
            secondContent = secondContent.toLowerCase();
        }

        if (firstContent < secondContent) {
            return -1;
        }
        if (firstContent > secondContent) {
            return 1;
        }
        return 0;
    }

    function listenSort() {
        const colSortItem = $('#team-table .col-sort');

        colSortItem.click(function () {
            const sortIcon = $(this).children('.sort-icon');
            const isActive = sortIcon.hasClass('sort-icon-active');
            const isDesc = sortIcon.hasClass('sort-icon-up');

            if (!isActive) {
                $('#team-table .sort-icon.sort-icon-active').removeClass(['sort-icon-active', 'sort-icon-up']);
                sortIcon.addClass('sort-icon-active');
            }
            if (isDesc) {
                sortIcon.removeClass('sort-icon-up');
            } else {
                sortIcon.addClass('sort-icon-up');
            }
            const cellIndex = $(this).parent('th').index();
            const tableBody = $('#team-table tbody');
            const rows = $.makeArray($('#team-table tbody > tr'))
            const sortOrder = isDesc ? 1 : -1;
            rows.sort(function (first, second) {
                return compare(first, second, cellIndex, 'string') * sortOrder;
            })
            tableBody.empty();
            tableBody.append(rows);
        });
    }


    function refreshInvitations() {
        initState();
        renderAvailableSeats();
        renderInvitationCount();
        renderInvitationsTable();
        renderInviteDisable();
        listenInvitationDeleteButton();
        listenInvitationResendButton();
    }

    function refreshTeam() {
        initState();
        renderAvailableSeats();
        renderTeamCount();
        renderTeamTable();
        listenTeamDeleteButton();
    }

    function listenRefresh() {
        $(document).on('RefreshInvitations', refreshInvitations);
    }

    function listenTeamDeleteButton() {
        const deleteButton = $("#team-table [data-button-name='delete']");

        deleteButton.click(function (e) {
            e.stopPropagation();
            const memberId = parseInt($(this).data('member-id'));
            api.deleteMember(memberId);
            refreshTeam();
        })
    }

    function listenInvitationDeleteButton() {
        const deleteButton = $("#invitations-table [data-button-name='delete']");

        deleteButton.click(function (e) {
            e.stopPropagation();
            const invitationId = parseInt($(this).data('invitation-id'));
            api.deleteInvitation(invitationId);
            refreshInvitations();
        })
    }

    function listenInvitationResendButton() {
        const resendButton = $("#invitations-table [data-button-name='resend']");

        resendButton.click(function (e) {
            e.stopPropagation();
            const invitationId = parseInt($(this).data('invitation-id'));
            api.resendInvitation(invitationId);
            refreshInvitations();
        })
    }

    function init() {
        initState();
        renderAvailableSeats();
        renderTeamCount();
        renderInvitationCount();
        renderTeamTable();
        renderInvitationsTable();
        renderInviteDisable();
        listenRefresh();
        listenTeamDeleteButton();
        listenInvitationDeleteButton();
        listenInvitationResendButton();
        listenSort();
    }

    return {
        init,
    }

})