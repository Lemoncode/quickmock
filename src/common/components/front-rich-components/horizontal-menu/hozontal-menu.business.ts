interface HorizontalMenuItemsInfo {
  items: string[];
  selectedItemIndex: number;
}

export const mapHorizontalMenuTextToItems = (
  text: string
): HorizontalMenuItemsInfo => {
  let items: string[] = text.split(',').map(item => item.trim());

  const selectedItemIndex = items.findIndex(item => item.startsWith('[*]'));

  items = items.map(item => item.replace(/^\[\*\]/, ''));
  items = items.filter(item => item !== '');

  return {
    items: items,
    selectedItemIndex: selectedItemIndex === -1 ? 0 : selectedItemIndex,
  };
};
