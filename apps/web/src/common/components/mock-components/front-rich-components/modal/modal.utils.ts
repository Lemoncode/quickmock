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

export const darkenColor = (hex: string, percent: number): string => {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  r = Math.floor(r * (1 - percent / 100));
  g = Math.floor(g * (1 - percent / 100));
  b = Math.floor(b * (1 - percent / 100));

  r = Math.max(0, r);
  g = Math.max(0, g);
  b = Math.max(0, b);

  const rr = r.toString(16).padStart(2, '0');
  const gg = g.toString(16).padStart(2, '0');
  const bb = b.toString(16).padStart(2, '0');

  return `#${rr}${gg}${bb}`;
};
