"use client"
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Slider = ({ products, region }) => {
  return (
    <>
      <div className="relative">
        <Swiper
          spaceBetween={10}
          slidesPerView={2}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          navigation={true}
          modules={[Navigation]}
        >
          {products &&
            products.map((product) => (
              <SwiperSlide key={product.id}>
                <LocalizedClientLink
                  href={`/products/${product.handle}`}
                  className="group"
                >
                  <Thumbnail thumbnail={product?.thumbnail} size="square" />
                  <div className="flex text-xs sm:text-sm  mt-4 justify-between">
                    <p
                      className="text-ui-fg-subtle"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "calc(100% - 40px)",
                      }}
                    >
                      {product.title}
                    </p>
                    <div className="flex items-center gap-x-2 text-ui-fg-muted">
                      <p>{product?.price?.calculated_price}</p>
                    </div>
                  </div>
                </LocalizedClientLink>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  )
}

export default Slider
