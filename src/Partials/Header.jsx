import { BiCog, BiHelpCircle, BiHome, BiLock, BiLogOut, BiMenu, BiQr, BiUser } from "react-icons/bi";
import styles from "./styles/Header.module.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import config from "../config";
import useUser from "../Hooks/useUser";

const Header = ({expand = true, title = '', active = null}) => {
    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isProfileActive, setProfileActive] = useState(false);
    const [isMenuMobileActive, setMenuMobileActive] = useState(false);
    const [user, setUser] = useUser(true);

    useEffect(() => {
        if (user !== null && user !== 'unauthenticated') {
            setLoggedIn(true);
            console.log(user);
        }
    }, [user])

    const handleClick = e => {
        let target = e.target;
        let classes = target.classList[0]?.split('_');

        if (window.screen.width > 480) {
            if (classes === undefined || classes?.indexOf('Header') < 0 && isProfileActive) {
                setProfileActive(false);
            }
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    });

    const activeStyle = {borderWidth: 1,borderStyle: 'solid',borderColor: '#ddd'};

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
    // GOOGLE AUTHENTICATION END

    return (
        <>
            <div className={styles.HeaderMobile}>
                <div className={styles.LogoArea}>
                    {/* <img src="/icon.png" alt="Logo Kelas Personalia" className={styles.Logo} /> */}
                    Pakkos
                </div>
                <div className={styles.Toggler} onClick={() => setMenuMobileActive(!isMenuMobileActive)}>
                    <BiMenu />
                </div>
            </div>
            {
                isLoggedIn ?
                <div className={`${styles.MenuMobile} ${isMenuMobileActive ? styles.MenuMobileActive : ''}`}>
                    {
                        ((user !== null || user !== 'unauthenticated') && user.role === 'host') ? null :
                        <Link to={'/'} className={styles.MenuMobileItem} style={active === 'home' ? activeStyle : null}>
                            <BiHome />
                            Home
                        </Link>
                    }
                    
                    <Link to={'/listing'} className={styles.MenuMobileItem} style={active === 'listing' ? activeStyle : null}>
                        <BiQr />
                        Kelola Iklan
                    </Link>
                    <Link to={'/'} className={styles.MenuMobileItem} style={active === 'MenuA' ? activeStyle : null}>
                        <BiHelpCircle />
                        Pusat Bantuan
                    </Link>

                    <div className={styles.Separator} style={{margin: '20px 0px',width: '100%'}}></div>
                    <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center',gap: 20}}>
                        {
                            (user === null || user === 'unauthenticated') ?
                            <div className={styles.ProfileIcon} style={{
                                backgroundImage: 'url(/images/default_user.png)',
                                borderRadius: 999,
                                height: 42,
                            }}></div>
                            :
                            <div className={styles.ProfileIcon} style={{
                                backgroundImage: `url(${user.photo})`,
                                borderRadius: 999,
                                height: 42,
                            }}></div>
                        }
                        <div style={{fontWeight: 600}}>{user.name}</div>
                    </div>

                    <div className={styles.ProfileMenu}>
                        <a href="#" className={`${styles.ProfileMenuItem} ${styles.ProfileMenuItemActive}`}>
                            <BiUser />
                            Profile
                        </a>
                        <a href="#" className={`${styles.ProfileMenuItem}`}>
                            <BiCog />
                            
                            Settings
                        </a>
                        <div className={styles.Separator}></div>
                        <a href="#" className={`${styles.ProfileMenuItem}`}>
                            <BiLogOut />
                            Logout
                        </a>
                    </div>
                </div>
                :
                <div className={`${styles.MenuMobile} ${isMenuMobileActive ? styles.MenuMobileActive : ''}`}>
                <div className={styles.MenuMobileItem} style={active === 'home' ? activeStyle : null} onClick={loggingIn}>
                    <BiLock />
                    Login
                </div>
                <a href="https://help.pakkos.com" target="_blank" className={styles.MenuMobileItem} style={active === 'MenuA' ? activeStyle : null}>
                    <BiHelpCircle />
                    Pusat Bantuan
                </a>
            </div>
            }
            <div className={styles.Header} style={{left: expand ? '0%' : '20%'}}>
                {
                    expand &&
                    <a href="https://pakkos.com" className={styles.LogoArea}>
                        {/* <img src="/icon.png" alt="Logo Kelas Personalia" className={styles.Logo} /> */}
                        Pakkos
                    </a>
                }
                <div className={styles.Left}>
                    {title}
                </div>
                <div className={styles.Right}>
                    <div className={styles.Navigation}>
                        {
                            ((user !== null || user !== 'unauthenticated') && user.role === 'host') ? null :
                            <Link to={'/'} className={`${styles.Item} ${active === 'home' ? styles.Active : null}`}>
                                <BiHome />
                                Home
                            </Link>
                        }
                        
                        <Link to={'/listing'} className={`${styles.Item} ${active === 'listing' ? styles.Active : null}`}>
                            <BiQr />
                            Kelola Iklan
                        </Link>
                        <a href="https://help.pakkos.com" target="_blank" className={`${styles.Item} ${active === 'help' ? styles.Active : null}`}>
                            <BiHelpCircle />
                            Pusat Bantuan
                        </a>
                    </div>
                    <div className={styles.ProfileIcon} onClick={() => setProfileActive(!isProfileActive)} style={{
                        backgroundImage: (user === null || user === 'unauthenticated') ? 'url(/images/default_user.png)' : `url(${user.photo})`,
                        borderRadius: 999,
                        height: 42,
                    }}></div>
                </div>
            </div>
            {
                isProfileActive &&
                <>
                    {
                        isLoggedIn ?
                        <div className={styles.ProfileMenu}>
                            <a href="#" className={`${styles.ProfileMenuItem} ${styles.ProfileMenuItemActive}`}>
                                <BiUser />
                                Profile
                            </a>
                            <a href="#" className={`${styles.ProfileMenuItem}`}>
                                <BiCog />
                                
                                Settings
                            </a>
                            <div className={styles.Separator}></div>
                            <a href="#" className={`${styles.ProfileMenuItem}`} onClick={loggingOut}>
                                <BiLogOut />
                                Logout
                            </a>
                        </div>
                        :
                        <div className={styles.ProfileMenu}>
                            <div className={`${styles.ProfileMenuItem} ${styles.ProfileMenuItemActive}`} style={{justifyContent: 'center',cursor: 'pointer'}} onClick={loggingIn}>
                                <BiLock />
                                Login
                            </div>
                        </div>
                    }
                </>
            }
        </>
    )
}

export default Header;