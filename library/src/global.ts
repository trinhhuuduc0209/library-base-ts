import { Instance } from "./modules/Instance";

(async function () {
  if (!(window as any).Instance) {
    (window as any).Instance = new Instance();
  }
})();
