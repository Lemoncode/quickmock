import { AccordionBody } from './accordion-body.component';
import { AccordionHeader } from './accordion-header.component';

interface Props {
  width: number;
  singleHeaderHeight: number;
  accordionSelectedBodyHeight: number;
  sections: string[];
  selectedSectionIndex: number;
}

export const AccordionAllParts: React.FC<Props> = props => {
  const {
    singleHeaderHeight,
    accordionSelectedBodyHeight,
    sections,
    selectedSectionIndex,
    width,
  } = props;

  let accordionBodyAppliedOffset = 0;

  const renderAccordionBody = (headerIndex: number) => {
    accordionBodyAppliedOffset = accordionSelectedBodyHeight;
    const marginLeft = 10;
    return (
      <AccordionBody
        x={marginLeft}
        y={(headerIndex + 1) * singleHeaderHeight}
        width={width - marginLeft}
        height={accordionSelectedBodyHeight}
      />
    );
  };
  const renderAccordion = () => {
    const textMarginLeft = 10;
    return sections.map((section, index) => (
      <>
        <AccordionHeader
          x={textMarginLeft}
          y={singleHeaderHeight * index + accordionBodyAppliedOffset}
          width={width - textMarginLeft}
          height={singleHeaderHeight}
          text={section}
          isSelected={selectedSectionIndex === index}
        />
        {selectedSectionIndex === index ? renderAccordionBody(index) : null}
      </>
    ));
  };

  return renderAccordion();
};
