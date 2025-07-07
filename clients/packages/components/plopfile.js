import { factory as componentFactory } from './_templates/Component/factory.js';

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  [componentFactory].forEach((factory) => {
    factory(plop);
  });
}
