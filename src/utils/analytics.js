export const trackEvent = (eventName = 'EVENT_NAME') => {
  if (typeof window !== 'undefined') {
    import('amplitude-js').then(amplitude => {
      amplitude.getInstance().init('9f25945960748d67e7f7cf101ece3422');
      amplitude.getInstance().logEvent(eventName);
    });
  }
};
