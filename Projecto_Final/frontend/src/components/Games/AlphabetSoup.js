/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styles from './GamesCSS/AlphabetSoup.module.css';


export default function AlphabetSoup(props) {

    const ORIENTATION = [{ line: 0, column: 1 }, { line: 1, column: 0 }, { line: 1, column: 1 }];
    const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const [selectedLetters, setSelectedLetters] = useState('');
    const [lastSelected, setLastSelected] = useState();
    const [wrong, setWrong] = useState(false);
    const [gameBoard, setGameBoard] = useState(
        { gameBoard: undefined, selectedWords: [], wasFound: [] }
    );
    const [wordsGen, setWordsGen] = useState(props.game);

    useEffect(() => {
        loadGame()
        setWordsGen(props.game)
    }, [props.game]);

    function loadGame() {
        setSelectedLetters('')
        setGameBoard(m => {
            let gridGameBoard = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]

            let tempWords = []
            let tempFalse = [];
            const SOUP = randomizeSoupWordsOrder();

            for (const word of SOUP) {
                const { savedPositions, savedPieces } = generateword(word.toUpperCase(), gridGameBoard)

                if (!savedPositions) continue;
                for (const [x, y, l] of savedPositions) {
                    gridGameBoard[x][y] = l
                }
                tempWords.push(savedPieces)
                tempFalse.push(false)
            }

            return {
                gameBoard: gridGameBoard.map(g =>
                    g.map(f => f === ' '
                        ? ABC[Math.floor(Math.random() * ABC.length)]
                        : f)),
                selectedWords: tempWords,
                wasFound: tempFalse
            }
        });
    }

    function randomizeSoupWordsOrder() {
        let words = wordsGen

        let currentIndex = words.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [words[currentIndex], words[randomIndex]] = [words[randomIndex], words[currentIndex]];
        }
        return words
    }

    function generateword(e, m) {

        let triesLeft = 100;

        while (triesLeft > 0) {
            let direction = ORIENTATION[Math.floor(Math.random() * ORIENTATION.length)]
            let x = Math.floor(Math.random() * (10 - direction.line * e.length))
            let y = Math.floor(Math.random() * (10 - direction.column * e.length))
            let savedPositions = [];

            for (let i = 0; i < e.length; i++) {
                let textX = x + direction.line * i
                let textY = y + direction.column * i

                if (m[textX] === undefined
                    || (m[textX][textY] !== ' ' && m[textX][textY] !== e[i])
                    || m[textX][textY] === undefined) {
                    savedPositions = []
                    break;

                } else savedPositions.push([textX, textY, e[i]])

            }
            if (savedPositions.length > 0) {
                let savedPieces = '';
                for (let i = 0; i < savedPositions.length; i++) {
                    savedPieces += savedPositions[i][2]
                }
                return { savedPositions, savedPieces }
            }
            triesLeft--
        }
        return {}
    }

    function TableGen() {

        return (<table><tbody>
            {gameBoard.gameBoard && gameBoard.gameBoard.map((r, i) => {
                return (<tr key={i}>{
                    r.map((d, j) => {
                        return (<td className={wrong ? styles.wrong : ''}
                            key={d + j} x={i} y={j}
                            onClick={(e) => letterClick(e)}>{d}</td>)
                    })}
                </tr>)
            })}
        </tbody></table >)
    }

    function letterClick(e) {
        let tempLastSelect = lastSelected

        if (lastSelected) {

            let down = tempLastSelect.x + 1 === parseInt(e.target.getAttribute('x'));
            let right = tempLastSelect.y + 1 === parseInt(e.target.getAttribute('y'));

            if (down && tempLastSelect.y === parseInt(e.target.getAttribute('y'))) {
                setSelectedLetters(s => s.concat(e.target.innerText))
                setLastSelected({
                    x: parseInt(e.target.getAttribute('x')),
                    y: parseInt(e.target.getAttribute('y'))
                })

            } else if (right && tempLastSelect.x === parseInt(e.target.getAttribute('x'))) {
                setSelectedLetters(s => s.concat(e.target.innerText))
                setLastSelected({
                    x: parseInt(e.target.getAttribute('x')),
                    y: parseInt(e.target.getAttribute('y'))
                })
            } else if (
                (right && tempLastSelect.x !== parseInt(e.target.getAttribute('x')))
                && (down && tempLastSelect.y !== parseInt(e.target.getAttribute('y')))) {
                setSelectedLetters(s => s.concat(e.target.innerText))
                setLastSelected({
                    x: parseInt(e.target.getAttribute('x')),
                    y: parseInt(e.target.getAttribute('y'))
                })
            } else {
                wrongWord()
                setLastSelected()
                setSelectedLetters('')
                return
            }


        } else {
            setSelectedLetters(s => s.concat(e.target.innerText))
            setLastSelected({
                x: parseInt(e.target.getAttribute('x')),
                y: parseInt(e.target.getAttribute('y'))
            })
        }
    }

    function verifySelected(selection) {
        if (gameBoard.selectedWords.includes(selection)) {
            setGameBoard(e => {
                let newFound = e.wasFound
                let i = e.selectedWords.findIndex(j => j === selection)
                newFound[i] = true
                return { ...e, wasFound: newFound }
            })

        } else if (!gameBoard.selectedWords.includes(selection)) {
            wrongWord()
        }

        setSelectedLetters('')
        setLastSelected()
    }

    function wrongWord() {
        setWrong(true)

        setTimeout(() => {
            setWrong(false)
        }, 1000);
    }

    function Victory() {
        if (gameBoard.gameBoard && gameBoard.wasFound.every((e) => e === true)) {
            return (<div className={styles.victory}>
                <h2>Congratulations! You found all the words!</h2>

                <button className={styles.arrow} onClick={() => loadGame()}>Try Again!</button>

                <button
                    className={styles.arrow}
                    onClick={() => window.location.pathname = '/games'}>Exit</button>

            </div>)
        } else return null
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.maintitle}>
                <h1>Alphabet Soup</h1>
                <h3>Find all the words!</h3>
            </div>
            <div className={styles.alphabetSoup}>
                <div className={styles.columnOne}>

                    <div>
                        <TableGen />
                    </div>

                    <div className={styles.confirmText}>
                        <label>Selected Word:</label>
                        <span>{selectedLetters}</span>
                        <button className={styles.clickables}
                            onClick={() => verifySelected(selectedLetters)}>Confirm Word</button>
                    </div>

                </div>

                <div className={styles.listWrapper}>

                    <ul className={styles.listt}>
                        {
                            gameBoard.selectedWords.map((e, i) =>
                                <li key={i}
                                    className={gameBoard.wasFound[i]
                                        ? styles.completed
                                        : ''}>{e}</li>)
                        }
                    </ul>
                    <div className={styles.buttonswrapper}>
                        <div>
                            <button className={styles.clickables} onClick={() => loadGame()}>Start Over!</button>

                            <button
                                className={styles.arrow}
                                onClick={() => window.location.pathname = '/games'}>Exit</button>
                        </div>
                    </div>

                </div>

                <Victory />

            </div>
        </div>
    );
}