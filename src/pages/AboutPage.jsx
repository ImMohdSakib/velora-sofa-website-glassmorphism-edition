import About from '../components/About'
import WhyChooseUs from '../components/WhyChooseUs'
import Stats from '../components/Stats'
import Newsletter from '../components/Newsletter'

export default function AboutPage(){
  return (
    <div className="pt-24">
      <About />
      <Stats />
      <WhyChooseUs />
      <Newsletter />
    </div>
  )
}
