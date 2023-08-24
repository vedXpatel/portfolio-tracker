'use client';
export default function Dashboard () {

    const upstoxLogin = async() => {
        const authURL: any = process.env.UPSTOX_URL;
        console.log(process.env.UPSTOX_URL);
        console.log('inside login function');
        const redirectToLogin = await fetch(authURL);
    }

    return(
        <>
            <div className="container">
                <h1 className="title">Title</h1>
                <button id="upstox" onClick={upstoxLogin}>Upstox</button>
            </div>
        </>
    )
}