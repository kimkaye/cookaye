import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import image1 from "../assets/breakfast.jpeg";
import image2 from "../assets/lunch.jpeg";
import image3 from "../assets/dinner.jpeg";
import image4 from "../assets/Tiramisu.jpeg";


function ImageCarousel() {
    return (
        <div className="ImageCarousel">
            <Carousel showArrows={true}>
                <div>
                    <img src={image1} />
                    <p className="legend">Breakfast Recipes</p>
                </div>
                <div>
                    <img src={image2} />
                    <p className="legend">Lunch Recipes</p>
                </div>
                <div>
                    <img src={image3} />
                    <p className="legend">Dinner Recipes</p>
                </div>
                <div>
                    <img src={image4}/>
                    <p className="legend">Dessert Recipes</p>
                </div>
            </Carousel>
        </div>
    );
}

export default ImageCarousel;

