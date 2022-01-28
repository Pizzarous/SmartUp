/* eslint-disable jsx-a11y/alt-text */
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import sync from 'css-animation-sync';
import styles from './GamesCSS/SpotDiff.module.css';

sync('spin');

export default function SpotDiff(props) {
    console.log(props.game[props.gameNumber])
    const [result, setResultado] = useState(0);
    const [shake1, setShake1] = useState(false);
    const [shake2, setShake2] = useState(false);
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

    console.log(props.gameNumber)
    console.log(props.gameTotal)
    function Victory() {
        if (coords.every((e) => e.found === true)) {
            return (
                <div className={styles.victory}>
                    <h2>Congratulations you found all the differences!</h2>

                    <Link to={'../games'}>
                        <button className={styles.arrow}>Exit</button>
                    </Link>

                    <button className={styles.arrow} onClick={() => reloadGame()}>Try Again!</button>

                    {/* <button className={styles.arrow} onClick={() => reloadGame()}>Next</button> */}
                    {props.gameNumber === props.gameTotal
                        ? <></>
                        : <button
                            onClick={() => { reloadGame(); props.nextGame() }}
                            className={styles.arrow}>Next</button>}
                </div>
            )
        } else return null
    }

    function updateRes(id, mapid) {
        if (id === undefined) {
            if (mapid === 'transparentmapOri') {
                setShake1(true)
                setTimeout(() => {
                    setShake1(false)
                }, 520);

            } else {
                setShake2(true)
                setTimeout(() => {
                    setShake2(false)
                }, 520);
            }

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

    function TransparentImage({ className, mapid }) {
        return (
            <div className={className}>
                <img className={styles.transparentmap}
                    src='https://i.imgur.com/k9MhcQ0.png'
                    useMap='#finddif'
                    onClick={() => updateRes(undefined, mapid)} />

                <map name='finddif'>
                    {coords.map((e, i) => {
                        return (
                            <area
                                key={JSON.stringify(e.coordObj)}
                                onClick={() => updateRes(i)}
                                id={`diff${i + 1}`}
                                shape='rect'
                                coords={`${e.coordObj[0]},${e.coordObj[1]},
                                ${e.coordObj[0] + e.coordObj[2]},
                                ${e.coordObj[1] + e.coordObj[2]}`}
                            />
                        )
                    })}
                </map>
            </div>
        )
    }

    function Image({ className, url, children, shaker }) {
        return (
            <div className={className}
                className={shaker ? styles.shake : ''}
                style={{
                    background: `url(${url}) no-repeat top left`,
                    position: 'relative'
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

    return (
        <div className={styles.wrapper}>
            <h1>Can you spot all the differences in the picture?</h1>

            <div className={styles.images}>
                <Image className={styles.originalImage} url={oriImg} shaker={shake1}>
                    <TransparentImage className={styles.transparentmapOri} mapid='transparentmapOri' />
                </Image>
            </div>

            <div className={styles.images}>
                <Image className={styles.differentImage} url={modImg} shaker={shake2}>
                    <TransparentImage className={styles.transparentmapDif} mapid='transparentmapDif' />
                </Image>
            </div>

            <span className={styles.result}><h1>{result} / 7</h1></span>

            <Victory />

        </div>
    );
}