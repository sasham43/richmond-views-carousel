import React, { useState, useEffect, useRef } from 'react'


export default function Carousel(props){
    const { slides } = props
    const touchDelta = 35

    const [activeSlide, setActiveSlide] = useState(0)
    const [autoplayEnabled, setAutoplayEnabled] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [touchX, setTouchX] = useState(0)

    useEffect(() => {
        let interval = window.setInterval(() => {
            if(autoplayEnabled && !isHovering){
                nextSlide()
            }
        }, 10000)

        return () => {
            window.clearInterval(interval)
        }
    }, [nextSlide])

    useEffect(() => {
        // console.log('active slide changed', activeSlide, activeSlide % 0)
    }, [activeSlide])

    function nextSlide(){
        if(activeSlide >= slides.length - 1){
            setActiveSlide(0)
        } else {
            let next = activeSlide + 1
            setActiveSlide(next)
        }
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
    function onTouchStart(data){
        let x = data.changedTouches[0].clientX

        setTouchX(x)
    }
    function onTouchEnd(data){
        let x = data.changedTouches[0].clientX
        let abs = Math.abs(touchX - x)
        
        // compare distance traveled against delta to see if touch is a swipe or errant
        if(abs > touchDelta){
            if(x > touchX){
                previousSlide()
            } else {
                nextSlide()
            }
        }
    }
    

    return (
        <section aria-label="Image Carousel">
            <div className="carousel-container">
                <div 
                    className="slides-container" 
                    style={{ transform: `translateX(-${activeSlide * 100}%)`}}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onTouchStart={(data) => onTouchStart(data)}
                    onTouchEnd={(data) => onTouchEnd(data)}
                >
                    {slides.map((slide, index) => {
                        return (
                            <div 
                                id={`slide-${index}`}  
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

                <div className="previous-slide">
                    <button
                        className="previous-slide-button" 
                        aria-label="Previous Slide"
                        onClick={() => previousSlide()}
                    >
                        {"<"}
                    </button>
                </div>
                <div className="next-slide">
                    <button
                        className="next-slide-button" 
                        aria-label="Next Slide"
                        onClick={() => nextSlide()}
                    >
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
                            </div>
                        )
                    })}
                </div>


                {/* Pause autoplay button for screen readers */}
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