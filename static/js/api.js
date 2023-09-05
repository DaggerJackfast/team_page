define(['./config','./localStorage',], function (config, storage){
    const {Roles, MemberStatuses, InvitationStatuses} = config;
    const data = {
        team: [
            {
                id: 1,
                email: 'admin01.testovich@mail.com',
                firstName: 'Admin01',
                lastName: 'Testovich',
                role: Roles.Admin,
                status: MemberStatuses.Active,
                image: '/static/images/user-two.jpg',
            },
            {
                id: 2,
                firstName: 'Test',
                lastName: 'Testovich',
                email: 'admin01.testovich@mail.com',
                role: Roles.Admin,
                status: MemberStatuses.Active,
                image: '/static/images/user-two.jpg',
            },
            {
                id: 3,
                firstName: 'Siana',
                lastName: 'Goldbridsh',
                email: 'siana.goldbridth@mail.com',
                role: Roles.Agent,
                status: MemberStatuses.Active,
                image: '/static/images/user-two.jpg',
            },
            {
                id: 4,
                firstName: 'Mark',
                lastName: 'Greenwood',
                email: 'mark.greenwood@mail.com',
                role: Roles.Teammate,
                status: MemberStatuses.Suspended,
                image: '/static/images/user-two.jpg',
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
                image: '/static/images/user-two.jpg',
            },
        ],
        invitations: [
            {
                id: 1,
                email: 'emma.goldenberg@mail.com',
                status: InvitationStatuses.Sent,
                expirationTime: new Date('2023-10-19 14:00'),
            },
            {
                id: 2,
                email: 'emanuel.rogan@mail.com',
                status: InvitationStatuses.Sent,
                expirationTime: new Date('2023-08-12 21:34'),
            }
        ],
    };
    function getTeam() {
        if(!storage.get('team')){
            storage.add('team', data.team)
        }
        return storage.get('team');
    }
    function getInvitations() {
        if(!storage.get('invitations')){
            storage.add('invitations', data.invitations)
        }
        return storage.get('invitations');
    }
    function clear() {
        storage.wipe();
    }
    return {
        getTeam,
        getInvitations,
        clear,
    }
})