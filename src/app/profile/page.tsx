"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
const Profile = () => {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    if (searchParams) {
      console.log(`Code: ${searchParams.get("token")}`);
      setToken(JSON.stringify(searchParams.get("token")));
    }
  }, []);

  const getHoldings = async () => {
    const response = await axios({
      method: "GET",
      url:
        process.env.NEXT_PUBLIC_UPSTOX_BASE_API +
        "/portfolio/long-term-holdings",
      headers: {
        accept: "application/json",
        "Api-Version": "2.0",
        Authorization: token,
      },
    });
    return response;
  };

  useEffect(() => {
    if (token) {
      getHoldings()
        .then((response) => console.log(response.data))
        .catch((error) => console.warn(error));
    }
  }, [token]);

  return <></>;
};

export default Profile;
