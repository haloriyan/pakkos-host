import React from "react";
import styles from "./styles/TitleAdmin.module.css";

const TitleAdmin = ({title = '', description = '', right = null, left = null}) => {
    return (
        <div className="inline" style={{marginBottom: 20}}>
            {
                left !== null &&
                <>{left}</>
            }
            <div className={styles.Left}>
                <div className={styles.Title}>{title}</div>
                <div className={styles.Description}>{description}</div>
            </div>
            {
                right !== null &&
                <>{right}</>
            }
        </div>
    )
}

export default TitleAdmin;