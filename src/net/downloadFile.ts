const username = import.meta.env.VITE_ENDPOINT_USERNAME;
const password = import.meta.env.VITE_ENDPOINT_PASSWORD;
const encodedCredentials = btoa(`${username}:${password}`);

const base64ToUint8Array = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

const parseBlobToPdf = async (blob: Blob): Promise<string> => {
  const text = await blob.text();
  let base64String = text;
  const parsed = JSON.parse(text);
  if (parsed && typeof parsed === "object") {
    if (parsed.base64) base64String = parsed.base64;
    else if (parsed.data) base64String = parsed.data;
    else if (parsed.file) base64String = parsed.file;
  }

  base64String = base64String.replace(/\s+/g, "");
  if (base64String.startsWith("data:")) {
    base64String = base64String.substring(base64String.indexOf(",") + 1);
  }

  // Convert URL-safe base64 to standard base64
  base64String = base64String.replace(/-/g, "+").replace(/_/g, "/");
  base64String = base64String.replace(/[^A-Za-z0-9+/=]/g, "");
  while (base64String.length % 4 !== 0) {
    base64String += "=";
  }
  return base64String;
};

const triggerDownload = (pdfBlob: Blob, carrier: string) => {
  const url = window.URL.createObjectURL(pdfBlob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `ShipTime ${carrier} label.pdf`);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
  window.URL.revokeObjectURL(url);
};

const downloadFile = async (filepath: string, carrier: string): Promise<boolean> => {
  try {
    // sanitize URL to use HTTPS
    const res = await fetch(filepath.replace("http://", "https://"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedCredentials}`,
      },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const blob = await res.blob();

    const base64String = await parseBlobToPdf(blob);

    const pdfBytes = base64ToUint8Array(base64String);
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

    triggerDownload(pdfBlob, carrier);
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("Failed to get file", err);
    return false;
  }
};

export default downloadFile;
