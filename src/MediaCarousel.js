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
		};
	}

	constructor() {
    super();
    this.media = [];
    this.mediaId = '';
    this.left = 0;
    this.autorun = true;
    this.time = 5000;
    this.visibleArrows =  false;
	}
  
  connectedCallback() {
    super.connectedCallback();
    this.media = [...this.querySelectorAll('LI > *')];
    console.log(this.media)
  }

  firstUpdated() {
    this.media.map(element => {
      element.style.backgroundColor = this.generateColor();
    })
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
    if (this.left + this.container.offsetWidth <= this.carousel.offsetWidth) {
      this.disabledBack = false;
      this.left += this.maxSlides;
    }
    if (this.left + this.container.offsetWidth >= this.carousel.offsetWidth - this.container.offsetWidth) { 
      this.media = this.media.concat(this.media);
    }
  }

  generateColor(){
    var symbol, color;
    symbol = "0123456789ABCDEF";
    color = "#";
  
    for(var i = 0; i < 6; i++){
      color = color + symbol[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    return html`
    <div class="media-carousel__container">
      <div class="media-carousel__wrapper" style="left:-${this.left}px">
        <ul class="media-carousel__list">
          ${this.media.map(element => html`
            <li class="media-carousel__list-item">${element}</li>
          `)}
        </ul>
    </div>
  </div>
    `;
  }
}

// window.customElements.define('media-carousel', MediaCarousel)
