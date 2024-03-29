export const gaMeasurementId = process.env["NEXT_PUBLIC_GA_TRACKING_ID"] as string;

declare let window: Window & {
  gtag?: any;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: string) => {
  window?.gtag("config", gaMeasurementId, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (
  action: string,
  category: string,
  label: string,
  value: string
) => {
  window?.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
