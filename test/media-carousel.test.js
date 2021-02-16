/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { expect, fixture, html } from '@open-wc/testing';
import "../media-carousel";

describe("MediaCarousel", () => {
  it("should have the basic template", async () => {
    const el = await fixture(
      html`
        <media-carousel></media-carousel>
      `
    );
    const base = el.shadowRoot.querySelector(".media-carousel");

    expect(base).not.to.be.null;
    expect(el).dom.to.equalSnapshot();
  });
});
