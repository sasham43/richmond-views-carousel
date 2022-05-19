import React, { useState, useEffect } from 'react'


export default function Carousel(props){
    let { slides } = props
    return (
        <section role="carousel">
            {/* carousel */}
            <div className="slides-container">
                {slides.map((slide, index) => {
                    return (
                        <div key={`carousel-slide-${index}`}>
                            slide {index}
                        </div>
                    )
                })}
            </div>

            <div className="previous-slide">
                <button className="previous-slide-button" aria-label="Previous Slide">Previous</button>
            </div>
            <div className="next-slide">
                <button className="next-slide-button" aria-label="Next Slide">Next</button>
            </div>

            <div className="carousel-indicators">
                {slides.map((slide, index) => {
                    return (
                        <div>
                            <button className="slide-indicator-button" aria-label={`Go To Slide ${index}`}>
                                Go To Slide {index}
                            </button>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}