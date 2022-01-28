/* eslint-disable jsx-a11y/alt-text */
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import sync from 'css-animation-sync';
import styles from './GamesCSS/HiddenObj.module.css';

sync('spin');

const IMG_ORI = 'https://i.imgur.com/kIc1UGR.jpg';
const IMG_DIF = 'https://i.imgur.com/rw42MWf.jpg';
const RES_WIDTH = '1323px';
const RES_HEIGHT = '536px';
const RES_WIDTH_STATIC = '734px';
const RES_HEIGHT_STATIC = '144px';

export default function HiddenObj1() {

    const [result, setResultado] = useState(0);
    const [shake, setShake] = useState(false);
    const [coords, setCoords] = useState([
        {
            slashpos: 210,
            coordObj: [55, 450, 50],
            found: false
        },
        {
            slashpos: 30,
            coordObj: [95, 480, 50],
            found: false
        },
        {
            slashpos: 410,
            coordObj: [527, 20, 200],
            found: false
        },
        {
            slashpos: 600,
            coordObj: [1230, 400, 70],
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

                    <Link to={'/games/obj2'}>
                        <button className={styles.arrow}>Next</button>
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