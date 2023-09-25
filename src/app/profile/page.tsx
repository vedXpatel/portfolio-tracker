"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


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
        <Table>
          <TableCaption>Holdings</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Ticker</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Profit/Loss</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>LTP</TableHead>
              <TableHead>AVG Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

        {
          holdings.length > 0 &&
            holdings.map((item,index) => {
              return(
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{item.tradingsymbol}</TableCell>
                    <TableCell>{item.company_name}</TableCell>
                    <TableCell className="text-right">{item.pnl}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.last_price}</TableCell>
                    <TableCell>{item.average_price}</TableCell>
                  </TableRow>
              )
            })
        }
          </TableBody>
        </Table>
      </>
      )
};

export default Profile;
