'use client';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import React, {SetStateAction, useEffect, useState} from 'react';

import axios from 'axios';
export default function Dashboard () {

    const [code, setCode] = useState<string>('');

    const fetchData = async() => {
        await axios.post('https://api-v2.upstox.com/login/authorization/token?code=' + code + '&client_id='+process.env.NEXT_PUBLIC_UPSTOX_CLIENT_ID+'&client_secret='+process.env.NEXT_PUBLIC_UPSTOX_CLIENT_SECRET+'&redirect_uri=https://localhost:3001/dashboard&grant_type=authorization_code')
            .then((response) => {console.log(response)})
            .catch((error) => console.log(error))
    }
    
    const searchParams = useSearchParams();
    useEffect(() => {
        if(searchParams){
            const params = JSON.stringify(searchParams.get('code'));
            setCode(params);
            console.log(`Code: ${code}`);
            code && fetchData();
        }
    }, []);

    return(
        <>
            <div className="container">
                <h1 className="title">Title</h1>
                <button id="upstox">
                    <a href={process.env.NEXT_PUBLIC_UPSTOX_URL}>
                        Upstox
                    </a>
                </button>
            </div>
        </>
    )
}