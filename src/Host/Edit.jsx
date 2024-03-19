import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Partials/Header";
import benefitStyles from "../Partials/styles/Benefits.module.css";
import styles from "./styles/Listing.module.css";
import { BiChevronRight, BiX } from "react-icons/bi";
import Separator from "../components/Separator";
import useUser from "../Hooks/useUser";
import axios from "axios";
import config from "../config";
import Substring from "../components/Substring";
import Popup from "../components/Popup";
import Basic from "./CreateComponents/Basic";
import Button from "../components/Button";
import Location from "./CreateComponents/Location";
import Price from "./CreateComponents/Price";
import Currency from "../components/Currency";
import Room from "./CreateComponents/Room";
import Building from "./CreateComponents/Building";
import Quantity from "./CreateComponents/Quantity";
import Facility from "./CreateComponents/Facility";
import TitleAdmin from "../Partials/TitleAdmin";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [triggerLoading, setTriggerLoading] = useState(false);
    const [listing, setListing] = useState(null);
    const [user, setUser] = useUser(true, () => {
        setLoading(true);
        setTriggerLoading(true);
    });
    const [ableToNext, setAbleToNext] = useState(false);
    const [scroll, setScroll] = useState(0);

    const basicRef = useRef(null);
    const locationRef = useRef(null);
    const priceRef = useRef(null);
    const buildingRef = useRef(null);
    const roomRef = useRef(null);
    const quantityRef = useRef(null);
    const [menuActive, setMenuActive] = useState('basic');

    const [isEditing, setEditing] = useState(null);
    const [isDeleting, setDeleting] = useState(false);
    const [delBtn, setDelBtn] = useState('');

    const typing = (toChanges) => {
        let theFields = {...listing};
        let keys = Object.keys(toChanges);
        keys.map((key, k) => {
            theFields[key] = toChanges[key];
        })
        setListing(theFields);
    }

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.get(`${config.baseUrl}/api/listing/${id}`)
            .then(response => {
                let res = response.data;
                let list = res.listing;
                let theListing = {...list};
                theListing['provinceID'] = null;
                theListing['cityID'] = null;
                theListing['price_inclusion'] = list?.price_inclusion.split(",");
                theListing['facilities_id'] = [];
                list.facilities.map(fac => theListing['facilities_id'].push(fac.id));
                
                setLoading(false);
                setListing(theListing);
            })
        }
    }, [isLoading, triggerLoading])

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = e => {
        let pos = window.scrollY;
        if (pos > 0 && pos < 470) {
            setMenuActive('basic');
        }
        if (pos > 470 && pos < 750) {
            setMenuActive('location');
        }
        if (pos > 750 && pos < 1320) {
            setMenuActive('photo')
        }
        if (pos > 1320 && pos < 1500) {
            setMenuActive('facility');
        }
        if (pos > 1500 && pos < 1800) {
            setMenuActive('quantity');
        }
        if (pos > 1800 && pos < 5500) {
            setMenuActive('price')
        }
        setScroll(pos);
    }

    const update = () => {
        if (ableToNext) {
            let formData = new FormData();
            formData.append('section', isEditing);

            let keys = Object.keys(listing);
            keys.map((key, k) => {
                formData.append(key, listing[key]);
            })

            axios.post(`${config.baseUrl}/api/listing/${id}/update`, formData)
            .then(response => {
                let res = response.data;
                setEditing(null);
                setLoading(true);
                setTriggerLoading(true);
            })
        }
    }

    const del = (e) => {
        axios.post(`${config.baseUrl}/api/listing/delete`, {
            listing_id: listing?.id,
        })
        .then(response => {
            navigate('/listing');
        })
        e.preventDefault();
    }

    return (
        <>
            <Header />
            <div className="content">
                <div className="inline" style={{
                    padding: '20px 40px 0px 40px',
                    justifyContent: 'flex-end'
                }}>
                    <Button accent="secondary" color="red" onClick={() => {
                        setDeleting(true);
                        setDelBtn(`Ya, Hapus ${listing.name}`)
                    }}>Hapus iklan</Button>
                    <Button accent="secondary" color="black" onClick={() => window.open(`https://pakkos.com/${listing?.slug}`)}>Lihat tampilan iklan</Button>
                </div>
                <div className={benefitStyles.Container} style={{padding: 40}}>
                    <div className={benefitStyles.IllustrationArea} style={{minWidth: '30%'}}>
                        <div></div>
                        <div className={styles.LeftMenu}>
                            <div className={`${styles.MenuItem} ${menuActive === 'basic' ? styles.Active : null}`} onClick={() => basicRef.current.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            })}>
                                Informasi Dasar
                            </div>
                            <div className={`${styles.MenuItem} ${menuActive === 'location' ? styles.Active : null}`} onClick={() => locationRef.current.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            })}>
                                Lokasi
                            </div>
                            <div className={`${styles.MenuItem} ${menuActive === 'photo' ? styles.Active : null}`} onClick={() => priceRef.current.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            })}>
                                Foto
                            </div>
                            <div className={`${styles.MenuItem} ${menuActive === 'facility' ? styles.Active : null}`} onClick={() => priceRef.current.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            })}>
                                Fasilitas
                            </div>
                            <div className={`${styles.MenuItem} ${menuActive === 'quantity' ? styles.Active : null}`} onClick={() => quantityRef.current.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            })}>
                                Ketersediaan Kamar
                            </div>
                            <div className={`${styles.MenuItem} ${menuActive === 'price' ? styles.Active : null}`} onClick={() => priceRef.current.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            })}>
                                Harga
                            </div>
                        </div>
                    </div>
                    <div className={benefitStyles.Content}>
                        <div className="inline" style={{marginBottom: 20}}>
                            <div className={styles.SectionTitle} style={{display: 'flex',flexGrow: 1,margin: 0}}>Informasi Dasar</div>
                            <div className={styles.LabelDescription} style={{cursor: 'pointer',textDecorationLine: 'underline'}} onClick={() => {
                                setEditing('basic')
                            }}>Edit <BiChevronRight /></div>
                        </div>

                        <div style={{marginTop: 20,display: 'flex',flexDirection: 'column',gap: 10}}>
                            <div className={styles.LabelTitle}>Nama Tempat</div>
                            <div className={styles.LabelDescription}>{listing?.name}</div>
                        </div>

                        <Separator />

                        <div style={{display: 'flex',flexDirection: 'column',gap: 10}}>
                            <div className={styles.LabelTitle}>Deskripsi</div>
                            {
                                listing !== null &&
                                <div className={styles.LabelDescription}>{Substring(listing?.description, 5, true)}</div>
                            }
                        </div>
                        <Separator />
                        <div ref={basicRef}></div>
                        <div style={{display: 'flex',flexDirection: 'column',gap: 10}}>
                            <div className={styles.LabelTitle}>Disewakan untuk</div>
                            <div className={styles.LabelDescription}>{listing?.consumer_name}</div>
                        </div>
                        <Separator />
                        <div style={{display: 'flex',flexDirection: 'column',gap: 10}}>
                            <div className={styles.LabelTitle}>Tautan kustom</div>
                            <div className={styles.LabelDescription}>pakkos.com/{listing?.slug}</div>
                        </div>

                        <div style={{height: 60}}></div>

                        <div className="inline" style={{marginBottom: 20}}>
                            <div className={styles.SectionTitle} style={{display: 'flex',flexGrow: 1,margin: 0}}>Lokasi</div>
                            <div className={styles.LabelDescription} style={{cursor: 'pointer',textDecorationLine: 'underline'}} onClick={() => {
                                setEditing('location')
                            }}>Edit <BiChevronRight /></div>
                        </div>

                        <div style={{marginTop: 20,display: 'flex',flexDirection: 'column',gap: 10}}>
                            <div className={styles.LabelTitle}>Alamat</div>
                            <div className={styles.LabelDescription}>{listing?.address}</div>
                        </div>
                        <Separator />
                        <div style={{display: 'flex',flexDirection: 'column',gap: 10}}>
                            <div className={styles.LabelTitle}>Provinsi</div>
                            <div className={styles.LabelDescription}>{listing?.province}</div>
                        </div>
                        <Separator />
                        <div style={{display: 'flex',flexDirection: 'column',gap: 10}}>
                            <div className={styles.LabelTitle}>Kota</div>
                            <div className={styles.LabelDescription}>{listing?.city}</div>
                        </div>
                        <div ref={locationRef}></div>
                        <Separator />
                        <div style={{display: 'flex',flexDirection: 'column',gap: 10}}>
                            <div className={styles.LabelTitle}>Kecamatan</div>
                            <div className={styles.LabelDescription}>{listing?.subdistrict}</div>
                        </div>
                        <Separator />
                        <div style={{display: 'flex',flexDirection: 'column',gap: 10}}>
                            <div className={styles.LabelTitle}>Catatan tambahan</div>
                            <div className={styles.LabelDescription}>{listing?.address_note}</div>
                        </div>

                        <div style={{height: 60}}></div>

                        <div className="inline" style={{marginBottom: 20}} ref={buildingRef}>
                            <div className={styles.SectionTitle} style={{display: 'flex',flexGrow: 1,margin: 0}}>Foto Bangunan</div>
                            <div className={styles.LabelDescription} style={{cursor: 'pointer',textDecorationLine: 'underline'}} onClick={() => {
                                setEditing('building')
                            }}>Edit <BiChevronRight /></div>
                        </div>

                        <div className={styles.PhotoArea}>
                            <div className={styles.PhotoItem}>
                                <img src={`${config.baseUrl}/storage/listing_photos/${listing?.front_building_photo}`} alt="Front building" />
                            </div>
                            <div className={styles.PhotoItem}>
                                <img src={`${config.baseUrl}/storage/listing_photos/${listing?.inside_building_photo}`} alt="Inside building" />
                            </div>
                            <div className={styles.PhotoItem}>
                                <img src={`${config.baseUrl}/storage/listing_photos/${listing?.streetview_building_photo}`} alt="Streetview building" />
                            </div>
                        </div>

                        <div style={{height: 60}}></div>

                        <div className="inline" style={{marginBottom: 20}} ref={roomRef}>
                            <div className={styles.SectionTitle} style={{display: 'flex',flexGrow: 1,margin: 0}}>Foto Kamar</div>
                            <div className={styles.LabelDescription} style={{cursor: 'pointer',textDecorationLine: 'underline'}} onClick={() => {
                                setEditing('room')
                            }}>Edit <BiChevronRight /></div>
                        </div>

                        <div className={styles.PhotoArea}>
                            <div className={styles.PhotoItem}>
                                <img src={`${config.baseUrl}/storage/listing_photos/${listing?.front_room_photo}`} alt="Front room" />
                            </div>
                            <div className={styles.PhotoItem}>
                                <img src={`${config.baseUrl}/storage/listing_photos/${listing?.inside_room_photo}`} alt="Inside room" />
                            </div>
                            <div className={styles.PhotoItem}>
                                <img src={`${config.baseUrl}/storage/listing_photos/${listing?.bath_room_photo}`} alt="Bath room" />
                            </div>
                            {
                                listing?.other_photo !== null &&
                                <div className={styles.PhotoItem}>
                                    <img src={`${config.baseUrl}/storage/listing_photos/${listing?.other_photo}`} alt="Other room" />
                                </div>
                            }
                        </div>

                        <div style={{height: 60}}></div>

                        <div className="inline" style={{marginBottom: 20}}>
                            <div className={styles.SectionTitle} style={{display: 'flex',flexGrow: 1,margin: 0}}>Fasilitas</div>
                            <div className={styles.LabelDescription} style={{cursor: 'pointer',textDecorationLine: 'underline'}} onClick={() => {
                                setEditing('facility')
                            }}>Edit <BiChevronRight /></div>
                        </div>

                        {
                            listing !== null &&
                            Object.keys(listing.facilities_display).map((key, k) => (
                                <>
                                    <div style={{marginBottom: 5}}>{key}</div>
                                    {
                                        listing.facilities_display[key].map((fac, f) => (
                                            <div key={f} className={styles.LabelDescription} style={{marginTop: 5}}>{fac.facility.name}</div>
                                        ))
                                    }
                                    {
                                        k !== listing.facilities_display.length - 1 &&
                                        <Separator />
                                    }
                                </>
                            ))
                        }

                        <div style={{height: 60}}></div>

                        <div className="inline" style={{marginBottom: 20}}>
                            <div className={styles.SectionTitle} style={{display: 'flex',flexGrow: 1,margin: 0}}>Ketersediaan Kamar</div>
                            <div className={styles.LabelDescription} style={{cursor: 'pointer',textDecorationLine: 'underline'}} onClick={() => {
                                setEditing('quantity')
                            }}>Edit <BiChevronRight /></div>
                        </div>

                        <div style={{marginTop: 20,display: 'flex',flexDirection: 'column',gap: 10}}>
                            <div className={styles.LabelTitle}>Ukuran Kamar</div>
                            <div className={styles.LabelDescription}>{listing?.room_size} m</div>
                        </div>
                        <Separator />
                        <div style={{display: 'flex',flexDirection: 'column',gap: 10}}>
                            <div className={styles.LabelTitle}>Total Kamar</div>
                            <div className={styles.LabelDescription}>{listing?.room_total}</div>
                        </div>
                        <Separator />
                        <div style={{display: 'flex',flexDirection: 'column',gap: 10}}>
                            <div className={styles.LabelTitle}>Kamar Tersedia</div>
                            <div className={styles.LabelDescription}>{listing?.room_available}</div>
                        </div>
                        <div ref={quantityRef}></div>

                        <div style={{height: 60}}></div>

                        <div className="inline" style={{marginBottom: 20}} ref={priceRef}>
                            <div className={styles.SectionTitle} style={{display: 'flex',flexGrow: 1,margin: 0}}>Harga Sewa</div>
                            <div className={styles.LabelDescription} style={{cursor: 'pointer',textDecorationLine: 'underline'}} onClick={() => {
                                setEditing('price')
                            }}>Edit <BiChevronRight /></div>
                        </div>

                        <div style={{marginTop: 20,display: 'flex',flexDirection: 'column',gap: 10}}>
                            {
                                listing !== null &&
                                <div className={styles.LabelTitle}>{Currency(listing?.price).encode()}</div>
                            }
                            <div className={styles.LabelDescription}>per bulan
                                {
                                    listing?.price_inclusion.length > 0 &&
                                    ` (Termasuk ${listing?.price_inclusion.join(', ')})`
                                }
                            </div>
                        </div>

                        <div style={{height: 200}}></div>
                    </div>
                </div>
            </div>

            {
                isEditing === 'basic' &&
                <Popup onDismiss={() => setEditing(null)}>
                    <Basic typing={typing} fields={listing} ableToNext={ableToNext} setAbleToNext={setAbleToNext} containerStyles={{padding: '20px 0px'}} contentStyles={{
                        width: '90%'
                    }}  />

                    <div className="inline" style={{justifyContent: 'center',marginBottom: 20}}>
                        <Button style={{width: '90%',opacity: ableToNext ? 1 : '0.5'}} onClick={update}>Simpan Perubahan</Button>
                    </div>
                </Popup>
            }
            {
                isEditing === 'location' &&
                <Popup onDismiss={() => setEditing(null)}>
                    <Location typing={typing} fields={listing} ableToNext={ableToNext} setAbleToNext={setAbleToNext} containerStyles={{padding: '20px 0px'}} contentStyles={{
                        width: '90%'
                    }}  />
                    <div className="inline" style={{justifyContent: 'center',marginBottom: 20}}>
                        <Button style={{width: '90%',opacity: ableToNext ? 1 : '0.5'}} onClick={update}>Simpan Perubahan</Button>
                    </div>
                </Popup>
            }
            {
                isEditing === 'price' &&
                <Popup onDismiss={() => setEditing(null)}>
                    <Price typing={typing} fields={listing} ableToNext={ableToNext} setAbleToNext={setAbleToNext} containerStyles={{padding: '20px 0px'}} contentStyles={{
                        width: '90%'
                    }}  />
                    <div className="inline" style={{justifyContent: 'center',marginBottom: 20}}>
                        <Button style={{width: '90%',opacity: ableToNext ? 1 : '0.5'}} onClick={update}>Simpan Perubahan</Button>
                    </div>
                </Popup>
            }
            {
                isEditing === 'building' &&
                <Popup onDismiss={() => setEditing(null)}>
                    <Building typing={typing} fields={listing} ableToNext={ableToNext} setAbleToNext={setAbleToNext} containerStyles={{padding: '20px 0px'}} contentStyles={{
                        width: '90%'
                    }}  />
                    <div className="inline" style={{justifyContent: 'center',marginBottom: 20}}>
                        <Button style={{width: '90%',opacity: ableToNext ? 1 : '0.5'}} onClick={update}>Simpan Perubahan</Button>
                    </div>
                </Popup>
            }
            {
                isEditing === 'room' &&
                <Popup onDismiss={() => setEditing(null)}>
                    <Room typing={typing} fields={listing} ableToNext={ableToNext} setAbleToNext={setAbleToNext} containerStyles={{padding: '20px 0px'}} contentStyles={{
                        width: '90%'
                    }}  />
                    <div className="inline" style={{justifyContent: 'center',marginBottom: 20}}>
                        <Button style={{width: '90%',opacity: ableToNext ? 1 : '0.5'}} onClick={update}>Simpan Perubahan</Button>
                    </div>
                </Popup>
            }
            {
                isEditing === 'quantity' &&
                <Popup onDismiss={() => setEditing(null)}>
                    <Quantity typing={typing} fields={listing} ableToNext={ableToNext} setAbleToNext={setAbleToNext} containerStyles={{padding: '20px 0px'}} contentStyles={{
                        width: '90%'
                    }}  />

                    <div className="inline" style={{justifyContent: 'center',marginBottom: 20}}>
                        <Button style={{width: '90%',opacity: ableToNext ? 1 : '0.5'}} onClick={update}>Simpan Perubahan</Button>
                    </div>
                </Popup>
            }
            {
                isEditing === 'facility' &&
                <Popup onDismiss={() => setEditing(null)}>
                    <Facility columnName="facilities_id" typing={typing} fields={listing} ableToNext={ableToNext} setAbleToNext={setAbleToNext} containerStyles={{padding: '20px 0px'}} contentStyles={{
                        width: '90%'
                    }} onChange={() => {
                        let theListing = {...listing};
                        console.log(theListing.facilities_id);
                    }} />
                    <div className="inline" style={{justifyContent: 'center',marginBottom: 20}}>
                        <Button style={{width: '90%',opacity: ableToNext ? 1 : '0.5'}} onClick={update}>Simpan Perubahan</Button>
                    </div>
                </Popup>
            }
            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <TitleAdmin
                        title="Hapus Iklan"
                        right={
                            <Button circle color="muted" accent="secondary" onClick={() => setDeleting(false)}>
                                <BiX />
                            </Button>
                        }
                    />
                    <form onSubmit={del}>
                        <div>Yakin ingin menghapus iklan {listing.name}? Tindakan ini akan menghapus seluruh data dan tidak dapat dipulihkan.</div>

                        <Button style={{width: '100%'}} color="red">{delBtn}</Button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default Edit;