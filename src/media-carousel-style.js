import { css } from 'lit-element';

export const wcNameStyles = css`
  :host {
    display: block;
    width: 90vw;
  }

  .media-carousel__content {
    display: flex;
  }

  .media-carousel__container {
    width: calc(1200px);
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

  .media-carousel__list {
    align-items: center;
    display: flex;
    justify-content: space-between;
    overflow-x: hidden;
    overflow-y: hidden;
    list-style: none;
  }

  li{
    width: 300px;
    height: 100px;
    border: 3px solid #b8f2e6;
  }

  .media-carousel__button {
    background-color: transparent;
    border: none;
  }

  .media-carousel__arrow {
    width: 20px;
  }

  .media-carousel__button:disabled .media-carousel__arrow {
    opacity: 0.4;
  }

  .media-carousel__button:hover .media-carousel__arrow {
    filter: invert(0.36) sepia(1) saturate(20) hue-rotate(327.6deg) brightness(0.99);
  }

  .media-carousel__button:focus {
   outline:0;
  }





  @media all and (min-width: 1024px) {
   
  }
  @media all and (min-width: 1280px) {
   
  }
`;
