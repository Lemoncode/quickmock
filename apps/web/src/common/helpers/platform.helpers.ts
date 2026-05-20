interface NavigatorWithUserAgentData extends Navigator {
  userAgentData?: { platform: string };
}

export function isMacOS(): boolean {
  const userAgentData = (navigator as NavigatorWithUserAgentData).userAgentData;
  if (userAgentData?.platform) {
    return userAgentData.platform === 'macOS';
  }
  // Fallback for runtimes without UA-CH (Firefox, Safari, older Chromium).
  return /Mac/i.test(navigator.userAgent);
}
