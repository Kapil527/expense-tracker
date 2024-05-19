interface InputPropsTypes {
  placeholder: string;
  type: string;
  value: string;
  handleOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  placeholder,
  type,
  value,
  handleOnChange,
}: InputPropsTypes) => {
  return (
    <div>
      <input
        type={type}
        className="p-2 px-2 outline-none my-2 border rounded w-full"
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
};
