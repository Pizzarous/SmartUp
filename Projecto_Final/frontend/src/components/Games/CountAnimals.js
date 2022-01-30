import React, { useEffect, useState } from 'react'
import styles from './GamesCSS/CountAnimals.module.css'

// const RES_WIDTH = '1200px';
// const RES_HEIGHT = '800px';

export default function CountAnimals(props) {

    const [result, setResult] = useState(0);
    const [isRight, setIsRight] = useState(false);
    const [hasAnswered, setHasAnswered] = useState(false)
    const [url, setURL] = useState(props.game[0].url);
    const [animal, setAnimal] = useState(props.game[0].animal);
    const [rightAnswer, setRightAnswer] = useState(props.game[0].rightAnswer);

    useEffect(() => {
        setURL(props.game[0].url);
        setAnimal(props.game[0].animal);
        setRightAnswer(props.game[0].rightAnswer);
    }, [props.game[0]]);


    function isCorrect(e) {
        setHasAnswered(true)
        if (parseInt(e) === rightAnswer) {
            setIsRight(true)
            setResult(0)
            return
        }
    }

    function reloadGame() {
        setResult(0)
        setIsRight(false)
        setHasAnswered(false)
        setURL(props.game[0].url);
        setAnimal(props.game[0].animal);
        setRightAnswer(props.game[0].rightAnswer);
    }

    function Victory() {
        if (hasAnswered && isRight) {

            return (
                <div className={styles.victory}>
                    <h2>You were right!</h2>
                    <h2>{`There were indeed "${rightAnswer}" ${animal.toLowerCase()}!`}</h2>

                    <button
                        className={styles.arrow}
                        onClick={() => window.location.pathname = '/games'}>Exit</button>

                    <button className={styles.arrow}
                        onClick={() => reloadGame()}>Try Again!</button>

                    {props.gameNumber === props.gameTotal
                        ? <></>
                        : <button
                            onClick={() => { reloadGame(); props.nextGame() }}
                            className={styles.arrow}>Next</button>}
                </div>
            )

        } else if (hasAnswered && !isRight) {
            return (
                <div className={styles.victory}>
                    <h2>Try again</h2>
                    <h2>{`"${result}" is not the right number of ${animal.toLowerCase()}!`}</h2>


                    <button
                        className={styles.arrow}
                        onClick={() => window.location.pathname = '/games'}>Exit</button>


                    <button className={styles.arrow}
                        onClick={() => reloadGame()}>Try Again!</button>
                </div>)

        } else {
            return null
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.paragraph}>
                <h1>{`How many ${animal.toLowerCase()} do you see?`}</h1>
            </div>
            <div className={styles.imageSection}>
                <img src={url} alt={animal} />
            </div>
            <div className={styles.bottomwrapper}>
                <div className={styles.answerSection}>
                    <div className={styles.answerText}>
                        <h2>{`Count the ${animal.toLowerCase()}!`}</h2>
                        <h2>{`And press the number to submit`}</h2>
                    </div>
                    <div className={styles.buttonzone}>

                        <button onClick={() => {
                            if (result === 0) setResult(0)
                            else setResult(result - 1)
                        }}>
                            -</button>

                        <div className={styles.bottombutton}>
                            <button
                                onClick={() => isCorrect(result)}>
                                {result}</button>
                        </div>

                        <button
                            onClick={() => setResult(result + 1)}>
                            +</button>

                    </div>
                </div>

            </div>

            <Victory />

        </div>
    )
}

