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
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Api from "@/components/api/api";
import Order from "@/components/order/order";

const profile = () => {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string>("");
  const [holdings, setHoldings] = useState<Array<object>>([]);
  const [positions, setPositions] = useState<Array<object>>([]);
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
        accept: "application/json",
        "Api-Version": "2.0",
        Authorization: "Bearer" + token,
      },
    });
    return response;
  };

  const getPositions = async () => {
    const response = await Api({
      path: "/portfolio/short-term-positions",
      token: token,
    });
    return response;
  };

  useEffect(() => {
    if (token) {
      getHoldings()
        .then((response) => {
          // console.log(response.data.data);
          setHoldings(response.data.data);
        })
        .catch((error) => console.warn(error));
      getPositions()
        .then((response) => {
          console.log(response);
          setPositions(response.data.data);
        })
        .catch((error) => console.warn(error));
    }
  }, [token]);

  useEffect(() => {
    if (holdings.length > 0) {
      let temp = 0;
      for (let i = 0; i < holdings.length; i++) {
        temp += holdings[i]?.pnl;
      }
      setTotalProfit(temp);
    }
  }, [holdings]);

  return (
    <>
      <div className="container items-center w-[100vw] h-[100vh]">
        {totalProfit > 0 ? (
          <h1 className="text-green-500">Profit/Loss: {totalProfit}</h1>
        ) : (
          <h1 className="text-red-500">Profit/Loss: {totalProfit}</h1>
        )}
        <Tabs defaultValue="holdings" className="w-[50vw] items-center">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="positions">Positions</TabsTrigger>
          </TabsList>
          <TabsContent value="holdings">
            <Table className="w-full items-center">
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
                {holdings.length > 0 &&
                  holdings.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>{item?.tradingsymbol}</TableCell>
                        <TableCell>{item?.company_name}</TableCell>
                        {item?.pnl < 0 ? (
                          <TableCell className="text-red-500">
                            {item?.pnl}
                          </TableCell>
                        ) : (
                          <TableCell className="text-green-500">
                            {item?.pnl}
                          </TableCell>
                        )}
                        <TableCell>{item?.quantity}</TableCell>
                        <TableCell>{item?.last_price}</TableCell>
                        <TableCell>{item?.average_price}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="positions">
            <p>
              {positions.length > 0 ? (
                positions.map((item, index) => {
                  return <p key={index}> {item?.tradingsymbol} </p>;
                })
              ) : (
                <p> no positions found </p>
              )}
            </p>
          </TabsContent>
        </Tabs>
        <div className="grid grid-cols-2">
          <Order type="Buy" />
          <Order type="Sell" />
        </div>
      </div>
    </>
  );
};

export default profile;
