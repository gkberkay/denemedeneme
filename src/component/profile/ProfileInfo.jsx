import React from 'react'
import './profileInfo.css'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';


const ProfileInfo = () => {
    const navigate = useNavigate()
    const cookies = new Cookies();

    const logOut = async () => {
        cookies.remove('token');
        navigate('/signin')
        toast.success('Çıkış Başarılı')

    }
    return (
        <div className='profile'>
            <div className='profileInfo'>
                <ol className='deneme'>
                    <li><Link to="/mainpage/editprofile">Profili Düzenle</Link></li>
                    <li><Link to="/mainpage/editpassword">Şifreyi Sıfırla</Link></li>
                    <li><a onClick={logOut}>Çıkış</a></li>
                </ol>
            </div>
        </div>
    )
}

export default ProfileInfo;