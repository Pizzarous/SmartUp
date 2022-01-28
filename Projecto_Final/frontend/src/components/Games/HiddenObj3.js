/* eslint-disable jsx-a11y/alt-text */
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import sync from 'css-animation-sync';
import styles from './GamesCSS/HiddenObj.module.css';

sync('spin');

const IMG_ORI = 'https://i.imgur.com/Vzu6tlA.jpg';
const IMG_DIF = 'https://i.imgur.com/XgZ3tLq.jpg';
const RES_WIDTH = '1323px';
const RES_HEIGHT = '536px';
const RES_WIDTH_STATIC = '734px';
const RES_HEIGHT_STATIC = '144px';

export default function HiddenObj3() {

    const [result, setResultado] = useState(0);
    const [shake, setShake] = useState(false);
    const [coords, setCoords] = useState([
        {
            slashpos: 5,
            coordObj: [900, 400, 110],
            found: false
        },
        {
            slashpos: 160,
            coordObj: [530, 230, 110],
            found: false
        },
        {
            slashpos: 320,
            coordObj: [90, 400, 100],
            found: false
        },
        {
            slashpos: 470,
            coordObj: [1100, 190, 100],
            found: false
        },
        {
            slashpos: 600,
            coordObj: [570, 0, 130],
            found: false
        }
    ])

    function reloadGame() {
        setResultado(0);
        setCoords(c => c.map(e => ({ ...e, found: false })))
    }

    function Victory() {
        if (coords.every((e) => e.found === true)) {
            return (
                <div className={styles.victory}>
                    <h2>Congratulations you found all the objects!</h2>

                    <Link to={'/games'}>
                        <button className={styles.arrow}>Exit</button>
                    </Link>

                    <button className={styles.arrow} onClick={() => reloadGame()}>Try Again!</button>

                    <Link to={'/games/obj1'}>
                        <button className={styles.arrow}>Start Over!</button>
                    </Link>

                </div>
            )
        } else return null


    }

    function updateRes(id) {
        if (id === undefined) {
            setShake(true)
            setTimeout(() => {
                setShake(false)
            }, 520);

        } else if (coords[id].found) {
            return null

        } else {
            setCoords(c => {
                const c2 = c
                c2[id].found = true
                return c2
            });
            setResultado(e => e + 1)
        }
    }

    function TransparentMap({ id }) {
        return (
            <div id={id}>
                <img
                    className={styles.transparentmap}
                    src='https://i.imgur.com/h7dDXqA.png'
                    useMap='#findobj'
                    onClick={() => updateRes(undefined)} />

                <map name='findobj'>
                    {coords.map((e, i) => {
                        return (
                            <area
                                key={JSON.stringify(e.coordObj)}
                                onClick={() => updateRes(i)}
                                className={`styles.diff${i + 1}`}
                                shape='rect'
                                coords={
                                    `${e.coordObj[0]} , ${e.coordObj[1]},
                                    ${e.coordObj[0] + e.coordObj[2]},
                                    ${e.coordObj[1] + e.coordObj[2]}`}
                            />)
                    })}
                </map>
            </div>
        )
    }

    function NonTransparentMap({ id, url, children }) {
        return (
            <div id={id}
                className={shake ? styles.shake : ''}
                style={{
                    background: `url(${url}) no-repeat top left`
                    , width: RES_WIDTH
                    , height: RES_HEIGHT
                    , borderRadius: '10px'
                    , position: 'relative'
                }}>

                {coords.map((e, i) => {
                    if (!coords[i].found) return null
                    return (
                        <div
                            key={JSON.stringify(e.coordObj)}
                            className={styles.diff}
                            style={{
                                display: coords[i].found ? 'inline' : 'none',
                                left: `${e.coordObj[0]}px`,
                                top: `${e.coordObj[1]}px`,
                                width: `${e.coordObj[2]}px`,
                                height: `${e.coordObj[2]}px`,
                            }}>
                        </div>
                    )
                })}

                {children}

            </div>
        )
    }

    function StaticMap({ id, url }) {
        return (
            <div id={id}
                style={{
                    position: 'relative',
                    background: `url(${url}) no-repeat top left`
                    , width: RES_WIDTH_STATIC
                    , height: RES_HEIGHT_STATIC
                    , borderRadius: '10px'
                    , margin: '20px'
                }}>
                {coords.map((e, i) => {
                    if (!coords[i].found) return null
                    return (
                        <div
                            key={JSON.stringify(e.coordObj)}
                            className={styles.redslash}
                            style={{
                                display: coords[i].found ? 'inline' : 'none',
                                left: `${e.slashpos}px`,
                                top: `72px`,
                                width: `100px`,
                                height: `0px`,
                            }}>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className={styles.wrapper}>
            <h1>Can you find all the hidden objects in the picture?</h1>

            <NonTransparentMap className={styles.originalmap} url={IMG_ORI}>
                <TransparentMap className={styles.transparentmapOri} />
            </NonTransparentMap>

            <div className={styles.result}>{result} / 4</div>

            <StaticMap className={styles.static} url={IMG_DIF} />

            <div className={styles.buttonswrapper}>
                <div>
                    <button className={styles.clickables} onClick={() => reloadGame()}>Reset</button>

                    <Link to={'/games'}>
                        <button className={styles.clickables}>Exit</button>
                    </Link>
                </div>
            </div>

            <Victory />
        </div >
    );


}