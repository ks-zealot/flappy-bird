import React, {useEffect, useState} from 'react';
import './AdminScreen.css'
import axios from "axios";
function AdminScreen(props) {
    let [stats, setStats] = useState('')
    useEffect(() => {
        axios.get('https://visgame.xyz/stats').then(result => {
            setStats(result.data)
        })
    }, []);
    return (
        <div dangerouslySetInnerHTML={{__html: stats}}></div>
    );
}

export default AdminScreen;