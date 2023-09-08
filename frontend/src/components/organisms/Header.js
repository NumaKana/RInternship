export const Header = (props) => {
  const { title = "Title" } = props;
  return (
    <>
      <div className="h-14 bg-white border-b fixed top-0 inset-x-0">
        <h2 className="text-lg font-bold text-main text-center pt-3">
          {title}
        </h2>
      </div>
      <div className="h-14" />
    </>
  );
};
