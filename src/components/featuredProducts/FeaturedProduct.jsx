import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

//import Firebase Firestore
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../service/firebase";

//import components
import ButtonSmall from "../buttons/buttonSmall/ButtonSmall";

//import sass
import "./FeaturedProduct.sass";
import image from "../../assets/products/aves/Coxinhas_das_Asas_IQF_6kgs_Congeladas_Cancao_Alimentos 1.svg";

const FeaturedProduct = () => {
  const [files, setFiles] = useState([]);

  //ler em tempo real alterações no firebase
  useEffect(() => {
    const dbRef = query(collection(db, "products"));

    onSnapshot(dbRef, (docsSnap) => {
      setFiles(
        docsSnap.docs.map((doc) => ({
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <>
      <div id="producCard">
        <h2>Produtos</h2>
        <Swiper
          className="containerSwiper"
          spaceBetween={20}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination]}
          loop={true}
          loopedSlides={6}
          slidesPerView={5}
          breakpoints={{
            800: {
              width: 800,
              loopedSlides: 5,
              slidesPerView: 4,
            },
            // when window width is >= 768px
            768: {
              width: 768,
              loopedSlides: 4,
              slidesPerView: 3,
            },
          }}
        >
          {files.map((e, index) => {
            return (
              <SwiperSlide className="card" key={index}>
                <NavLink to="/produtos">
                  <div className="imageCard">
                    <img src={image} alt={e?.data?.description} />
                  </div>
                  <div className="textCard">
                    <p>{e?.data?.description}</p>
                    <h5>{e?.data?.title}</h5>
                  </div>
                  <ButtonSmall />
                </NavLink>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default FeaturedProduct;
