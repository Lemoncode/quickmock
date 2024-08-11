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
    return (
      <AccordionBody
        x={10}
        y={(headerIndex + 1) * singleHeaderHeight}
        width={width}
        height={accordionSelectedBodyHeight}
      />
    );
  };
  const renderAccordion = () => {
    return sections.map((section, index) => (
      <>
        <AccordionHeader
          x={10}
          y={singleHeaderHeight * index + accordionBodyAppliedOffset}
          width={width}
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
