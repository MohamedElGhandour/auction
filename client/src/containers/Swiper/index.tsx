import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../../components/Card/index";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper";

export default function App() {
  return (
    <>
      {/* <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
      </Swiper> */}
    </>
  );
}

// import React from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";

// import "./styles.css";

// // import required modules
// import { Pagination } from "swiper";

// import Card from "../../components/Card/index";

// export default function App() {
//   return (
//     <>
//       <Swiper
//         slidesPerView={"auto"}
//         spaceBetween={30}
//         pagination={{
//           clickable: true,
//         }}
//         modules={[Pagination]}
//         className="mySwiper"
//       >
// <SwiperSlide>
//   <Card />
// </SwiperSlide>
// <SwiperSlide>
//   <Card />
// </SwiperSlide>
// <SwiperSlide>
//   <Card />
// </SwiperSlide>
// <SwiperSlide>
//   <Card />
// </SwiperSlide>
// <SwiperSlide>
//   <Card />
// </SwiperSlide>
// <SwiperSlide>
//   <Card />
// </SwiperSlide>
// <SwiperSlide>
//   <Card />
// </SwiperSlide>
// <SwiperSlide>
//   <Card />
// </SwiperSlide>
// <SwiperSlide>
//   <Card />
// </SwiperSlide>
//       </Swiper>
//     </>
//   );
// }
