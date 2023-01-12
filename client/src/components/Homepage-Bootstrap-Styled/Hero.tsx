import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="col-md-12">
      <div className="banner-contents m-5 py-4 text-center text-light">
        <h1 className="display-2">A World of Luxury</h1>
        <h1 className="display-2">Awaits You</h1>
        <p className="lead">discover Paradise Resort</p>
        <div className="form-group gap-2">
          <Link to="/service/rooms" className="btn btn-outline-light">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
