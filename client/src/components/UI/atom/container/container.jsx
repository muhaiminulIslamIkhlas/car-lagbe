const Container = ({
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
  children,
}) => {
  return (
    <div
      style={{
        marginBottom: marginBottom,
        marginTop: marginTop,
        marginLeft: marginLeft,
        marginRight: marginRight,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
