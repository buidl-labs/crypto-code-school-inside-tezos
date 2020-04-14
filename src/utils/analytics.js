export const trackEvent = (eventName = 'EVENT_NAME') => {
  if (typeof window !== 'undefined') {
    const obj = localStorage.getItem(
      'metomic-consented-pol:b50692c9-4b9d-4906-a09a-9177d80622a6',
    );
    if (obj && JSON.parse(obj).enabled) {
      import('amplitude-js').then(amplitude => {
        amplitude.getInstance().init('9f25945960748d67e7f7cf101ece3422');
        amplitude.getInstance().logEvent(eventName);
      });
    }
  }
};

export const trackEventWithProperties = (
  eventName = 'EVENT_NAME',
  property = 'PROPERTY',
) => {
  if (typeof window !== 'undefined') {
    //CAVEAT: metomic localstorage id might change in the future
    const obj = localStorage.getItem(
      'metomic-consented-pol:b50692c9-4b9d-4906-a09a-9177d80622a6',
    );
    if (obj && JSON.parse(obj).enabled) {
      import('amplitude-js').then(amplitude => {
        amplitude.getInstance().init('9f25945960748d67e7f7cf101ece3422');
        amplitude.getInstance().logEvent(eventName, property);
      });
    }
  }
};
