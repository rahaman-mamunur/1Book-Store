import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import img2 from "../../../assets/2.png";
import img3 from "../../../assets/3.jpg";
import img5 from "../../../assets/5.jpg";
import img6 from "../../../assets/6.jpg";
import img7 from "../../../assets/7.jpg";


const Banner = ()=>{

    return(

        <>
         <Carousel>
                <div>
                    <img src={img2}/>
                    
                </div>
                <div>
                    <img src={img3} />
                   
                </div>
                <div>
                    <img src={img5}/>
                   
                </div>
                <div>
                    <img src={img6}/>
                   
                </div>
                <div>
                    <img src={img7}/>
                   
                </div>
            </Carousel>
        </>
    )
}
export default Banner; 