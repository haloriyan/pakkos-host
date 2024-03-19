import React, { useEffect } from "react";
import styles from "../styles/Create.module.css";
import InputFile from "../../components/InputFile";
import images from "../../images/images.svg";
import config from "../../config";
import Button from "../../components/Button";
import { BiX } from "react-icons/bi";

const Building = ({typing, fields, setAbleToNext, containerStyles, contentStyles}) => {
    const inputFileProps = {
        label: "Unggah dari perangkat",
        labelStyle: {
            textDecoration: 'underline',
            fontSize: 16,
            fontWeight: '400',
        },
        style: {
            height: 'auto',
            width: '100%'
        },
        aspectRatio: '16/9',
        icon: (
            <img src={images} />
        )
    };
    const additionalElementStyles = {
        padding: '10px 20px',
        border: '1px solid #ddd',
        borderRadius: 12,
        position: 'absolute',
        top: 20,left: 20,
        fontSize: 14,
        fontWeight: '400'
    }

    useEffect(() => {
        if (fields.front_building_photo !== null && fields.inside_building_photo !== null && fields.streetview_building_photo !== null) {
            setAbleToNext(true);
        } else {
            setAbleToNext(false);
        }
    }, [fields]);

    return (
        <div className={styles.Container} style={containerStyles}>
            <div className={styles.Content} style={contentStyles}>
                <div className={styles.Title}>Tambahkan beberapa foto rumah kos</div>
                <div className={styles.Description}>
                    Foto yang menarik adalah hal pertama yang diperhatikan oleh calon penyewa.
                </div>

                <div style={{display: 'flex',flexDirection: 'column',gap: 20,marginTop: 40}}>
                    {
                        (fields.front_building_photo === null || typeof fields.front_building_photo !== 'string') ?
                            <InputFile
                                {...inputFileProps}
                                additionalElement={
                                    fields.front_building_photo === null &&
                                    <div style={additionalElementStyles}>
                                        Foto bangunan tampak depan
                                    </div>
                                }
                                onChange={(input, e) => {
                                    typing({
                                        front_building_photo: input.files[0]
                                    })
                                }}
                            />
                        :
                        <div className="relative">
                            <img src={`${config.baseUrl}/storage/listing_photos/${fields.front_building_photo}`} alt="Front building" className={styles.UploadedPhoto} />
                            <div className="absolute" style={{top: 20,right: 20}}>
                                <Button circle color="red" height={36} onClick={() => typing({front_building_photo: null})}>
                                    <BiX />
                                </Button>
                            </div>
                        </div>
                    }

                    {
                        (fields.inside_building_photo === null || typeof fields.inside_building_photo !== 'string') ?
                            <InputFile
                                {...inputFileProps}
                                additionalElement={
                                    fields.inside_building_photo === null &&
                                    <div style={additionalElementStyles}>
                                        Foto dalam bangunan
                                    </div>
                                }
                                onChange={(input, e) => {
                                    typing({
                                        inside_building_photo: input.files[0]
                                    })
                                }}
                            />
                        :
                        <div className="relative">
                            <img src={`${config.baseUrl}/storage/listing_photos/${fields.inside_building_photo}`} alt="Inside building" className={styles.UploadedPhoto} />
                            <div className="absolute" style={{top: 20,right: 20}}>
                                <Button circle color="red" height={36} onClick={() => typing({inside_building_photo: null})}>
                                    <BiX />
                                </Button>
                            </div>
                        </div>
                    }

                    {
                        (fields.streetview_building_photo === null || typeof fields.streetview_building_photo !== 'string') ?
                            <InputFile
                                {...inputFileProps}
                                additionalElement={
                                    fields.streetview_building_photo === null &&
                                    <div style={additionalElementStyles}>
                                        Foto bangunan dari jalan
                                    </div>
                                }
                                onChange={(input, e) => {
                                    typing({
                                        streetview_building_photo: input.files[0]
                                    })
                                }}
                            />
                        :
                        <div className="relative">
                            <img src={`${config.baseUrl}/storage/listing_photos/${fields.streetview_building_photo}`} alt="Streetview building" className={styles.UploadedPhoto} />
                            <div className="absolute" style={{top: 20,right: 20}}>
                                <Button circle color="red" height={36} onClick={() => typing({streetview_building_photo: null})}>
                                    <BiX />
                                </Button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Building;