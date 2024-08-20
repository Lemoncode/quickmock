interface Props {
  styleClass: string;
}

export const QuickmockLogoComponent = (props: Props) => {
  const { styleClass } = props;

  return (
    <img
      className={styleClass}
      src={'/widgets/bombilla.webp'}
      alt="Quickmock Logo"
    />
  );
};
