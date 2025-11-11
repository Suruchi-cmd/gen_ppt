import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAppContext } from "../hooks/useAppContext";
import { useFetchRecord } from "../hooks/useFetchRecord";
import { useSubmitRecord } from "../hooks/useSubmitRecord";
import { FormValues } from "../schemas";
import {
  ductlessTypes,
  formSchema,
  presentationExcludeStandalone,
  presentationLoanTypes,
  presentationTypes,
  radonPresentationType,
  smartBattery,
} from "../schemas/formSchema";
import Input from "./Input";
import RebateInfo from "./RebateInfo";
import Select from "./Select";

export default function Forms() {
  const submitRecord = useSubmitRecord();
  const AppData = useAppContext();
  const { data, isLoading } = useFetchRecord(AppData);
  const [IsSubmitting, SetIsSubmitting] = useState<boolean>(false);
  console.log("🚀 ~ Forms ~ data:", data);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {},
  });
  useEffect(() => {
    if (data) {
      Object.keys(formSchema.fields).forEach((key: any) => {
        setValue(key, data[key] ?? "");
      });
    }
  }, [data, setValue]);

  const presentationType = watch("Presentation_Type");
  const presentationLoanType = watch("Presentation_Loan_Type");
  const distanceCost = watch("Travel_Cost");
  const cashValue1 = watch("Cash_Value_1");
  const cashValue2 = watch("Cash_Value_2");
  const cashValue3 = watch("Cash_Value_3");

  const isGoodBetterBest = presentationTypes.includes(presentationType);
  const isDuctlessOffset = ductlessTypes.includes(presentationType);
  const isSmartBattery = smartBattery.includes(presentationType);

  const isHeatPumpAddOns =
    presentationExcludeStandalone.includes(presentationType);

  if (
    presentationType === radonPresentationType &&
    presentationLoanType.includes("Rebate")
  ) {
    toast.error(
      `Rebate presentation is not available for ${radonPresentationType}.`
    );
    setValue("Presentation_Loan_Type", "FinanceIT Loan");
  }

  useEffect(() => {
    if (!presentationType || presentationType === "-None-") {
      setValue("Total_Products", 0);
      setValue("Shipping_Fees", 0);
      return;
    }
    setValue("Total_Products", isHeatPumpAddOns ? 2 : 1);

    if (!data?.Travel_Zone) console.log("Travel zone is missing!");
    else {
      const isInvalidFee =
        data?.Shipping_Fees == null || data.Shipping_Fees === "";
      if (isInvalidFee)
        setValue(
          "Shipping_Fees",
          data?.Travel_Zone == 1 && (data?.Total_Travel_Distance ?? 0) <= 250000
            ? 0
            : isHeatPumpAddOns
            ? 600
            : 400
        );
    }
  }, [presentationType]);

  useEffect(() => {
    const calculateLeaseToOwn = (
      distanceCost: number,
      fieldName:
        | "Monthly_Payment_Lease_to_Own_1"
        | "Monthly_Payment_Lease_to_Own_2"
        | "Monthly_Payment_Lease_to_Own_3",
      cashValue: number
    ) => {
      const HST = 1 + parseFloat(data?.HST_percentage || 13) / 100;
      const value =
        (((parseFloat(cashValue?.toString()) || 0) +
          (parseFloat(distanceCost?.toString()) || 0)) *
          HST) /
        82;
      setValue(fieldName, parseInt(value.toFixed(2)));
    };

    calculateLeaseToOwn(
      distanceCost,
      "Monthly_Payment_Lease_to_Own_1",
      cashValue1 || 0
    );
    calculateLeaseToOwn(
      distanceCost,
      "Monthly_Payment_Lease_to_Own_2",
      cashValue2 || 0
    );
    calculateLeaseToOwn(
      distanceCost,
      "Monthly_Payment_Lease_to_Own_3",
      cashValue3 || 0
    );
  }, [cashValue1, cashValue2, cashValue3, distanceCost]);

  const isFinanceITEnbridge =
    [presentationLoanTypes[1]].includes(presentationLoanType) ||
    [presentationLoanTypes[2]].includes(presentationLoanType);

  const isFinanceITOption =
    presentationLoanTypes.includes(presentationLoanType);
  const governmentLoanType = presentationLoanType === presentationLoanTypes[2];
  const onSubmit = async (data: FormValues) => {
    SetIsSubmitting(true);
    try {
      await submitRecord.mutateAsync({
        data,
        AppData,
      });
      toast.success(
        "Presentation generated successfully. Please wait for a couple of minutes, you will received it in your email."
      );
      setTimeout(() => {
        window.ZOHO.CRM.UI.Popup.closeReload();
      }, 2000);
    } catch (error: any) {
      toast.error(error.message);
    }
    SetIsSubmitting(false);
  };

  if (isLoading)
    return (
      <div className="d-flex justify-content-center my-3">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  console.log(errors);

  const Header = ({ title }: { title: string }) => {
    return (
      <div className="bg-light py-2 dropdown">
        <div className="d-flex justify-content-between align-items-center">
          <div className="fs-4 fw-bold">{title}</div>
        </div>
      </div>
    );
  };
  const province = data.Province?.toLowerCase() || "";
  const address = data.Full_Address?.toLowerCase() || "";

  return (
    <div className="container py-2">
      {(province === "ns" ||
        province.includes("nova scotia") ||
        address.includes("nova scotia")) && <RebateInfo data={data} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <div className="row align-items-start">
            <Header title="General Details" />
            <Select
              register={register}
              errors={errors}
              api_name="Presentation_Type"
              label="Presentation_Type"
              col="col-md-8"
            />

            <Select
              register={register}
              errors={errors}
              api_name="Presentation_Loan_Type"
              label="Presentation_Loan_Type"
            />

            <Input
              register={register}
              errors={errors}
              api_name="Travel_Cost"
              label="Distance Cost"
              extraLabel={`(Automatic Based on Zone ${
                data?.Travel_Zone ?? "N/A"
              })`}
              type="number"
              // readOnly={true}
            />

            {!isSmartBattery ? (
              <>
                <Input
                  register={register}
                  errors={errors}
                  api_name="Battery_kWh"
                  label="kWh Battery Capacity"
                  type="number"
                  readOnly={true}
                />
              </>
            ) : (
              <>
                <Input
                  register={register}
                  errors={errors}
                  api_name="Total_Products"
                  label="Est. Products"
                  extraLabel="(Based on Presentation Type)"
                  type="number"
                  readOnly={true}
                />
              </>
            )}

            <Input
              register={register}
              errors={errors}
              api_name="Shipping_Fees"
              label="Est. Shipping_Fees"
              extraLabel="(Subject to Change)"
              type="number"
              // readOnly={true}
            />

            <Input
              register={register}
              errors={errors}
              api_name="Cash_Value_1"
              label="Cash_Value_1"
              type="number"
              extraLabel={"(Solution Cost - Standard)"}
            />

            {isGoodBetterBest || isDuctlessOffset || isSmartBattery ? (
              <>
                <Input
                  register={register}
                  errors={errors}
                  api_name="Cash_Value_2"
                  label="Cash_Value_2"
                  type="number"
                  extraLabel={"(Solution Cost - Standard)"}
                />
              </>
            ) : (
              <div></div>
            )}

            {isGoodBetterBest ? (
              <>
                <Input
                  register={register}
                  errors={errors}
                  api_name="Cash_Value_3"
                  label="Cash_Value_3"
                  type="number"
                  extraLabel={"(Solution Cost - Standard)"}
                />
              </>
            ) : (
              <div></div>
            )}

            {isFinanceITEnbridge && (
              <>
                <Input
                  register={register}
                  errors={errors}
                  api_name="Automatic_Rebate_1"
                  label="Rebate 1"
                  type="number"
                />

                {isGoodBetterBest || isDuctlessOffset || isSmartBattery ? (
                  <Input
                    register={register}
                    errors={errors}
                    api_name="Automatic_Rebate_2"
                    label="Rebate 2"
                    type="number"
                  />
                ) : (
                  <div></div>
                )}

                {isGoodBetterBest ? (
                  <>
                    <Input
                      register={register}
                      errors={errors}
                      api_name="Automatic_Rebate_3"
                      label="Rebate 3"
                      type="number"
                    />
                  </>
                ) : (
                  <div></div>
                )}
              </>
            )}

            <Input
              register={register}
              errors={errors}
              api_name="Monthly_Payment_FinanceIT_1"
              label="Monthly_Payment1_Financing"
              type="number"
            />

            {isGoodBetterBest || isDuctlessOffset || isSmartBattery ? (
              <Input
                register={register}
                errors={errors}
                api_name="Monthly_Payment_FinanceIT_2"
                label="Monthly_Payment2_Financing"
                type="number"
              />
            ) : (
              <div></div>
            )}

            {isGoodBetterBest && (
              <>
                <Input
                  register={register}
                  errors={errors}
                  api_name="Monthly_Payment_FinanceIT_3"
                  label="Monthly_Payment3_Financing"
                  type="number"
                />
              </>
            )}
          </div>
        </div>
        {governmentLoanType && (
          <div className="row align-items-start mt-4">
            <Header title="Government Loan" />
            <Input
              register={register}
              errors={errors}
              api_name="Monthly_Payment_0_1"
              label="Monthly_Payment1_0%"
              type="number"
            />
            {(isGoodBetterBest || isDuctlessOffset) && (
              <Input
                register={register}
                errors={errors}
                api_name="Monthly_Payment_0_2"
                label="Monthly_Payment2_0%"
                type="number"
              />
            )}
            {isGoodBetterBest && (
              <>
                <Input
                  register={register}
                  errors={errors}
                  api_name="Monthly_Payment_0_3"
                  label="Monthly_Payment3_0%"
                  type="number"
                />
              </>
            )}
          </div>
        )}
        {/* {presentationType !== radonPresentationType && (
          <div className="row align-items-start mt-4">
            <Header title="Lease to Own" />
            <Input
              register={register}
              errors={errors}
              api_name="Monthly_Payment_Lease_to_Own_1"
              label="Monthly_Payment1_Lease_to_Own"
              type="number"
            />
            {(isGoodBetterBest || isDuctlessOffset) && (
              <Input
                register={register}
                errors={errors}
                api_name="Monthly_Payment_Lease_to_Own_2"
                label="Monthly_Payment2_Lease_to_Own"
                type="number"
              />
            )}
            {isGoodBetterBest && (
              <>
                <Input
                  register={register}
                  errors={errors}
                  api_name="Monthly_Payment_Lease_to_Own_3"
                  label="Monthly_Payment3_Lease_to_Own"
                  type="number"
                />
              </>
            )}
          </div>
        )} */}
        {isFinanceITOption && presentationType !== radonPresentationType && (
          <div className="row align-items-start mt-4">
            <Header title="Bundle Prices" />
            {/* {governmentLoanType ? (
              // Display only Water Heater Bundle Price
              <>
                <Input
                  register={register}
                  errors={errors}
                  api_name="Bundle_II_Price_Water_Heater"
                  label="Water_Heater_Bundle_Price"
                  type="number"
                />
              </>
            ) : ( */}
            <>
              <Input
                register={register}
                errors={errors}
                api_name="Bundle_I_Price_Attic"
                label={
                  presentationType.includes("Attic")
                    ? "Heat_Pump_Bundle_Price"
                    : "Attic_Bundle_Price"
                }
                type="number"
              />
              <Input
                register={register}
                errors={errors}
                api_name="Bundle_I_Monthly"
                label={
                  presentationType.includes("Attic")
                    ? "Monthly_Heat_Pump_Bundle_Price"
                    : "Monthly_Attic_Bundle_Price"
                }
                type="number"
              />
              <Input
                register={register}
                errors={errors}
                api_name="Bundle_II_Price_Water_Heater"
                label="Water_Heater_Bundle_Price"
                type="number"
              />
              <Input
                register={register}
                errors={errors}
                api_name="Bundle_II_Monthly"
                label="Monthly_Water_Heater_Bundle_Price"
                type="number"
              />
            </>
            {/* )} */}
          </div>
        )}
        <div className="my-3">
          <button
            className="btn btn-dark py-2"
            type="submit"
            disabled={IsSubmitting}
          >
            {IsSubmitting && (
              <span
                className="spinner-border spinner-border-sm me-1"
                aria-hidden="true"
              ></span>
            )}
            <span role="status">
              Generat{IsSubmitting ? "ing" : "e"} Presentation
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
