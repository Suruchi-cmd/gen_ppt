import { useQuery } from "@tanstack/react-query";
import { AppDataType } from "../schemas";

export const useFetchRecord = (data: AppDataType) =>
  useQuery({
    queryKey: ["record", data?.EntityId],
    queryFn: async () => {
      try {
        const res = await window.ZOHO.CRM.API.getRecord({
          Entity: data.Entity,
          RecordID: data.EntityId,
        });
        return res.data?.[0];
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  });
