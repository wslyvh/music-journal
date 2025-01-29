import Plausible, { EventOptions, PlausibleOptions } from "plausible-tracker";
import { CONFIG } from "./config";

const plausible = Plausible({
  domain: CONFIG.APP_DOMAIN,
  trackLocalhost: true,
});

export const trackEvent = (
  eventName: keyof typeof plausibleEventName,
  options?: EventOptions | undefined,
  eventData?: PlausibleOptions | undefined
) => {
  plausible.trackEvent(plausibleEventName[eventName], options, eventData);
};

const plausibleEventName = {
  pageview: "pageview",
  onboarding: "onboarding",
  start: "start",
};
