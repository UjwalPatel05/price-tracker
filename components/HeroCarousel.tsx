"use client"

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
    {imgUrl:'/assets/images/hero-1.svg', alt: 'smartwatch'},
    {imgUrl:'/assets/images/hero-2.svg', alt: 'bag'},
    {imgUrl:'/assets/images/hero-3.svg', alt: 'lamp'},
    {imgUrl:'/assets/images/hero-4.svg', alt: 'air fryer'},
    {imgUrl:'/assets/images/hero-5.svg', alt: 'chair'},
]
const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
      showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={2500}
        showArrows={false}
      >
        {heroImages.map((image, index) => (
            <div key={index}>
                <Image src={image.imgUrl} alt={image.alt} height={484} width={484} className="object-contain"/>
            </div>
        ))}
      </Carousel>

      <Image
            src="/assets/icons/hand-drawn-arrow.svg"
            width={175}
            height={175}
            alt="arrow"
            className="max-xl:hidden absolute bottom-0 z-0 -left-[15%]"
            />
    </div>
  );
};

export default HeroCarousel;
