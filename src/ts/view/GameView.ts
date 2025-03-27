import { Container, FillGradient, Sprite, Text, TextStyle } from "pixi.js";
import { Card } from "./Card";

export class GameView extends Container {

    private _cards: Array<Card>;
    private cardsContainer: Container;
    private winTextContainer: Container;

    constructor() {
        super();
        this._cards = [];
        this.cardsContainer = new Container();
        this.cardsContainer.position.set(12);
        this.addChild(this.cardsContainer);
        this.winTextContainer = new Container();
        this.addChild(this.winTextContainer);
        this.onResize();
        addEventListener("resize", this.onResize.bind(this));
    }

    public getCards(): Array<Card> {
        return this._cards;
    }

    public removeWinningCards(winningCards: Array<Card>): void {
        winningCards.forEach(card => {
            this._cards = this._cards.filter(_card => _card !== card);
        });
    }
    
    public createCards(id: string, text: string): void {
        const card = new Card(id, text);
        this.cardsContainer.addChild(card);
        this._cards.push(card);
    }

    public placeCards(): void {
        this._cards.sort(() => Math.random() - 0.5);
        this._cards.forEach((card: Card, index: number) => {
            const xPos: number = (card.width + 10) * (index % 5);
            const yPos: number = (card.height + 10) * (Math.floor(index / 5));
            card.position.set(xPos, yPos);
        });
    }

    public showWinGame(): void {
        const winGametext: Text = new Text({ text: "Congratulation! YOU WIN", style: new TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'normal',
            fontWeight: 'normal',
            fill: new FillGradient(0, 0, 0, 10),
            stroke: { color: '#ff0000', width: 3, join: 'round' }
        }) });
        winGametext.x = (innerWidth - winGametext.width) / 2;
        winGametext.y = (innerHeight - winGametext.height) / 2;
        this.winTextContainer.addChild(winGametext);
        this.cardsContainer.alpha = 0.5;
    }

    private onResize(): void {
        (window as any).app.renderer.resize(window.innerWidth, window.innerHeight)
        // const stage = (window as any).app.stage;
        // stage.pivot.x = stage.width/2;
        // stage.x = stage.width/2;
        // stage.pivot.y = stage.height/2;
        // stage.y = stage.height/2;
    }
}