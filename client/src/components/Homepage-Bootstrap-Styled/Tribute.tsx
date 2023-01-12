const Tribute = () => {
  return (
    <div className="col-md-12">
      <div className="description text-center">
        <h1 className="display-5">Here is a tribute to good life!</h1>
        <p className="lead text-center">
        Enjoy the good life, explore simple pleasures and celebrate special moments
        at Paradise Resort – your home away from home.

      </p>
        <div className="rating text-center text-dark py-3">
          <i className="bi bi-star-fill px-2"> Have High Rating </i>
          <i className="bi bi-geo-alt-fill px-2">Best Locations</i>
          <i className="bi bi-x-circle-fill px-2">Free Cancellation</i>
          <i className="bi bi-activity px-2">Best Activites</i>
        </div>

        <div className="rating text-center py-3">
          <span className="display-6">4.5</span>
          <i className="bi bi-star-fill px-2"> </i>
          <i className="bi bi-star-fill px-2"> </i>
          <i className="bi bi-star-fill px-2"> </i>
          <i className="bi bi-star-fill px-2"> </i>
          <i className="bi bi-star-half px-2"></i> <br />
          <span>Clients Love Us! </span>
        </div>
      </div>
    </div>
  );
};

export default Tribute;
