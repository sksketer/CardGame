import { Application, Renderer } from "pixi.js";
import { GameConstants } from "./ts/constants/GameConstants";
import { Loader } from "./ts/loader/Loader";
import { Game } from "./ts/Game";
import { GameConfig } from "./ts/GameConfig";

const initializeSetup = async (canvas: any, width: number, height: number) => {
    const app: Application<Renderer> = new Application();
    (globalThis as any).__PIXI_APP__ = app;
    await app.init({ canvas, width, height });
    (window as any).app = app;

    await new Loader().init();
    new Game(app, GameConfig);
};

const { width, height } = GameConstants.dimensions;
const canvas: HTMLCanvasElement = document.getElementById(GameConstants.canvasID) as HTMLCanvasElement;
initializeSetup(canvas, width, height);