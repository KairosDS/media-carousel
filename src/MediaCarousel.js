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

      /**
			 * Max index of array
			 * @property
			 * @type { number }
			 */
			maxIndexOfArray: {
				type: Number,
      }
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
		this.maxIndexOfArray = 0;
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
			document.addEventListener('nextitemforlinked',this._goToNextElement.bind(this));
			document.addEventListener('previtemforlinked',this._goToPrevElement.bind(this));
		}
	}

	firstUpdated() {
		this.container = this.shadowRoot.querySelector('.media-carousel__container');
		this.carousel = this.shadowRoot.querySelector('.media-carousel__list');
		
		if (this.autorun) {
			this._intervalId = setInterval(this._goNext.bind(this), this.time);
    }

    if(this.master) {
      var mediaCarousels = document.getElementsByTagName("media-carousel");
      var mySlave = null;
      var myId = this.id;
      for( let element of mediaCarousels){
        if (element.getAttribute('master-id') == myId) {
          mySlave = element;
        }
      }
      if (mySlave != null) {
        this.maxIndexOfArray = mySlave.querySelectorAll('li').length - 1;
			} else {
				this.maxIndexOfArray = this.items.length - 1;
			}
    }
    else if (this.masterId != '') {
      this.maxIndexOfArray = this.items.length - 1;
    }
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		document.removeEventListener('nextitemforlinked',this._goToNextElement.bind(this));
		document.removeEventListener('previtemforlinked',this._goToPrevElement.bind(this));
	}

	/**
   * Event for move to next item
   *
   * @method
   * @name _handleNextEvent
   */
	_handleNextEvent(){
		let nextEvent = new CustomEvent('nextitemforlinked', {
			detail: {
				masterid: this.id,
			},
		});
		document.dispatchEvent(nextEvent);
	}
	
	/**
   * Go to next item of carousel
   *
   * @method
   * @name _goNext
   */
	_goNext() {
		this.itemsWidth = this._getItemsWidth();
		this.maxSlides = this._getMaxSlides();

		if (this.master) {
		this._handleNextEvent();
		}
		
		if (this.master || this.masterId != '') {
      if(this._isIndexMinorOfMaxIndex()){
      this.index++;
      }
			
			this.disabledNext = this._isIndexEqualMaxIndex();
			
			if (this.disabledPrevious) {
				this.disabledPrevious = false;
			}
		}

		if (this.autorun) {
			if (this._isEndOfArray()){
				this.items = this.items.concat(this.items);
			}
			if (this._isLeftMinorOfCarousel) {
				this.left += this.container.offsetWidth + GAP_ITEMS;
			}
		}
	}

	/**
   * Checked if index is equal of maxIndex
   *
   * @method
   * @name _isIndexEqualMaxIndex
	 * @returns {Boolean}
   */
	_isIndexEqualMaxIndex(){
		return this.index == this.items.length-1 || this.maxIndexOfArray == this.index;
	}

		/**
   * Checked if index is minor of maxIndex
   *
   * @method
   * @name _isIndexEqualMaxIndex
	 * @returns {Boolean}
   */
	_isIndexMinorOfMaxIndex(){
		return this.index < this.items.length-1 && this.maxIndexOfArray > this.index;
	}

	/**
   * Checked if is the end of array
   *
   * @method
   * @name _isEndOfArray
	 * @returns {Boolean}
   */
	_isEndOfArray(){
		return this.left + this.container.offsetWidth >= this.carousel.offsetWidth - this.container.offsetWidth;
	}

	/**
   * Checked if is left is minor of carousel
   *
   * @method
   * @name _isLeftMinorOfCarousel
	 * @returns {Boolean}
   */
	_isLeftMinorOfCarousel(){
		return this.left + this.container.offsetWidth <= this.carousel.offsetWidth;
	}

	/**
   * Event for move to previous item
   *
   * @method
   * @name _handlePrevEvent
   */
	_handlePrevEvent() {
		let prevEvent = new CustomEvent('previtemforlinked', {
			detail: {
				masterid: this.id,
			},
		});
		document.dispatchEvent(prevEvent);
	}

	/**
   * Go to prev item of carousel (only enter here if is master or slave carousel)
   *
   * @method
   * @name _goPrev
   */
	_goPrev() {
		this._handlePrevEvent();
		
    this.itemsWidth = this._getItemsWidth();
    this.maxSlides = this._getMaxSlides();    
    
		if (this._isInitOfCarousel()) { 
        this.disabledPrevious = true;
    }
		if (this._hasSpaceForPrevSlide()) {
			this.left -= this.maxSlides;
		}
			if (this.index > 0) {
        this.index--;
      }
      if(this.index == 0) {
        this.disabledPrevious = true;
			}
			if (this.disabledNext) {
				this.disabledNext = false;
			}
  }
	
	/**
   * Get max slides
   *
   * @method
   * @name _getMaxSlides
	 * @returns {Number}
   */
	_getMaxSlides(){
		return (this.container.offsetWidth / this.itemsWidth) * this.itemsWidth;
	}

	/**
   * Get items width
   *
   * @method
   * @name _getItemsWidth
	 * @returns {Number}
   */
	_getItemsWidth(){
		return this.shadowRoot.querySelector('.media-carousel__list-item').offsetWidth;
	}

	/**
   * Checked is the init of carousel
   *
   * @method
   * @name _isInitOfCarousel
	 * @returns {Boolean}
   */
	_isInitOfCarousel() {
		return this.container.offsetWidth - this.left == 0;
	}

	/**
   * Checked if has space for previous slide
   *
   * @method
   * @name _hasSpaceForPrevSlide
	 * @returns {Boolean}
   */
	_hasSpaceForPrevSlide() {
		return this.container.offsetWidth - this.left <= 0;
	}

	/**
   * Go to next element simulated click in next button in master id carousel
   *
   * @event
   * @name _goToNextElement
   */
	_goToNextElement(ev) {
		let masterId = ev.detail.masterid;
		if (masterId === this.masterId) {
			this.shadowRoot.querySelector('.media-carousel__arrow--right').click();
    }
  }

	/**
   * Go to next element simulated click in previous button in master id carousel
   *
   * @event
   * @name _goToPrevElement
   */
	_goToPrevElement(ev) {
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
											<li class="media-carousel__list-item media-carousel__list-item--${i++}" id="${i++}">
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
								class="media-carousel__button--left media-carousel__button${this.master && !this.autorun
									? ''
									: ' hidden'}"
								type="button"
								@click="${this._goPrev}"
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
								class="media-carousel__button--rigth media-carousel__button ${this.master && !this.autorun
									? ''
									: 'hidden'}"
								@click="${this._goNext}"
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
