import AboutSection from "@/components/Landing/about-section";
import FeaturedMenu from "@/components/Landing/featured-menu";
import Footer from "@/components/Landing/footer";
import LocationContact from "@/components/Landing/location-contact";
import OpeningHours from "@/components/Landing/opening-hours";
import RestaurantHero from "@/components/Landing/restaurant-hero";
import Testimonials from "@/components/Landing/testimonials";


export default function Home() {
  return (
    <div>
      <RestaurantHero />
      <AboutSection />
      <FeaturedMenu />
      <OpeningHours />
      <Testimonials />
      <LocationContact />
      <Footer />
    </div>
  )
}
