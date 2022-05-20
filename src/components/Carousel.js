import React, { useState, useEffect, useRef } from 'react'


export default function Carousel(props){
    const { slides } = props

    const [activeSlide, setActiveSlide] = useState(0)
    const [windowWidth, setWindowWidth] = useState(0)
    const [imageHeight, setImageHeight] = useState(0)

    const [autoplayEnabled, setAutoplayEnabled] = useState(false)

    const slideRefs = useRef([])

    // const [containerWidth, setContainerWidth] = useState(0)

    useEffect(() => {
        function handleResize(){
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        let interval = window.setInterval(() => {
            if(autoplayEnabled){
                nextSlide()
            }
        }, 10000)

        return () => {
            window.clearInterval(interval)
            window.removeEventListener('resize', handleResize)
        }
    }, [nextSlide])

    useEffect(() => {
        slideRefs.current = slideRefs.current.slice(0, slides.length);
    }, [slides.length])

    useEffect(() => {
        slideRefs.current[activeSlide].scrollIntoView()
    }, [activeSlide])

    useEffect(() => {
        let imageHeights = slideRefs.current.map(slide => {
            console.log('height', slide.offsetHeight)
            return slide.offsetHeight
        })
        let sorted = imageHeights.sort()
        console.log('sorted', sorted)
    }, [windowWidth])

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
            <div className="carousel-container">
                <div className="slides-container" style={{}}>
                    {slides.map((slide, index) => {
                        return (
                            <div id={`slide-${index}`} ref={el => slideRefs.current[index] = el} aria-hidden={index !== activeSlide} className="carousel-slide" key={`carousel-slide-${index}`}>
                                {/* slide {index} */}
                                <a href={slide.link_url} target="_blank" rel="noreferrer">
                                    <img src={slide.image_url} aria-label={slide.aria_label} />
                                </a>
                            </div>
                        )
                    })}
                </div>

                <div className="carousel-controls">

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
                                <div aria-current={index === activeSlide} key={`carousel-slide-indicator-${index}`}>
                                    {/* <button className="slide-indicator-button" aria-label={`Go To Slide ${index}`}>
                                        Go To Slide {index}
                                    </button> */}
                                    <a href={`#slide-${index}`}>
                                        Go To Slide {index}
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                </div>


                {/* TODO: Add pause autoplay button, at least for screen readers */}
            </div>
        </section>
    )
}