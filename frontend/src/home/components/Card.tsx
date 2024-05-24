export const Card = () => {
  return (
    <div className="w-full h-[calc(100dvh-50px)] flex flex-col items-center justify-center">
      <div className="card w-full bg-gray-50 shadow-sm rounded p-3">
        <div className={`date ${divStyle}`}>
          <p>
            <span className={spanStyle}>Date :- </span> 17/05/2016
          </p>
        </div>
        <div className={`category ${divStyle}`}>
          <p>
            <span className={spanStyle}>Category :- </span> Income
          </p>
        </div>
        <div className={`amount ${divStyle}`}>
          <p>
            <span className={spanStyle}>Amount :- </span> 200000
          </p>
        </div>
        <div className={`reason ${divStyle}`}>
          <p>
            <span className={spanStyle}>Reason :- </span> Shoping
          </p>
        </div>
        <div className="buttons">
          <button className="edit block bg-blue-600 text-white rounded shadow-sm w-[150px] p-2 mx-2 font-semibold my-2">Edit</button>
          <button className="delete block bg-red-600 text-white rounded shadow-sm w-[150px] p-2 mx-2 font-semibold my-2">Delete</button>
        </div>
      </div>
    </div>
  );
};

const spanStyle = "text-lg font-semibold";
const divStyle = "m-1 p-2";
