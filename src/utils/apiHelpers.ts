export async function fetchLoginWithMobile<T = any, Args = any>(
     url: string,
     data?: Args
): Promise<T> {
     console.log({ url, data })
     try {
          const response = await fetchPost(url, data, {
               "Content-Type": "application/json",
          });
          return await response.json();
     } catch (err: any) {
          console.log({ err })
          throw new Error(err?.message);
     }
};



export async function fetchPost(url: string, data?: any, headers?: any) {
     try {
          console.log({ url, data });
          // Default options are marked with *
          const response = await fetch(process.env.NEXT_BASE_URL + url, {
               method: "POST", // *GET, POST, PUT, DELETE, etc.
               mode: "cors", // no-cors, *cors, same-origin
               cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
               credentials: "same-origin", // include, *same-origin, omit
               headers: headers
                    ? { ...headers }
                    : {
                         "Content-Type": "application/json",
                    },
               redirect: "follow", // manual, *follow, error
               referrerPolicy: "no-referrer", // no-referrer, *client
               body: JSON.stringify(data), // body data type must match "Content-Type" header
          });
          return response;
     }
     catch (err: any) {
          console.log({ err })
          throw new Error(err?.message);
     }
}