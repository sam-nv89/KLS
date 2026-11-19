export interface SeoPayload {
  title: string;
  description: string;
  canonicalPath: string;
  jsonLd?: Record<string, unknown>;
}

export function applySeoMetadata(payload: SeoPayload): void {
  document.title = payload.title;

  const setMeta = (selector: string, attr: string, value: string) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      if (selector.includes('property=')) {
        const prop = selector.match(/property="([^"]+)"/)?.[1];
        if (prop) el.setAttribute('property', prop);
      } else {
        const name = selector.match(/name="([^"]+)"/)?.[1];
        if (name) el.setAttribute('name', name);
      }
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };

  setMeta('meta[name="description"]', 'content', payload.description);
  setMeta('meta[property="og:title"]', 'content', payload.title);
  setMeta('meta[property="og:description"]', 'content', payload.description);
  setMeta('meta[name="twitter:title"]', 'content', payload.title);
  setMeta('meta[name="twitter:description"]', 'content', payload.description);

  const canonicalUrl = window.location.origin + payload.canonicalPath;
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalUrl);

  const existingDynamicLd = document.getElementById('dynamic-schema-jsonld');
  if (existingDynamicLd) {
    existingDynamicLd.remove();
  }
  if (payload.jsonLd) {
    const script = document.createElement('script');
    script.id = 'dynamic-schema-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(payload.jsonLd);
    document.head.appendChild(script);
  }
}
