import React, { useState, useEffect, useRef } from 'react'


export default function Carousel(props){
    const { slides } = props

    const [activeSlide, setActiveSlide] = useState(0)
    const [windowWidth, setWindowWidth] = useState(0)

    const slideRefs = useRef([])

    // const [containerWidth, setContainerWidth] = useState(0)

    useEffect(() => {
        function handleResize(){
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        let interval = window.setInterval(() => {
            nextSlide()
        }, 10000)

        return () => {
            window.clearInterval(interval)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        slideRefs.current = slideRefs.current.slice(0, slides.length);
    }, [slides.length])

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

    return (
        <section aria-label="Image Carousel">
            <h1>{activeSlide}</h1>
            {/* carousel */}
            <div className="slides-container">
                {slides.map((slide, index) => {
                    return (
                        <div ref={slideRefs[index]} className="carousel-slide" key={`carousel-slide-${index}`}>
                            {/* slide {index} */}
                            <a href={slide.link_url}>
                                <img src={slide.image_url} aria-label={slide.aria_label} />
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
                    Previous
                </button>
            </div>
            <div className="next-slide">
                <button
                    className="next-slide-button" 
                    aria-label="Next Slide"
                    onClick={() => nextSlide()}
                >
                    Next
                </button>
            </div>

            <div className="slide-indicators">
                {slides.map((slide, index) => {
                    return (
                        <div key={`carousel-slide-indicator-${index}`}>
                            <button className="slide-indicator-button" aria-label={`Go To Slide ${index}`}>
                                Go To Slide {index}
                            </button>
                        </div>
                    )
                })}
            </div>

            {/* TODO: Add pause autoplay button, at least for screen readers */}
        </section>
    )
}