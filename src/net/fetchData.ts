import type { Result } from "./types";
const endpoint = import.meta.env.VITE_ENDPOINT_URL;
const username = import.meta.env.VITE_ENDPOINT_USERNAME;
const password = import.meta.env.VITE_ENDPOINT_PASSWORD;
const encodedCredentials = btoa(`${username}:${password}`);




const fetchData = async <T, P>(service: string, shippingRequest: T): Promise<Result<P>> => {
  try {
    const res = await fetch(endpoint + service, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedCredentials}`,
      },
      body: JSON.stringify(shippingRequest),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`${errorData.messages || res.status}`);
    }

    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("Failed to fetch rates", err);
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
};

export default fetchData;
