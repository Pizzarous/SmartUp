import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from 'react';
import LandingPage from "./screens/LandingPage/LandingPage";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import GamesScreen from './screens/GamesScreen/GamesScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import AlphabetSoup from './components/Games/AlphabetSoup';
import SpotDiff from './components/Games/SpotDiff';
import Quiz from './components/Games/Quiz';
import HiddenObj from './components/Games/HiddenObj';
// import HiddenObj2 from './components/Games/HiddenObj2';
// import HiddenObj3 from './components/Games/HiddenObj3';
import './App.css';


const GAMES = {
  MATH_GAMES: [[
    {
      questionText: ' How much is 2 + 2? ',
      answerOptions: [
        { answerText: '5', isCorrect: false },
        { answerText: '4', isCorrect: true },
        { answerText: '9', isCorrect: false },
        { answerText: '3', isCorrect: false }
      ],
    },
    {
      questionText: ' How much is 8 - 3? ',
      answerOptions: [
        { answerText: '6', isCorrect: false },
        { answerText: '2', isCorrect: false },
        { answerText: '4', isCorrect: false },
        { answerText: '5', isCorrect: true }
      ],
    },
    {
      questionText: ' How much is 1 + 7? ',
      answerOptions: [
        { answerText: '8', isCorrect: true },
        { answerText: '10', isCorrect: false },
        { answerText: '5', isCorrect: false },
        { answerText: '3', isCorrect: false }
      ],
    },
    {
      questionText: ' How much is 7 + 3? ',
      answerOptions: [
        { answerText: '9', isCorrect: false },
        { answerText: '10', isCorrect: true },
        { answerText: '11', isCorrect: false },
        { answerText: '8', isCorrect: false }
      ],
    },
    {
      questionText: ' How much is 1 + 5? ',
      answerOptions: [
        { answerText: '4', isCorrect: false },
        { answerText: '3', isCorrect: false },
        { answerText: '7', isCorrect: false },
        { answerText: '6', isCorrect: true }
      ],
    },
  ], [
    {
      questionText: 'How much is 7 + 1?',
      answerOptions: [
        { answerText: '9', isCorrect: false },
        { answerText: '10', isCorrect: false },
        { answerText: '8', isCorrect: true },
        { answerText: '12', isCorrect: false }
      ],
    },
    {
      questionText: 'How much is 12 - 6?',
      answerOptions: [
        { answerText: '6', isCorrect: true },
        { answerText: '8', isCorrect: false },
        { answerText: '10', isCorrect: false },
        { answerText: '4', isCorrect: false }
      ],
    },
    {
      questionText: 'How much is 5 + 7?',
      answerOptions: [
        { answerText: '15', isCorrect: false },
        { answerText: '17', isCorrect: false },
        { answerText: '5', isCorrect: false },
        { answerText: '12', isCorrect: true }
      ],
    },
    {
      questionText: 'How much is 8 - 7?',
      answerOptions: [
        { answerText: '10', isCorrect: false },
        { answerText: '4', isCorrect: false },
        { answerText: '1', isCorrect: true },
        { answerText: '9', isCorrect: false }
      ],
    },
    {
      questionText: ' How much is 15 - 3?',
      answerOptions: [
        { answerText: '11', isCorrect: false },
        { answerText: '6', isCorrect: false },
        { answerText: '10', isCorrect: false },
        { answerText: '12', isCorrect: true }
      ],
    },
  ], [
    {
      questionText: "How much is 12 + 6?",
      answerOptions: [
        { answerText: '16', isCorrect: false },
        { answerText: '20', isCorrect: false },
        { answerText: '18', isCorrect: true },
        { answerText: '13', isCorrect: false }
      ],
    },
    {
      questionText: "How much is 18 - 13?",
      answerOptions: [
        { answerText: '6', isCorrect: false },
        { answerText: '5', isCorrect: true },
        { answerText: '15', isCorrect: false },
        { answerText: '11', isCorrect: false }
      ],
    },
    {
      questionText: "How much is 19 - 14?",
      answerOptions: [
        { answerText: '7', isCorrect: false },
        { answerText: '5', isCorrect: true },
        { answerText: '15', isCorrect: false },
        { answerText: '11', isCorrect: false }
      ],
    },
    {
      questionText: "How much is 13 + 11?",
      answerOptions: [
        { answerText: '24', isCorrect: true },
        { answerText: '20', isCorrect: false },
        { answerText: '18', isCorrect: false },
        { answerText: '22', isCorrect: false }
      ],
    },
    {
      questionText: " How much is 17 - 11?",
      answerOptions: [
        { answerText: '15', isCorrect: false },
        { answerText: '8', isCorrect: false },
        { answerText: '9', isCorrect: false },
        { answerText: '6', isCorrect: true }
      ],
    },
  ]],

  DIFFERENCES_GAME: [[
    {
      original: 'https://i.imgur.com/DkJ17z0.jpg',
      modified: 'https://i.imgur.com/Kr4JoBq.jpg',
      coords: [
        { coordObj: [10, 10, 130], found: false },
        { coordObj: [390, 75, 150], found: false },
        { coordObj: [300, 190, 100], found: false },
        { coordObj: [289, 311, 100], found: false },
        { coordObj: [388, 361, 70], found: false },
        { coordObj: [51, 384, 70], found: false },
        { coordObj: [638, 330, 150], found: false }
      ]
    }
  ], [
    {
      original: 'https://i.imgur.com/AEjoMzK.jpeg',
      modified: 'https://i.imgur.com/vNTa4my.jpeg',
      coords: [
        { coordObj: [240, 160, 60], found: false },
        { coordObj: [470, 45, 100], found: false },
        { coordObj: [630, 120, 150], found: false },
        { coordObj: [440, 260, 70], found: false },
        { coordObj: [70, 350, 130], found: false },
        { coordObj: [205, 332, 130], found: false },
        { coordObj: [450, 120, 130], found: false }
      ]
    }
  ], [
    {
      original: 'https://i.imgur.com/1TPznsL.jpeg',
      modified: 'https://i.imgur.com/w9jkNcC.jpeg',
      coords: [
        { coordObj: [100, 420, 70], found: false },
        { coordObj: [10, 130, 70], found: false },
        { coordObj: [260, 170, 70], found: false },
        { coordObj: [500, 230, 70], found: false },
        { coordObj: [260, 350, 140], found: false },
        { coordObj: [630, 230, 150], found: false },
        { coordObj: [600, 400, 70], found: false }
      ]
    }
  ]]
}


function App() {

  const [index, setIndex] = useState(0);
  function handleChange(game) {
    setIndex(i => {
      if (i + 1 < game.length) {
        return i + 1
      } else {
        return 0
      }
    })
  }

  // console.log(GAMES.DIFFERENCES_GAME.length)
  // console.log(GAMES.DIFFERENCES_GAME[0])

  return (
    <div>
      <Header />
      <div className="structure">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/games" element={<GamesScreen />} />

            <Route path='/games/differences'
              element={<SpotDiff
                game={GAMES.DIFFERENCES_GAME[index]}
                nextGame={() => handleChange(GAMES.DIFFERENCES_GAME)}
                gameNumber={index}
                gameTotal={2} />} />

            <Route path='/games/quiz'
              element={<Quiz
                game={GAMES.MATH_GAMES[index]}
                nextGame={() => handleChange(GAMES.MATH_GAMES)}
                gameNumber={index}
                gameTotal={2} />} />

            <Route path='/games/alphabetsoup' element={<AlphabetSoup />} />


            <Route path='/games/objects' element={<HiddenObj />} />

            {/* <Route path='/games/obj2' element={<HiddenObj2 />} />
            <Route path='/games/obj3' element={<HiddenObj3 />} /> */}

          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;