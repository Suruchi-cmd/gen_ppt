export default function RebateInfo({ data }: { data: any }) {
  return (
    <div>
      <div className="accordion pb-2" id="nsRebateAccordion">
        <div className="accordion-item border-0">
          <h2
            className="accordion-header d-flex align-items-center justify-content-between"
            id="headingInfo"
          >
            <div className="flex-grow-1">
              <button
                className="accordion-button bg-info-subtle"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseInfo"
                aria-expanded="true"
                aria-controls="collapseInfo"
              >
                <i className="fa fa-info-circle me-2"></i>
                <span className="fw-bold small">
                  Nova Scotia Rebates Qualifying Information{" "}
                  <i
                    className="px-1 fa fa-images cursor-pointer"
                    role="button"
                    data-bs-toggle="modal"
                    data-bs-target="#rebateImagesModal"
                  ></i>
                </span>
              </button>
            </div>
          </h2>
          <div
            id="collapseInfo"
            className="accordion-collapse collapse"
            aria-labelledby="headingInfo"
            data-bs-parent="#nsRebateAccordion"
          >
            <div className="accordion-body small p-0">
              <ul className="list-group rounded-top-0">
                <li className="list-group-item">
                  Lead Type:{" "}
                  <span className="fw-bold">{data.Lead_Type || "N/A"}</span>
                </li>
                <li className="list-group-item">
                  Current Heating Type:{" "}
                  <span className="fw-bold">
                    {data.Current_Heating_Fuel_Type_Ductless || "N/A"}
                  </span>
                </li>
                <li className="list-group-item">
                  Existing Ductwork:{" "}
                  <span className="fw-bold">
                    {data.Existing_Ductwork || "N/A"}
                  </span>
                </li>
                <li className="list-group-item">
                  Number of Income Generator:{" "}
                  <span className="fw-bold badge bg-info rounded-pill">
                    <big>{data.Number_of_Income_Generators || "N/A"}</big>
                  </span>
                </li>
                <li className="list-group-item">
                  Annual Household Income:{" "}
                  <span className="fw-bold">
                    CA$ {data.Annual_Household_Income || "N/A"}
                  </span>
                </li>
                <li className="list-group-item">
                  At Least 500L Oil Consumption in Last 12 Months:{" "}
                  <span className="fw-bold">
                    {data.At_least_500L_Oil_Consumption_Last_12_Months || "N/A"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="rebateImagesModal"
        tabIndex={-1}
        aria-labelledby="rebateImagesModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="rebateImagesModalLabel">
                Rebates Information
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div
                id="rebateCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="./novascotia/rebate1.png"
                      className="d-block w-100 rounded"
                      alt="Rebate 1"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="./novascotia/rebate2.png"
                      className="d-block w-100 rounded"
                      alt="Rebate 2"
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev bg-dark bg-opacity-25"
                  type="button"
                  data-bs-target="#rebateCarousel"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next bg-dark bg-opacity-25"
                  type="button"
                  data-bs-target="#rebateCarousel"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
