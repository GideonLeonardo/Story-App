import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDOM';

class FooterApp extends LitWithoutShadowDom {
  render() {
    return html`
      <p class="text-center text-white mb-0">
        Created By: Gideon Leonardo Ginting S 🙌 Submission Proyek Pertama
      </p>
    `;
  }
}

customElements.define('footer-app', FooterApp);
