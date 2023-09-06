define(['./config', './storage', 'dayjs'], function (config, storage, dayjs) {
    const {Roles, MemberStatuses, InvitationStatuses} = config;
    const data = {
        team: [
            {
                id: 1,
                email: 'albert.rhino@mail.com',
                firstName: 'Albert',
                lastName: 'Rhino',
                role: Roles.Admin,
                status: MemberStatuses.Active,
                image: 'static/images/users/user-two.jpg',
            },
            {
                id: 2,
                firstName: 'Bruno',
                lastName: 'Ernandes',
                email: 'bruno.ernandes@mail.com',
                role: Roles.Owner,
                status: MemberStatuses.Active,
                image: 'static/images/users/user-one.jpg',
            },
            {
                id: 3,
                firstName: 'Carolina',
                lastName: 'Goldbridth',
                email: 'carolina.goldbridth@mail.com',
                role: Roles.Agent,
                status: MemberStatuses.Active,
                image: 'static/images/users/user-four.jpg',
            },
            {
                id: 4,
                firstName: 'Mark',
                lastName: 'Greenwood',
                email: 'mark.greenwood@mail.com',
                role: Roles.Teammate,
                status: MemberStatuses.Suspended,
                image: 'static/images/users/user-three.jpg',
            },
            {
                id: 5,
                firstName: 'Yuri',
                lastName: 'Romanovich',
                email: 'yuri.romanovich@mail.com',
                role: Roles.Collaborator,
                status: MemberStatuses.Active,
                image: null,
            },
            {
                id: 6,
                firstName: 'Nathan',
                lastName: 'Weildenberg',
                email: 'nathan.wildenberg@mail.com',
                role: Roles.Admin,
                status: MemberStatuses.Active,
                image: null,
            },
        ],
        invitations: [
            {
                id: 1,
                email: 'emma.goldenberg@mail.com',
                role: Roles.Admin,
                status: InvitationStatuses.Sent,
                expirationTime: new Date('2023-10-19 14:00'),
            },
            {
                id: 2,
                email: 'emanuel.rogan@mail.com',
                role: Roles.Teammate,
                status: InvitationStatuses.Expired,
                expirationTime: new Date('2023-08-12 21:34'),
            }
        ],
    };

    function getTeam() {
        if (!storage.get('team')) {
            storage.set('team', data.team)
        }
        return storage.get('team');
    }

    function getInvitations() {
        if (!storage.get('invitations')) {
            storage.set('invitations', data.invitations)
        }
        return storage.get('invitations');
    }

    function clear() {
        storage.wipe();
    }

    function getMe() {
        const me = data.team[1];
        if (!storage.get('me')) {
            storage.set('me', me);
        }
        return storage.get('me');
    }

    function sendInvitations(role, emails) {
        const team = getTeam();
        const invitations = getInvitations();
        const freeCount = config.teamCount - team.length - invitations.length;
        let invitationEmails = freeCount < emails.length ? emails.slice(0, freeCount) : emails;
        const lastId = invitations.length ? invitations[invitations.length - 1].id : -1;
        const expirationTime = dayjs(new Date()).add(1, 'month').toDate();
        const newInvitations = invitationEmails.map(function(email, index){
            return {
                id: lastId + index + 1,
                email: email,
                role,
                status: InvitationStatuses.Sent,
                expirationTime,
            }
        });
        invitations.push(...newInvitations);
        storage.set('invitations', invitations);
    }

    function deleteMember(memberId) {
        const team = getTeam();
        const index = team.findIndex(function(member){
            return member.id === memberId
        });
        team.splice(index, 1);
        storage.set('team', team);
    }

    function deleteInvitation(invitationId) {
        const invitations = getInvitations();
        const index = invitations.findIndex(function(invitation){
            return invitation.id === invitationId
        });
        invitations.splice(index, 1);
        storage.set('invitations', invitations);
    }

    function resendInvitation(invitationId) {
        const invitations = getInvitations();
        const index = invitations.findIndex(function(invitation){
            return invitation.id === invitationId
        });
        invitations[index].expirationTime = dayjs(new Date()).add(1, 'month').toDate();
        invitations[index].status = InvitationStatuses.Sent;
        storage.set('invitations', invitations);
    }

    return {
        getTeam,
        getInvitations,
        getMe,
        clear,
        sendInvitations,
        deleteMember,
        deleteInvitation,
        resendInvitation,
    }
})