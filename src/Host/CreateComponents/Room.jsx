import React, { useEffect } from "react";
import styles from "../styles/Create.module.css";
import InputFile from "../../components/InputFile";
import images from "../../images/images.svg";
import Button from "../../components/Button";
import config from "../../config";
import { BiX } from "react-icons/bi";

const Room = ({typing, fields, setAbleToNext, containerStyles, contentStyles}) => {
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
        if (fields.front_room_photo !== null && fields.inside_room_photo !== null && fields.bath_room_photo !== null) {
            setAbleToNext(true);
        } else {
            setAbleToNext(false);
        }
    }, [fields]);

    return (
        <div className={styles.Container} style={containerStyles}>
            <div className={styles.Content} style={contentStyles}>
                <div className={styles.Title}>Tambahkan beberapa foto kamar</div>
                <div className={styles.Description}>
                    Foto yang menarik adalah hal pertama yang diperhatikan oleh calon penyewa.
                </div>

                <div style={{display: 'flex',flexDirection: 'column',gap: 20,marginTop: 40}}>
                    {
                        (fields.front_room_photo === null || typeof fields.front_room_photo !== 'string') ?
                            <InputFile
                                {...inputFileProps}
                                additionalElement={
                                    fields.front_room_photo === null &&
                                    <div style={additionalElementStyles}>
                                        Foto kamar tampak depan
                                    </div>
                                }
                                onChange={(input, e) => {
                                    typing({
                                        front_room_photo: input.files[0]
                                    })
                                }}
                            />
                        :
                        <div className="relative">
                            <img src={`${config.baseUrl}/storage/listing_photos/${fields.front_room_photo}`} alt="Front building" className={styles.UploadedPhoto} />
                            <div className="absolute" style={{top: 20,right: 20}}>
                                <Button circle color="red" height={36} onClick={() => typing({front_room_photo: null})}>
                                    <BiX />
                                </Button>
                            </div>
                        </div>
                    }
                    {
                        (fields.inside_room_photo === null || typeof fields.inside_room_photo !== 'string') ?
                            <InputFile
                                {...inputFileProps}
                                additionalElement={
                                    fields.inside_room_photo === null &&
                                    <div style={additionalElementStyles}>
                                        Foto dalam kamar
                                    </div>
                                }
                                onChange={(input, e) => {
                                    typing({
                                        inside_room_photo: input.files[0]
                                    })
                                }}
                            />
                        :
                        <div className="relative">
                            <img src={`${config.baseUrl}/storage/listing_photos/${fields.inside_room_photo}`} alt="Front building" className={styles.UploadedPhoto} />
                            <div className="absolute" style={{top: 20,right: 20}}>
                                <Button circle color="red" height={36} onClick={() => typing({inside_room_photo: null})}>
                                    <BiX />
                                </Button>
                            </div>
                        </div>
                    }
                    {
                        (fields.bath_room_photo === null || typeof fields.bath_room_photo !== 'string') ?
                            <InputFile
                                {...inputFileProps}
                                additionalElement={
                                    fields.bath_room_photo === null &&
                                    <div style={additionalElementStyles}>
                                        Foto kamar mandi
                                    </div>
                                }
                                onChange={(input, e) => {
                                    typing({
                                        bath_room_photo: input.files[0]
                                    })
                                }}
                            />
                        :
                        <div className="relative">
                            <img src={`${config.baseUrl}/storage/listing_photos/${fields.bath_room_photo}`} alt="Front building" className={styles.UploadedPhoto} />
                            <div className="absolute" style={{top: 20,right: 20}}>
                                <Button circle color="red" height={36} onClick={() => typing({bath_room_photo: null})}>
                                    <BiX />
                                </Button>
                            </div>
                        </div>
                    }
                    {
                        (fields.other_photo === null || typeof fields.other_photo !== 'string') ?
                            <InputFile
                                {...inputFileProps}
                                additionalElement={
                                    fields.other_photo === null &&
                                    <div style={additionalElementStyles}>
                                        Foto lainnya (opsional)
                                    </div>
                                }
                                onChange={(input, e) => {
                                    typing({
                                        other_photo: input.files[0]
                                    })
                                }}
                            />
                        :
                        <div className="relative">
                            <img src={`${config.baseUrl}/storage/listing_photos/${fields.other_photo}`} alt="Front building" className={styles.UploadedPhoto} />
                            <div className="absolute" style={{top: 20,right: 20}}>
                                <Button circle color="red" height={36} onClick={() => typing({other_photo: null})}>
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

export default Room;