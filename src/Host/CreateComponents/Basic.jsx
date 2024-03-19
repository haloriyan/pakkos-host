import React, { useEffect, useState } from "react";
import styles from "../styles/Create.module.css";
import axios from "axios";
import config from "../../config";
import { useDebouncedCallback } from "use-debounce";
import { FaSpinner } from "react-icons/fa";
import { BiCheck, BiX } from "react-icons/bi";

const Basic = ({typing, fields, setAbleToNext, ableToNext, containerStyles = null, contentStyles = null}) => {
    const [slugValid, setSlugValid] = useState(false);
    const [isChecking, setChecking] = useState(false);
    
    useEffect(() => {
        if (fields.name !== "" && fields.consumer_name !== "" && fields.description !== "" && fields.slug !== "" && slugValid) {
            setAbleToNext(true);
        } else {
            setAbleToNext(false);
        }
    }, [ableToNext, fields, slugValid]);

    const consumers = [
        'Pasutri', 'Khusus Laki-laki', 'Khusus Perempuan', 'Campur'
    ];

    const checkSlug = () => {
        axios.get(`${config.baseUrl}/api/listing/${fields.slug}`)
        .then(response => {
            let res = response.data;
            setChecking(false);
            if (res.listing === null) {
                setSlugValid(true);
            } else {
                setSlugValid(false);
            }
        })
    }

    const debounce = useDebouncedCallback(checkSlug, 2000);
    
    return (
        <div className={styles.Container} style={containerStyles}>
            <div className={styles.Content} style={contentStyles}>
                <div className={styles.Title}>Beri tahu kami mengenai rumah kos</div>
                <div className={styles.Description}>
                    Pada langkah ini, kami akan menanyakan beberapa hal mengenai rumah kos. Kemudian beri tahu kami lokasinya dan apa saja fasilitas yang di dapat penyewa kos.
                </div>

                <div style={{height: 40}}></div>

                <div className={styles.LabelTitle}>Apa nama kos ini?</div>
                <div className={styles.LabelDescription}>
                    Saran: Kos (spasi) Nama Kos, Tanpa Nama Kecamatan dan Kota
                </div>
                <input type="text" className="input" value={fields.name} onInput={e => typing({
                    name: e.currentTarget.value,
                })} />

                <div className={styles.LabelTitle}>Deskripsikan tempat kos</div>
                <textarea className="input" defaultValue={fields.description} onInput={e => typing({
                    description: e.currentTarget.value
                })}></textarea>

                <div className={styles.LabelTitle}>Disewakan untuk siapa?</div>
                <select className="input" defaultValue={fields.consumer_name} onChange={e => {
                    let val = e.currentTarget.value;
                    typing({consumer_name: val});
                }}>
                    <option value="">Pilih...</option>
                    {
                        consumers.map((consumer, c) => (
                            <option value={consumer} key={c}>{consumer}</option>
                        ))
                    }
                </select>

                <div className={styles.LabelTitle}>Tautan Kustom</div>
                <div className="input">
                    pakkos.com/
                    <input type="text" value={fields.slug} style={{
                        height: 24,
                        border: 'none',
                        outline: 'none',
                        display: 'flex',
                        flexGrow: 1,
                        fontSize: 16
                    }} onInput={e => {
                        setChecking(true);
                        typing({slug: e.currentTarget.value.replace(/ /g, '-')});
                        setSlugValid(false);
                        debounce()
                    }} />
                    {
                        isChecking ?
                        <FaSpinner />
                        :
                        <>
                            {
                                (!slugValid && fields.slug !== "") &&
                                <BiX color={"#e74c3c"} />
                            }
                            {
                                (slugValid && fields.slug !== "") &&
                                <BiCheck color={"#2ecc71"} />
                            }
                        </>
                    }
                </div>
                <div className={styles.LabelDescription}>
                    Tautan yang mudah diingat dan unik akan lebih mudah dicantumkan dan dibagikan lewat kartu nama, situs web, atau media sosial. Misalnya: pakkos.com/kosgubeng. Baca kebijakan tautan kustom Pakkos
                </div>
            </div>
        </div>
    )
}

export default Basic;