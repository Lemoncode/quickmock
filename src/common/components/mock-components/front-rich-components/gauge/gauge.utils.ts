interface GaugePartsText {
  gaugeValue: string;
}
export const getGaugePartsText = (text: string): GaugePartsText => {
  let gaugeValue = text ? text.replace(/\r?\n|\r/g, '').trim() : '';

  return { gaugeValue };
};
