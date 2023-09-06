define(['./config', './api', 'jquery', 'select2', 'emailsInput'], function (config, api, $, select2, emailsInput) {
    const state = this;

    function renderRoles() {
        const roleSelect = $('#invite-role');
        roleSelect.empty();
        roleSelect.append(`<option></option>`);
        state.roleElement = roleSelect;

        const options = Object.keys(config.Roles).map(function (key) {
                const value = config.Roles[key];
                return {
                    id: value,
                    text: key
                }
            }
        )

        roleSelect.select2({
            data: options,
            placeholder: "Select role",
            allowClear: true,
            minimumResultsForSearch: -1,
            dropdownAutoWidth: true,
            dropdownCssClass: 'form-select-dropdown',
            width: '150px',
            dropdownParent: '.invite-form'
        });
    }

    function renderEmails() {
        let inviteEmails = $('#invite-emails');
        inviteEmails.empty();

        state.emailsInputInstance = emailsInput(inviteEmails[0], {
            placeholder: 'Add emails for invite...',
            morePlaceholder: 'Add more emails for invite...'
        });
    }

    function renderAvailableSeats() {
        const team = api.getTeam();
        const invitations = api.getInvitations();
        const availableSeatsCount = config.teamCount - team.length - invitations.length;

        if (availableSeatsCount > 0) {
            $('#modal-available-seats').html(`You have ${availableSeatsCount} available`)
        }
    }

    function listenSendButton() {
        const sendButton = $('#invite-send');
        const roleInput = $('#invite-role');

        sendButton.click(function (e) {
            e.stopPropagation();
            const selected = roleInput.select2('data');
            const role = selected.pop().id;
            const emails = state.emailsInputInstance.getEmailsList();

            if (!role || !emails.length) return;

            api.sendInvitations(role, emails);

            $(document).trigger('RefreshInvitations');
            $(document).trigger('CloseModal', [{name: 'invite-modal'}])
        });
    }

    function init() {
        renderAvailableSeats()
        renderRoles();
        renderEmails();
        listenSendButton();
    }

    function refresh() {
        renderAvailableSeats();
        renderEmails();
        renderRoles();
    }

    return {
        init,
        refresh,
    }
});