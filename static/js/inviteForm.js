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
      $('#invite-emails').empty();
      const input = emailsInput($('#invite-emails')[0], {
         placeholder: 'Add emails for invite...',
         morePlaceholder: 'Add more emails for invite...'
      });
      const listOfRandomEmails = [
         'medhat@miro.com',
         'maha@miro.com',
         'karma@miro.com',
         'adam@miro.com',
         'john@miro.com',
         'mike@miro.com',
         'dirk@miro.com',
         'thomas@miro.com',
         'irina@miro.com',
         'andrew@miro.com',
         'mo@miro.com',
      ]
      listOfRandomEmails.forEach(function(email){
         input.addEmail(email);
      })
   }

   function init() {
      renderRoles();
      renderEmails();
   }

   return {
      init
   }
});