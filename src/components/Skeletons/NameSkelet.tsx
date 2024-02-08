function NameSkelet({
  width,
  height,
  mb,
  mr,
  mt,
}: {
  width: number;
  height: number;
  mb: number;
  mr: number;
  mt: number;
}) {
  return (
    <div
      className="DocNameSkelet"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        marginBottom: `${mb}px`,
        marginTop: `${mt}px`,
        marginRight: `${mr}px`,
      }}
    ></div>
  );
}

export default NameSkelet;
