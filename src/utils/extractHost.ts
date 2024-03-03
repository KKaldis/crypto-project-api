import checkifWWW from "./checkIfWww";

const extractHostname = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    const { hostname } = parsedUrl;
    return checkifWWW(hostname);
  } catch (err) {
    return checkifWWW(url.split("/")[0]);
  }
};

export default extractHostname;
