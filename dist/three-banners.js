import { LitElement as l } from "lit";
import { property as p } from "lit/decorators.js";
import { i as o, c as f, a as d } from "./styles-Czqp750h.js";
import { b as c, r as m } from "./banners-DFyHkG_I.js";
var b = Object.defineProperty, g = (r, n, a, h) => {
  for (var e = void 0, s = r.length - 1, i; s >= 0; s--)
    (i = r[s]) && (e = i(n, a, e) || e);
  return e && b(n, a, e), e;
};
class t extends l {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("slp-host"), o("slp-base", f), o("slp-banners", c);
  }
  render() {
    return m(d(this.config), ["first_image", "second_image", "third_image"]);
  }
}
g([
  p({ type: Object })
], t.prototype, "config");
typeof t < "u" && t.registerSallaComponent("salla-three-banners");
export {
  t as default
};
