"use client";
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
  }, [code, fetchData]);"use client";

  return (
    <>
      <div className="container">
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
