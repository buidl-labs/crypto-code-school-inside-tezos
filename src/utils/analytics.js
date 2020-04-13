import amplitude from 'amplitude-js';

export const trackEvent = (eventName = 'EVENT_NAME') => {
  amplitude.getInstance().init('9f25945960748d67e7f7cf101ece3422');
  amplitude.getInstance().logEvent(eventName);
};
