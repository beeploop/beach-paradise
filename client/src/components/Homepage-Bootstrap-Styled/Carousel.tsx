import room1 from '../../Assets/images/room1.png'
import room2 from '../../Assets/images/room2.png'
import room3 from '../../Assets/images/room3.png'
import room4 from '../../Assets/images/room4.png'
import room5 from '../../Assets/images/room5.png'
import './Homepage.css'

const Carousel = () => {
    return (
        <>
            <h1 className="display-5 text-center my-5">Our Favorite Rooms</h1>
            <div
                id="carouselExampleDark"
                className="carousel carousel-dark slide"
                data-bs-ride="carousel"
            >
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleDark"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleDark"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleDark"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleDark"
                        data-bs-slide-to="3"
                        aria-label="Slide 4"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleDark"
                        data-bs-slide-to="4"
                        aria-label="Slide 5"
                    ></button>
                </div>
                <div className="carousel-inner text-center">
                    <div
                        className="carousel-item active"
                        data-bs-interval="10000"
                    >
                        <img src={room1} className="favrooms img-responsive" />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src={room2} className="favrooms img-responsive" />
                    </div>
                    <div className="carousel-item">
                        <img src={room3} className="favrooms img-responsive" />
                    </div>
                    <div className="carousel-item">
                        <img src={room4} className="favrooms img-responsive" />
                    </div>
                    <div className="carousel-item">
                        <img src={room5} className="favrooms img-responsive" />
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Carousel
