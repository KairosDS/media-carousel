/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { expect, fixture, html, oneEvent } from '@open-wc/testing';

import sinon from 'sinon';
import { stub, spy } from 'sinon';
import "../media-carousel";


const el = await fixture(html` 
      <media-carousel>
      <ul>
        <li><img alt="logo client" src="../assets/logo-clients/azteca.svg"/></li>
        <li><img alt="logo client" src="../assets/logo-clients/bankia.svg"/></li>
        <li><img alt="logo client" src="../assets/logo-clients/bankinter.svg"/></li>
        <li><img alt="logo client" src="../assets/logo-clients/bbva.svg"/></li>
        <li><img alt="logo client" src="../assets/logo-clients/belcorp.svg"/></li>
      </ul>
      </media-carousel> `);

const elMasterId = await fixture(html`
  <media-carousel master-id="manualMobile">
          <ul>
            <li>
              <p class="element1">
                1En septiembre había una ilusión, no existía ni un modelo de
                negocio validado, ni una propuesta de valor orientada hacia una
                boutique de Agilidad Empresarial y Producto Digital. Aún así,
                empezamos a trabajar en esa ilusión para convertirlo en idea,
                con la incorporación de los primeros equipos a finales de ese
                año. Esa idea pasó a ser valor.
              </p>
            </li>
          </ul>
        </media-carousel>
`);

describe("MediaCarousel", () => {
  
  it("should have the basic template", async () => {
   
    const base = el.shadowRoot.querySelector(".media-carousel__content");
    expect(base).not.to.be.null;
  });

  it('Go next item: Called goNext method', async () => {
  
    const spy = sinon.spy(el, 'goNext');
    const button = el.shadowRoot.querySelector('.media-carousel__button--rigth');
    button.click();
    expect(spy.called).to.be.false;
  });

  it('Go next item: Called goPrev method', async () => {
 
    const spy = sinon.spy(el, 'goPrev');
    const button = el.shadowRoot.querySelector('.media-carousel__button--left');
    button.click();
    expect(spy.called).to.be.false;
  });



  // it('should call handleFieldChange with "input-data-sent" event', async () => {
  //   const handleFieldChangeStub = stub(elMasterId, 'goToNextElement');
  //   setTimeout(() => elMasterId.dispatchEvent(new CustomEvent('nextitemforlinked', { detail: 'done' })));
  //   await oneEvent(elMasterId, 'nextitemforlinked');

  //   expect(handleFieldChangeStub).not.to.be.null;
  // });

});

