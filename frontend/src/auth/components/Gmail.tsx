import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "./Button";
import { Input } from "./Input";
import { useAuthContext } from "../../context/AuthContext";
import { useRenderComponent } from "../../hooks/RenderComponent";

export const Gmail = () => {
  const { sendOTP, success, message } = useAuthContext();
  const { onNext } = useRenderComponent();
  const [email, setEmail] = useState("");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    sendOTP(email);
    if (success) {
      onNext();
      toast.success(message);
    }
    else toast.error(message)
  };

  return (
    <div className="flex flex-col items-center justify-center my-2 h-4/5">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        handleOnChange={handleOnChange}
      />
      <Button name="SendOTP" handleClick={handleOnClick} />
    </div>
  );
};
