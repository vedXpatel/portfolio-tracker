import axios from "axios";

interface ApiProps {
  path: string;
  token: string;
}

const Api = async ({ path, token }: ApiProps) => {
  const response = await axios({
    method: "GET",
    url: process.env.NEXT_PUBLIC_UPSTOX_BASE_API + path,
    headers: {
      accept: "application/json",
      "Api-Version": "2.0",
      Authorization: "Bearer" + token,
    },
  });
  return response;
};

export default Api;
