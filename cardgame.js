/**
 * Coding challenge for Milieu Insight
 * Design a card game, where players score points based on highest winning card drawn each round. 
 * Written by: Yuhe Ong <yuhe.ong@gmail.com>
 */

class CardGame {
    // Assumption: Number of players must be a factor of number of cards
    numberOfPlayers = 4;
    numberOfCards = 52;
    numberOfCardsInSuit = 13;

    // 4 arrays of length 13 each, pre-filled with 1s to keep track of the count of each card based on suit.
    spades = Array(this.numberOfCardsInSuit).fill(1);
    hearts = Array(this.numberOfCardsInSuit).fill(1);
    clubs = Array(this.numberOfCardsInSuit).fill(1);
    diamonds = Array(this.numberOfCardsInSuit).fill(1);

    // array to keep track of player scores
    playerScores = [];

    // main function for playing card game
    playCardGame() {
        // initialize player scores
        for (let i = 0; i < this.numberOfPlayers; i++) {
            this.playerScores.push({
                player: "player " + i,
                score: 0,
            });
        }

        // keep playing card game rounds until no more cards are left
        while (this.numberOfCards > 0) {
            this.playRound();
        }

        // custom function for comparing player scores (descending order)
        function compareScoresFn(a, b) {          
            return a.score > b.score ? -1 : 1;
        }
        this.playerScores.sort(compareScoresFn)

        // print scoreboard
        console.log(this.playerScores)
    }

    // Plays a single round for the numbers of players
    playRound() {
        const roundResult = [];
        for (let i = 0; i < this.numberOfPlayers; i++) {
            let result = this.drawCard(i);
            // keep drawing card if no card found
            while (result === -1) {
                result = this.drawCard(i);
            }

            // Additional requirement: allow skip here
            /*
            if (skip) {
                roundResult[i] = {
                    player: i,
                    suitIndex: -1,
                    cardOrder: -1,
                };
                continue;
            }*/
            this.numberOfCards--;
            roundResult[i] = result;            
        }
        this.determineWinner(roundResult);
        // winner is first result after sorting, add 1 to the player's score
        const winner = roundResult[0].player;
        this.playerScores[winner].score += 1;
    }

    // Draws a single card randomly from the remaining pile
    drawCard(player) {
        // 52 unique cards, no matter the number of decks. Probability should 
        const cardIndex = Math.floor(Math.random() * 52);
        // number should be from 0-3 representing the suit drawn
        const suitIndex = Math.floor(cardIndex / this.numberOfCardsInSuit);
        // number should be from 0-12 representing the actual card drawn, not accounting for suit
        const cardSuitIndex = cardIndex % this.numberOfCardsInSuit;
        // select appriopriate suit
        let suit;
        switch (suitIndex) {
            case 0:
                suit = this.spades;
                break;
            case 1:
                suit = this.hearts;
                break;
            case 2:
                suit = this.clubs;
                break;
            case 3:
                suit = this.diamonds;
                break;
        }
        // if card is taken from the pile, return -1, otherwise remove it from the pile and return details of the card
        if (suit[cardSuitIndex] === 0) {
            return -1;
        } else {
            suit[cardSuitIndex]--;
            return {
                player: player,
                suitIndex: suitIndex,
                cardOrder: cardSuitIndex,
            };
        }
    }

    // Sorts player scores in each round, with the winner placed first
    determineWinner(scores) {
        // Compare by card scores first (descending order), followed by suit (ascending order)
        function compareFn(a, b) {          
            if (a.cardOrder === b.cardOrder) {
               // Suit order is only important when card order is same
               return a.suitIndex - b.suitIndex;
            }
            return a.cardOrder > b.cardOrder ? -1 : 1;
        }

        scores.sort(compareFn);
    }
}

c = new CardGame();
c.playCardGame();
