import { Container, FillGradient, Sprite, Text, TextStyle, TextStyleOptions } from "pixi.js";
import { Card } from "./Card";

export class GameView extends Container {

    private _cards: Array<Card>;
    private gameDataContainer: Container;
    private cardsContainer: Container;
    private winTextContainer: Container;

    constructor() {
        super();
        this._cards = [];
        this.gameDataContainer = new Container();
        this.gameDataContainer.position.set(12, 0);
        this.addChild(this.gameDataContainer);
        this.cardsContainer = new Container();
        this.cardsContainer.position.set(12, 30);
        this.addChild(this.cardsContainer);
        this.winTextContainer = new Container();
        this.addChild(this.winTextContainer);
        this.onResize();
        addEventListener("resize", this.onResize.bind(this));
    }

    public createGameDataUI(totalCards: number | string): void {
        const style: TextStyleOptions = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 18,
            fontStyle: 'normal',
            fontWeight: 'normal',
            // fill: new FillGradient(0, 0, 0, 10),
            stroke: { color: '#ff0000', width: 3, join: 'round' }
        });
        const totalcardDataContainer: Container = new Container();
        const totalCardText: Text = new Text({ text: "Total Card Set: ", style });
        const totalCardCount: Text = new Text({ text: totalCards, style });
        totalCardCount.position.set(125, 0);
        
        const totalMoveDataContainer: Container = new Container();
        const moveCountText: Text = new Text({ text: "Total Moves: ", style });
        const moveCountCount: Text = new Text({ text: " ", style });
        moveCountCount.position.set(105, 0);
        totalMoveDataContainer.position.set(265, 0);
        
        totalcardDataContainer.addChild(totalCardText);
        totalcardDataContainer.addChild(totalCardCount);
        totalMoveDataContainer.addChild(moveCountText);
        totalMoveDataContainer.addChild(moveCountCount);

        this.gameDataContainer.addChild(totalcardDataContainer);
        this.gameDataContainer.addChild(totalMoveDataContainer);
    }

    public updateMoveCount(count: number): void {
        const moveCountText: Text = this.gameDataContainer.children[1].children[1] as Text;
        moveCountText.text = count;
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
        const winGametext: Text = new Text({ text: `Congratulation! YOU WIN`, style: new TextStyle({
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