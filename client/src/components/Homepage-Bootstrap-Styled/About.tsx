import about from '../../Assets/images/about.jpg'

const About = () => {
    return (
        <div className="row" id="about">
            <div className="col-md-6 my-5 p-4">
                <img src={about} className="img-fluid aboutimg" alt="" />
            </div>

            <div className="col-md-6 my-5 p-4">
                <h1 className="display-5 text-dark">About the Resort</h1>
                <p className="text-dark lead">
                    A lovely yet modest resort facility, Paradise Beach Resort
                    is situated close to the national highway in Pantukan.
                </p>
                <p className="text-dark lead">
                    The resort contains a variety of rooms available for
                    extended stays, along with a courtyard filled with tropical
                    plants and simple amenities. You may still enjoy your break
                    or holiday at this low-cost resort facility thanks to its
                    offered amenities and services.
                </p>
                <i className="bi bi-facebook text-dark px-3"></i>
                <i className="bi bi-instagram text-dark px-3"></i>
                <i className="bi bi-twitter text-dark px-3"></i>
                <i className="bi bi-youtube text-dark px-3"></i>
            </div>
        </div>
    )
}

export default About
