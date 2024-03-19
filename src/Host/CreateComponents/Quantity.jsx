import React, { useEffect } from "react";
import styles from "../styles/Create.module.css";
import Button from "../../components/Button";
import { BiMinus, BiPlus } from "react-icons/bi";
import Separator from "../../components/Separator";

const Quantity = ({typing, fields, setAbleToNext, contentStyles, containerStyles}) => {
    const labelTitleStyles = {
        fontWeight: '400',
        marginTop: 0,
        display: 'flex',
        flexGrow: 1,
    }
    const inputStyles = {
        width: 32,
        height: 30,
        textAlign: 'center',
        outline: 'none',
        border: 'none',
        fontSize: 18,
    }

    useEffect(() => {
        if (fields.room_size !== "" && fields.room_total > 0) {
            setAbleToNext(true);
        } else {
            setAbleToNext(false);
        }
    }, [fields]);


    return (
        <div className={styles.Container} style={containerStyles}>
            <div className={styles.Content} style={contentStyles}>
                <div className={styles.Title}>Ketersediaan Kamar</div>
                <div style={{height: 40}}></div>

                <div className={styles.LabelTitle} style={labelTitleStyles}>Ukuran Kamar</div>
                <div className={styles.CardArea} style={{marginTop: 20,marginBottom: 20}}>
                    <div className={`${styles.Card} ${fields.room_size === '3 x 3' ? styles.Active : null}`} onClick={() =>{
                        typing({
                            room_size: '3 x 3'
                        })
                    }}>3 x 3</div>
                    <div className={`${styles.Card} ${fields.room_size === '3 x 4' ? styles.Active : null}`} onClick={() =>{
                        typing({
                            room_size: '3 x 4'
                        })
                    }}>3 x 4</div>
                    <div className={`${styles.Card} ${fields.room_size === '' ? styles.Active : null}`} onClick={() =>{
                        typing({
                            room_size: ''
                        })
                    }}>Lainnya</div>
                </div>

                {
                    (fields.room_size !== "3 x 3" && fields.room_size !== "3 x 4") &&
                    <input type="text" className="input" onInput={e => typing({room_size: e.currentTarget.value})} placeholder="Masukkan info ukuran kamar" />
                }

                <div style={{height: 80}}></div>
                <div className="inline">
                    <div className={styles.LabelTitle} style={labelTitleStyles}>Total Kamar</div>
                    <Button circle accent="secondary" color="black" height={32} onClick={() => {
                        if (fields.room_total - 1 > 0) {
                            typing({
                                room_total: fields.room_total - 1
                            });
                        }
                    }}>
                        <BiMinus />
                    </Button>
                    <input type="text" value={fields.room_total} style={inputStyles} onChange={e => {
                        let val = e.currentTarget.value;
                        if (!isNaN(val) && val > 0) {
                            typing({
                                room_total: parseInt(val),
                            })
                        }
                    }}/>
                    <Button circle accent="secondary" color="black" height={32} onClick={() => typing({
                        room_total: fields.room_total + 1
                    })}>
                        <BiPlus />
                    </Button>
                </div>

                <Separator />

                <div className="inline">
                    <div className={styles.LabelTitle} style={labelTitleStyles}>Kamar Tersedia</div>
                    <Button circle accent="secondary" color="black" height={32} onClick={() => {
                        if (fields.room_available > 0) {
                            typing({
                                room_available: fields.room_available - 1
                            });
                        }
                    }}>
                        <BiMinus />
                    </Button>
                    <input type="text" value={fields.room_available} style={inputStyles} onChange={e => {
                        let val = e.currentTarget.value;
                        if (!isNaN(val) && val > 0) {
                            typing({
                                room_available: parseInt(val),
                            })
                        }
                    }}/>
                    <Button circle accent="secondary" color="black" height={32} onClick={() => typing({
                        room_available: fields.room_available + 1
                    })}>
                        <BiPlus />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Quantity;