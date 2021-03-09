import { html, LitElement } from 'lit-element';
import { wcNameStyles } from './media-carousel-style';

const GAP_ITEMS = 50;
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

			/**
			 * Carousel that orchestrates another carousel through an id
			 * @property
			 * @type { Boolean }
			 */
			master: {
				type: Boolean,
			},

			/**
			 * Id that is passed to the carousel that orchestrates to synchronize several carousels
			 * @property
			 * @type { String }
			 */
			masterId: {
				type: String,
				attribute: 'master-id',
			},

			/**
			 * Show arrows
			 * @property
			 * @type { Boolean }
			 */
			showArrows: {
				type: Boolean,
      },
      
      /**
			 * Index of array
			 * @property
			 * @type { number }
			 */
			index: {
				type: Number,
			},
		};
	}

	constructor() {
		super();
		this.media = [];
    this.items = [];
		this.mediaId = '';
		this.left = 0;
		this.autorun = false;
		this.time = 4000;
		this.iconLeft = '../assets/left_arrow.svg';
		this.iconRight = '../assets/right_arrow.svg';
		this.disabledNext = false;
		this.disabledPrevious = true;
		this.master = false;
		this.masterId = '';
		this.index = 0;
		this.maxIndex = 3;
		this.showArrows = true;
	}

	connectedCallback() {
		super.connectedCallback();
		this.media = [...this.querySelectorAll('LI > *')];
		this.media.map((element) => {
			let item = {};
			item.label = element.tagName;
			item.source = element.getAttribute('src');
			item.link = element.getAttribute('href');
			item.alt = element.getAttribute('alt');
			item.textContent = element.innerHTML != '' ? element.innerHTML : element;
			this.items.push(item);
    });
		if (this.masterId !== '') {
			document.addEventListener(
				'nextitemforlinked',
				this.goToNextElement.bind(this)
			);
			document.addEventListener(
				'previtemforlinked',
				this.goToPrevElement.bind(this)
			);
		}
	}

	firstUpdated() {
		this.container = this.shadowRoot.querySelector(
			'.media-carousel__container'
		);
		this.carousel = this.shadowRoot.querySelector('.media-carousel__list');
		if (this.autorun) {
			this._intervalId = setInterval(this.goNext.bind(this), this.time);
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		document.removeEventListener(
			'nextitemforlinked',
			this.goToNextElement.bind(this)
		);
		document.removeEventListener(
			'previtemforlinked',
			this.goToPrevElement.bind(this)
		);
  }
  
	goNext(ev) {
		if (!this.autorun) {
			if (this.master) {
        let nextEvent = new CustomEvent('nextitemforlinked', {
					detail: {
						masterid: this.id,
					},
				});
				document.dispatchEvent(nextEvent);
			}
		}
    
		this.itemsWidth = this.shadowRoot.querySelector('.media-carousel__list-item').offsetWidth;
    this.maxSlides = (this.container.offsetWidth / this.itemsWidth) * this.itemsWidth;
    
    if (this.disabledPrevious) {
			this.disabledPrevious = false;
		}
		if (this.left + this.container.offsetWidth >= this.carousel.offsetWidth - this.container.offsetWidth) {
			if(!this.master){
        this.disabledNext = true;
      }
      if (this.autorun) {
				this.items = this.items.concat(this.items);
			}
		}
		if (this.left + this.container.offsetWidth <= this.carousel.offsetWidth) {
			this.left += this.container.offsetWidth + GAP_ITEMS;
		}
		if (this.master || this.masterId != '') {
      if(this.index < this.items.length-1){
      this.index++;
      }
      this.left = 0;
    }
	}

	goPrev() {
		if (!this.autorun) {
			if (this.master) {
				let prevEvent = new CustomEvent('previtemforlinked', {
					detail: {
						masterid: this.id,
					},
				});
				document.dispatchEvent(prevEvent);
			}
    }
    
    this.itemsWidth = this.shadowRoot.querySelector(
			'.media-carousel__list-item'
    ).offsetWidth;
    this.maxSlides =
			(this.container.offsetWidth / this.itemsWidth) * this.itemsWidth;
    
    if (this.disabledNext) {
			this.disabledNext = false;
		}
		if (this.container.offsetWidth - this.left == 0) {
        this.disabledPrevious = true;
    }
		if (this.container.offsetWidth - this.left <= 0) {
			this.left -= this.maxSlides;
		}
		if (this.master || this.masterId != '') {
			if (this.index > 0) {
        this.index--;
      }
      this.left = 0;
    }
  }
  
	goToNextElement(ev) {
		let masterId = ev.detail.masterid;
		if (masterId === this.masterId) {
			this.shadowRoot.querySelector('.media-carousel__arrow--right').click();
    }
  }

	goToPrevElement(ev) {
		let masterId = ev.detail.masterid;
		if (masterId === this.masterId) {
			this.shadowRoot.querySelector('.media-carousel__arrow--left').click();
		}
  }
  
	render() {
		return html`
      <div class="media-carousel__content">
     		<div class="media-carousel__container">
					<div class="media-carousel__wrapper${!this.master && !this.autorun ? '--master-id' : '' }" style="left:-${this.left}px">
						<ul
							class="${this.autorun
								? 'media-carousel__list--autorun'
								: 'media-carousel__list--manual'} 
              ${this.master
								? 'media-carousel__list--master'
                : this.masterId != '' ? 'media-carousel__list--master-id' : ''
              }
            media-carousel__list"
            >
            ${this.master || this.masterId != '' ? html `
            ${this.items.slice(this.index, this.master ? this.index + this.maxIndex : this.index + 1)
            .map(
										(element, i) => html`
											<li class="media-carousel__list-item" id="${i++}">
												${element.label == 'IMG'
                          ? html` 
                            <img
															src="${element.source}"
															href="${element.link}"
															alt="${element.alt}"
													/>`
													: html` <p>${element.textContent}</p>`}
											</li>
										`
								)}`
            : html `
            ${this.items
            .map(
										(element, i) => html`
											<li class="media-carousel__list-item" id="${i++}">
												${element.label == 'IMG'
                          ? html` 
                            <img
															src="${element.source}"
															href="${element.link}"
															alt="${element.alt}"
													/>`
													: html` <p>${element.textContent}</p>`}
											</li>
										`
								)}` }
						</ul>
					</div>
				</div>
				${!this.autorun
					? html`
							<!-- The div tag has been used instead of the button tag so that when someone uses a screen reader it takes the elements as a list to make it more accessible -->
							<div
								?disabled="${this.disabledPrevious}"
								class="media-carousel__button${this.master && !this.autorun
									? ''
									: ' hidden'}"
								type="button"
								@click="${this.goPrev}"
								aria-label="Go to previous element"
							>
								<img
									class="media-carousel__arrow media-carousel__arrow--left"
									src="${this.iconLeft}"
									alt="arrow left"
								/>
							</div>
					`
				: ''}
				${!this.autorun
					? html`
							<!-- The div tag has been used instead of the button tag so that when someone uses a screen reader it takes the elements as a list to make it more accessible -->
							<div
								?disabled="${this.disabledNext}"
								class="media-carousel__button ${this.master && !this.autorun
									? ''
									: 'hidden'}"
								@click="${this.goNext}"
								type="button"
								aria-label="Go to next element"
							>
								<img
									class="media-carousel__arrow media-carousel__arrow--right"
									src="${this.iconRight}"
									alt="arrow right"
								/>
							</div>
				`
					: ''}
			</div>
		`;
  }
}
