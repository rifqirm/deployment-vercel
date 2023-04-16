import './LandingPage.css'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Newsletter from '../../components/Newsletter/Newsletter'
import Footer from '../../components/Footer/Footer'
import ProductList from '../../components/ProductList/ProductList'

function LandingPage() {

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link
                href="https://fonts.googleapis.com/css2?family=Jost:wght@700&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Jost:wght@500;700&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Jost:wght@500;700&family=Open+Sans&display=swap"
                rel="stylesheet"
            />
            
            <Navbar />
            <Hero />
            <ProductList />
            <Newsletter />
            <Footer />
        </>
    )
}

export default LandingPage