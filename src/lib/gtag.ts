export const gaMeasurementId = "UA-62520326-2";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: string) => {
  const gtag = window as any;
  gtag("config", gaMeasurementId, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  const gtag = window as any;
  gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
