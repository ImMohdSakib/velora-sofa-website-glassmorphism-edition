import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Categories from '../components/Categories'
import WhyChooseUs from '../components/WhyChooseUs'
import Showcase from '../components/Showcase'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import FeaturedSofas from '../components/FeaturedSofas'
import CraftProcess from '../components/CraftProcess'
import RoomInspiration from '../components/RoomInspiration'

export default function Home(){
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedSofas />
      <Categories />
      <WhyChooseUs />
      <Showcase />
      <CraftProcess />
      <RoomInspiration />
      <About />
      <Testimonials />
      <Newsletter />
    </>
  )
}
