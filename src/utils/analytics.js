export const trackEvent = (eventName = 'EVENT_NAME') => {
  if (typeof window !== 'undefined') {
    import('amplitude-js').then(amplitude => {
      //TODO: BEFORE merging it in master, resolve whether to use beta-or main-master api key
      //cryptoverse-wars beta amplitude tracking api key
      amplitude.getInstance().init('b8c4bfb895ccfd2479ce7fd4507b1256');
      amplitude.getInstance().logEvent(eventName);
    });
  }
};

export const trackEventWithProperties = (
  eventName = 'EVENT_NAME',
  property = 'PROPERTY',
) => {
  if (typeof window !== 'undefined') {
    import('amplitude-js').then(amplitude => {
      //TODO: BEFORE merging it in master, resolve whether to use beta-or main-master api key
      //cryptoverse-wars beta amplitude tracking api key
      amplitude.getInstance().init('b8c4bfb895ccfd2479ce7fd4507b1256');
      amplitude.getInstance().logEvent(eventName, property);
    });
  }
};
