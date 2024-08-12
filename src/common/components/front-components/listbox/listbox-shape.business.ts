interface ListBoxItemsInfo {
  items: string[];
  selectedSectionIndex: number;
}

export const mapListboxTextToItems = (text: string): ListBoxItemsInfo => {
  // cambialo por un let
  const items: string[] = text.split('\n');

  const selectedItemIndex = items.findIndex(section =>
    section.startsWith('[*]')
  );

  // Hazte una map en el items para quitarle el [*]
  // Te puedes fijar en el busines del accordion

  return {
    items: items,
    selectedSectionIndex: selectedItemIndex === -1 ? 0 : selectedItemIndex,
  };
};
