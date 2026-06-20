const ACTIVE_TIME_KEY = "buk_active_time";
const DETAIL_VIEWS_KEY = "buk_detail_views";

export const DISMISS_KEY = "buk_install_dismissed_until";

export const ACTIVE_TIME_TARGET = 2 * 60 * 1000;
export const DETAIL_VIEW_TARGET = 5;

export function getActiveTime() {
  return Number(localStorage.getItem(ACTIVE_TIME_KEY) || 0);
}

export function addActiveTime(ms) {
  const current = getActiveTime();

  localStorage.setItem(
    ACTIVE_TIME_KEY,
    String(current + ms)
  );
}

export function getDetailViews() {
  return Number(localStorage.getItem(DETAIL_VIEWS_KEY) || 0);
}

export function incrementDetailViews() {
  const current = getDetailViews();

  localStorage.setItem(
    DETAIL_VIEWS_KEY,
    String(current + 1)
  );
}

export function hasReachedEngagementThreshold() {
  return (
    getActiveTime() >= ACTIVE_TIME_TARGET ||
    getDetailViews() >= DETAIL_VIEW_TARGET
  );
}