import html2canvas from 'html2canvas';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import { parseTextWithFormatting } from './rich-text.utils';

interface TrackingProps {
  text: string;
  textColor: string;
  fontSize: number;
  textAlignment: 'left' | 'center' | 'right'; // TODO move this to common Type
  restrictedWidth: number;
  restrictedHeight: number;
}

type ShapeWithImage = {
  [id: string]: {
    trackingProps: TrackingProps;
    image: HTMLImageElement | null;
  };
};

const imageCache: ShapeWithImage = {};

function arePropsEqual(
  cachedProps: TrackingProps,
  trackingProps: TrackingProps
): boolean {
  return (
    cachedProps.text === trackingProps.text &&
    cachedProps.textColor === trackingProps.textColor &&
    cachedProps.fontSize === trackingProps.fontSize &&
    cachedProps.textAlignment === trackingProps.textAlignment &&
    cachedProps.restrictedWidth === trackingProps.restrictedWidth &&
    cachedProps.restrictedHeight === trackingProps.restrictedHeight
  );
}

const generateImage = (
  trackingProps: TrackingProps
): Promise<HTMLImageElement> => {
  return new Promise(resolve => {
    const {
      text,
      textColor,
      fontSize,
      textAlignment,
      restrictedWidth: width,
      restrictedHeight: height,
    } = trackingProps;
    const domElement = document.createElement('div');
    domElement.style.width = `${width}px`;
    domElement.style.height = `${height}px`;
    domElement.style.fontSize = `${fontSize}px`;
    domElement.style.color = textColor;
    domElement.style.textAlign = textAlignment;
    domElement.style.textWrap = 'wrap';
    domElement.style.fontFamily = BASIC_SHAPE.DEFAULT_FONT_FAMILY;
    domElement.innerHTML = parseTextWithFormatting(text);
    document.body.appendChild(domElement);

    html2canvas(domElement, {
      backgroundColor: 'rgba(0,0,0,0)',
    }).then(canvas => {
      const image = new window.Image();
      image.src = canvas.toDataURL();

      image.onload = () => {
        resolve(image);
      };

      document.body.removeChild(domElement);
    });
  });
};

export async function getImage(
  id: string,
  trackingProps: TrackingProps
): Promise<HTMLImageElement | null> {
  const shapeImageCache = imageCache[id];

  if (!shapeImageCache) {
    const image = await generateImage(trackingProps);
    imageCache[id] = {
      trackingProps,
      image,
    };
    return image;
  } else {
    if (arePropsEqual(shapeImageCache.trackingProps, trackingProps)) {
      return shapeImageCache.image;
    } else {
      const image = await generateImage(trackingProps);
      imageCache[id] = {
        trackingProps,
        image,
      };
      return image;
    }
  }

  return null;
}
