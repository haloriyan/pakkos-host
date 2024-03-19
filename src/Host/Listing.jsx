import React, { useEffect, useState } from "react";
import Header from "../Partials/Header";
import Benefits from "../Partials/Benefits";
import styles from "./styles/Listing.module.css";
import Button from "../components/Button";
import { BiMap, BiPlus, BiX } from "react-icons/bi";
import { MdBed } from "react-icons/md";
import Checkbox from "../components/Checkbox";
import InArray from "../components/InArray";
import pending from "../images/pending.svg";
import check from "../images/check.svg";
import x from "../images/x.svg";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import useUser from "../Hooks/useUser";
import axios from "axios";
import config from "../config";
import Popup from "../components/Popup";
import TitleAdmin from "../Partials/TitleAdmin";

const Listing = () => {
    const navigate = useNavigate();
    const [haveListing, setHaveListing] = useState(false);
    const [isActive, setActive] = useState(false);
    const [multipler, setMultipler] = useState([]);
    const [pageTitle, setPageTitle] = useState('Kelola Iklan - Pakkos');
    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [triggerLoading, setTriggerLoading] = useState(false);
    const [user, setUser] = useUser(true, () => {
        setLoading(true);
        setTriggerLoading(true);
    });

    const [isDeleting, setDeleting] = useState(false);
    const [delBtn, setDelBtn] = useState('');

    useEffect(() => {
        if (haveListing) {
            document.title = pageTitle;
        } else {
            document.title = 'Mulai Beriklan - Pakkos';
        }
    }, [haveListing])

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.get(`${config.baseUrl}/api/listing`, {
                headers: {
                    "UserID": user.id,
                }
            })
            .then(response => {
                let res = response.data;
                setRooms(res.listings);
                setLoading(false);
            })
        }
    }, [isLoading, triggerLoading, user])

    const del = (e) => {
        axios.post(`${config.baseUrl}/api/listing/delete`, {
            listing_id: room?.id,
        })
        .then(response => {
            navigate(0);
        })
        e.preventDefault();
    }
    
    return (
        <>
            <Header active={'listing'} />
            <div className="content">
                {
                    (user === null || user === 'unauthenticated' || user?.role === "user") ?
                    <Benefits user={user} />
                    :
                    <div className="inner_content">
                        <div className={`inline ${styles.Top}`}>
                            <div className={styles.TopLeft}>
                                <div className={styles.TopTitle}>{rooms.length} Tempat</div>
                                <div className={`inline ${styles.TopInputs}`}>
                                    <input type="text" className={styles.Input} />
                                    <select className={styles.Input} style={{backgroundColor: '#fff'}}>
                                        <option>Fasilitas</option>
                                        <option>Opsi Lainnya</option>
                                    </select>
                                </div>
                            </div>
                            <Button accent="secondary" onClick={() => navigate('/create')}>
                                <BiPlus />
                                Buat Iklan
                            </Button>
                        </div>

                        <div style={{height: 40}}></div>

                        {
                            window.screen.width > 480 ?
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <Checkbox active={isActive} setActive={setActive} />
                                        </th>
                                        <th>IKLAN</th>
                                        <th>STATUS</th>
                                        <th>TOTAL KAMAR</th>
                                        <th>KAMAR TERSEDIA</th>
                                        <th>LOKASI</th>
                                        <th>WAKTU DIBUAT</th>
                                        <th>PERLU TINDAKAN</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        rooms.map((roo, r) => {
                                            let inMultipler = InArray(roo.id, multipler);
                                            return (
                                                <tr key={r}>
                                                    <td>
                                                        <Checkbox active={inMultipler} onClick={() => {
                                                            let mltp = [...multipler];
                                                            if (inMultipler) {
                                                                let i = mltp.indexOf(roo.id);
                                                                mltp.splice(i, 1);
                                                            } else {
                                                                mltp.push(roo.id);
                                                            }
                                                            setMultipler(mltp);
                                                        }} />
                                                    </td>
                                                    <td className="inline">
                                                        <img className={styles.Cover} alt={roo.name} src={`${config.baseUrl}/storage/listing_photos/${roo.front_building_photo}`} />
                                                        {roo.name}
                                                    </td>
                                                    <td>
                                                        {
                                                            roo.is_approved === null ?
                                                            <div className="inline">
                                                                <img src={pending} alt="pending icon" />
                                                                Dalam Proses
                                                            </div>
                                                            :
                                                            <>
                                                            {
                                                                roo.is_approved ?
                                                                <div className="inline">
                                                                    <img src={check} alt="check icon" />
                                                                    Aktif
                                                                </div>
                                                                :
                                                                <div className="inline">
                                                                    <img src={x} alt="x icon" />
                                                                    Tidak aktif
                                                                </div>
                                                            }
                                                            </>
                                                        }
                                                    </td>
                                                    <td>{roo.room_total}</td>
                                                    <td>{roo.room_available}</td>
                                                    <td>{roo.subdistrict}, {roo.city}</td>
                                                    <td>{moment(roo.created_at).format('DD MMM')}</td>
                                                    <td>
                                                        {
                                                            roo.is_approved !== null &&
                                                            <select className="action input" onChange={e => {
                                                                let val = e.currentTarget.value;
                                                                if (val === "edit") {
                                                                    navigate(`/listing/${roo.id}/edit`)
                                                                } else {
                                                                    setDeleting(true);
                                                                    setRoom(roo);
                                                                    setDelBtn(`Ya, Hapus ${roo.name}`);
                                                                }
                                                            }}>
                                                                <option value="">Tindakan</option>
                                                                <option value="edit">Edit</option>
                                                                <option value="delete">Hapus</option>
                                                            </select>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            :
                            <div className={styles.ListingContainer}>
                                {
                                    rooms.map((roo, r) => (
                                        <div key={r} className={styles.ListingCard}>
                                            {/* <div className={styles.ListingCover}></div> */}
                                            <img src={`${config.baseUrl}/storage/listing_photos/${roo.front_building_photo}`} alt="Front build" className={styles.ListingCover} />
                                            <div className={styles.ListingTitle}>{roo.name}</div>
                                            <div className={styles.ListingInfo}>
                                                <BiMap />
                                                {roo.subdistrict}, {roo.city}
                                            </div>
                                            <div className={styles.ListingInfo}>
                                                <MdBed />
                                                {roo.room_total} kamar
                                            </div>
                                            <div style={{height: 10}}></div>
                                            {
                                                roo.is_approved === null ?
                                                <div className={styles.ListingInfo}>
                                                    <img src={pending} alt={'pending'} />
                                                    Dalam Proses
                                                </div>
                                                :
                                                <>
                                                {
                                                    roo.is_approved ?
                                                    <div className={styles.ListingInfo}>
                                                        <img src={check} alt={'check'} />
                                                        Aktif
                                                    </div>
                                                    :
                                                    <div className={styles.ListingInfo}>
                                                        <img src={x} alt={'x'} />
                                                        Tidak Aktif
                                                    </div>
                                                }
                                                </>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>
                }
            </div>

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
                        <div>Yakin ingin menghapus iklan {room.name}? Tindakan ini akan menghapus seluruh data dan tidak dapat dipulihkan.</div>

                        <Button style={{width: '100%'}} color="red">{delBtn}</Button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default Listing;