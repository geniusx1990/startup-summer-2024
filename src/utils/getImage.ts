export function getImgUrl(icon: string) {
  return new URL(`/src/assets/${icon}`, import.meta.url).href;
}
