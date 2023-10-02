"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { ModeToggle } from "@/components/navbar/theme-toggle";


export default function dashboard() {
  const [code, setCode] = useState<string | null>();
  const [authToken, setAuthToken] = useState<string | null>("something");

  const fetchData = async () => {
    try {
      await axios
        .post("http://localhost:5000/proxy", {
          code: code,
          client_id: process.env.NEXT_PUBLIC_UPSTOX_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_UPSTOX_CLIENT_SECRET,
          redirect_uri: "https://localhost:3000/dashboard",
          grant_type: "authorization_code",
          "Access-Control-Allow-Headers": "*",
        })
        .then((response: object | any) => {
          console.log(response.data.access_token);
          const token = response.data.access_token;
          token && alert(`Successfully Logged In!`);
          token !== undefined &&
            setAuthToken(response.data.access_token);
        })
        .catch((error: object | any) => {
          alert(error.response.data.errors[0].message);
          console.warn(error)
        });
    } catch (error) {
      console.warn(error);
    }
  };

  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams) {
      setCode(searchParams.get("code"));
      console.log(`Code: ${code}`);
    }
  }, []);

  const upstoxLogout = async () => {
    const response = await axios({
      method: "DELETE",
      url: process.env.NEXT_PUBLIC_UPSTOX_BASE_API + "/logout",
      headers: {
        "accept": "application/json",
        "Api-Version": "2.0",
        "Authorization": "Bearer " + authToken,
      },
    });
    response.data.status === "success"
      ? alert("logged out successfully")
      : alert("unable to log out");
  };

  useEffect(() => {
    code && fetchData();
    console.log(`Code inside: ${code}`);
  }, [code, fetchData]);

  return (
    <>
      <div className="container">
        <ModeToggle />
        <h1 className="title">Title</h1>
        <button id="upstox">
          <a href={process.env.NEXT_PUBLIC_UPSTOX_URL}>Upstox</a>
        </button>
        <Link href={{ pathname: "/profile", query: { token: authToken } }}>
          Holdings
        </Link>
        <button onClick={upstoxLogout}>Logout</button>
      </div>
    </>
  );
}
