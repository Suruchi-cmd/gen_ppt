import { useFetchFields } from "../hooks/useFetchFields";
import { FormInputType } from "../schemas";

export default function Select({
  api_name,
  register,
  errors,
  label,
  extraLabel,
  col,
}: FormInputType) {
  const { data, isLoading } = useFetchFields({
    Entity: "Leads",
    apiName: label,
  });

  if (isLoading)
    return (
      <div className={`${col ? col : "col-md-4"} my-2`}>
        <label className="form-label small fw-bold">
          {label?.replace(/_/g, " ")}
        </label>
        <div className="form-select">
          <div
            className="spinner-border text-dark"
            role="status"
            style={{ fontSize: "0.5rem", width: "0.9rem", height: "0.9rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );

  return (
    <div className={`${col ? col : "col-md-4"} my-2`}>
      <label className="form-label small fw-bold">
        {label?.replace(/_/g, " ")} {extraLabel && ` - ${extraLabel}`}
      </label>
      <select
        className={"form-select " + (errors?.[api_name] && "is-invalid")}
        {...register(`${api_name}`)}
        disabled={isLoading}
      >
        <option value="">-- Select --</option>
        {data?.map(
          (category: any) =>
            category.display_value !== "-None-" && (
              <option key={category.id} value={category.display_value}>
                {category.display_value}
              </option>
            )
        )}
      </select>
      {errors?.[api_name] && (
        <div className="invalid-feedback small">
          {errors?.[api_name].message}
        </div>
      )}
    </div>
  );
}
