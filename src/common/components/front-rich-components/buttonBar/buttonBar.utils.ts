interface ButtonBarItemsInfo {
  items: string[];
}

export const mapButtonBarTextToItems = (text: string): ButtonBarItemsInfo => {
  let items: string[] = text.trim().split(',');

  return {
    items: items,
  };
};
