import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { Cookies, getCookieConsentValue } from "react-cookie-consent";

interface CookieConsentContextType {
  consentStates: Record<string, boolean>;
  setConsent: (cookieName: string, value: boolean) => void;
}

const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

interface CookieConsentProviderProps {
  children: ReactNode;
}

export const CookieConsentProvider = ({
  children,
}: CookieConsentProviderProps) => {
  const [consentStates, setConsentStates] = useState<Record<string, boolean>>(
    {}
  );

  const setConsent = useCallback((cookieName: string, value: boolean) => {
    setConsentStates((prev) => ({ ...prev, [cookieName]: value }));
  }, []);

  return (
    <CookieConsentContext.Provider value={{ consentStates, setConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsentContext = (cookieName: string) => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsentContext must be used within a CookieConsentProvider"
    );
  }

  const { consentStates, setConsent } = context;

  useEffect(() => {
    if (consentStates[cookieName] === undefined) {
      const accepted = getCookieConsentValue(cookieName) === "true";
      setConsent(cookieName, accepted);
    }
  }, [cookieName, consentStates, setConsent]);

  const toggleConsent = useCallback(() => {
    const current = consentStates[cookieName] ?? false;
    if (current) {
      Cookies.remove(cookieName);
      setConsent(cookieName, false);
    } else {
      Cookies.set(cookieName, "true", { expires: 7 });
      setConsent(cookieName, true);
    }
  }, [cookieName, consentStates, setConsent]);

  return [consentStates[cookieName] ?? false, toggleConsent] as const;
};
