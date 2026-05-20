import Banner from "@/components/Banner";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import HowItWorks from "@/components/Home/HowItWorks";
import AllTutorPage from "@/components/Home/AllTutors";


export default function Home() {
  return (
    <div >
      <Banner/>
      <AllTutorPage/>
      <WhyChooseUs/>
      <HowItWorks/>
    </div>
  );
}
