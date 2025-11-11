import { createContext, useEffect, useState } from "react";
import { AppDataType } from "../schemas";

export const AppContext = createContext<any>(null);

declare global {
  interface Window {
    ZOHO: {
      CRM: any;
      embeddedApp: {
        init: () => void;
        on: (event: string, callback: (data: AppDataType) => void) => void;
      };
    };
  }
}

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<AppDataType>();

  useEffect(() => {
    if (window.ZOHO) {
      window.ZOHO.embeddedApp.on("PageLoad", (data) => {
        window.ZOHO.CRM.UI.Resize({
          height: window?.screen?.height,
          width: window?.screen?.width / 1.75,
        });
        setData({
          Entity: data.Entity,
          EntityId: data.EntityId?.[0],
        });
      });
      window.ZOHO.embeddedApp.init();
    }
  });

  return <AppContext.Provider value={{ data }}>{children}</AppContext.Provider>;
}
