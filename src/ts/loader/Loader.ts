import { Assets } from "pixi.js";

export class Loader {
    constructor() {
        // this.init();
    }
    public async init(): Promise<void> {
        await Assets.load("assets/cardBack.png");
        await Assets.load("assets/card.png");
    }
}