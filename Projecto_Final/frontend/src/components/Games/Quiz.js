import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styles from './GamesCSS/Quiz.module.css';


export default function Quiz(props) {
    const [score, setScore] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [status, setStatus] = useState()
    const [questions, setQuestions] = useState(props.game)

    useEffect(() => {
        setQuestions(props.game)

    }, [props.game]);

    function reloadGame() {
        setScore(0)
        setCurrentQuestion(0)
        setStatus()
    }

    function handleAnswer(i, option) {
        setStatus(i)
        if (option.isCorrect) {
            setScore(score + 1)
        }
        setTimeout(() => {
            setStatus(-1)
            setCurrentQuestion((actualQuestion) => {
                return actualQuestion + 1
            })
        }, 1000);
    }

    const showScore = currentQuestion === questions.length

    return (
        <div className={styles.app}>
            {showScore ? (
                <div className={styles.questionSection}>
                    <div className={styles.victory}>

                        <div className={styles.questionCount}>
                            <span>Question {currentQuestion}</span> / {questions.length}
                        </div>

                        <div className={styles.questionText}>
                            You score {score} of {questions.length}!
                        </div>

                        <div className={styles.button}>

                            {props.gameNumber === props.gameTotal
                                ? <></>
                                : <button
                                    onClick={() => { reloadGame(); props.nextGame() }}
                                    className={styles.arrow}>Next</button>}

                            <button className={styles.arrow} onClick={() => reloadGame()}>Try Again!</button>

                            <Link to={'../games'}>
                                <button className={styles.arrow}>Exit</button>
                            </Link>
                        </div>
                    </div>
                </div>

            ) : (
                <>
                    <div className={styles.questionSection}>
                        <div className={styles.questionCount}>
                            <span>Question {currentQuestion + 1}</span> / {questions.length}
                        </div>

                        <div className={styles.questionText}>{questions[currentQuestion].questionText}
                        </div>
                    </div>
                    <div className={styles.answers}>
                        <div className={styles.answerSection}>
                            {questions[currentQuestion] && questions[currentQuestion].answerOptions?.map(
                                (answerOption, i) => (

                                    <button className={status === i
                                        ? (answerOption.isCorrect
                                            ? styles.correct
                                            : styles.incorrect)
                                        : ''}
                                        onClick={() => handleAnswer(i, answerOption)}
                                        key={i}>
                                        {answerOption.answerText}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}