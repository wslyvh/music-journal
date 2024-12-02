import { Button } from "react-daisyui";
import { Input } from "react-daisyui";

export const Download = () => {
  return (
    <section
      className="rounded-t-2xl bg-base-200 bg-base-content/5 py-12 lg:py-24"
      id="download"
    >
      <div className="container text-center">
        <p className="text-xl font-semibold xl:text-3xl">Coming Soon</p>
        <p className="mt-8 inline-block max-w-[600px] text-base">
          Music Journal will be available on iOS and Android soon. Sign up below
          to be notified when it's ready.
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
        {/* <div className="mt-8 flex justify-center gap-6">
          <a href="#">
            <img src={appstoreImg} alt="App Store" />
          </a>
          <a href="#">
            <img src={playstoreImg} alt="Play Store" />
          </a>
        </div> */}
      </div>
    </section>
  );
};
