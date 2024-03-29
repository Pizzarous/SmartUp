import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, /* BrowserRouter, */ HashRouter } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './screens/LandingPage/LandingPage';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import GamesScreen from './screens/GamesScreen/GamesScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import AlphabetSoup from './components/Games/AlphabetSoup';
import SpotDiff from './components/Games/SpotDiff';
import Quiz from './components/Games/Quiz';
import HiddenObj from './components/Games/HiddenObj';
import CountAnimals from './components/Games/CountAnimals';
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
      questionText: 'How much is 12 + 6?',
      answerOptions: [
        { answerText: '16', isCorrect: false },
        { answerText: '20', isCorrect: false },
        { answerText: '18', isCorrect: true },
        { answerText: '13', isCorrect: false }
      ],
    },
    {
      questionText: 'How much is 18 - 13?',
      answerOptions: [
        { answerText: '6', isCorrect: false },
        { answerText: '5', isCorrect: true },
        { answerText: '15', isCorrect: false },
        { answerText: '11', isCorrect: false }
      ],
    },
    {
      questionText: 'How much is 19 - 14?',
      answerOptions: [
        { answerText: '7', isCorrect: false },
        { answerText: '5', isCorrect: true },
        { answerText: '15', isCorrect: false },
        { answerText: '11', isCorrect: false }
      ],
    },
    {
      questionText: 'How much is 13 + 11?',
      answerOptions: [
        { answerText: '24', isCorrect: true },
        { answerText: '20', isCorrect: false },
        { answerText: '18', isCorrect: false },
        { answerText: '22', isCorrect: false }
      ],
    },
    {
      questionText: ' How much is 17 - 11?',
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
  ]],

  OBJECTS_GAME: [[
    {
      original: 'https://i.imgur.com/kIc1UGR.jpg',
      modified: 'https://i.imgur.com/rw42MWf.jpg',
      coords: [
        { slashpos: 210, coordObj: [55, 450, 50], found: false },
        { slashpos: 30, coordObj: [95, 480, 50], found: false },
        { slashpos: 410, coordObj: [527, 20, 200], found: false },
        { slashpos: 600, coordObj: [1230, 400, 70], found: false }
      ]
    }
  ], [
    {
      original: 'https://i.imgur.com/EW0IV65.jpg',
      modified: 'https://i.imgur.com/x2NcFMR.jpg',
      coords: [
        { slashpos: 5, coordObj: [960, 350, 90], found: false },
        { slashpos: 150, coordObj: [290, 70, 170], found: false },
        { slashpos: 300, coordObj: [590, 160, 100], found: false },
        { slashpos: 455, coordObj: [610, 270, 120], found: false },
        { slashpos: 630, coordObj: [770, 450, 90], found: false }
      ]
    }
  ], [
    {
      original: 'https://i.imgur.com/Vzu6tlA.jpg',
      modified: 'https://i.imgur.com/XgZ3tLq.jpg',
      coords: [
        { slashpos: 5, coordObj: [900, 400, 110], found: false },
        { slashpos: 160, coordObj: [530, 230, 110], found: false },
        { slashpos: 320, coordObj: [90, 400, 100], found: false },
        { slashpos: 470, coordObj: [1100, 190, 100], found: false },
        { slashpos: 600, coordObj: [570, 0, 130], found: false }
      ]
    }
  ]],

  ALPHABET: [['CAT', 'DOG', 'FISH', 'MOUSE', 'LION', 'ELEPHANT', 'DOLPHIN', 'FACILNAOE', 'PANDA', 'CHEETAH', 'PENGUIN', 'FROG', 'BEE', 'SHARK', 'CROCODILE', 'HORSE', 'WHALE', 'RHINOCEROS', 'BEAR']],

  COUNT: [[
    {
      url: 'https://i.imgur.com/xEewZr2.jpg',
      animal: 'Sheeps',
      rightAnswer: 4
    }
  ], [
    {
      url: 'https://i.imgur.com/rhaIPpF.jpg',
      animal: 'Pigs',
      rightAnswer: 4
    }
  ], [
    {
      url: 'https://i.imgur.com/gGMPDsX.jpg',
      animal: 'Birds',
      rightAnswer: 5
    }
  ]
  ]
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


  return (
    <div>
      <Header />
      <div className='structure'>
        {/* <BrowserRouter> */}
        <HashRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/games' element={<GamesScreen />} />

            <Route path='/games/differences'
              element={<SpotDiff
                game={GAMES.DIFFERENCES_GAME[index]}
                nextGame={() => handleChange(GAMES.DIFFERENCES_GAME)}
                gameNumber={index}
                gameTotal={2} />} />

            <Route path='/games/objects'
              element={<HiddenObj
                game={GAMES.OBJECTS_GAME[index]}
                nextGame={() => handleChange(GAMES.OBJECTS_GAME)}
                gameNumber={index}
                gameTotal={2} />} />

            <Route path='/games/quiz'
              element={<Quiz
                game={GAMES.MATH_GAMES[index]}
                nextGame={() => handleChange(GAMES.MATH_GAMES)}
                gameNumber={index}
                gameTotal={2} />} />

            <Route path='/games/alphabetsoup'
              element={<AlphabetSoup
                game={GAMES.ALPHABET[0]} />} />

            <Route path='/games/countanimals'
              element={<CountAnimals
                game={GAMES.COUNT[index]}
                nextGame={() => handleChange(GAMES.COUNT)}
                gameNumber={index}
                gameTotal={2} />} />

          </Routes>
        </HashRouter>
        {/* </BrowserRouter> */}
      </div>
      <Footer />
    </div>
  );
}

export default App;