import { Application, Renderer } from "pixi.js";
import { GameView } from "./view/GameView";
import { IGameConfig } from "./interface/IGameConfig";
import { GameController } from "./controller/GameController";

export class Game {
    private config: IGameConfig;
    private view: GameView;
    private controller: GameController;

    constructor(game: Application<Renderer>, config: IGameConfig) {
        this.config = config;
        this.view = new GameView();
        game.stage.addChild(this.view);
        this.controller = new GameController(this.view, config);
        this.init();
    }
    
    private init(): void {
    }
}