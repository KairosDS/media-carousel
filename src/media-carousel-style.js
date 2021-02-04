import { css } from 'lit-element';

export const wcNameStyles = css`
  :host {
    display: block;
    width: 90vw;
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
  }

  li{
    width: 200px;
    height: 100px;
  }

  @media all and (min-width: 1024px) {
   
  }
  @media all and (min-width: 1280px) {
   
  }
`;
