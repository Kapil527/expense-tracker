export const Card = () => {
  return (
    <div className="md:hidden w-full">
      <div className="card m-[12px] p-4 shadow-lg flex justify-between items-center rounded-xl">
        <div className="content">
          <p>
            <span className="font-bold">Date:-</span> 07/05/2024
          </p>
          <p>
            <span className="font-bold">Category:-</span> Expense
          </p>
          <p>
            <span className="font-bold">Amount:-</span> 5000
          </p>
          <p>
            <span className="font-bold">Reason:-</span> Shopping
          </p>
          <p>
            <span className="font-bold">Evidence:-</span> --
          </p>
        </div>
        <div className="buttons flex items-center">
          <button className="mx-2">Edit</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};
