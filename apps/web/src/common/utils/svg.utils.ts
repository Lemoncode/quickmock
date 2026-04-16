export const loadSvgWithFill = async (url: string, fillColor: string) => {
  const response = await fetch(url);
  const svgText = await response.text();

  const modifiedSvg = svgText.replace(/fill="[^"]*"/g, `fill="${fillColor}"`);

  const svgBlob = new Blob([modifiedSvg], { type: 'image/svg+xml' });
  const objectURL = URL.createObjectURL(svgBlob);

  const img = new window.Image();
  img.src = objectURL;

  return img;
};
