import { useQuery } from "@tanstack/react-query";

interface DataType {
  Entity: string;
  apiName: string;
}

export const useFetchFields = (data: DataType) =>
  useQuery({
    queryKey: ["fields" + data.apiName],
    queryFn: async () => {
      try {
        const res = await window.ZOHO.CRM.META.getFields({
          Entity: data.Entity,
        });

        return res?.fields.find(
          (field: { api_name: string }) => field.api_name == data.apiName
        ).pick_list_values;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  });
