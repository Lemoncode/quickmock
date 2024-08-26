interface ModalPartsText {
  modalTitle: string;
  modalText: string;
  buttons: string[];
}
export const getModalPartsText = (text: string): ModalPartsText => {
  let modalTitle = text.split('\n')[0].trim();
  const modalText = text.split('\n').slice(1, -1).join('\n').trim();
  const buttons = text
    .split('\n')
    .slice(-1)[0]
    .split(',')
    .map((button: string) => button.trim())
    .slice(0, 3);
  return { modalTitle, modalText, buttons };
};
