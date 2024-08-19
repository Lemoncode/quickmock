import { useCanvasContext } from '@/core/providers';

export const useDropImageFromDesktop = () => {
  const { addNewShape } = useCanvasContext();

  const isDropImageFile = (e: React.DragEvent<HTMLDivElement>) => {
    const file = e.dataTransfer.files[0];

    return file?.type?.startsWith('image/');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    // TODO: Refactor this, try a way to unifiy or get some common way
    // to handle drag over and drop
    if (
      e.dataTransfer.items.length > 0 &&
      e.dataTransfer.items[0].kind === 'file' &&
      e.dataTransfer.items[0].type.startsWith('image/')
    ) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDropImage = (e: React.DragEvent<HTMLDivElement>) => {
    if (isDropImageFile(e)) {
      e.preventDefault();
      e.stopPropagation();

      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      const { clientX, clientY } = e;
      reader.onload = e => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          addNewShape('image', clientX, clientY, { imageSrc: img.src });
        };
      };

      reader.readAsDataURL(file);
    }
  };

  return { handleDragOver, handleDropImage };
};
