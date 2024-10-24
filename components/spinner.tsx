import { RotatingLines } from "react-loader-spinner";

interface Props {
  color?: string;
}

const Spinner = ({ color }: Props) => {
  return (
    <RotatingLines
      visible={true}
      width="25"
      strokeWidth="2"
      strokeColor={color ? color : "black"}
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  );
};

export default Spinner;
