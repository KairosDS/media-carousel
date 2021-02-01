import { html, LitElement } from 'lit-element';
import { wcNameStyles } from './media-carousel-style';

/**
 * `media-carousel`
 * MediaCarousel
 *
 * @customElement media-carousel
 * @litElement
 * @demo demo/index.html
 */

export class MediaCarousel extends LitElement {
  static get is() {
    return 'media-carousel';
  }

  static get styles() {
    return [ wcNameStyles ];
  }

  static get properties() {
    return {
      
    };
  }

  constructor() {
    super();
    
  }

  connectedCallback() {
    super.connectedCallback();
   
  }

  render() {
      return html`
        <div>
        </div>
      `;
   
  }
}