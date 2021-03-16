import { css } from 'lit-element';

/**
 * @cssproperty --text-color
 * @cssproperty --font-family
 * @cssproperty --font-size-s
 * @cssproperty --font-size-m
 */

export const wcNameStyles = css`
	:host {
    --text-color: #464545;
    --font-family: 'Poppins';
		--font-size-s: 14px;
		--font-size-m: 28px;
		display: block;
		margin: 0;
		width: 100%;
		font-family: var(--font-family);
	}

	:host([master-id]) {
		max-width: 385px;
	}

	:host([master]) {
		max-width: 375px;
		margin-left: 15px
	}

	/* AUTORUN CAROUSEL MOBILE */
	.media-carousel__content {
		display: flex;
		justify-content: center;
		text-align: center;
	}

	.media-carousel__container {
		width: 298px;
		align-items: center;
		display: flex;
		justify-content: space-between;
		overflow-x: hidden;
		overflow-y: hidden;
	}

	.media-carousel__wrapper {
		height: 100%;
		position: relative;
		transition: left ease 0.8s;
	}

  .media-carousel__wrapper--master-id {
    height: 100%;
		position: relative;
  }

	.media-carousel__list {
		overflow-x: hidden;
		overflow-y: hidden;
		list-style: none;
	}

	.media-carousel__list--autorun {
		display: grid;
		grid-template-rows: repeat(2, 1fr);
		grid-auto-columns: auto auto;
		grid-auto-flow: column;
		grid-gap: 50px;
		min-width: 298px;
		margin: 0px;
		padding: 0px 0px;
	}

	.media-carousel__list-item {
	  width: 124px; 
    height: 45px;  
	}

	.media-carousel__button {
		background-color: transparent;
		border: none;
		display: flex;
	}

	.media-carousel__arrow {
		width: 20px;
	}

	.media-carousel__button[disabled] .media-carousel__arrow {
		opacity: 0.2;
	}

	.media-carousel__button:focus {
		outline: 0;
	}

	.hidden {
		display: none;
	}

	img {
		width: 124px;
		height: 45px;
	}

	/* MANUAL MOBILE CAROUSEL */
	.media-carousel__content {
		align-items: center;
	}

	:host([master-id]) .media-carousel__container {
		width: 100%;
	}

	.media-carousel__list--manual.media-carousel__list--master {
		display: flex;
		flex-direction: row;
		font-weight: 800;
		font-size: var(--font-size-m);
		line-height: 31px;
		margin-right: 15px;
		color: var(--text-color);
		padding: 0;
		margin: 0;
	}

	.media-carousel__list--manual.media-carousel__list--master
		.media-carousel__list-item {
		margin-right: 15px;
		width: auto; 
		height: auto;
	}

	.media-carousel__list--manual.media-carousel__list--master
		.media-carousel__list-item p{
		margin: 0;
	}

  .media-carousel__list-item--master {
    width: 85px;
  }

	.media-carousel__list--manual.media-carousel__list--master-id {
		padding: 0;
    width: 100%;
    display: flex;
    grid-template-rows: 1fr;
    grid-auto-columns: auto auto auto;
    grid-auto-flow: column;
    gap: 50px;
		margin: 0;
	}

  .media-carousel__list--master-id .media-carousel__list-item{
    width: 100%;
    padding: 31px 15px 0 15px;
		padding: 0;
		height: 200px;
  }

	.media-carousel__list-item--1{
		opacity: 0.3;
	}

	.media-carousel__list-item--2{
		opacity: 0.15;
	}

	.media-carousel__list--master-id .media-carousel__list-item p {
		font-size: var(--font-size-s);
    line-height: 24px;
    color: var(--text-color);
    margin-top: 31px;
    margin: 0;
		text-align: initial;
    margin-left: 15px;
	}

	.media-carousel__list--manual.media-carousel__list--master-id.media-carousel__list .media-carousel__list-item p {
		margin-top: 31px;
	}

	.media-carousel__arrow--right {
		padding-left: 5px;
	}

	@media all and (min-width: 768px) {
		.media-carousel__list {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.media-carousel__list-item {
			width: 200px;
		}

		.media-carousel__container {
			width: 100%;
		}
	}

	@media all and (min-width: 768px) {

		.media-carousel__list-item img{
			width: 200px;
	}

	:host([autorun]) .media-carousel__content {
		width: 950px;
	}

	:host([autorun]) {
		display: flex;
    justify-content: center;
	}

`;
