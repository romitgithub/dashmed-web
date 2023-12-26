import { ACCESS_TOKEN, PAYMENT_REQUIRED_ERR_MESSAGE } from "@/constants";

function getAuthHeaders(token?: string) {
     const accessToken = token ? token : localStorage.getItem(ACCESS_TOKEN);
     if (!accessToken) {
          return null;
     }
     let headers: any = {
          Authorization: `Bearer ${accessToken}`,
     };

     const teamId = localStorage.getItem("team_id");
     if (teamId) {
          headers = {
               ...headers,
               team_id: teamId,
          };
     }

     return headers;
}

export async function fetchGetJSON<T = any>(url: string): Promise<T> {
     try {
          const data = await fetch(url);
          return await data.json();
     } catch (err: any) {
          throw new Error(err?.message);
     }
}

export async function fetchPostJSON<T = any, Args = any>(
     url: string,
     data?: Args
): Promise<T> {
     try {
          const response = await fetchPost(url, data, {
               "Content-Type": "application/json",
          });
          return await response.json();
     } catch (err: any) {
          throw new Error(err?.message);
     }
}

export async function fetchPostJSONExternal<T = any, Args = any>(
     url: string,
     data?: Args
): Promise<T> {
     try {
          const response = await fetchPost(
               process.env.NEXT_PUBLIC_SERVER_URL + url,
               data,
               { ...getAuthHeaders(), "Content-Type": "application/json" }
          );
          if (response.status === 402) {
               throw new Error(PAYMENT_REQUIRED_ERR_MESSAGE);
          }

          const resData = await response.json();
          return { ...resData, httpStatus: response.status };
          // return await response.json();
     } catch (err: any) {
          throw new Error(err?.message);
     }
}

export async function fetchPatchJSONExternal<T = any, Args = any>(
     url: string,
     data?: Args
): Promise<T> {
     try {
          const response = await fetchPatch(
               process.env.NEXT_PUBLIC_SERVER_URL + url,
               data,
               getAuthHeaders()
          );
          return await response.json();
     } catch (err: any) {
          throw new Error(err?.message);
     }
}

export async function fetchGetJSONExternal<T = any>(
     url: string,
     token?: string
): Promise<T> {
     try {
          const data = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + url, {
               headers: getAuthHeaders(token) ?? {},
          });
          return await data.json();
     } catch (err: any) {
          throw new Error(err?.message);
     }
}

export async function fetchHeadExternal<T = number>(
     url: string,
     token?: string
): Promise<number> {
     try {
          const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + url, {
               method: "HEAD",
               headers: getAuthHeaders(token) ?? {},
          });
          return response.status;
     } catch (err: any) {
          throw new Error(err?.message);
     }
}

export async function fetchPostMultipart<T = any, Args = any>(
     url: string,
     data?: Args
): Promise<T> {
     const headers = {
          "Content-Type": "multipart/form-data",
     };
     try {
          const response = await fetchPost(
               process.env.NEXT_PUBLIC_SERVER_URL + url,
               data,
               headers
          );
          return await response.json();
     } catch (err: any) {
          throw new Error(err?.message);
     }
}

export async function fetchPostExternal(
     url: string,
     data?: any,
     headers?: any
) {
     try {
          // Default options are marked with *
          const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + url, {
               method: "POST", // *GET, POST, PUT, DELETE, etc.
               mode: "cors", // no-cors, *cors, same-origin
               cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
               credentials: "same-origin", // include, *same-origin, omit
               headers,
               redirect: "follow", // manual, *follow, error
               referrerPolicy: "no-referrer", // no-referrer, *client
               body: data, // body data type must match "Content-Type" header
          });
          return response;
     } catch (err: any) {
          throw new Error(err?.message);
     }
}

export async function fetchDeleteExternal<T = any, Args = any>(
     url: string,
     data?: Args
): Promise<T> {
     try {
          const response = await fetchDelete(
               process.env.NEXT_PUBLIC_SERVER_URL + url,
               data,
               getAuthHeaders()
          );
          return await response.json();
     } catch (err: any) {
          throw new Error(err?.message);
     }
}

export async function fetchDelete(url: string, data?: any, headers?: any) {
     try {
          // Default options are marked with *
          const response = await fetch(url, {
               method: "DELETE", // *GET, POST, PUT, DELETE, etc.
               mode: "cors", // no-cors, *cors, same-origin
               cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
               credentials: "same-origin", // include, *same-origin, omit
               headers: headers
                    ? { ...headers, "Content-Type": "application/json" }
                    : {
                         "Content-Type": "application/json",
                    },
               redirect: "follow", // manual, *follow, error
               referrerPolicy: "no-referrer", // no-referrer, *client
               body: JSON.stringify(data), // body data type must match "Content-Type" header
          });
          return response;
     } catch (err: any) {
          throw new Error(err?.message);
     }
}

export async function fetchPut(url: string, data?: any, headers?: any) {
     try {
          // Default options are marked with *
          const response = await fetch(url, {
               method: "PUT", // *GET, POST, PUT, DELETE, etc.
               mode: "cors", // no-cors, *cors, same-origin
               cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
               credentials: "same-origin", // include, *same-origin, omit
               headers: headers
                    ? { ...headers, "Content-Type": "application/json" }
                    : {
                         "Content-Type": "application/json",
                    },
               redirect: "follow", // manual, *follow, error
               referrerPolicy: "no-referrer", // no-referrer, *client
               body: JSON.stringify(data), // body data type must match "Content-Type" header
          });
          return response;
     } catch (err: any) {
          throw new Error(err?.message);
     }
}

export async function fetchPost(url: string, data?: any, headers?: any) {
     try {
          // Default options are marked with *
          const response = await fetch(url, {
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
     } catch (err: any) {
          throw new Error(err?.message);
     }
}

export async function fetchPatch(url: string, data?: any, headers?: any) {
     try {
          // Default options are marked with *
          const response = await fetch(url, {
               method: "PATCH", // *GET, POST, PUT, DELETE, etc.
               mode: "cors", // no-cors, *cors, same-origin
               cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
               credentials: "same-origin", // include, *same-origin, omit
               headers: headers
                    ? { ...headers, "Content-Type": "application/json" }
                    : {
                         "Content-Type": "application/json",
                    },
               redirect: "follow", // manual, *follow, error
               referrerPolicy: "no-referrer", // no-referrer, *client
               body: JSON.stringify(data), // body data type must match "Content-Type" header
          });
          return response;
     } catch (err: any) {
          throw new Error(err?.message);
     }
}