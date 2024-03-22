import React, { useEffect, useRef } from 'react';
import './Carousel.css';

interface Card {
  imageUrl: string;
}

interface CardSliderProps {
  cards: Card[];
}

const CardSlider: React.FC<CardSliderProps> = ({ cards }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef<number | null>(null);
  const startScrollLeftRef = useRef<number | null>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const firstCardWidthRef = useRef<number>(null);
  const leftArrowRef = useRef<HTMLDivElement>(null); 
  const rightArrowRef = useRef<HTMLDivElement>(null); 
  const isAutoPlayRef = useRef<boolean>(true);
  const timeoutIdRef = useRef<number>(0);

  useEffect(() => {
    if (carouselRef.current) {
      const firstCardElement = Array.from(carouselRef.current.children).find(child => child.classList.contains('card'));
      if (firstCardElement) {
        firstCardWidthRef.current = firstCardElement.getBoundingClientRect().width;
      }

      if (firstCardWidthRef.current) {
        const cardPerView = Math.round(carouselRef.current.offsetWidth / firstCardWidthRef.current) ;
        const carouselChildren = [...carouselRef.current.children];
        
        carouselChildren.slice(-cardPerView).reverse().forEach(card => {
          carouselRef.current?.insertAdjacentHTML("afterbegin", card.outerHTML);
        });

        carouselChildren.slice(0, cardPerView).forEach(card => {
          carouselRef.current?.insertAdjacentHTML("beforeend", card.outerHTML);
        });

        carouselRef.current.classList.add("no-transition");
        carouselRef.current.scrollLeft = carouselRef.current.offsetWidth;
        carouselRef.current.classList.remove("no-transition");

        
        leftArrowRef.current?.addEventListener("click", () => handleArrowClick('left'));
        rightArrowRef.current?.addEventListener("click", () => handleArrowClick('right'));

        carouselRef.current.scrollLeft = carouselRef.current.offsetWidth;
      }
    }

    const handleArrowClick = (direction: 'left' | 'right') => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += direction === 'left' ? -firstCardWidthRef.current! : firstCardWidthRef.current!;
      }
    };

    const dragStart = (e: MouseEvent) => {
      isDraggingRef.current = true;
      carouselRef.current?.classList.add("dragging");
      startXRef.current = e.pageX;
      startScrollLeftRef.current  = carouselRef.current?.scrollLeft ?? 0;
    };

    const dragging = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      carouselRef.current!.scrollLeft = (startScrollLeftRef.current ?? 0) - (e.pageX - (startXRef.current ?? 0));
    };

    const dragStop = () => {
      isDraggingRef.current = false;
      carouselRef.current?.classList.remove("dragging");
    };

    const infiniteScroll = () => {
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
      if(window.innerWidth < 800 || !isAutoPlayRef.current) return; // Return if window is smaller than 800 or isAutoPlay is false
      // Autoplay the carousel after every 2500 ms
      timeoutIdRef.current = setTimeout(() => carouselRef.current.scrollLeft += firstCardWidthRef.current, 2500);
    };

    autoPlay();

    carouselRef.current?.addEventListener("mousedown", dragStart);
    carouselRef.current?.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carouselRef.current?.addEventListener("scroll", infiniteScroll);

    return () => {
      carouselRef.current?.removeEventListener("mousedown", dragStart);
      carouselRef.current?.removeEventListener("mousemove", dragging);
      document.removeEventListener("mouseup", dragStop);
      carouselRef.current?.removeEventListener("scroll", infiniteScroll);
      wrapperRef.current.addEventListener("mouseenter", () => clearTimeout(timeoutIdRef.current));
      wrapperRef.current.addEventListener("mouseleave", autoPlay);
      leftArrowRef.current?.removeEventListener("click", () => handleArrowClick('left'));
      rightArrowRef.current?.removeEventListener("click", () => handleArrowClick('right'));
    };
  }, [cards.length, isDraggingRef.current]);

  return (
    <div ref={wrapperRef} className="wrapper mx-auto bg-white rounded-lg overflow-hidden">
      <i id="left" ref={leftArrowRef} className="fa-solid fa-angle-left"></i>
      <div ref={carouselRef} className="carousel flex overflow-x-auto">
        {cards.map((card, index) => (
          <div key={index} className="card flex-shrink-0 mr-4 border-4 border-red-950">
            <div className="img">
              <img className="w-[250px] h-[250px]" src={card?.imageUrl} alt="img" draggable={false}/>
            </div>
          </div>
        ))}
      </div>
      <i id="right" ref={rightArrowRef} className="fa-solid fa-angle-right"></i>
    </div>
  );
};

export default CardSlider;
