define(['./config','./api','jquery', 'select2', 'emailsInput'], function(config,api, $, select2, emailsInput) {
   function renderRoles(){
      let roleSelect = $('#invite-role');
      roleSelect.empty();

      Object.keys(config.Roles).forEach(function(key){
         const value = config.Roles[key];

         const option = `
         <option value="${value}">${value}</option>
         `;
         roleSelect.append(option);
      });

      roleSelect.select2({
         placeholder: "Select role",
         minimumResultsForSearch: -1,
         dropdownAutoWidth: true,
         dropdownCssClass: 'form-select-dropdown',
         width: '150px',
         dropdownParent: '.invite-form'
      });
   }

   function renderEmails() {
      const input = emailsInput($('#invite-emails')[0], {
         placeholder: 'Add emails for invite...',
         morePlaceholder: 'Add more emails for invite...'
      });
      console.log('input');
   }

   function init() {
      renderRoles();
      renderEmails();
   }

   return {
      init
   }
});