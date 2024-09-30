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

    const MockisDropImageFile = (e: React.DragEvent<HTMLDivElement>) => {
      return (
        e.dataTransfer.items.length > 0 &&
        e.dataTransfer.items[0].kind === 'file' &&
        e.dataTransfer.items[0].type.startsWith('image/')
      );
    };

    //Act
    MockisDropImageFile(mockDatatransfer);

    //Assert
    expect(MockisDropImageFile(mockDatatransfer)).toBe(true);
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

    const MockisDropImageFile = (e: React.DragEvent<HTMLDivElement>) => {
      return (
        e.dataTransfer.items.length > 0 &&
        e.dataTransfer.items[0].kind === 'file' &&
        e.dataTransfer.items[0].type.startsWith('image/')
      );
    };

    //Act
    MockisDropImageFile(mockDatatransfer);

    //Assert
    expect(MockisDropImageFile(mockDatatransfer)).toBe(false);
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

    const MockisDropImageFile = (e: React.DragEvent<HTMLDivElement>) => {
      return (
        e.dataTransfer.items.length > 0 &&
        e.dataTransfer.items[0].kind === 'file' &&
        e.dataTransfer.items[0].type.startsWith('image/')
      );
    };

    //Act
    MockisDropImageFile(mockDatatransfer);

    //Assert
    expect(MockisDropImageFile(mockDatatransfer)).toBe(false);
  });

  it('should return False when no items are dropped', () => {
    //Arrange
    const mockDatatransfer = {
      dataTransfer: {
        items: [],
      },
    } as unknown as React.DragEvent<HTMLDivElement>;

    const MockisDropImageFile = (e: React.DragEvent<HTMLDivElement>) => {
      return (
        e.dataTransfer.items.length > 0 &&
        e.dataTransfer.items[0].kind === 'file' &&
        e.dataTransfer.items[0].type.startsWith('image/')
      );
    };

    //Act
    MockisDropImageFile(mockDatatransfer);

    //Assert
    expect(MockisDropImageFile(mockDatatransfer)).toBe(false);
  });
});
