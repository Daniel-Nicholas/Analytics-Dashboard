class Dashboard extends HTMLElement {
  addUser = null;
  userDetails = null;
  constructor() {
    super();
  }

  connectedCallback() {
    const div = document.createElement('div');
    div.style.height = '100%';
    div.innerHTML = getTemplate();
    this.appendChild(div);
    this.addUser = this.querySelector('#addUser');
    this.addUser.style.display = 'none';
    this.userDetails = this.querySelector('#userDetails');

    this.addEventListener('ShowAddUser', e => {
      this.showAddUser();
    });

    this.addEventListener('ShowUserDetails', e => {
      this.showUserDetails();
    });
  }

  showAddUser() {
    this.userDetails.style.display = 'none';
    this.addUser.style.display = '';
  }

  showUserDetails() {
    this.addUser.style.display = 'none';
    this.userDetails.style.display = '';
  }
}

// Define Web Component
customElements.define('user-dashboard', Dashboard);
// Returns html to use in component
function getTemplate() {
  return `
    <div class='neo-widget__content'>
    <div class='neo-widget__header'>
    <div class='neo-widget__header-left'>
    <span class="neo-icon-customer"></span>
      <h4>User Management</h4>
    </div>
  </div>
  <div class="neo-widget__body">
     <user-toolbar></user-toolbar>
     <user-details id='userDetails'></user-details>
     <add-user id='addUser'></add-user>
    </div>
    </div>`;
}
