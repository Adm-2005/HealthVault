import { useEffect, useState } from 'react';

const Carousel = ({
    children,
    className='',
    slideStyle = 'flex gap-4 transition-transform duration-500 ease-out',
    controlStyle = 'text-2xl px-2 cursor-pointer',
    paginationStyle = '',
    itemsPerSlide = 2,
    autoPlay = false,
    autoPlayInterval = 2000,
    infinite = false,
    pagination = true,
    controls = true
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesToShow = Math.ceil(children.length / itemsPerSlide); 

    const updateSlide = (newIndex) => {
        if(infinite) {
            setCurrentSlide((newIndex + slidesToShow) % slidesToShow)
        }
        else {
            setCurrentSlide(Math.max(0, Math.min(newIndex, slidesToShow - 1)))
        }
    }

    const prevSlide = () => updateSlide(currentSlide - 1);
    const nextSlide = () => updateSlide(currentSlide + 1);

    useEffect(() => {
        if(autoPlay) {
            const interval = setInterval(nextSlide, autoPlayInterval);
            return () => clearInterval(interval);
        }
    }, [autoPlay, autoPlayInterval, currentSlide]);

    const startIndex = currentSlide * itemsPerSlide;
    const visibleSlides = children.slice(startIndex, startIndex + itemsPerSlide);

    return (
        <div className={`${className} flex flex-col gap-4`}>
            <div className='flex w-full justify-center items-center'>
                {/* left control */}
                {controls && (
                    <button
                        onClick={prevSlide}
                        className={controlStyle}
                        aria-label='Previous Slide'
                    >
                        &lsaquo;
                    </button>
                )}

                {/* slide content */}
                <div className={`${slideStyle} overflow-hidden w-full`}>
                    {visibleSlides.map((child, index) => (
                        <div key={index} className='flex-shrink-0 w-full'>
                            {child}
                        </div>
                    ))}
                </div>

                {/* right control */}
                {controls && (
                    <button
                        onClick={nextSlide}
                        className={controlStyle}
                        aria-label='Next Slide'
                    >
                        &rsaquo;
                    </button>
                )}
            </div>
            
            {pagination && (
                <div className='flex gap-1 w-full items-center justify-center'>
                    {Array.from({ length: slidesToShow }).map((_, index) => (
                        <div 
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`${paginationStyle} ${index === currentSlide ? 'bg-purple-950' : 'bg-purple-400' } h-[10px] w-[10px] rounded-full cursor-pointer`}
                        >
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Carousel;