import React, { useState } from "react";
import nookies, { parseCookies } from "nookies";

export default function useCookies(key: string) {
  const [cookiesValue, setCookiesValue] = useState(() => {
    try {
      const cookies = parseCookies(null, key);
      const readableValue = JSON.parse(cookies[key]);
      return readableValue;
    } catch (error) {
      return null;
    }
  });
  return [cookiesValue];
}
