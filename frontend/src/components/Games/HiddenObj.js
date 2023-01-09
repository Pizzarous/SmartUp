/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import sync from 'css-animation-sync';
import styles from './GamesCSS/HiddenObj.module.css';

sync('spin');

export default function HiddenObj(props) {

    const [result, setResultado] = useState(0);
    const [shake, setShake] = useState(false);
    const [coords, setCoords] = useState(props.game[0].coords);
    const [oriImg, setoriImg] = useState(props.game[0].original);
    const [modImg, setmodImg] = useState(props.game[0].modified);

    useEffect(() => {
        setCoords(props.game[0].coords);
        setoriImg(props.game[0].original);
        setmodImg(props.game[0].modified);

    }, [props.game[0]]);


    function reloadGame() {
        setResultado(0);
        setCoords(c => c.map(e => ({ ...e, found: false })))
    }


    function Victory() {
        if (coords.every((e) => e.found === true)) {
            return (
                <div className={styles.victory}>
                    <h2>Congratulations you found all the objects!</h2>

                    <button
                        className={styles.arrow}
                        onClick={() => window.location.pathname = '#/games'}>Exit</button>

                    <button className={styles.arrow} onClick={() => reloadGame()}>Try Again!</button>

                    {props.gameNumber === props.gameTotal
                        ? <></>
                        : <button
                            onClick={() => { reloadGame(); props.nextGame() }}
                            className={styles.arrow}>Next</button>}
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

    function TransparentImage({ className }) {
        return (
            <div className={className}>
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
                                id={`diff${i + 1}`}
                                shape='rect'
                                coords={`${e.coordObj[0]} , ${e.coordObj[1]},
                                    ${e.coordObj[0] + e.coordObj[2]},
                                    ${e.coordObj[1] + e.coordObj[2]}`}
                            />)
                    })}
                </map>
            </div>
        )
    }

    function Image({ className, url, children }) {
        return (
            <div className={className}
                className={shake ? styles.shake : ''}
                style={{
                    background: `url(${url}) no-repeat top left`
                    , position: 'relative'
                }}>

                {coords.map((e, i) => {
                    if (!coords[i].found) return null
                    return (
                        <div
                            key={JSON.stringify(e.coordObj)}
                            className={styles.diff}
                            style={{
                                position: 'absolute',
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
                    , width: '734px'
                    , height: '144px'
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
            <div className={styles.images}>
                <Image className={styles.originalImage} url={oriImg}>
                    <TransparentImage className={styles.transparentmapOri} />
                </Image>
            </div>
            <div className={styles.result}>{result} / {coords.length}</div>

            <StaticMap className={styles.static} url={modImg} />

            <Victory />
        </div >
    );


}