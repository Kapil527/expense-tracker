export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center h-screen md:w-screen p-4">
      <div className="container shadow w-[382px] h-[255px] md:w-1/4 p-4 rounded">
        {children}
      </div>
    </div>
  );
};
