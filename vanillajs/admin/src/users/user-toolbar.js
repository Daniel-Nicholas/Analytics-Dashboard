class Toolbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const div = document.createElement('div');
    div.innerHTML = getTemplate();
    this.appendChild(div);
    const btnAddUser = this.querySelector('#btnAddUser');
    const btnManageUsers = this.querySelector('#btnManageUsers');
    btnAddUser.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('ShowAddUser', { bubbles: true }));
    });

    btnManageUsers.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('ShowUserDetails', { bubbles: true }));
    });
  }
}

// Define Web Component
customElements.define('user-toolbar', Toolbar);
// Returns html to use in component
function getTemplate() {
  return `
    <div class='as-user-toolbar'>
      <button class='neo-btn neo-btn--primary neo-icon-add' id='btnAddUser'>Add User</button>
      <button class='neo-btn neo-btn--primary neo-icon-add' id='btnManageUsers'>Manage Users</button>
    </div>`;
}
