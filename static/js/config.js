define(function() {
    const Roles = Object.freeze({
        Owner: "owner",
        Admin: "admin",
        Teammate: "teammate",
        Agent: "agent",
        Collaborator: "collaborator",

    });
    const MemberStatuses = Object.freeze({
        Active: 'active',
        Suspended: 'suspended',

    });
    const InvitationStatuses = Object.freeze({
        Sent: 'sent',
        Expired: 'expired',
        NotEnoughSeats: "not enough seats"
    });
    const teamCount = 10;
    return {
        Roles,
        MemberStatuses,
        InvitationStatuses,
        teamCount,
    }
})