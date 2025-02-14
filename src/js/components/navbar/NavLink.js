import { html } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDOM';
import Utils from '../../utils/utils';
import Config from '../../config/config';
import CheckUserAuth from '../../pages/auth/check-user-auth';

class NavLink extends LitWithoutShadowDom {
  static properties = {
    content: { type: String, reflect: true },
    to: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('to')) {
      throw new Error(`Atribut "to" harus diterapkan pada elemen ${this.localName}`);
    }
  }

  render() {
    return html`
      <ul class="navbar-nav d-flex align-items-center gap-3">
        <nav-link content="${msg(`Dashboard`)}" to="/"></nav-link>
        <nav-link content="${msg(`Tambah Data`)}" to="/story/add.html"></nav-link>
        <nav-link-auth class="d-none" id="userLoggedMenu"></nav-link-auth>
        <nav-link content="${msg(`Masuk`)}" to="/auth/login.html" id="loginMenu"></nav-link>
      </ul>
      <ul class="dropdown-menu">
        <a class="dropdown-item" id="userLogOut" @click=${this._userLogOut}> ${msg(`Keluar`)} </a>
      </ul>
    `;
  }

  _userLogOut(event) {
    event.preventDefault();
    Utils.destroyUserToken(Config.USER_TOKEN_KEY);
    CheckUserAuth.checkLoginState();
  }
}

customElements.define('nav-link', NavLink);
