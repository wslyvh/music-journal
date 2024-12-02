import { CONFIG } from "@/utils/config";

export const Footer = () => {
  return (
    <footer
      className="rounded-t-xl bg-neutral text-neutral-content"
      data-theme="dark"
    >
      <div className="container py-12">
        <p className="text-2xl font-bold">{CONFIG.SITE_NAME}</p>
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
