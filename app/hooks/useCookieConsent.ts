import { useCallback, useEffect, useState } from "react";
import { Cookies, getCookieConsentValue } from "react-cookie-consent";

export const useCookieConsent = (cookieName: string) => {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const cookieAccepted = getCookieConsentValue(cookieName);
    if (cookieAccepted) setConsentGiven(true);
  }, []);

  const toggleConsent = useCallback(() => {
    if (consentGiven) {
      Cookies.remove(cookieName);
      setConsentGiven(false);
    } else {
      Cookies.set(cookieName, "true", { expires: 7 });
      setConsentGiven(true);
    }
  }, [consentGiven]);

  return {
    consentGiven,
    toggleConsent,
  };
};
