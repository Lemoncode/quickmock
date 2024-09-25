import { isDropImageFile } from './canvas.util';

describe('', () => {
  it('should return True when there is an image in the item when dropped', () => {
    //Arrange
    const mockImagefile = {
      kind: 'file',
      type: 'image/png',
    };

    const mockDatatransfer = {
      DataTransfer: {
        items: [mockImagefile],
      },
    } as unknown as React.DragEvent<HTMLDivElement>;

    //Act
    isDropImageFile(mockDatatransfer);

    //Assert
    expect(isDropImageFile(mockDatatransfer)).toBe(true);
  });

  it('should return False when there is not an image in the item when dropped', () => {
    //Arrange
    const mockImagefile = {
      kind: 'file',
      type: 'text',
    };

    const mockDatatransfer = {
      DataTransfer: {
        items: [mockImagefile],
      },
    } as unknown as React.DragEvent<HTMLDivElement>;

    //Act
    isDropImageFile(mockDatatransfer);

    //Assert
    expect(isDropImageFile(mockDatatransfer)).toBe(false);
  });

  it('should return False when the kind in the item is not file', () => {
    //Arrange
    const mockImagefile = {
      kind: 'string',
      type: 'image/png',
    };

    const mockDatatransfer = {
      DataTransfer: {
        items: [mockImagefile],
      },
    } as unknown as React.DragEvent<HTMLDivElement>;

    //Act
    isDropImageFile(mockDatatransfer);

    //Assert
    expect(isDropImageFile(mockDatatransfer)).toBe(false);
  });

  it('should return False when no items are dropped', () => {
    //Arrange
    const mockDatatransfer = {
      DataTransfer: {
        items: [],
      },
    } as unknown as React.DragEvent<HTMLDivElement>;

    //Act
    isDropImageFile(mockDatatransfer);

    //Assert
    expect(isDropImageFile(mockDatatransfer)).toBe(false);
  });
});
