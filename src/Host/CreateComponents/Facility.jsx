import React, { useEffect, useState } from "react";
import styles from "../styles/Create.module.css";
import config from "../../config";
import InArray from "../../components/InArray";
import axios from "axios";

const Facility = ({typing, fields, setAbleToNext, containerStyles, contentStyles, columnName = 'facilities', onChange = null}) => {
    useEffect(() => {
        setAbleToNext(true);
    }, [fields]);

    const [facilities, setFacilities] = useState([]);
    const [isLoadingFacility, setLoadingFacility] = useState(true);

    useEffect(() => {
        if (isLoadingFacility) {
            setLoadingFacility(false);
            axios.get(`${config.baseUrl}/api/facility`)
            .then(response => {
                let res = response.data;
                setFacilities(res.facilities);
            })
        }
    }, [isLoadingFacility]);
    
    return (
        <div className={styles.Container} style={containerStyles}>
            <div className={styles.Content} style={contentStyles}>
                <div className={styles.Title}>Beri tahu penyewa apa saja fasilitas yang ditawarkan di kos ini</div>

                {
                    Object.keys(facilities).map((key, k) => (
                        <div key={k}>
                            <div className={styles.LabelTitle}>{key}</div>
                            <div className={styles.CardArea} style={{gap: 20,marginTop: 10,flexWrap: 'wrap'}}>
                                {
                                    facilities[key].map((fac, f) => (
                                        <div className={`${styles.Card} ${styles.Facility} ${InArray(fac.id, fields[columnName]) ? styles.Active : null}`} key={f} style={{flexBasis: '30%'}} onClick={() => {
                                            let facies = [...fields[columnName]];
                                            if (InArray(fac.id, facies)) {
                                                facies.splice(facies.indexOf(fac.id), 1);
                                            } else {
                                                facies.push(fac.id);
                                            }
                                            let toChange = {};
                                            toChange[columnName] = facies;

                                            typing(toChange);
                                            if (onChange !== null) {
                                                onChange();
                                            }
                                        }}>
                                            <img src={`${config.baseUrl}/storage/facility_icons/${fac.icon}`} alt={fac.name} style={{
                                                height: 40
                                            }} />
                                            <div className={styles.LabelDescription}>{fac.name}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Facility;