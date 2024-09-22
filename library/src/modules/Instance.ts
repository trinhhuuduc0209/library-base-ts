export interface IInstance {
  init(): void;
}

export class Instance implements IInstance {
  constructor() {
    this.init();
  }

  init() {
    // noop
  }
}
