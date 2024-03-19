import React, { useEffect, useState } from "react";
import styles from "../styles/Create.module.css";
import axios from "axios";
import config from "../../config";

const Location = ({typing, fields, setAbleToNext, ableToNext, containerStyle, contentStyles}) => {
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [subdistricts, setSubdistricts] = useState([]);

    const [isLoadingProv, setLoadingProv] = useState(true);
    const [isLoadingCity, setLoadingCity] = useState(false);
    const [isLoadingSubdistrict, setLoadingSubdistrict] = useState(false);

    useEffect(() => {
        if (isLoadingProv) {
            setLoadingProv(false);
            axios.post(`${config.baseUrl}/api/rajaongkir/province`)
            .then(response => {
                let res = response.data;
                setProvinces(res);
                if (fields.provinceID !== null) {
                    setLoadingCity(true);
                }
            })
        }
    }, [isLoadingProv, fields]);

    useEffect(() => {
        if (isLoadingCity && fields.provinceID !== null) {
            setLoadingCity(false);
            axios.post(`${config.baseUrl}/api/rajaongkir/city/${fields.provinceID}`)
            .then(response => {
                let res = response.data;
                setCities(res);
                if (fields.cityID !== null) {
                    setLoadingSubdistrict(true);
                }
            })
        }
    }, [isLoadingCity, fields]);

    useEffect(() => {
        if (isLoadingSubdistrict && fields.cityID !== null) {
            setLoadingSubdistrict(false);
            axios.post(`${config.baseUrl}/api/rajaongkir/district/${fields.provinceID}/${fields.cityID}`)
            .then(response => {
                let res = response.data;
                console.log(res);
                setSubdistricts(res);
            })
        }
    }, [isLoadingSubdistrict, fields]);

    useEffect(() => {
        if (fields.provinceID !== null && fields.cityID !== null && fields.subdistrict !== "" && fields.address !== "") {
            setAbleToNext(true);
        } else {
            setAbleToNext(false);
        }
    }, [ableToNext, fields])

    return (
        <div className={styles.Container} style={containerStyle}>
            <div className={styles.Content} style={contentStyles}>
                <div className={styles.Title}>Dimana lokasi kos kamu?</div>
                <div className={styles.Description}>
                    Detail alamat hanya akan diberitahukan kepada calon peyewa kos setelah mereka terarik. Pastikan alamat sesuai dengan lokasi kos berada.
                </div>

                <div style={{height: 20}}></div>

                {
                    provinces.length > 0 &&
                    <>
                        <div className={styles.LabelTitle}>Provinsi</div>
                        <select className="input" defaultValue={fields.province} onChange={e => {
                            let val = JSON.parse(e.currentTarget.value);
                            typing({
                                province: val.province,
                                provinceID: val.province_id,
                            })
                            setLoadingCity(true);
                            setCities([]);
                        }}>
                            {
                                fields.provinceID === null &&
                                <option value="">Pilih provinsi...</option>
                            }
                            {
                                provinces.map((prov, p) => (
                                    <option key={p} value={JSON.stringify(prov)}>{prov.province}</option>
                                ))
                            }
                        </select>
                    </>
                }

                {
                    cities.length > 0 &&
                    <>
                        <div className={styles.LabelTitle}>Kota</div>
                        <select className="input" defaultValue={fields.city} onChange={e => {
                            let val = JSON.parse(e.currentTarget.value);
                            typing({
                                city: `${val.type} ${val.city_name}`,
                                cityID: val.city_id,
                            })
                            setLoadingSubdistrict(true);
                            setSubdistricts([]);
                        }}>
                            {
                                fields.cityID === null &&
                                <option value="">Pilih kota...</option>
                            }
                            {
                                cities.map((cit, c) => (
                                    <option key={c} value={JSON.stringify(cit)}>{cit.type} {cit.city_name}</option>
                                ))
                            }
                        </select>
                    </>
                }

                {
                    subdistricts.length > 0 &&
                    <>
                        <div className={styles.LabelTitle}>Kecamatan</div>
                        <select className="input" defaultValue={fields.subdistrict} onChange={e => {
                            let val = JSON.parse(e.currentTarget.value);
                            typing({
                                subdistrict: val.subdistrict_name
                            })
                        }}>
                            {
                                fields.subdistrict === "" &&
                                <option value="">Pilih kecamatan...</option>
                            }
                            {
                                subdistricts.map((dist, d) => (
                                    <option key={d} value={JSON.stringify(dist)}>{dist.subdistrict_name}</option>
                                ))
                            }
                        </select>
                    </>
                }

                {
                    fields.subdistrict !== "" &&
                    <>
                        <div className={styles.LabelTitle}>Alamat</div>
                        <textarea className="input" defaultValue={fields.address} onInput={e => {
                            typing({
                                address: e.currentTarget.value
                            })
                        }}></textarea>
                    </>
                }
            </div>
        </div>
    )
}

export default Location;