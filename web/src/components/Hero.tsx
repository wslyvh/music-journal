import bgGradientImg from "@/assets/images/landing/bg-gradient.png";
import mobile1Img from "@/assets/images/landing/mobile-1.png";
import avatar1Img from "@/assets/images/avatar/1.png";
import { StarIcon, ZapIcon } from "lucide-react";
import { Card } from "react-daisyui";
import { CONFIG } from "@/utils/config";
import appstoreImg from "@/assets/images/logo/appstore-soon.png";
import playstoreImg from "@/assets/images/logo/playstore.png";

export const Hero = () => {
  return (
    <section className="relative py-8 lg:py-24" id="home">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-5"
        style={{ backgroundImage: `url(${bgGradientImg})` }}
      ></div>
      <div className="container relative z-10">
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 xl:gap-36">
          <div className="order-2 lg:order-1">
            <h1 className="text-center text-3xl/tight font-bold leading-10 tracking-tight sm:text-start lg:text-4xl/tight">
              <span className="text-brand-gradient">{CONFIG.SITE_NAME}</span> -{" "}
              {CONFIG.SITE_TAGLINE}
            </h1>
            <h5 className="mt-8 text-center text-base sm:text-start lg:text-lg">
              {CONFIG.SITE_DESCRIPTION}. Open source and Local-/offline first.
            </h5>
            <div className="mt-16 flex justify-center gap-4 sm:justify-start">
              <a href="https://play.google.com/store/apps/details?id=wslyvh.musicjournal.fm">
                <img src={playstoreImg} alt="Play Store" />
              </a>
              <a href="#download" className="opacity-50">
                <img src={appstoreImg} alt="App Store" />
              </a>
            </div>
            {/* <div className="mt-8 flex justify-center gap-4 sm:justify-start">
              <form
                className="join inline-flex"
                target="_blank"
                method="post"
                action="https://login.sendpulse.com/forms/simple/u/eyJ1c2VyX2lkIjo4Mzk2NTA3LCJhZGRyZXNzX2Jvb2tfaWQiOjEwMDgwNDQsImxhbmciOiJlbiJ9"
              >
                <Input
                  autoComplete="email"
                  id="email"
                  className="input join-item input-bordered w-full lg:max-w-xs"
                  placeholder="hello@musicjournal.fm"
                  type="email"
                  name="email"
                  required
                />
                <input type="hidden" name="sender" value="d2VzbGV5QHc1Lmdn" />
                <Button color="primary" className="join-item">
                  Join waitlist
                </Button>
              </form>
            </div> */}
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="flex justify-center">
              <img
                alt="Mobile-1"
                className="bounce-animation h-[550px]"
                src={mobile1Img}
              />
            </div>
            <div className="absolute left-0 top-[20%]">
              <Card className="bg-base-100 shadow transition-all hover:shadow-lg">
                <Card.Body className="flex flex-row items-center justify-center gap-3 p-3">
                  <div className="flex items-center justify-center rounded-full bg-primary p-2">
                    <ZapIcon
                      className="size-5 text-primary-content"
                      size={20}
                    />
                  </div>
                  <div>
                    <p className="text-lg/none font-semibold">Improve</p>
                    <p>Your Music Practice</p>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="absolute bottom-[20%] end-0">
              <Card className="bg-base-100 shadow transition-all hover:shadow-lg">
                <Card.Body className="w-64 gap-0 p-3">
                  <div className="flex gap-3">
                    <div className="mask mask-squircle w-8 bg-base-content/10">
                      <img src={avatar1Img} />
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <StarIcon
                        className="size-4 fill-orange-400 text-orange-400"
                        size={16}
                      />
                      <StarIcon
                        className="size-4 fill-orange-400 text-orange-400"
                        size={16}
                      />
                      <StarIcon
                        className="size-4 fill-orange-400 text-orange-400"
                        size={16}
                      />
                      <StarIcon
                        className="size-4 fill-orange-400 text-orange-400"
                        size={16}
                      />
                      <StarIcon
                        className="size-4 fill-orange-400 text-orange-400"
                        size={16}
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-[13px] font-medium">
                    Music Journal is a game-changer! It's like Strava for my
                    music practice.
                  </p>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>

        {/* <div className="mt-16 grid grid-cols-2 gap-20 text-center md:grid-cols-4">
          <div>
            <div className="inline-block rounded bg-primary/10 p-3 transition-all hover:bg-primary/25">
              <ArrowDownToLineIcon className="size-8 text-primary" size={32} />
            </div>
            <p className="mt-3 text-4xl font-semibold">14M+</p>
            <p className="mt-1 text-base-content/80">Downloads</p>
          </div>
          <div>
            <div className="inline-block rounded bg-primary/10 p-3 transition-all hover:bg-primary/25">
              <TrendingUpIcon className="size-8 text-primary" size={32} />
            </div>
            <p className="mt-3 text-4xl font-semibold">128.5%</p>
            <p className="mt-1 text-base-content/80">YoY Growth</p>
          </div>
          <div>
            <div className="inline-block rounded bg-primary/10 p-3 transition-all hover:bg-primary/25">
              <UsersIcon className="size-8 text-primary" size={32} />
            </div>

            <p className="mt-3 text-4xl font-semibold">2.8M+</p>
            <p className="mt-1 text-base-content/80">Active User Base</p>
          </div>
          <div>
            <div className="inline-block rounded bg-primary/10 p-3 transition-all hover:bg-primary/25">
              <SparkleIcon className="size-8 text-primary" size={32} />
            </div>
            <p className="mt-3 text-4xl font-semibold">2,800+</p>
            <p className="mt-1 text-base-content/80">5-Star Reviews</p>
          </div>
        </div> */}
      </div>
    </section>
  );
};
