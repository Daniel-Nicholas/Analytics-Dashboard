class userTr extends HTMLTableRowElement {
  // Elements
  tdFirstName = document.createElement("td");
  tdLastName = document.createElement("td");
  tdEmail = document.createElement("td");
  tdRole = document.createElement("td");
  tdEditFirstName = document.createElement("td");
  tdEditLastName = document.createElement("td");
  tdEditEmail = document.createElement("td");
  tdEditRole = document.createElement("td");
  inputFirstName = document.createElement("input");
  inputLastName = document.createElement("input");
  inputEmail = document.createElement("input");
  inputRole = document.createElement("input");
  viewComponentsCreated = false;
  editComponentsCreated = false;
  btnSave;
  btnCancel;
  btnDelete;
  constructor() {
    super();
  }

  connectedCallback() {
    this.viewMode();
  }

  viewMode() {
    this.style.height = "";
    if (!this.viewComponentsCreated) {
      this.createViewComponents();
    } else {
      this.showViewComponents();
    }
  }

  editMode(instance) {
    this.style.height = "100px";

    this.hideViewComponents(instance);
    if (!this.editComponentsCreated) {
      this.createEditComponents();
    } else {
      this.showEditComponents();
    }
    this.inputFirstName.focus();
  }

  createViewComponents() {
    this.btnDelete = this.createBtn(() => {
      this.deleteUser();
    }, "");

    this.btnDelete.className = "neo-btn neo-btn-primary--warning neo-icon-trash";
    this.btnDelete.style.marginRight = "30px";
    this.btnDelete.style.marginBottom = "3px";
    this.addViewTd(this.tdFirstName, this.user.firstName);
    this.addViewTd(this.tdLastName, this.user.lastName);
    this.addViewTd(this.tdEmail, this.user.email);
    this.addViewTd(this.tdRole, this.user.role, [this.btnDelete]);
    this.viewComponentsCreated = true;
  }

  showViewComponents() {
    this.showComponents([
      this.tdFirstName,
      this.tdLastName,
      this.tdEmail,
      this.tdRole
    ]);
  }

  hideViewComponents(instance) {
    this.hideComponents([
      instance.tdFirstName,
      instance.tdLastName,
      instance.tdEmail,
      instance.tdRole
    ]);
  }

  showEditComponents() {
    this.showComponents([
      this.tdEditFirstName,
      this.tdEditLastName,
      this.tdEditEmail,
      this.tdEditRole
    ]);
  }

  hideEditComponents() {
    this.hideComponents([
      this.tdEditFirstName,
      this.tdEditLastName,
      this.tdEditEmail,
      this.tdEditRole
    ]);
  }

  createEditComponents() {
    // First Name
    this.addEditTd(
      this.tdEditFirstName,
      this.inputFirstName,
      this.user.firstName
    );

    // Last Name - With Cancel Button
    this.btnCancel = this.createBtn(() => {
      this.hideEditComponents();
      this.viewMode();
    }, "Cancel");
    this.btnCancel.style.cssFloat = "right";
    this.btnCancel.className = "neo-btn neo-btn--secondary";
    this.btnCancel.style.marginTop = "20px";
    this.addEditTd(
      this.tdEditLastName,
      this.inputLastName,
      this.user.lastName,
      [this.btnCancel]
    );

    // Email - With Save Button
    this.btnSave = this.createBtn(() => {
      this.updateUser(this);
    }, "Save");
    this.btnSave.className = "neo-btn neo-btn--primary";
    this.btnSave.style.marginTop = "20px";
    this.addEditTd(this.tdEditEmail, this.inputEmail, this.user.email, [
      this.btnSave
    ]);

    // Role
    this.addEditTd(this.tdEditRole, this.inputRole, this.user.role);

    this.editComponentsCreated = true;
  }

  hideComponents(components) {
    components.forEach(comp => {
      comp.style.display = "none";
    });
  }

  showComponents(components) {
    components.forEach(comp => {
      comp.style.display = "";
    });
  }

  addEditEventListener(el) {
    el.addEventListener("click", () => {
      this.editMode(this);
    });
  }

  addViewTd(el, data, nestedElements = []) {
    const span = document.createElement("span");
    span.innerHTML = data;
    if (nestedElements.length === 0) {
      this.addEditEventListener(el);
    } else {
      this.addEditEventListener(span);
    }

    el.appendChild(span);
    nestedElements.forEach(element => {
      element.style.cssFloat = "right";
      el.appendChild(element);
    });
    el.style.verticalAlign = "middle";
    this.appendChild(el);
  }

  addEditTd(td, el, data, nestedElements = []) {
    td.style.paddingTop = "40px";
    el.placeholder = data;
    el.style.width = "100%";
    td.appendChild(el);
    nestedElements.forEach(element => {
      td.appendChild(element);
    });
    this.appendChild(td);
  }

  createBtn(callback, text) {
    const btn = document.createElement("button");
    btn.addEventListener("click", () => {
      callback();
    });
    btn.innerText = text;
    return btn;
  }

  updateUser(instance) {
    const user = {
      index: instance.user.index,
      firstName:
        instance.inputFirstName.value !== ""
          ? instance.inputFirstName.value
          : instance.user.firstName,
      lastName:
        instance.inputLastName.value !== ""
          ? instance.inputLastName.value
          : instance.user.lastName,
      email:
        instance.inputEmail.value !== ""
          ? instance.inputEmail.value
          : instance.user.email,
      role:
        instance.inputRole.value !== ""
          ? instance.inputRole.value
          : instance.user.role
    };

    this.dispatchEvent(
      new CustomEvent("updateUser", { detail: user, bubbles: true })
    );
    this.hideEditComponents();
    this.viewMode();
  }

  deleteUser() {
    this.dispatchEvent(
      new CustomEvent("deleteUser", { detail: this.user, bubbles: true })
    );
  }
}

customElements.define("user-tr", userTr, { extends: "tr" });
