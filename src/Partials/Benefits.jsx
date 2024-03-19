import React from "react";
import styles from "./styles/Benefits.module.css";
import { BiHeart, BiSolidHand, BiStore } from "react-icons/bi";
import Button from "../components/Button";
import Illustration from "../images/benefit.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { useGoogleLogin } from "@react-oauth/google";

const Benefits = ({user}) => {
    const navigate = useNavigate();

    const requestToBeHost = () => {
        axios.post(`${config.baseUrl}/api/user/request-to-be-host`, {
            user_id: user.id,
        })
        .then(response => {
            let res = response.data;
            window.localStorage.setItem('user_data', JSON.stringify(res.user));
            navigate(0);
        })
    }

    const loggingOut = (e) => {
        e.preventDefault();
        window.localStorage.removeItem('user_data');
        window.localStorage.removeItem('gat');
        navigate(0);
        // setUser(null);
        // setLoggedIn(false);
    }

    // GOOGLE AUTHENTICATION START
    const authToAPI = (name, email, photo, password, expiry) => {
        axios.post(`${config.baseUrl}/api/user/login`, {
            name: name,
            email: email,
            photo: photo,
            at: password,
        }, {
            method: "POST"
        })
        .then(response => {
            let res = response.data;
            if (response.status === 200) {
                window.localStorage.setItem('gat', JSON.stringify({
                    token: password,
                    expiry,
                }))
                window.localStorage.setItem('user_data', JSON.stringify(res.user));
                navigate(0);
            }
        })
        .catch(err => {
            console.log('ERROR COK', err);
        })
    }
    const getProfile = (token, expiry) => {
        axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
        .then(res => {
            res = res.data;
            authToAPI(res.name, res.email, res.picture, token, expiry);
        });
    }
    const loggingIn = useGoogleLogin({
        onSuccess: response => {
            getProfile(response.access_token, response.expires_in);
        },
        flow: 'implicit'
    });

    return (
        <div className={styles.Container}>
            {
                user.requested_to_be_host ?
                <div className={styles.Content}>
                    <div style={{height: 60}}></div>
                    <div className={styles.Title}>Kami telah menerima permintaanmu</div>
                    <div className={styles.Description}>
                        Mohon menunggu beberapa hari dan tim kami akan menghubungimu sebelum bisa menjadi Host
                    </div>
                </div>
                :
                <div className={styles.Content}>
                    <div className={styles.Title}>Manfaat beriklan di Pakkos</div>
                    <div className={styles.Description}>
                        Dapatkan berbagai kemudahan dalam mempromosikan kosmu
                    </div>

                    <div className={styles.Item}>
                        <BiStore size={32} />
                        <div className={styles.ItemContent}>
                            <div className={styles.ItemTitle}>Bebas Biaya Komisi</div>
                            <div className={styles.ItemDescription}>Kini seluruh transaksi booking tidak dikenakan biaya komisi (gratis).</div>
                        </div>
                    </div>
                    <div className={styles.Item}>
                        <BiSolidHand size={32} />
                        <div className={styles.ItemContent}>
                            <div className={styles.ItemTitle}>Management Dibantu</div>
                            <div className={styles.ItemDescription}>Kami menyediakan tim khusus untuk setiap host agar lebih optimal.</div>
                        </div>
                    </div>
                    <div className={styles.Item}>
                        <BiHeart size={32} />
                        <div className={styles.ItemContent}>
                            <div className={styles.ItemTitle}>Naikkan Level Hospitality</div>
                            <div className={styles.ItemDescription}>Tampil lebih profesional dan lebih ramah ke calon penghuni kos.</div>
                        </div>
                    </div>

                    <div style={{height: 60}}></div>
                    {
                        (user === null || user === 'unauthenticated') ?
                        <Button style={{width: '100%'}} onClick={loggingIn}>Mulai Iklankan Kosmu</Button>
                        :
                        <Button style={{width: '100%'}} onClick={() => {
                            if (user.role === "host") {
                                navigate('/create')
                            } else {
                                requestToBeHost();
                            }
                        }}>Buat Iklan Sekarang</Button>
                    }
                </div>
            }
            <div className={styles.IllustrationArea}>
                <img src={Illustration} alt="Ilustrasi" className={styles.Illustration} />
            </div>
        </div>
    )
}

export default Benefits;