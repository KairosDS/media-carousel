import { css } from 'lit-element';

export const wcNameStyles = css`
  :host {
    display: block;
    margin: 0;
    width: 100%;
  }

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

  .media-carousel__list {
    overflow-x: hidden;
    overflow-y: hidden;
    list-style: none;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-auto-columns: auto auto;
    grid-auto-flow: column;
    /* grid-row-gap: 50px; */
    grid-gap: 50px;
    min-width: 298px;
    margin: 0px;
    padding: 0px 0px;
  } 


  li{
    width: 124px;
    height: 45px;
   /* border: 3px solid #b8f2e6;*/
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

  .media-carousel__button:hover .media-carousel__arrow {
    filter: invert(60%) sepia(80%) saturate(3787%) hue-rotate(359deg) brightness(101%) contrast(107%);
  }

  .media-carousel__button:focus {
    outline:0;
  }

  .hidden {
    visibility: hidden;
  }

  img {
        width: 124px;
        height: 45px;
      }





  @media all and (min-width: 768px) {
    .media-carousel__list {
   display: flex;
   justify-content: space-between;
   align-items: center;
  }
  }
  @media all and (min-width: 1280px) {
   
  }
`;
