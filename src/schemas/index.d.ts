import { InferType } from "yup";
import { formSchema } from "./formSchema";

export interface AppDataType {
  Entity: string;
  EntityId: string;
}

export interface FormInputType {
  api_name: string;
  type?: string;
  register: any;
  errors: any;
  label: string;
  extraLabel?: string;
  col?: string;
  defaultValue?: string;
  readOnly?: boolean;
}

export type FormValues = InferType<typeof formSchema>;

export interface Lead {
  id: string;
  Automatic_Rebate_1?: string;
  Automatic_Rebate_2?: string;
  Automatic_Rebate_3?: string;
  Distance_Cost?: string;
  Monthly_Payment_FinanceIT_1?: string;
  Monthly_Payment_FinanceIT_2?: string;
  Monthly_Payment_FinanceIT_3?: string;
  Cash_Value_1?: string;
  Cash_Value_2?: string;
  Cash_Value_3?: string;
  Bundle_II_Price_Water_Heater?: string;
  Bundle_II_Monthly?: string;
  Bundle_I_Monthly?: string;
  Bundle_I_Price_Attic?: string;
  Monthly_Payment_Lease_to_Own_1?: string;
  Monthly_Payment_Lease_to_Own_2?: string;
  Monthly_Payment_Lease_to_Own_3?: string;
  Presentation_Loan_Type?: string;
  Presentation_Type?: string;
  Generate_Calculation?: string;
  Monthly_Payment_0_2?: string;
  Monthly_Payment_0_1?: string;
  Monthly_Payment_0_3?: string;
  Battery_kWh?: number;

}
