import * as Yup from "yup";

export const presentationTypes = [
  "Heat Pump - Furnace (Good,Better,Best)",
  "Heat Pump - Standalone (Good,Better,Best)",
  "Heat Pump - Air Handler (Good,Better,Best)",
];


export const presentationExcludeStandalone = [
  "Heat Pump - Furnace (Good,Better,Best)",
  "Heat Pump - Air Handler (Good,Better,Best)",
];

export const ductlessTypes = ["Heat Pump - Ductless (OFF-Set)"];


export const smartBattery = [
  "Smart Home Battery",
  "Smart Home Battery & Heat Pump",
  "Smart Home Battery 10kwh",
  "Smart Home Battery 20kwh",
  "Smart Home Battery & Heat Pump 10kwh",
  "Smart Home Battery & Heat Pump 20kwh",
];

export const presentationLoanTypes = [
  "FinanceIT Loan",
  "Finance IT Rebate",
  "Finance IT 0%",
];

export const radonPresentationType = "Radon Mitigation System";

export const formSchema = Yup.object().shape({
  Presentation_Type: Yup.string()
    .required("This is a required field")
    .notOneOf(["-None-"], "This is a required field"),
  Presentation_Loan_Type: Yup.string()
    .required("This is a required field")
    .notOneOf(["-None-"], "This is a required field"),
  Travel_Cost: Yup.number()
    .min(0, "Value must be a positive number")
    .required("Required field")
    .typeError("Please enter a valid number"),
  Shipping_Fees: Yup.number()
    .required("Required field")
    .typeError("Please enter a valid number"),
  Cash_Value_1: Yup.number()
    .min(0, "Value must be a positive number")
    .required("This is a required field")
    .typeError("Please enter a valid number"),
  Cash_Value_2: Yup.number()
    .min(0, "Value must be a positive number")
    .typeError("Please enter a valid number")
    .when("Presentation_Type", (value: string[]) => {
      return presentationTypes.includes(value?.[0]) ||
        ductlessTypes.includes(value?.[0])
        ? Yup.number()
            .min(0, "Value must be a positive number")
            .typeError("Please enter a valid number")
            .required("This is a required field")
        : Yup.string();
    }),
  Cash_Value_3: Yup.number()
    .min(0, "Value must be a positive number")
    .when("Presentation_Type", (value: string[]) => {
      return presentationTypes.includes(value?.[0])
        ? Yup.number()
            .min(0, "Value must be a positive number")
            .required("This is a required field")
            .typeError("Please enter a valid number")
        : Yup.string();
    }),
  Automatic_Rebate_1: Yup.number()
    .min(0, "Value must be a positive number")
    .when("Presentation_Loan_Type", (value: string[]) => {
      return value?.[0] === "Finance IT Rebate" ||
        value?.[0] === "Finance IT 0%"
        ? Yup.number()
            .min(0, "Value must be a positive number")
            .typeError("Please enter a valid number")
            .required("This is a required field")
        : Yup.string();
    }),
  Automatic_Rebate_2: Yup.number()
    .min(0, "Value must be a positive number")
    .when(
      ["Presentation_Loan_Type", "Presentation_Type"],
      (value: string[]) => {
        return (value?.[0] === "Finance IT Rebate" ||
          value?.[0] === "Finance IT 0%") &&
          (presentationTypes.includes(value?.[1]) ||
            ductlessTypes.includes(value?.[1]) ||
            presentationTypes.includes(value?.[2]))
          ? Yup.number()
              .min(0, "Value must be a positive number")
              .required("This is a required field")
              .typeError("Please enter a valid number")
          : Yup.string();
      }
    ),
  Automatic_Rebate_3: Yup.number()
    .min(0, "Value must be a positive number")
    .when(
      ["Presentation_Loan_Type", "Presentation_Type"],
      (value: string[]) => {
        return (value?.[0] === "Finance IT Rebate" ||
          value?.[0] === "Finance IT 0%") &&
          (presentationTypes.includes(value?.[1]) ||
            presentationTypes.includes(value?.[2]))
          ? Yup.number()
              .min(0, "Value must be a positive number")
              .required("This is a required field")
              .typeError("Please enter a valid number")
          : Yup.string();
      }
    ),
  Monthly_Payment_FinanceIT_1: Yup.number()
    .min(0, "Value must be a positive number")
    .typeError("Please enter a valid number")
    .required("This is a required field"),
  Monthly_Payment_FinanceIT_2: Yup.number()
    .min(0, "Value must be a positive number")
    .when("Presentation_Type", (value: string[]) => {
      return presentationTypes.includes(value?.[0]) ||
        ductlessTypes.includes(value?.[0])
        ? Yup.number()
            .min(0, "Value must be a positive number")
            .typeError("Please enter a valid number")
            .required("This is a required field")
        : Yup.string();
    }),
  Monthly_Payment_FinanceIT_3: Yup.number()
    .min(0, "Value must be a positive number")
    .when("Presentation_Type", (value: string[]) => {
      return presentationTypes.includes(value?.[0])
        ? Yup.number()
            .min(0, "Value must be a positive number")
            .typeError("Please enter a valid number")
            .required("This is a required field")
        : Yup.string();
    }),
  Monthly_Payment_Lease_to_Own_1: Yup.number()
    .min(0, "Value must be a positive number")
    .when("Presentation_Type", (value: string[]) => {
      console.log("🚀 ~ .when ~ value:", value?.[0]);
      return value?.[0] !== radonPresentationType
        ? Yup.number()
            .min(0, "Value must be a positive number")
            .typeError("Please enter a valid number")
            .required("This is a required field")
        : Yup.string();
    }),
  Monthly_Payment_Lease_to_Own_2: Yup.number()
    .min(0, "Value must be a positive number")
    .when("Presentation_Type", (value: string[]) => {
      return presentationTypes.includes(value?.[0]) ||
        ductlessTypes.includes(value?.[0])
        ? Yup.number()
            .min(0, "Value must be a positive number")
            .typeError("Please enter a valid number")
            .required("This is a required field")
        : Yup.string();
    }),
  Monthly_Payment_Lease_to_Own_3: Yup.number()
    .min(0, "Value must be a positive number")
    .when("Presentation_Type", (value: string[]) => {
      return presentationTypes.includes(value?.[0])
        ? Yup.number()
            .min(0, "Value must be a positive number")
            .typeError("Please enter a valid number")
            .required("This is a required field")
        : Yup.string();
    }),
  Bundle_I_Monthly: Yup.number()
    .min(0, "Value must be a positive number")
    .when(
      ["Presentation_Loan_Type", "Presentation_Type"],
      (value: string[]) => {
        return !presentationLoanTypes.includes(value?.[0]) &&
          value?.[1] !== radonPresentationType
          ? Yup.number()
              .min(0, "Value must be a positive number")
              .typeError("Please enter a valid number")
              .required("This is a required field")
          : Yup.string();
      }
    ),
  Bundle_I_Price_Attic: Yup.number()
    .min(0, "Value must be a positive number")
    .when(
      ["Presentation_Loan_Type", "Presentation_Type"],
      (value: string[]) => {
        return !presentationLoanTypes.includes(value?.[0]) &&
          value?.[1] !== radonPresentationType
          ? Yup.number()
              .min(0, "Value must be a positive number")
              .typeError("Please enter a valid number")
              .required("This is a required field")
          : Yup.string();
      }
    ),
  Bundle_II_Monthly: Yup.number()
    .min(0, "Value must be a positive number")
    .when(
      ["Presentation_Loan_Type", "Presentation_Type"],
      (value: string[]) => {
        return !presentationLoanTypes.includes(value?.[0]) &&
          value?.[1] !== radonPresentationType
          ? Yup.number()
              .min(0, "Value must be a positive number")
              .typeError("Please enter a valid number")
              .required("This is a required field")
          : Yup.string();
      }
    ),
  Bundle_II_Price_Water_Heater: Yup.number()
    .min(0, "Value must be a positive number")
    .when(
      ["Presentation_Loan_Type", "Presentation_Type"],
      (value: string[]) => {
        return presentationLoanTypes.includes(value?.[0]) &&
          value?.[1] !== radonPresentationType
          ? Yup.number()
              .min(0, "Value must be a positive number")
              .typeError("Please enter a valid number")
              .required("This is a required field")
          : Yup.string();
      }
    ),
  Monthly_Payment_0_1: Yup.number()
    .min(0, "Value must be a positive number")
    .when("Presentation_Loan_Type", (value: string[]) => {
      return value?.[0] === "Finance IT 0%"
        ? Yup.number()
            .min(0, "Value must be a positive number")
            .typeError("Please enter a valid number")
            .required("This is a required field")
        : Yup.string();
    }),
  Monthly_Payment_0_2: Yup.number()
    .min(0, "Value must be a positive number")
    .when("Presentation_Loan_Type", (value: string[]) => {
      return value?.[0] === "Finance IT 0%"
        ? Yup.number()
            .min(0, "Value must be a positive number")
            .typeError("Please enter a valid number")
            .required("This is a required field")
        : Yup.string();
    }),
  // this field is not required if presentationtype is ductlesspresentationType
  Monthly_Payment_0_3: Yup.number()
    .min(0, "Value must be a positive number")
    .when(
      ["Presentation_Loan_Type", "Presentation_Type"],
      (value: string[]) => {
        return value?.[0] === "Finance IT 0%" &&
          value?.[1] !== "Heat Pump - Ductless (OFF-Set)"
          ? Yup.number()
              .min(0, "Value must be a positive number")
              .typeError("Please enter a valid number")
              .required("This is a required field")
          : Yup.string();
      }
    ),
  Total_Products: Yup.number().default(0),
});
