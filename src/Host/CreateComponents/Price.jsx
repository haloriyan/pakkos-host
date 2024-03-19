import React, { useEffect } from "react";
import styles from "../styles/Create.module.css";
import Currency from "../../components/Currency";
import config from "../../config";
import Switch from "../../components/Switch";
import InArray from "../../components/InArray";

const Price = ({typing, fields, setAbleToNext, contentStyles, containerStyles}) => {
    const switchInclusion = key => {
        let inclusions = [...fields.price_inclusion];
        if (InArray(key, inclusions)) {
            inclusions.splice(
                inclusions.indexOf(key, 1)
            );
        } else {
            inclusions.push(key);
        }
        typing({
            price_inclusion: inclusions
        })
    }

    useEffect(() => {
        if (fields.price >= 100000) {
            setAbleToNext(true);
        } else {
            setAbleToNext(false);
        }
    }, [fields]);

    return (
        <div className={styles.Container} style={containerStyles}>
            <div className={styles.Content} style={contentStyles}>
                <div className={styles.Title}>Sekarang tetapkan harga sewa</div>
                <div className={styles.Description}>Kamu bisa mengubahnya kapan saja</div>

                <div style={{height: 40}}></div>

                <div className={styles.LabelTitle}>Harga sewa per-bulan</div>
                <input type="text" value={Currency(fields.price).encode()} style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    marginTop: 20,
                    fontSize: 48,
                    fontWeight: '700',
                    color: config.primaryColor,
                    outline: 'none',
                    border: 'none',
                    borderBottom: '1px solid #ddd',
                    padding: '20px 0px'
                }} onInput={e => {
                    let val = Currency(e.currentTarget.value).decode();
                    if (isNaN(val)) {
                        val = 0;
                    }
                    typing({
                        price: val,
                    })
                }} />

                {
                    fields.price < 100000 &&
                    <div style={{
                        marginTop: 10,
                        fontSize: 14,
                        color: '#e74c3c'
                    }}>
                        Harga minimum yang bisa ditawarkan adalah Rp 100.000
                    </div>
                }

                <div className={styles.LabelDescription} style={{margin: '40px 0px 20px 0px'}}>Harga sudah termasuk</div>

                <div className="inline">
                    <Switch active={InArray('Listrik', fields.price_inclusion)} onChange={() => {
                        switchInclusion('Listrik');
                    }} />
                    <div className={styles.LabelDescription}>Listrik</div>
                </div>
                <div className="inline" style={{marginTop: 10}}>
                    <Switch active={InArray('Air PDAM', fields.price_inclusion)} onChange={() => switchInclusion('Air PDAM')} />
                    <div className={styles.LabelDescription}>Air PDAM</div>
                </div>
            </div>
        </div>
    )
}

export default Price;