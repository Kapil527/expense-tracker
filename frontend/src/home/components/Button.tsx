export const Button = ({
  handleOnClick,
}: {
  handleOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button
      data-modal-target="crud-modal"
      data-modal-toggle="crud-modal"
      id="addExpense"
      className="ms-auto me-4 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 outline-none"
      type="button"
      onClick={handleOnClick}
    >
      Add expense
    </button>
  );
};
