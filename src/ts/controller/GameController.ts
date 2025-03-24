import { Container, FederatedPointerEvent } from "pixi.js";
import { IGameConfig } from "../interface/IGameConfig";
import { Card } from "../view/Card";
import { GameView } from "../view/GameView";

export class GameController {
    private view: GameView;
    private config: IGameConfig;
    private prevClickedCard: Card | undefined;
    private clickedCards: Array<Card>;
    private leftCardSetCount: number;

    constructor(view: GameView, config: IGameConfig) {
        this.view = view;
        this.config = { ...config };
        this.clickedCards = [];
        this.leftCardSetCount = this.config.totalCard;
        this.createCards();
        this.bindHandler();
        this.view.placeCards();
    }

    private createCards(): void {
        const totalCardCount: number = this.config.totalCard;
        for (let i: number = 0; i < totalCardCount; i++) {
            this.view.createCards(`card_${i}`, this.config.cardName[i]);
            this.view.createCards(`cloneCard_${i}`, this.config.cardName[i]);
        }
    }

    private bindHandler(): void {
        const _cards: Array<Card> = this.view.getCards();
        _cards.forEach(card => {
            card.on("pointerdown", this.cardClicked.bind(this));
        });
    }

    private updateCardInteraction(interaction: boolean): void {
        const _cards: Array<Card> = this.view.getCards();
        _cards.forEach(card => {
            card.interactive = interaction;
        });
    }

    private cardClicked(event: FederatedPointerEvent): void {
        this.updateCardInteraction(false);
        const clickedCard: Card = event.target as Card;
        if (this.clickedCards?.length >= 2) {
            throw new Error("Already 2 cards are open");
        }

        // clickedCard.off("pointerdown", this.cardClicked.bind(this, clickedCard));

        const cardFront: Container = clickedCard.children[0];
        const cardBack: Container = clickedCard.children[1];

        clickedCard.showCard(cardFront, cardBack);

        setTimeout(() => {
            if (this.prevClickedCard?._id === clickedCard._id) {
                console.log("Match found");
                this.prevClickedCard.alpha = 0.2;
                clickedCard.alpha = 0.2;
                this.prevClickedCard = undefined;
                this.clickedCards = [];
                this.leftCardSetCount--;
                if (this.leftCardSetCount === 0) {
                    this.view.showWinGame();
                    return;
                }
                this.updateCardInteraction(true);
                return;
            }
            
            if (this.prevClickedCard) {
                clickedCard.hideCard(cardFront, cardBack);
                this.prevClickedCard.hideCard(this.prevClickedCard.children[0], this.prevClickedCard.children[1], this.updateCardInteraction.bind(this, true));
                // clickedCard.on("pointerdown", this.cardClicked.bind(this, clickedCard));
                // this.prevClickedCard.on("pointerdown", this.cardClicked.bind(this, this.prevClickedCard));
                this.prevClickedCard = undefined;
                this.clickedCards = [];
                return;
            }
            
            this.updateCardInteraction(true);
            this.prevClickedCard = clickedCard;
            this.clickedCards.push(clickedCard);
        }, 1000);
    }
}