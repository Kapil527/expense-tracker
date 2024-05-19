import { Card } from "./components/Card";
import { useRenderComponent } from "../hooks/RenderComponent";

const Signup = () => {
  const { renderComponent } = useRenderComponent(); // using custom component to render component.

  return (
    <>
      <Card>
        <h1 className="text-center text-3xl text-[#296346]">SignUP</h1>
        {renderComponent()}
      </Card>
    </>
  );
};

export default Signup;
