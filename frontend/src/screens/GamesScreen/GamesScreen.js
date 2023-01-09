import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./GamesScreen.module.css";

function GamesScreen() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    return (
        <div className={styles.gamesMainDiv}>
            <div className={styles.categoriesDiv}>
                <div className={styles.attentionTitle}>
                    <h1>ATTENTION GAMES</h1>
                </div>
                <div className={styles.attentionDiv}>
                    <div className={styles.eachGameAttMainDiv}
                        style={{ backgroundImage: "url(https://i.imgur.com/stgLdEJ.jpg)" }}>
                        <div className={styles.eachGameBtnDiv}>
                            {/* userInfo */ true == true ? (
                                <Link to={'#/games/differences'}>
                                    <button className={styles.btn}>
                                        SPOT THE DIFFERENCES
                                    </button>
                                </Link>
                            ) : (
                                <>
                                    <Link to={'#/login'}>
                                        <button className={styles.btn}>
                                            LOGIN HERE TO PLAY!
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={styles.eachGameAttMainDiv}
                        style={{ backgroundImage: "url(https://i.imgur.com/jHUfQ05.jpg)" }}>
                        <div className={styles.eachGameBtnDiv}>
                            {/* userInfo */ true == true ? (
                                <Link to={'#/games/alphabetsoup'}>

                                    <button className={styles.btn}>
                                        ALPHABET SOUP
                                    </button>
                                </Link>
                            ) : (
                                <>
                                    <Link to={'#/login'}>
                                        <button className={styles.btn}>
                                            LOGIN HERE TO PLAY!
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={styles.eachGameAttMainDiv}
                        style={{ backgroundImage: "url(https://i.imgur.com/5fDehWd.jpg)" }}>
                        <div className={styles.eachGameBtnDiv}>
                            {/* userInfo */ true == true ? (
                                <Link to={'#/games/objects'}>
                                    <button className={styles.btn}>
                                        FIND THE OBJECTS
                                    </button>
                                </Link>
                            ) : (
                                <>
                                    <Link to={'#/login'}>
                                        <button className={styles.btn}>
                                            LOGIN HERE TO PLAY!
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.attentionTitle}>
                    <h1>MATH GAMES</h1>
                </div>
                <div className={styles.attentionDiv}>
                    <div className={styles.eachGameCalcMainDiv}
                        style={{ backgroundImage: "url(https://i.imgur.com/7oFJhDH.jpg)" }}>
                        <div className={styles.eachGameBtnDiv}>
                            {/* userInfo */ true == true ? (
                                <Link to={'#/games/quiz'}>
                                    <button className={styles.btn}>
                                        MATH QUIZZES
                                    </button>
                                </Link>
                            ) : (
                                <>
                                    <Link to={'#/login'}>
                                        <button className={styles.btn}>
                                            LOGIN HERE TO PLAY!
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={styles.eachGameCalcMainDiv}
                        style={{ backgroundImage: "url(https://i.imgur.com/hnoEShK.jpg)" }}>
                        <div className={styles.eachGameBtnDiv}>
                            {/* userInfo */ true == true ? (
                                <Link to={'#/games/countanimals'}>
                                    <button className={styles.btn}>
                                        COUNT THE ANIMALS
                                    </button>
                                </Link>
                            ) : (
                                <>
                                    <Link to={'#/login'}>
                                        <button className={styles.btn}>
                                            LOGIN HERE TO PLAY!
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default GamesScreen;