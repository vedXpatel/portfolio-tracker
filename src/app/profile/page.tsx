"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
const Profile = () => {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | undefined>();
  const [holdings, setHoldings] = useState<Array<object>>([]);

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
        "accept": "application/json",
        "Api-Version": "2.0",
        "Authorization": "Bearer" + token,
      },
    });
    return response;
  };

  useEffect(() => {
    if (token) {
      getHoldings()
        .then((response) => {
          console.log(response.data.data);
          setHoldings(response.data.data);
        })
        .catch((error) => console.warn(error));
    }
  }, [token]);

  return (
      <>
        {
          holdings.length > 0 &&
            holdings.map((item,index) => {
              return(
                  <p key={index}>
                    {item.company_name}
                  </p>
              )
            })
        }
      </>
      )
};

export default Profile;
