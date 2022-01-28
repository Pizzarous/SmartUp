import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./GamesScreen.module.css";

function GamesScreen(){
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    return (
        <div className={styles.gamesMainDiv}>
            <div className={styles.categoriesDiv}>
                    <div className={styles.attentionTitle}>
                            <h1>ATTENTION</h1>
                    </div>
                    <div className={styles.attentionDiv}>
                        <div className={styles.eachGameAttMainDiv}>
                            <div className={styles.eachGameBtnDiv}>
                                <button className={styles.btn}>
                                    PLAY NOW!
                                </button>
                            </div>
                        </div>
                        <div className={styles.eachGameAttMainDiv}>
                            <div className={styles.eachGameBtnDiv}>
                                <Link to={'/games/alphabetsoup'}>   
                                    <button className={styles.btn}>
                                        PLAY NOW!
                                    </button>
                                </Link>    
                            </div> 
                        </div>  
                        <div className={styles.eachGameAttMainDiv}> 
                            <div className={styles.eachGameBtnDiv}>
                                <button className={styles.btn}>
                                    PLAY NOW!
                                </button>
                            </div>
                        </div> 
                    </div>
                    <div className={styles.attentionTitle}>
                            <h1>CALCULATION</h1>
                    </div>
                    <div className={styles.attentionDiv}>
                        <div className={styles.eachGameCalcMainDiv}>
                            <div className={styles.eachGameBtnDiv}>
                                <button className={styles.btn}>
                                    PLAY NOW!
                                </button>
                            </div>
                        </div>
                        <div className={styles.eachGameCalcMainDiv}>
                            <div className={styles.eachGameBtnDiv}>   
                                <button className={styles.btn}>
                                    PLAY NOW!
                                </button>
                            </div> 
                        </div>  
                    </div>
            </div>
        </div>
    )
}

export default GamesScreen;