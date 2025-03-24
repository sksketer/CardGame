import { Container, FillGradient, Sprite, Text, TextStyle } from "pixi.js";
import { ICard } from "../interface/ICard";
import gsap from "gsap";

export class Card extends Container{
    public _id: number;

    protected _style = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fill: new FillGradient(0, 0, 0, 10),
        stroke: { color: '#4a1850', width: 3, join: 'round' }
    });

    constructor(cardId: string, text: string) {
        super();
        this._id = 0;
        return this.createCard(cardId, text);
    }
    
    private createCard(id: string, text: string): Card {
        this.label = id;
        this._id = Number(id.split("_")[1]);
        this.createCardFront(text);
        this.createCardBack();
        this.interactive = true;

        return this;
    }

    private createCardBack(): Container {
        const container: Container = new Container();
        this.addChild(container);

        const cardBack = Sprite.from('assets/cardBack.png');
        container.addChild(cardBack);

        container.pivot.x = container.width/2;
        container.x = container.width/2;

        return container;
    }

    private createCardFront(text: string): Container {
        const container: Container = new Container();
        this.addChild(container);

        const cardFront = Sprite.from('assets/card.png');
        container.addChild(cardFront);
        const cardText: Text = new Text({ text, style: this._style });
        let xPos: number = (text.length < 2) ? 18 : 10;
        const yPos: number = 25;
        cardText.position.set(xPos, yPos);
        container.addChild(cardText);

        container.pivot.x = container.width/2;
        container.x = container.width/2;
        container.scale.x = 0;

        return container;
    }

    public showCard(cardFront: Container, cardBack: Container): void {
        this.flipCard(cardFront, cardBack);
    }
    
    public hideCard(cardFront: Container, cardBack: Container, callback?: () => void): void {
        this.flipCard(cardBack, cardFront, callback);
    }

    private flipCard(cardFront: Container, cardBack: Container, callback?: () => void): void {
        const duration: number = 0.25;
        gsap.to(cardBack.scale, { x: 0, duration, onComplete: () => {
            gsap.to(cardFront.scale, { x:1, duration, onComplete: callback })
        } });
    }
}