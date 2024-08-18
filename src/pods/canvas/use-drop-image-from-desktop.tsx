import { useCanvasContext } from '@/core/providers';

export const useDropImageFromDesktop = () => {
  const { addNewShape } = useCanvasContext();

  // TODO: this could be moved to business / util and add unit testing
  const isDropImageFile = (e: React.DragEvent<HTMLDivElement>) => {
    const file = e.dataTransfer.files[0];

    return file?.type?.startsWith('image/');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    // Esto lo he sacado depurando, poner breakpoint
    if (
      e.dataTransfer.items.length > 0 &&
      e.dataTransfer.items[0].kind === 'file' &&
      e.dataTransfer.items[0].type.startsWith('image/')
    ) {
      e.preventDefault(); // Necesario para permitir el drop
      e.stopPropagation(); // Evita la propagación del evento
    }
  };

  const handleDropImage = (e: React.DragEvent<HTMLDivElement>) => {
    if (isDropImageFile(e)) {
      console.log('dropImage', e);
      e.preventDefault();
      e.stopPropagation();
      console.log('drop Image', e);

      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      const { clientX, clientY } = e;
      reader.onload = e => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          // OJO las coordenadas están mal tnenemos que sacarlo de use-monitor-shape
          console.log('img', img);
          addNewShape('image', clientX, clientY, { imageSrc: img.src });
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return { handleDropImage, handleDragOver };
};
