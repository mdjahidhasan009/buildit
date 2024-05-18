import React, {Children, cloneElement, useEffect, useRef} from 'react';
import './Carousel.css';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {IReactNode} from "@/lib/types";

const CardSlider: React.FC<IReactNode> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef<number | null>(null);
  const startScrollLeftRef = useRef<number | null>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const firstCardWidthRef = useRef<number>(0);
  const isAutoPlayRef = useRef<boolean>(true);
  const timeoutIdRef = useRef<number>(0);

  useEffect(() => {
    if (carouselRef.current) {
      const firstCardElement = Array.from(carouselRef.current.children).find(child => child.classList.contains('card'));
      if (firstCardElement) {
        firstCardWidthRef.current = firstCardElement.getBoundingClientRect().width;
      }

      if (firstCardWidthRef.current) {
        const offset = carouselRef.current.offsetWidth - 20;
        const cardPerView = Math.round(offset / firstCardWidthRef.current) ;
        const carouselChildren = Array.from(carouselRef.current.children);

        carouselChildren.slice(-cardPerView).reverse().forEach((card, index) => {
          // carouselRef.current?.insertAdjacentHTML("afterbegin", card.outerHTML);
          const clone = card.cloneNode(true);
          carouselRef.current?.insertBefore(clone, carouselRef.current.firstChild);
        });

        carouselChildren.slice(0, cardPerView).forEach((card, index) => {
          // carouselRef.current?.insertAdjacentHTML("beforeend", card.outerHTML);
          const clone = card.cloneNode(true);
          carouselRef.current?.appendChild(clone);
        });

        carouselRef.current.classList.add("no-transition");
        carouselRef.current.scrollLeft = carouselRef.current.offsetWidth;
        carouselRef.current.classList.remove("no-transition");

        carouselRef.current.scrollLeft = carouselRef.current.offsetWidth;
      }
    }

    const slider = carouselRef.current;
    if(!slider) return;

    slider.addEventListener('mousedown', onDragStart);
    slider.addEventListener('mouseleave', onDragEnd);
    slider.addEventListener('mouseup', onDragEnd);
    slider.addEventListener('mousemove', onDragMove);

    carouselRef.current?.addEventListener("scroll", infiniteScroll);

    return () => {
      slider.removeEventListener('mousedown', onDragStart);
      slider.removeEventListener('mouseleave', onDragEnd);
      slider.removeEventListener('mouseup', onDragEnd);
      slider.removeEventListener('mousemove', onDragMove);

      carouselRef.current?.removeEventListener("scroll", infiniteScroll);
      if(wrapperRef.current) {
        wrapperRef.current.addEventListener("mouseenter", () => clearTimeout(timeoutIdRef.current));
        wrapperRef.current.addEventListener("mouseleave", autoPlay);
      }
    };
  }, [children]);

  const handleArrowClick = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += direction === 'left' ? -firstCardWidthRef.current! : firstCardWidthRef.current!;
    }
  };

  const onDragStart = (e: MouseEvent) => {
    if(!carouselRef.current) return;

    isDraggingRef.current = true;
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    startScrollLeftRef.current = carouselRef.current.scrollLeft;
  };

  const onDragMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || !carouselRef.current || !startXRef.current || !startScrollLeftRef.current) return;

    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 3; // The *3 is the drag speed
    carouselRef.current.scrollLeft = startScrollLeftRef.current - walk;
  };

  const onDragEnd = () => {
    if(!carouselRef.current) return;

    isDraggingRef.current = false;
    carouselRef.current?.classList.remove("dragging");
  };

  const infiniteScroll = () => {
    if(!carouselRef.current || !wrapperRef.current) return;

    if (carouselRef.current?.scrollLeft === 0) {
      carouselRef.current.classList.add("no-transition");
      carouselRef.current.scrollLeft = (carouselRef.current.scrollWidth ?? 0) - (2 * (carouselRef.current.offsetWidth ?? 0));
      carouselRef.current.classList.remove("no-transition");
    } else if (Math.ceil(carouselRef.current?.scrollLeft) >= carouselRef.current?.scrollWidth - carouselRef.current?.offsetWidth) {
      carouselRef.current.classList.add("no-transition");
      carouselRef.current.scrollLeft = carouselRef.current.offsetWidth ?? 0;
      carouselRef.current.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutIdRef.current);
    if(!wrapperRef.current.matches(":hover")) autoPlay();
  };

  const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlayRef.current) return;
    timeoutIdRef.current = window.setTimeout(() => {
      if(!carouselRef.current || window.innerWidth < 800 || !isAutoPlayRef.current) return;

      carouselRef.current.scrollLeft += firstCardWidthRef.current
    }, 2500);
  };

  const wrappedChildren = Children.map(children, (child, index) => (
    <div key={index} className="card flex-shrink-0">
      {child}
    </div>
  ));

  return (
    <div ref={wrapperRef} className="wrapper relative w-full h-full max-w-[1100px] mx-auto rounded-lg">
      <i
        onClick={(e) => { e.stopPropagation(); handleArrowClick('left')}}
        className="absolute top-1/2 left-[-22px] z-10 w-12 h-12 cursor-pointer text-black flex justify-center items-center text-2xl rounded-full shadow-md bg-white transition-transform transform -translate-y-1/2"
      >
        <FaAngleLeft />
      </i>
      <div
        ref={carouselRef}
        className="carousel h-full">
        {wrappedChildren}
      </div>
      <i
        onClick={(e) => { e.stopPropagation(); handleArrowClick('right')}}
        className="absolute top-1/2 right-[-16px] z-10 w-12 h-12 cursor-pointer text-black flex justify-center items-center text-2xl rounded-full shadow-md bg-white transition-transform transform -translate-y-1/2"
      >
        <FaAngleRight />
      </i>
    </div>
  );
};

export default CardSlider;
