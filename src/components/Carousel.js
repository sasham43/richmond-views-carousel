import React, { useState, useEffect, useRef } from 'react'


export default function Carousel(props){
    const { slides } = props

    const [activeSlide, setActiveSlide] = useState(0)

    const [autoplayEnabled, setAutoplayEnabled] = useState(false)

    useEffect(() => {

        let interval = window.setInterval(() => {
            if(autoplayEnabled){
                nextSlide()
            }
        }, 10000)

        return () => {
            window.clearInterval(interval)
        }
    }, [nextSlide])

    function nextSlide(){
        if(activeSlide >= slides.length - 1){
            setActiveSlide(0)
        } else {
            let next = activeSlide + 1
            setActiveSlide(next)
        }

        // 
    }
    function previousSlide(){
        if(activeSlide == 0){
            setActiveSlide(slides.length - 1)
        } else {
            let previous = activeSlide - 1
            setActiveSlide(previous)
        }
    }
    function goToSlide(index){
        setActiveSlide(index)
    }
    function toggleAutoplay(){
        setAutoplayEnabled(!autoplayEnabled)
    }

    return (
        <section aria-label="Image Carousel">
            <h1>{activeSlide}</h1>
            {/* carousel */}
            <div className="carousel-container">
                <div className="slides-container" style={{ transform: `translateX(-${activeSlide * 100}%)`}}>
                    {slides.map((slide, index) => {
                        return (
                            <div 
                                id={`slide-${index}`} 
                                // ref={el => slideRefs.current[index] = el} 
                                aria-hidden={index !== activeSlide} 
                                className="carousel-slide" 
                                key={`carousel-slide-${index}`}
                            >
                                <a href={slide.link_url} target="_blank" rel="noreferrer">
                                    <img src={slide.image_url} aria-label={slide.aria_label} className="carousel-slide-image" />
                                </a>
                            </div>
                        )
                    })}
                </div>

                {/* <div className="carousel-controls"> */}

                    <div className="previous-slide">
                        <button
                            className="previous-slide-button" 
                            aria-label="Previous Slide"
                            onClick={() => previousSlide()}
                        >
                            {/* Previous */}
                            {"<"}
                        </button>
                    </div>
                    <div className="next-slide">
                        <button
                            className="next-slide-button" 
                            aria-label="Next Slide"
                            onClick={() => nextSlide()}
                        >
                            {/* Next */}
                            {">"}
                        </button>
                    </div>

                    <div className="slide-indicators">
                        {slides.map((slide, index) => {
                            let isActive = index === activeSlide ? true : false
                            return (
                                <div aria-current={isActive} key={`carousel-slide-indicator-${index}`}>
                                    <button 
                                        onClick={() => goToSlide(index)} 
                                        className={`slide-indicator-button ${isActive ? 'active' : ''}`}
                                        aria-label={`Go To Slide ${index}`}
                                    >
                                        {/* Go To Slide {index} */}
                                    </button>
                                    {/* <a href={`#slide-${index}`}>
                                        Go To Slide {index}
                                    </a> */}
                                </div>
                            )
                        })}
                    </div>
                {/* </div> */}


                {/* TODO: Add pause autoplay button, at least for screen readers */}
                <div>
                    <button onClick={() => toggleAutoplay()} aria-label={`${autoplayEnabled ? 'Disable Autplay' : 'Enable Autoplay'}`} className={"toggle-autoplay-button"}>
                        {
                            autoplayEnabled ? 
                            <span>Disable Autoplay</span>
                            :
                            <span>Enable Autoplay</span>
                        }
                    </button>
                </div>
            </div>
        </section>
    )
}