import { FormInputType } from "../schemas";

export default function Input({
  api_name,
  type,
  register,
  errors,
  label,
  extraLabel,
  col,
  readOnly,
}: FormInputType) {
  return (
    <div className={`${col ? col : "col-md-4"} my-2`}>
      <label className="form-label small fw-bold">
        {label?.replace(/_/g, " ")} <span className="small">{extraLabel}</span>
      </label>
      <div className="d-flex align-items-start">
        <div className="btn btn-light border rounded-end-0 fw-bold">
          <span className="small">CA$</span>
        </div>
        <div className="w-100">
          <input
            type={type}
            step="any"
            className={
              "rounded-start-0 w-100 form-control " +
              (errors?.[api_name] && "is-invalid")
            }
            placeholder="0"
            {...register(`${api_name}`)}
            readOnly={readOnly}
          />
          {errors?.[api_name] && (
            <div className="invalid-feedback small">
              {errors?.[api_name].message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
