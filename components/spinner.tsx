import { RotatingLines } from "react-loader-spinner";

const Spinner = () => {
  return (
    <RotatingLines
      visible={true}
      width="25"
      strokeWidth="2"
      strokeColor="black"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  );
};

export default Spinner;
