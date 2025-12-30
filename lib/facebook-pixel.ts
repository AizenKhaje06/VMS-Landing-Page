import { init, track } from 'react-facebook-pixel';

const PIXEL_ID = '5353493094769892';

export const initFacebookPixel = (): void => {
  init(PIXEL_ID);
  track('PageView');
};

export const trackPageView = (): void => {
  track('PageView');
};

export const trackEvent = (event: string, parameters?: Record<string, any>): void => {
  track(event, parameters);
};
