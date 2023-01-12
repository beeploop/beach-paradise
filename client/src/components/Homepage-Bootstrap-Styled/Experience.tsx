import food from "../../Assets/images/food1.jpg";
import jetski from "../../Assets/images/jetski.jpg";
import room from "../../Assets/images/room1.png";
import wedding from "../../Assets/images/wedding.jpg";

const Experience = () => {
  return (
    <div className="row experience">
      <h1 className="display-5 text-center my-5">Our Exciting Experience</h1>

      <div className="col-md-3 exp p-2"  >
        <img src={food} className="img-fluid rounded" alt="..." />  
        <div>
        <h6 className="display-6">Foods</h6>
        <p className="lead p-2">
          The restaurant offers traditional Italian fare like wood-fired pizzas, homemade pasta, succulent seafood and meat entrees, fresh garden salads, and cool beverages.
        </p>
  
        </div>
      </div>

      <div className="col-md-3 exp p-2"  >
        <img src={jetski} className="img-fluid rounded" alt="..." />
        <div>
        <h6 className="display-6">Adventure</h6>
        <p className="lead p-2">
          Speed boat rides are a popular and simple water activity in Goa. During this 10-minute journey, feel the rush of taking on the amazing waves.
        </p>
          
        </div>
      </div>

      <div className="col-md-3 exp p-2" >
        <img src={room} className="img-fluid rounded" alt="..." />
        <div>
        <h6 className="display-6">Luxury</h6>
        <p className="lead p-2" >
          All of our guestrooms are tastefully decorated 
        </p>
          
        </div>
      </div>

      <div className="col-md-3 exp  p-2"  >
        <img src={wedding}className="img-fluid rounded" alt="..." />
        <div>
        <h6 className="display-6">Dining</h6>
        <p className="lead p-2">
          A restaurant by the sea where you can enjoy seasonal seafood in elegant cuisine made with carefully chosen ingredients. 
        </p>
          
        </div>
      </div>
    </div>
  );
};

export default Experience;
