interface HorizontalMenuItemsInfo {
  items: string[];
}

export const mapHorizontalMenuTextToItems = (
  text: string
): HorizontalMenuItemsInfo => {
  let items: string[] = text.trim().split(',');

  return {
    items: items,
  };
};
