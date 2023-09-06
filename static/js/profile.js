define(['./api', 'jquery'], function(api, jquery) {
    function init() {
        const me = api.getMe();
        const fullName = `${me.firstName} ${me.lastName}`;

        const profileElement = $('#user-profile');
        const profile = `
        <div class="profile-image">
            <img src="${me.image}" alt="${fullName}">
        </div>
        <a href="#" class="profile-name">${fullName}</a>
        `;
        profileElement.html(profile);
    }
    return {
        init
    }
});