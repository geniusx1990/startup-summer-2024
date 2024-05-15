export function getStarImage(value?: string | null) {
  let color;
  const colorGrey: string = "#D5D6DC";
  const colorPurple: string = "#9854F6";

  if (value === "yellow") {
    color = "#FAB005";
  } else if (value === undefined) {
    color = colorGrey;
  } else {
    color = colorPurple;
  }

  const svgString = `
    <svg id="icon" width="28" height="28" viewBox="0 0 28 28" fill="${color}" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.9999 20.7084L6.79926 24.4942L8.17476 16.4757L2.34143 10.7975L10.3914 9.63086L13.9918 2.33569L17.5921 9.63086L25.6421 10.7975L19.8088 16.4757L21.1843 24.4942L13.9999 20.7084Z" fill="${color}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;

  const blob = new Blob([svgString], { type: "image/svg+xml" });

  return URL.createObjectURL(blob);
}
