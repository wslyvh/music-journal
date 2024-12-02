import avatar1Img from '@/assets/images/avatar/1.png'
import avatar2Img from '@/assets/images/avatar/2.png'
import avatar3Img from '@/assets/images/avatar/3.png'
import worldMapImg from '@/assets/images/landing/world-map.png'
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from 'lucide-react'
import { Navigation, Autoplay, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'


export const Testimonial = () => {
  return <section id="testimonial" className="container relative py-8 lg:py-24">
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-50"
      style={{ backgroundImage: `url(${worldMapImg})` }}></div>
    <div className="relative z-10">
      <div className="text-center">
        <h2 className="text-4xl font-semibold">What People Say</h2>
      </div>
      <Swiper
        className="mt-16"
        spaceBetween={50}
        loop
        autoplay={{
          delay: 5000,
        }}
        navigation={{
          prevEl:'.testimonials-button-prev',
          nextEl: '.testimonials-button-next'

        }}
        modules={[Navigation, Autoplay, Thumbs]}
        slidesPerView={1}
      >
        <SwiperSlide>
          <div className="text-center">
            <div className="avatar">
              <div className="mask mask-squircle w-16 bg-base-content/10">
                <img src={avatar1Img} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-1">
              <StarIcon className="fill-orange-400 text-orange-400" size={20} />
              <StarIcon className="fill-orange-400 text-orange-400" size={20} />
              <StarIcon className="fill-orange-400 text-orange-400" size={20} />
              <StarIcon className="fill-orange-400 text-orange-400" size={20} />
              <StarIcon className="fill-orange-400 text-orange-400" size={20} />
            </div>
            <p className="mt-4 inline-block max-w-[600px] text-center">
              WrapAI is a game-changer! The voice commands and personalized insights from James,
              the virtual assistant, have boosted my productivity. It's like having a personal
              AI assistant tailored just for me!
            </p>
            <p className="mt-8 text-lg font-medium">Mark Thompson</p>
            <p className="text-sm text-base-content/70">(Marketing Manager at Layerway)</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="text-center">
            <div className="avatar">
              <div className="mask mask-squircle w-16 bg-base-content/10">
                <img src={avatar2Img} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-1">
              <StarIcon className="fill-orange-400 text-orange-400" size={20} />
              <StarIcon className="fill-orange-400 text-orange-400" size={20} />
              <StarIcon className="fill-orange-400 text-orange-400" size={20} />
              <StarIcon className="fill-orange-400 text-orange-400" size={20} />
              <StarIcon className="fill-orange-400 text-orange-400" size={20} />
            </div>
            <p className="mt-4 inline-block max-w-[600px] text-center">
              As a UX designer, I appreciate the user-friendly interface of the AI app. It
              seamlessly integrates with our design processes, and the natural language
              processing feature makes interactions smooth and intuitive.
            </p>
            <p className="mt-8 text-lg font-medium">Sarah Johnson</p>
            <p className="text-sm text-base-content/70">(UX Designer at MyComp)</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="text-center">
            <div className="avatar">
              <div className="mask mask-squircle w-16 bg-base-content/10">
                <img src={avatar3Img} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-1">
              <StarIcon className="fill-orange-400 text-orange-400" size={20} />
              <StarIcon className="fill-orange-400 text-orange-400" size={20} />
              <StarIcon className="fill-orange-400 text-orange-400" size={20} />
              <StarIcon className="fill-orange-400 text-orange-400" size={20} />
              <StarIcon className="fill-orange-400 text-orange-400" size={20} />
            </div>
            <p className="mt-4 inline-block max-w-[600px] text-center">
              I've integrated Landrick's AI capabilities into our mobile app effortlessly. The
              cross-platform compatibility and robust machine learning tools make it a
              developer's dream. Highly recommend for anyone working in the tech space.
            </p>
            <p className="mt-8 text-lg font-medium">Alex Chen</p>
            <p className="text-sm text-base-content/70">(Mobile Developer at Android)</p>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="relative mt-8 flex items-center justify-center gap-6">
        <div className="testimonials-button-prev cursor-pointer">
          <div
            className="border-default-300 bg-default-50/90 hover:bg-default-50 flex h-10 w-10 items-center justify-center rounded-lg border transition-all hover:bg-base-content/5">
            <ChevronLeftIcon size={20}/>
          </div>
        </div>
        <div className="testimonials-button-next cursor-pointer">
          <div
            className="border-default-300 bg-default-50/90 hover:bg-default-50 flex h-10 w-10 items-center justify-center rounded-lg border transition-all hover:bg-base-content/5">
            <ChevronRightIcon size={20}/>
          </div>
        </div>
      </div>
    </div>
  </section>

}
