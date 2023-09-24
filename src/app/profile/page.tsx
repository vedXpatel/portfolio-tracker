'use client';
import {useSearchParams} from 'next/navigation';
import {useEffect} from "react";
const Profile = () => {
    const searchParams = useSearchParams();
    useEffect(() => {
        if(searchParams){//couldn't set code using useState
            console.log(`Code: ${searchParams.get('token')}`);
        }
    }, []);
    return (
        <>

        </>
    )
}

export default Profile;