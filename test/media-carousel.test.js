/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { stub } from 'sinon';

import sinon from 'sinon';
import "../media-carousel";


const el = await fixture(html` 
      <media-carousel >
      <ul>
        <li><img alt="logo client" src="../demo/assets/logo-clients/azteca.svg"/></li>
        <li><img alt="logo client" src="../demo/assets/logo-clients/bankia.svg"/></li>
        <li><img alt="logo client" src="../demo/assets/logo-clients/bankinter.svg"/></li>
        <li><img alt="logo client" src="../demo/assets/logo-clients/bbva.svg"/></li>
        <li><img alt="logo client" src="../demo/assets/logo-clients/belcorp.svg"/></li>
      </ul>
      </media-carousel> `);

const elMasterNoSlaves = await fixture(html`
  <media-carousel id="no-slaves" master>
          <ul>
            <li>
              <p class="element1">Content One</p>
            </li>
            <li>
              <p class="element2">Content Two</p>
            </li>
          </ul>
        </media-carousel>
`);

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
            <li>
              <p class="element2">
                2En enero tuvimos nuestro primer cliente, en abril el segundo.
                Empezaron las incorporaciones. Acabamos el año siendo más de 35
                personas y, lo más importante, validamos que nuestra propuesta
                de valor tenía escala.
              </p>
            </li>
          </ul>
        </media-carousel>
`);

const elMaster = await fixture(html`
  <media-carousel id="manualMobile" master>
          <ul>
            <li>
              <p class="element1">2014</p>
            </li>
            <li>
              <p class="element2">2015</p>
            </li>
            <li>
              <p class="element3">2016</p>
            </li>
            <li>
              <p class="element4">2017</p>
            </li>
            <li>
              <p class="element5">2018</p>
            </li>
            <li>
              <p class="element6">2019</p>
            </li>
            <li>
              <p class="element7">2020</p>
            </li>
            <li>
              <p class="element8">2021</p>
            </li>
            <li>
              <p class="element9">2022</p>
            </li>
            <li>
              <p class="element10">2023</p>
            </li>
          </ul>
        </media-carousel>
`);

const elAutorun = await fixture(html`
 <media-carousel autorun master>
          <ul>
          <li>
              <img alt="logo client" src="../demo/assets/logo-clients/azteca.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/bankia.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/bankinter.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/bbva.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/belcorp.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/billionhands.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/cecabank.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/cepsa.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/endesa.svg" />
            </li>
            <li>
              <img alt="logo client" href="hjbjhvg" src="../demo/assets/logo-clients/lefebvre.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/oh.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/orange-bank.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/orange-x.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/pagos-fx.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/pelayo.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/repsol.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/santander.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/securitas.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/spotlight.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/telefonica.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/union-europea.svg" />
            </li>
            <li>
              <img alt="logo client" src="../demo/assets/logo-clients/universia.svg" />
            </li>
          </ul>
        </media-carousel>
`)

describe("MediaCarousel", () => {
  
  it("should have the basic template", async () => {
    const base = el.shadowRoot.querySelector(".media-carousel__content");
    expect(base).not.to.be.null;
  });

  it('should button prev has disabled property', async () => {
    const buttonPrev = elMaster.shadowRoot.querySelector('.media-carousel__button--left');
    
    expect(buttonPrev).has.attribute('disabled');

  });
  it('should button next has not disabled property', async () => {
    const buttonNext = elMaster.shadowRoot.querySelector('.media-carousel__button--rigth');
 
    expect(buttonNext).has.not.attribute('disabled');
  });


  it('Go next item: Called _goNext method when clicked button rigth', async () => {
    const spy = sinon.spy(el, '_goNext');
    el.requestUpdate();
    await el.updateComplete;
    el.shadowRoot.querySelector('.media-carousel__button--rigth').click();
    el.shadowRoot.querySelector('.media-carousel__button--rigth').click();

    expect(spy).to.have.callCount(2);
  });

  it('Go next item: Called _goPrev method when clicked button left', async () => {
    const spy = sinon.spy(el, '_goPrev');
    el.requestUpdate();
    await el.updateComplete;
    el.shadowRoot.querySelector('.media-carousel__button--left').click();
    el.shadowRoot.querySelector('.media-carousel__button--left').click();

    expect(spy).to.have.callCount(2);
  });  

  it('should be call _handlePrevEvent with "previtemforlinked" event', async () => {
    const handleFieldChangeStub = stub(elMaster, '_handlePrevEvent');
    elMaster.shadowRoot.querySelector('.media-carousel__arrow--left').click();

    setTimeout(() => elMasterId.dispatchEvent(new CustomEvent('previtemforlinked', { detail: { masterid : 'manualMobile'}  })));
    await oneEvent(elMasterId, 'previtemforlinked');

    expect(handleFieldChangeStub).to.have.callCount(1);
  });

  it('should be call _handleNextEvent with "nextitemforlinked" event', async () => {
    const handleFieldChangeStub = stub(elMaster, '_handleNextEvent');
    elMaster.shadowRoot.querySelector('.media-carousel__arrow--right').click();

    setTimeout(() => elMasterId.dispatchEvent(new CustomEvent('nextitemforlinked', { detail : { masterid : 'manualMobile'} })));
    await oneEvent(elMasterId, 'nextitemforlinked');

    expect(handleFieldChangeStub).to.have.callCount(1);
  });

  it('Set max of array when master has not children', async () => {
    const itemsOfMasterNoSlaves = elMasterNoSlaves.shadowRoot.querySelectorAll('li').length;
    
    expect(itemsOfMasterNoSlaves).to.equal(2);
  });
  
  it('Go last item: Called _goNext method when clicked button rigth', async () => {
    const spy = sinon.spy(elMaster, '_goNext');
    elMaster.requestUpdate();
    await elMaster.updateComplete;
    const numberOfItems = elMaster.querySelectorAll('li').length;

    for(let i =0;i <= numberOfItems - 1;i++){
      elMaster.shadowRoot.querySelector('.media-carousel__button--rigth').click();
    }
    expect(spy).to.have.callCount(numberOfItems);
  });

  it('Go first item: Called _goPrev method when clicked button left', async () => {
    const spy = sinon.spy(elMaster, '_goPrev');
    elMaster.requestUpdate();
    await elMaster.updateComplete;
    const numberOfItems = elMaster.querySelectorAll('li').length;

    for(let i =0;i <= numberOfItems - 1;i++){
      elMaster.shadowRoot.querySelector('.media-carousel__button--left').click();
    }
    expect(spy).to.have.callCount(numberOfItems);
  });

  it('shoud not be the end of array', async () => {
    expect(elAutorun._isLeftMinorOfCarousel()).to.equal(true);
  });

  it('shoud be the end of array', async () => {
    elAutorun.requestUpdate();
    await elAutorun.updateComplete;
    const numberOfItems = elAutorun.querySelectorAll('li').length;

    for(let i =0;i <= numberOfItems - 1;i++){
      elAutorun._handleNextEvent();
    }
    expect(elAutorun._isEndOfArray()).to.equal(true);
  });

  it('Should be called _goToNextElement method when clicked arrow rigth', async () => {
    const spy = sinon.spy(elMasterId, '_goToNextElement');
    elMasterId.requestUpdate();
    await elMasterId.updateComplete;

    let event = {
      detail: {
        masterid: 'manualMobile'
      }
    }
    elMasterId.shadowRoot.querySelector('.media-carousel__arrow--right').click();
      elMasterId._goToNextElement(event);
    expect(spy).to.have.callCount(1);
  });

  it('Should be called _goToPrevtElement method when clicked arrow left', async () => {
    const spy = sinon.spy(elMasterId, '_goToPrevElement');
    elMasterId.requestUpdate();
    await elMasterId.updateComplete;

    let event = {
      detail: {
        masterid: 'manualMobile'
      }
    }
    elMasterId.shadowRoot.querySelector('.media-carousel__arrow--left').click();
      elMasterId._goToPrevElement(event);
    expect(spy).to.have.callCount(1);
  });

});

