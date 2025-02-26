export const triggerResetEvent = (path: string) => {
  const event = new CustomEvent("resetTab", {
    detail: { path },
  });
  window.dispatchEvent(event);
};
