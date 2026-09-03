(() => {
  const campaignParameterNames = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "gclid",
    "fbclid"
  ];
  const pageParameters = new URLSearchParams(location.search);
  const campaignAttribution = Object.fromEntries(campaignParameterNames.map(name => [
    name,
    pageParameters.get(name) || ""
  ]));
  const analyticsId = document.querySelector('meta[name="ga-measurement-id"]')?.content.trim() || "";
  const metaPixelId = document.querySelector('meta[name="meta-pixel-id"]')?.content.trim() || "";
  const trackingDataLayer = window.dataLayer = window.dataLayer || [];

  function attributionPayload() {
    return Object.fromEntries(Object.entries(campaignAttribution).filter(([, value]) => value));
  }

  function trackEvent(eventName, eventParameters = {}) {
    const payload = { ...attributionPayload(), ...eventParameters };
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, payload);
    } else {
      trackingDataLayer.push({ event: eventName, ...payload });
    }
  }

  if (/^G-[A-Z0-9]+$/i.test(analyticsId)) {
    const analyticsScript = document.createElement("script");
    analyticsScript.async = true;
    analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`;
    document.head.appendChild(analyticsScript);
    window.gtag = function () { trackingDataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", analyticsId);
  }

  if (/^\d+$/.test(metaPixelId)) {
    window.fbq = window.fbq || function () {
      if (window.fbq.callMethod) window.fbq.callMethod.apply(window.fbq, arguments);
      else window.fbq.queue.push(arguments);
    };
    window._fbq = window._fbq || window.fbq;
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = "2.0";
    window.fbq.queue = window.fbq.queue || [];

    const metaPixelScript = document.createElement("script");
    metaPixelScript.async = true;
    metaPixelScript.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(metaPixelScript);
    window.fbq("init", metaPixelId);
    window.fbq("track", "PageView");
  }

  trackingDataLayer.push({ event: "landing_page_attribution", ...attributionPayload() });

  document.querySelectorAll("[data-wa]").forEach((link, index) => {
    link.addEventListener("click", () => {
      const eventParameters = {
        cta_position: `whatsapp_cta_${index + 1}`,
        link_url: link.href
      };
      trackEvent("whatsapp_click", eventParameters);
      if (typeof window.fbq === "function") {
        window.fbq("track", "Contact", {
          ...attributionPayload(),
          content_name: "WhatsApp",
          cta_position: eventParameters.cta_position
        });
      }
    });
  });
})();
