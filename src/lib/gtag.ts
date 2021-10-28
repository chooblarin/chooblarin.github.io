export const gaMeasurementId = "UA-62520326-2";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: string) => {
  const gtag = (window as any).gtag;
  gtag("config", gaMeasurementId, {
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
  const gtag = (window as any).gtag;
  gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
