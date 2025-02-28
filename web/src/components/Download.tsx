import { Button } from "react-daisyui";
import { Input } from "react-daisyui";
import appstoreImg from "@/assets/images/logo/appstore.png";
import playstoreImg from "@/assets/images/logo/playstore.png";

export const Download = () => {
  return (
    <section
      className="rounded-t-2xl bg-base-200 bg-base-content/5 py-12 lg:py-24"
      id="download"
    >
      <div className="container text-center">
        <p className="text-xl font-semibold xl:text-3xl">Download Now</p>
        <p className="mt-8 inline-block max-w-[600px] text-base">
          Music Journal is available for Android and iOS.
        </p>
        <div className="mt-8 flex justify-center gap-6">
          <a href="https://play.google.com/store/apps/details?id=wslyvh.musicjournal.fm">
            <img src={playstoreImg} alt="Play Store" />
          </a>
          <a href="https://apps.apple.com/app/6742420442">
            <img src={appstoreImg} alt="App Store" />
          </a>
        </div>

        <p className="text-xl font-semibold mt-8 xl:text-3xl">
          Sign up for updates
        </p>
        <div className="mt-8">
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
              Register
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
