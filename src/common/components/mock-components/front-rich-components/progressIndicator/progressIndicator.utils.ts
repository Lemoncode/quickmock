interface ProgressIndicatorPartsText {
  progressIndicatorTitle: string;
}
export const getProgressIndicatorPartsText = (
  text: string
): ProgressIndicatorPartsText => {
  let progressIndicatorTitle = text ? text.replace(/\r?\n|\r/g, '').trim() : '';

  return { progressIndicatorTitle };
};
