'use client';
import Link from 'next/link'
import {useSearchParams} from 'next/navigation';
import React, {useEffect} from 'react';

import axios from 'axios';
export default function Dashboard () {

    return(
        <>
            <div className="container">
                <h1 className="title">Title</h1>
                <button id="upstox">
                    <Link href="https://api-v2.upstox.com/login/authorization/dialog?response_type=code&client_id=a8b92bce-8025-4cef-9e4a-fafbe12345a0&redirect_uri=https://localhost:3000/dashboard">
                        Upstox
                    </Link>
                </button>
            </div>
        </>
    )
}