import Carousel from '../components/Homepage-Bootstrap-Styled/Carousel'
import Feedbacks from '../components/Homepage-Bootstrap-Styled/Feedbacks'
import FAQs from '../components/Homepage-Bootstrap-Styled/FAQs'
import About from '../components/Homepage-Bootstrap-Styled/About'
import Footer from '../components/Homepage-Bootstrap-Styled/Footer'
import Tribute from '../components/Homepage-Bootstrap-Styled/Tribute'
import Hero from '../components/Homepage-Bootstrap-Styled/Hero'
import Header from '../components/Homepage-Bootstrap-Styled/Header'
import Experience from '../components/Homepage-Bootstrap-Styled/Experience'

const Homepage = () => {
    return (
        <div className="container-fluid banner">
            <div className="rooms">
                <Header />
                <Hero />
                <Tribute />
                <Experience />
                <Carousel />
                <div className="col-md-12">
                    <div className="feedback my-5 p-4" id="feedback">
                        <Feedbacks />
                        <FAQs />
                    </div>
                </div>
                <About />
                <Footer />
            </div>
        </div>
    )
}

export default Homepage
