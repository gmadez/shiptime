const endpoint = import.meta.env.VITE_ENDPOINT_URL;
const username = import.meta.env.VITE_ENDPOINT_USERNAME;
const password = import.meta.env.VITE_ENDPOINT_PASSWORD;
const encodedCredentials = btoa(`${username}:${password}`);

const fetchData = async <T, P>(service: string, shippingRequest: T): Promise<P> => {
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

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    return data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("Failed to fetch rates, using mock data:", err);
    return undefined;
  }
};

export default fetchData;
