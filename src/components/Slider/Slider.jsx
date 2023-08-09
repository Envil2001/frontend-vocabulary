import { useState } from "react"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import "./Slider.css"

export const Slider = ({ words }) => {

    const [slideIndex, setSlideIndex] = useState(1);
    const [isRotate, setIsRotate] = useState(false);
    const nextSlide = () => {
        if (slideIndex < words.length) {
            setSlideIndex(slideIndex + 1);
            setIsRotate(false);
        } else {
            setSlideIndex(1);
            setIsRotate(false);
        }
    };
    const prevSlide = () => {
        if (slideIndex === 1) {
            setSlideIndex(words.length);
            setIsRotate(false);
        } else {
            setSlideIndex(slideIndex - 1);
            setIsRotate(false);
        }
    };

    const moveSlide = (index) => {
        setSlideIndex(index);
    };


    return (
        <>
            {
                words.length > 1 &&
                <div className="slider_container">
                    {words.map((sliderItem, index) => (
                        <div key={index} className={slideIndex === index + 1 ? "card active" : "card"} onClick={() => setIsRotate(state => !state)}>
                            <div className={!isRotate ? "rotate_card" : "rotate_card rotate"}>
                                <div className="front">
                                    <p>{sliderItem.title}</p>
                                </div>
                                <div className="back">
                                    <p>{sliderItem.translate}</p>
                                </div>
                            </div>

                        </div>
                    ))
                    }
                    <button onClick={prevSlide} className="slide-button left"><AiOutlineArrowLeft /></button>
                    <button onClick={nextSlide} className="slide-button right"><AiOutlineArrowRight /></button>
                    <div className="dots">

                        {[...Array(words.length)].map((_, index) => (
                            <div key={index} onClick={() => { moveSlide(index + 1) }} className={slideIndex === index + 1 ? "dot active" : "dot"}>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>

    )
}