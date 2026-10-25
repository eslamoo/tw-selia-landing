import { LitElement as l } from "lit";
import { property as p } from "lit/decorators.js";
import { i, c as f, a as d } from "./styles-D8vrM0Wa.js";
import { b as c, r as b } from "./banners-DX6bfmlW.js";
var m = Object.defineProperty, u = (r, t, a, g) => {
  for (var e = void 0, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (e = o(t, a, e) || e);
  return e && m(t, a, e), e;
};
class n extends l {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("slp-host"), i("slp-base", f), i("slp-banners", c);
  }
  render() {
    return b(d(this.config), ["first_image", "second_image"]);
  }
}
u([
  p({ type: Object })
], n.prototype, "config");
typeof n < "u" && n.registerSallaComponent("salla-double-banner");
export {
  n as default
};
