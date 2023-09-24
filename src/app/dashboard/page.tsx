'use client';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import React, {SetStateAction, useEffect, useState} from 'react';

import axios from 'axios';
export default function Dashboard () {

    const [code, setCode] = useState<string | null>();

    const fetchData = async() => {
        // await axios.post('https://api-v2.upstox.com/login/authorization/token?code=' + code + '&client_id='+process.env.NEXT_PUBLIC_UPSTOX_CLIENT_ID+'&client_secret='+process.env.NEXT_PUBLIC_UPSTOX_CLIENT_SECRET+'&redirect_uri=https://localhost:3000/dashboard&grant_type=authorization_code')
        //     .then((response) => {console.log(response)})
        //     .catch((error) => console.log(error))
    try {

        const response = await axios({
            method: 'POST',
            url: 'https://api-v2.upstox.com/login/authorization/token',
            headers: {
                'accept': 'application/json',
                'Api-Version': '2.0',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin':'*',
            },
            data: {
                code: JSON.stringify(code),
                client_id: JSON.stringify(process.env.NEXT_PUBLIC_UPSTOX_CLIENT_ID),
                client_secret: JSON.stringify(process.env.NEXT_PUBLIC_UPSTOX_CLIENT_SECRET),
                redirect_uri: 'https://localhost:3000/dashboard',
                grant_type: 'authorization_code',
            },
        });
        console.log(`response received: ${response.data}`)
        // await axios.post('http://localhost:5000/proxy',
        // {
        //             code: JSON.stringify(code),
        //             client_id: JSON.stringify(process.env.NEXT_PUBLIC_UPSTOX_CLIENT_ID),
        //             client_secret: JSON.stringify(process.env.NEXT_PUBLIC_UPSTOX_CLIENT_SECRET),
        //             redirect_uri: 'https://localhost:3000/dashboard',
        //             grant_type: 'authorization_code',
        // })
        // .then((response) => console.log(response.data))
        //     .catch((error) => console.error(error))
    } catch(error) {
        console.warn(error);
    }
    }

    const searchParams = useSearchParams();
    useEffect(() => {
        if(searchParams){
            setCode(searchParams.get('code'));  //couldn't set code using useState
            console.log(`Code: ${code}`);
        }
    }, []);

    useEffect(() => {
        code && fetchData();
        console.log(`Code inside: ${code}`);
    },[code, fetchData])

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