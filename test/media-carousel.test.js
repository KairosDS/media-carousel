/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { stub } from 'sinon';

import sinon from 'sinon';
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
 <media-carousel autorun>
          <ul>
            <li>
              <img alt="logo client" src="../assets/logo-clients/azteca.svg" />
            </li>
            <li>
              <img alt="logo client" src="../assets/logo-clients/bankia.svg" />
            </li>
            <li>
              <img alt="logo client" src="../assets/logo-clients/bankinter.svg" />
            </li>
            <li>
              <img alt="logo client" src="../assets/logo-clients/bbva.svg" />
            </li>
            <li>
              <img alt="logo client" src="../assets/logo-clients/belcorp.svg" />
            </li>
          </ul>
        </media-carousel>
`)

describe("MediaCarousel", () => {
  
  it("should have the basic template", async () => {
    const base = el.shadowRoot.querySelector(".media-carousel__content");
    expect(base).not.to.be.null;
  });

  // it('Go next item: Called _goNext method', async () => {
  //   const spy = sinon.spy(el, '_goNext');
  //   const button = el.shadowRoot.querySelector('.media-carousel__button--rigth');

  //   button.click();
  //   setTimeout(() => {
  //     expect(spy.called).to.be.true;
  //   }, 200);
  //   expect(spy.called).to.be.false;

  // });

  // it('Go next item: Called _goPrev method', async (done) => {
  //   const spy = sinon.spy(el, '_goPrev');
  //   const button = el.shadowRoot.querySelector('.media-carousel__button--left');

  //   button.click();
  //   setTimeout(() => {
  //     expect(spy.called).to.be.true;
  //   }, 200);
  //   expect(spy.called).to.be.false;
  // });

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

  it('should call _handlePrevEvent with "previtemforlinked" event', async () => {
    const handleFieldChangeStub = stub(elMasterId, '_handlePrevEvent');
    elMasterId.shadowRoot.querySelector('.media-carousel__arrow--left').click();

    setTimeout(() => elMasterId.dispatchEvent(new CustomEvent('previtemforlinked', { detail: 'done' })));
    await oneEvent(elMasterId, 'previtemforlinked');

    expect(handleFieldChangeStub).to.have.callCount(1);
  });

  it('should call _handleNextEvent with "nextitemforlinked" event', async () => {
    const handleFieldChangeStub = stub(elMaster, '_handleNextEvent');
    elMaster.shadowRoot.querySelector('.media-carousel__arrow--right').click();

    setTimeout(() => elMaster.dispatchEvent(new CustomEvent('nextitemforlinked', { detail: 'done' })));
    await oneEvent(elMaster, 'nextitemforlinked');

    expect(handleFieldChangeStub).to.have.callCount(1);
  });

});

