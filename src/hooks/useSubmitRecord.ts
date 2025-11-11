import { useMutation } from "@tanstack/react-query";
import { AppDataType, FormValues } from "../schemas";

export const useSubmitRecord = () =>
  useMutation({
    mutationFn: async (data: { data: FormValues; AppData: AppDataType }) => {
      try {
        console.log(data);
        const res1 = await window.ZOHO.CRM.API.updateRecord({
          Entity: data?.AppData?.Entity,
          APIData: {
            id: data?.AppData?.EntityId,
            Presentation_Type: data?.data?.Presentation_Type,
          },
          Trigger: ["workflow"],
        });
        console.log(res1);

        const res2 = await window.ZOHO.CRM.FUNCTIONS.execute(
          "update_rebate_amount",
          {
            arguments: JSON.stringify({ id: data?.AppData?.EntityId }),
          }
        );
        console.log(res2);

        const res3 = await window.ZOHO.CRM.API.updateRecord({
          Entity: data.AppData?.Entity,
          APIData: {
            ...data?.data,
            id: data?.AppData?.EntityId,
            Monthly_Payment_FinanceIT_1:
              data?.data?.Monthly_Payment_FinanceIT_1.toString(),
            Monthly_Payment_FinanceIT_2:
              data?.data?.Monthly_Payment_FinanceIT_2?.toString(),
            Monthly_Payment_FinanceIT_3:
              data?.data?.Monthly_Payment_FinanceIT_3?.toString(),
            Monthly_Payment_Lease_to_Own_1:
              data?.data?.Monthly_Payment_Lease_to_Own_1?.toString(),
            Monthly_Payment_Lease_to_Own_2:
              data?.data?.Monthly_Payment_Lease_to_Own_2?.toString(),
            Monthly_Payment_Lease_to_Own_3:
              data?.data?.Monthly_Payment_Lease_to_Own_3?.toString(),
            Monthly_Payment_0_1: data?.data?.Monthly_Payment_0_1?.toString(),
            Monthly_Payment_0_2: data?.data?.Monthly_Payment_0_2?.toString(),
            Monthly_Payment_0_3: data?.data?.Monthly_Payment_0_3?.toString(),
            Generate_Calculation: "Yes",
          },
          Trigger: ["workflow"],
        });
        console.log(res3);

        await new Promise((r) => setTimeout(r, 3000));
        const res4 = await window.ZOHO.CRM.API.updateRecord({
          Entity: data?.AppData?.Entity,
          APIData: {
            id: data?.AppData?.EntityId,
            Generate_PPT: "Yes",
          },
          Trigger: ["workflow"],
        });
        console.log(res4);

        const res5 = await window.ZOHO.CRM.API.updateRecord({
          Entity: data?.AppData?.Entity,
          APIData: {
            id: data?.AppData?.EntityId,
            Generate_PPT: "No",
            Generate_Calculation: "No",
          },
          Trigger: [],
        });
        console.log(res5);
      } catch (error) {
        console.log(error);
        throw new Error(
          error instanceof Error
            ? error?.message
            : "Server Error. Please contact your IT admin."
        );
      }
    },
  });
