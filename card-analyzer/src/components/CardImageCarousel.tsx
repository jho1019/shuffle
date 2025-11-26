"use client";

import { useState } from 'react';

interface CardImage {
    IsFrontImage: boolean;
    ImageURL: string;
}

interface CardImageCarouselProps {
    images: CardImage[];
}

export default function CardImageCarousel({ images }: CardImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return null;
    }

    const sortedImages = images.sort((a, b) => a.IsFrontImage ? -1 : 1);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const currentImage = sortedImages[currentIndex];

    return (
        <div className="relative w-full">
            {/* Image Container */}
            <div className="relative w-full aspect-[2/3] bg-gray-800 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                    src={currentImage.ImageURL}
                    alt={currentImage.IsFrontImage ? "Card Front" : "Card Back"}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                        // Hide image if it fails to load
                        e.currentTarget.style.display = 'none';
                    }}
                />
            </div>

            {/* Navigation Arrows (only show if multiple images) */}
            {sortedImages.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-white/20 rounded-full transition-all hover:scale-110"
                        aria-label="Previous image"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-white/20 rounded-full transition-all hover:scale-110"
                        aria-label="Next image"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {sortedImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                    ? 'bg-white w-6'
                                    : 'bg-white/40 hover:bg-white/60'
                                    }`}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
