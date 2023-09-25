"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
const Profile = () => {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | undefined>();
  const [holdings, setHoldings] = useState<Array<object>>([]);
  const [totalProfit, setTotalProfit] = useState<number>(0);

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

  useEffect(() => {
    if(holdings.length>0){
      let temp = 0;
      for (let i = 0; i < holdings.length; i++) {
        temp += holdings[i].pnl;
      }
      setTotalProfit(temp);
    }
  },[holdings]);

  return (
      <>
        {
          totalProfit > 0 ? <h1 className="text-green-500">Profit/Loss: {totalProfit}</h1> :
              <h1 className="text-red-500">Profit/Loss: {totalProfit}</h1>
        }
        <Table className="w-100">
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
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{item.tradingsymbol}</TableCell>
                    <TableCell>{item.company_name}</TableCell>
                    {
                      item.pnl < 0 ? <TableCell className="text-right text-red-500">{item.pnl}</TableCell>
                          : <TableCell className="text-right text-green-500">{item.pnl}</TableCell>
                    }
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.last_price}</TableCell>
                    <TableCell>{item.average_price}</TableCell>
                  </TableRow>

              )
            })
        }
      </>
      )
};

export default Profile;
