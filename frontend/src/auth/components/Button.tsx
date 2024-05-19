interface ButtonPropsTypes {
  name: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({ name, handleClick }: ButtonPropsTypes) => {
  return (
    <button
      className="bg-[#296346] text-white font-semibold p-2 my-2 rounded hover:bg-white hover:text-[#296346] hover:shadow"
      onClick={handleClick}
    >
      {name}
    </button>
  );
};
