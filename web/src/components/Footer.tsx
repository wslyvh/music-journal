import { CONFIG } from "@/utils/config";

export const Footer = () => {
  return (
    <footer
      className="rounded-t-xl bg-neutral text-neutral-content"
      data-theme="dark"
    >
      <div className="container py-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end">
          <div>
            <p className="text-2xl font-bold">{CONFIG.SITE_NAME}</p>
            <p className="text-sm mt-2">
              {CONFIG.SITE_EMOJI}{" "}
              <span className="ml-2">{CONFIG.SITE_TAGLINE}</span>
            </p>
          </div>
          <nav className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-4 text-sm">
            <a href="/privacy" className="link-hover link">
              Privacy Policy
            </a>
            <a href="/terms" className="link-hover link">
              Terms of Service
            </a>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10 px-8 py-4 text-center lg:px-40">
        Made by{" "}
        <a
          className="link-hover link"
          href={`https://x.com/${CONFIG.SOCIAL_TWITTER}`}
          target="_blank"
        >
          wslyvh
        </a>
      </div>
    </footer>
  );
};
