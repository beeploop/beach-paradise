const FAQs = () => {
  return (
    <div className="row my-5">
      <div className="col-md-6">
        <h1 className="display-5">Frequently Asked Questions</h1>
      </div>
      <div className="col-md-6 my-4">
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Can I book via walk-in?
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                  Yes of course, but the reservation system is first come, first serve whether you booked online or walk-in.
                </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                 How much is the cancellation fee? 
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample"
            >
               <div className="accordion-body">
                  Good news! there is no cancellation fee.
                </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default FAQs;
