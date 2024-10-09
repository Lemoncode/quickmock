import { isDropImageFile } from './canvas.util';

describe('isDropImageFile', () => {
  it('should return True when there is an image in the item when dropped', () => {
    //Arrange
    const mockImagefile = {
      kind: 'file',
      type: 'image/png',
    };

    const mockDatatransfer = {
      dataTransfer: {
        items: [mockImagefile],
      },
    } as unknown as React.DragEvent<HTMLDivElement>;

    //Act
    const result = isDropImageFile(mockDatatransfer);

    //Assert
    expect(result).toBe(true);
  });

  it('should return False when there is not an image in the item when dropped', () => {
    //Arrange
    const mockImagefile = {
      kind: 'file',
      type: 'text',
    };

    const mockDatatransfer = {
      dataTransfer: {
        items: [mockImagefile],
      },
    } as unknown as React.DragEvent<HTMLDivElement>;

    //Act
    const result = isDropImageFile(mockDatatransfer);

    //Assert
    expect(result).toBe(false);
  });

  it('should return False when the kind in the item is not file', () => {
    //Arrange
    const mockImagefile = {
      kind: 'string',
      type: 'image/png',
    };

    const mockDatatransfer = {
      dataTransfer: {
        items: [mockImagefile],
      },
    } as unknown as React.DragEvent<HTMLDivElement>;

    //Act
    const result = isDropImageFile(mockDatatransfer);

    //Assert
    expect(result).toBe(false);
  });

  it('should return False when no items are dropped', () => {
    //Arrange
    const mockDatatransfer = {
      dataTransfer: {
        items: [],
      },
    } as unknown as React.DragEvent<HTMLDivElement>;

    //Act
    const result = isDropImageFile(mockDatatransfer);

    //Assert
    expect(result).toBe(false);
  });
});
