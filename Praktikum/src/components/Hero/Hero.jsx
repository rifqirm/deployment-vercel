import { useNavigate } from 'react-router-dom';
import heroImage from '../../assets/hero-img.png.svg';


const Hero = () => {

    const navigate = useNavigate()

    return (
        <>
            <section className="hero-container">
                <div>
                    <h1>Better Solutions For Your Business</h1>
                    <p>
                        We are team of talented designers making websites with <br /> Bootstrap
                    </p>
                    <div className="hero-items">
                        <button onClick={() => navigate('/getstarted')}>Get Started</button>
                        <span>Watch Video</span>
                    </div>
                </div>
                <img src={heroImage} alt="Hero Logo" />
            </section>

        </>
    );
}

export default Hero