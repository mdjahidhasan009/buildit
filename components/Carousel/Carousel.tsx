import React, { useState, useEffect, useRef } from 'react';
import './Carousel.css';

interface Card {
  name: string;
  role: string;
  image: string;
}

interface CardSliderProps {
  cards: Card[];
}

const CardSlider: React.FC<CardSliderProps> = ({ cards }) => {
  // const [isDragging, setIsDragging] = useState<boolean>(false);
  // const [startX, setStartX] = useState<number | null>(null);
  // const [startScrollLeft, setStartScrollLeft] = useState<number | null>(null);
  // const carouselRef = useRef<HTMLDivElement>(null);
  // const firstCardWidth = useRef<number | null>(null);
  //
  // useEffect(() => {
  //   if (carouselRef.current) {
  //     firstCardWidth.current = carouselRef.current.querySelector(".card")?.offsetWidth ?? 0;
  //     console.log('firstCardWidth=', firstCardWidth.current)
  //
  //     if (firstCardWidth.current) {
  //       const cardPerView = Math.round(carouselRef.current.offsetWidth / firstCardWidth.current) - 1;
  //       console.log('cardPerView='+ cardPerView)
  //       const carouselChildrens = [...carouselRef.current.children];
  //
  //       carouselRef.current.classList.add("no-transition");
  //       carouselRef.current.scrollLeft = carouselRef.current.offsetWidth;
  //       carouselRef.current.classList.remove("no-transition");
  //
  //       carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  //         carouselRef.current?.insertAdjacentHTML("afterbegin", card.outerHTML);
  //       });
  //
  //       carouselChildrens.slice(0, cardPerView).forEach(card => {
  //         carouselRef.current?.insertAdjacentHTML("beforeend", card.outerHTML);
  //       });
  //
  //       carouselRef.current.scrollLeft = carouselRef.current.offsetWidth;
  //     }
  //   }
  //
  //   const dragStart = (e: MouseEvent) => {
  //     setIsDragging(true);
  //     setStartX(e.pageX);
  //     setStartScrollLeft(carouselRef.current?.scrollLeft ?? null);
  //     carouselRef.current?.classList.add("dragging");
  //   };
  //
  //   const dragging = (e: MouseEvent) => {
  //     if (!isDragging) return;
  //     carouselRef.current!.scrollLeft = (startScrollLeft ?? 0) - (e.pageX - (startX ?? 0));
  //   };
  //
  //   const dragStop = () => {
  //     setIsDragging(false);
  //     carouselRef.current?.classList.remove("dragging");
  //   };
  //
  //   const infiniteScroll = () => {
  //     if (carouselRef.current?.scrollLeft === 0) {
  //       carouselRef.current.scrollLeft = (carouselRef.current.scrollWidth ?? 0) - (2 * (carouselRef.current.offsetWidth ?? 0));
  //     } else if (Math.ceil(carouselRef.current?.scrollLeft ?? 0) === (carouselRef.current?.scrollWidth ?? 0) - (carouselRef.current?.offsetWidth ?? 0)) {
  //       carouselRef.current.scrollLeft = carouselRef.current.offsetWidth ?? 0;
  //     }
  //   };
  //
  //   const autoPlay = () => {
  //     setInterval(() => {
  //       if (!isDragging) {
  //         carouselRef.current?.scrollBy({
  //           left: firstCardWidth.current ?? 0,
  //           behavior: 'smooth'
  //         });
  //       }
  //     }, 2500);
  //   };
  //
  //   autoPlay();
  //
  //   carouselRef.current?.addEventListener("mousedown", dragStart);
  //   carouselRef.current?.addEventListener("mousemove", dragging);
  //   document.addEventListener("mouseup", dragStop);
  //   carouselRef.current?.addEventListener("scroll", infiniteScroll);
  //
  //   return () => {
  //     carouselRef.current?.removeEventListener("mousedown", dragStart);
  //     carouselRef.current?.removeEventListener("mousemove", dragging);
  //     document.removeEventListener("mouseup", dragStop);
  //     carouselRef.current?.removeEventListener("scroll", infiniteScroll);
  //   };
  // }, [cards.length, isDragging]);

  // const [isDragging, setIsDragging] = useState<boolean>(false);
  const isDraggingRef = useRef(false);
  // const [startX, setStartX] = useState<number | null>(null);
  const startXRef = useRef<number | null>(null);
  // const [startScrollLeft, setStartScrollLeft] = useState<number | null>(null);
  const startScrollLeftRef = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const firstCardWidth = useRef<number | null>(null);

  useEffect(() => {
    if (carouselRef.current) {
      firstCardWidth.current = carouselRef.current.querySelector(".card")?.offsetWidth ?? 0;
      console.log('firstCardWidth=', firstCardWidth.current)

      if (firstCardWidth.current) {
        const cardPerView = Math.round(carouselRef.current.offsetWidth / firstCardWidth.current) ;
        console.log('cardPerView='+ cardPerView)
        const carouselChildrens = [...carouselRef.current.children];

        carouselRef.current.classList.add("no-transition");
        carouselRef.current.scrollLeft = carouselRef.current.offsetWidth;
        carouselRef.current.classList.remove("no-transition");

        carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
          carouselRef.current?.insertAdjacentHTML("afterbegin", card.outerHTML);
        });

        carouselChildrens.slice(0, cardPerView).forEach(card => {
          carouselRef.current?.insertAdjacentHTML("beforeend", card.outerHTML);
        });

        carouselRef.current.scrollLeft = carouselRef.current.offsetWidth;
      }
    }

    const dragStart = (e: MouseEvent) => {
      isDraggingRef.current = true;
      startXRef.current = e.pageX;
      startScrollLeftRef.current  = carouselRef.current?.scrollLeft ?? null;
      carouselRef.current?.classList.add("dragging");
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
        carouselRef.current.scrollLeft = (carouselRef.current.scrollWidth ?? 0) - (2 * (carouselRef.current.offsetWidth ?? 0));
      } else if (Math.ceil(carouselRef.current?.scrollLeft ?? 0) === (carouselRef.current?.scrollWidth ?? 0) - (carouselRef.current?.offsetWidth ?? 0)) {
        carouselRef.current.scrollLeft = carouselRef.current.offsetWidth ?? 0;
      }
    };

    const autoPlay = () => {
      setInterval(() => {
        if (!isDraggingRef.current) {
          carouselRef.current?.scrollBy({
            left: firstCardWidth.current ?? 0,
            behavior: 'smooth'
          });
        }
      }, 2500);
    };

    // autoPlay();

    carouselRef.current?.addEventListener("mousedown", dragStart);
    carouselRef.current?.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    // carouselRef.current?.addEventListener("scroll", infiniteScroll);

    return () => {
      carouselRef.current?.removeEventListener("mousedown", dragStart);
      carouselRef.current?.removeEventListener("mousemove", dragging);
      document.removeEventListener("mouseup", dragStop);
      // carouselRef.current?.removeEventListener("scroll", infiniteScroll);
    };
  }, [cards.length, isDraggingRef.current]);

  return (
    <div className="wrapper mx-auto bg-white rounded-lg overflow-hidden">
      <i id="left" className="fa-solid fa-angle-left"></i>
      <div ref={carouselRef} className="carousel flex overflow-x-auto">
        {console.log(cards)}
        {cards.map((card, index) => (
          <div key={index} className="card flex-shrink-0 mr-4 border-4 border-red-950">
            <div className="img">
              <img className="w-[250px] h-[250px]" src={card?.imageUrl} alt="img" draggable={false}/>
            </div>
            {console.log(card)}
            {/*<h2 className="text-lg font-semibold">{card.name}</h2>*/}
            {/*<span className="text-sm text-gray-600">{card.role}</span>*/}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
