import { Button } from "./Button";
import { Input } from "./Input";
import { useRenderComponent } from "../../hooks/RenderComponent";

export const OTPVerification = () => {
  const [onNext, onBack] = useRenderComponent();
  return (
    <div className="flex flex-col items-center justify-center my-2 h-4/5">
      <Input type="text" placeholder="Enter OTP" />
      <Button name="Verify OTP" handleClick={onNext} />
      <p className="cursor-pointer" onClick={onBack}>
        <small className="text-[#296346] hover:drop-shadow-2xl">
          Re-Enter Gmail
        </small>
      </p>
    </div>
  );
};
