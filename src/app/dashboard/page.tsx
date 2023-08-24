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
                    <Link href={JSON.stringify(process.env.NEXT_PUBLIC_UPSTOX_URL)}>
                        Upstox
                    </Link>
                </button>
            </div>
        </>
    )
}