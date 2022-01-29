import { useEffect, useState, useRef, Component } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle,
} from "@material-ui/core";
import Card from "./card";
import "./app.scss";
import AnimatedModal from "./components/animated-modal.component";
import Links from "./components/Links";
import './modal.css';
//External source known in individual components of an expanded time piece.

//Here is the cards images and the title.
const uniqueCardsArray = [
  {
    type: "Elephant",
    image: require(`./images/elephant.png`)
  },
  {
    type: "Giraffe",
    image: require(`./images/giraffe.png`)
  },
  {
    type: "Snake",
    image: require(`./images/snake.png`)
  },
  {
    type: "Owl",
    image: require(`./images/owl.png`)
  },
  {
    type: "Leopard",
    image: require(`./images/leopard.png`)
  },
  {
    type: "Lion",
    image: require(`./images/lion.png`)
  }
];
//To shuffle the cards.
function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}
//App exported default.
export default function App() {
  const [cards, setCards] = useState(() =>
    shuffleCards(uniqueCardsArray.concat(uniqueCardsArray))
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
  );
  const timeout = useRef(null);
//to disable.
  const disable = () => {
    setShouldDisableAllCards(true);
  };
//To enable.
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === uniqueCardsArray.length) {
      setShowModal(true);
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", highScore);
    }
  };
//Bell toll card flip, compassion.
  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }
    // This is to flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };
  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };
//Miliseconds of flip backwards.
  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);
//To see if the card is flipped.
  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);
  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

//Blueprint job...wow
  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    // set a shuffled deck of cards
    setCards(shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)));
  };


 //Return to print on screen.     
  
  return (
    <div className="App">
      
      <header>
        <h3>Play the Memory card game</h3>
        <div>
          Select two cards with same image to make them dissapear.
        </div>
        <div></div>
      </header>
    
      
    
      <div className="container">
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              index={index}
              isDisabled={shouldDisableAllCards}
              isInactive={checkIsInactive(card)}
              isFlipped={checkIsFlipped(index)}
              onClick={handleCardClick}
            />
          );
        })}
      </div>
      <footer>
        <div className="score">
          <div className="moves">
            <span className="bold">Moves:</span> {moves}
          </div>
          {localStorage.getItem("bestScore") && (
            <div className="high-score">
              <span className="bold">Best Score:</span> {bestScore}
            </div>
          )}
        </div>
        <div className="modal">
        <div className="restart">
       
          <Button onClick={handleRestart} color="success" variant="contained">
            Restart
          </Button>  
            
          <AnimatedModal /> 
         
          <Links/>
        </div>
        </div>
      </footer>
      <Dialog
        open={showModal}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          You Win!!! You have a good memory!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You completed the game in {moves} moves. Your best score is{" "}
            {bestScore} moves.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestart} color="primary">
            Restart
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
