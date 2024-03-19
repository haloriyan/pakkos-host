import React from "react";
import styles from "../styles/Create.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const Finish = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.Container}>
            <div className={styles.Content} style={{paddingTop: 40}}>
                <div style={{textAlign: 'center'}} className={styles.Title}>Data Kos Terkirim</div>
                <div style={{textAlign: 'center'}} className={styles.Description}>Data kos berhasil dikirim dan akan diverifikasi admin dalam 2x24 jam. Segera lengkapi data diri kamu setelah kos di verifikasi.</div>
                <Button style={{width: '100%',marginTop: 20}} onClick={() => {
                    navigate('/listing');
                }}>Kembali ke Halaman Utama</Button>
            </div>
        </div>
    )
}

export default Finish;