// This component show the Error message to the user.
const FallBackRender = () => {
  return (
    <div className="w-full h-[calc(100dvh-32px)] flex flex-col justify-center items-center">
      <h1 className="text-3xl text-red-600 font-bold">An Error Occured</h1>
      <p className="text-xl font-semibold">
        Please Refresh the page or visit after sometime.
      </p>
    </div>
  );
};

export default FallBackRender;
