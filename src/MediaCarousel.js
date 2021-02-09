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
		return [wcNameStyles];
	}

	static get properties() {
		return {
			/**
       * Select options
       * @property
       * @type {Array}
       */
      media: {
        type: Array,
      },

      /**
       * Id media
       * @property
       * @type {String}
       */
      mediaId: {
        type: String,
        attribute: 'media-id',
      },

      /**
       * Position to move carousel
       * @property
       * @type {Number}
       */
      left: {
        type: Number,
      },

      /**
       * Number max of slides
       * @property
       * @type {Number}
       */
      maxSlides: {
        type: Number,
      },

      /**
       * Automatic carousel
       * @property
       * @type {Boolean}
       */
      autorun: {
        type: Boolean,
        attribute: 'autorun',
      },

      /**
       * Time in which the slides move
       * @property
       * @type {Number}
       */
      time: {
        type: Number,
      },

      /**
       * Arrows to move carousel
       * @property
       * @type {Boolean}
       */
      visibleArrows: {
        type: Boolean,
      },

      /**
       * Icon arrow left
       * @property
       * @type {String}
       */
      iconLeft: {
        type: String,
      },

      /**
       * Icon arrow right
       * @property
       * @type {String}
       */
      iconRight: {
        type: String,
      },

        /**
       * The next arrow button is disabled when there are no next elements
       * @property
       * @type { Boolean }
       */
      disabledNext: {
        type: Boolean,
      },

      /**
       * The previous arrow button is disabled when there are no previous elements
       * @property
       * @type { Boolean }
       */
      disabledPrevious: {
        type: Boolean,
      },
		};
	}

	constructor() {
    super();
    this.media = [];
    this.mediaId = '';
    this.left = 0;
    this.autorun = false;
    this.time = 2000;
    this.visibleArrows =  false;
    this.iconLeft = '../assets/left_arrow.svg';
    this.iconRight = '../assets/right_arrow.svg'
    this.disabledNext = false;
    this.disabledPrevious = true;
	}
  
  connectedCallback() {
    super.connectedCallback();
    this.media = [...this.querySelectorAll('LI > *')];
  }

  firstUpdated() {
    this.container = this.shadowRoot.querySelector('.media-carousel__container');
    this.carousel = this.shadowRoot.querySelector('.media-carousel__list');
    //this.carouselMobile = this.shadowRoot.querySelector('.carousel__list-container')

    if (this.autorun) {
      if(window.innerWidth < 768){
        this._intervalId = setInterval(this.goNextMobile.bind(this), this.time);
      }else{
        this._intervalId = setInterval(this.goNext.bind(this), this.time);
      }
    }
  }

  goNext() {
    this.itemsWidth = this.shadowRoot.querySelector('.media-carousel__list-item').offsetWidth;
    this.maxSlides = (this.container.offsetWidth / this.itemsWidth) * this.itemsWidth;
    if(this.disabledPrevious){
      this.disabledPrevious = false;
    }
    if(this.left + this.container.offsetWidth >= this.carousel.offsetWidth - this.container.offsetWidth){
      this.disabledNext = true;
        }
      if (this.left + this.container.offsetWidth <= this.carousel.offsetWidth) {
        //this.disabledBack = false;
        this.left += this.maxSlides;
      }
      if (this.left + this.container.offsetWidth >= this.carousel.offsetWidth - this.container.offsetWidth) { 
        if(this.autorun) {
          this.media = this.media.concat(this.media);
        }
    }
  }

  goPrev() {
    this.itemsWidth = this.shadowRoot.querySelector('.media-carousel__list-item').offsetWidth;
    this.maxSlides = (this.container.offsetWidth / this.itemsWidth) * this.itemsWidth;
    if(this.disabledNext){
      this.disabledNext = false
    }
    if(this.container.offsetWidth - this.left == 0) {
      this.disabledPrevious = true;

    }
    if (this.container.offsetWidth - this.left <= 0) {
      this.left -= this.maxSlides;
    }
  
  }

  render() {
    return html`
    <div class="media-carousel__content">
      ${!this.autorun ? html `
      <button 
        .disabled="${this.disabledPrevious}"
        class="media-carousel__button" 
        type="button"
        @click="${this.goPrev}"
        aria-label="Go to previous element">
        <img class="media-carousel__arrow media-carousel__arrow--left" src="${this.iconLeft}"/>
      </button>
      ` : ''}
      <div class="media-carousel__container">
        <div class="media-carousel__wrapper" style="left:-${this.left}px">
          <ul class="media-carousel__list">
            ${this.media.map(element => html`
              <li class="media-carousel__list-item">${element.innerHTML}</li>
            `)}
          </ul>
        </div>
      </div>
      ${!this.autorun ? html `
      <button 
        .disabled="${this.disabledNext}"
        class="media-carousel__button" 
        @click="${this.goNext}"
        type="button"
        aria-label="Go to next element">
        <img class="media-carousel__arrow media-carousel__arrow--right" src="${this.iconRight}"/>
      </button>
      ` : ''}
    </div>
    `;
  }
}

// window.customElements.define('media-carousel', MediaCarousel)
