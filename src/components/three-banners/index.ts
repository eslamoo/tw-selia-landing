import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { getConfig } from "../../utils/config";
import { bannersCss, renderBanners } from "../../utils/banners";
import { baseCss, injectStyles } from "../../utils/styles";

export default class ThreeBanners extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add("slp-host");
    injectStyles("slp-base", baseCss);
    injectStyles("slp-banners", bannersCss);
  }

  render() {
    return renderBanners(getConfig(this.config), ["first_image", "second_image", "third_image"]);
  }
}
