import { useState } from "react";

import { Gmail } from "../auth/components/Gmail";
import { OTPVerification } from "../auth/components/OTPVerfication";
import { Passwords } from "../auth/components/Passwords";

// This custom hook is used to render the components in forget password and signup components
export const useRenderComponent = () => {
  const [count, setCount] = useState(0);

  const onNext = () => {
    console.log("onNext")
    console.log(count)
    setCount((prev) => prev + 1);
  };

  const onBack = () => {
    setCount((prev) => prev - 1);
  };

  const renderComponent = (): React.ReactNode => {
    console.log("render")
    switch (count) {
      case 0:
        return <Gmail />;
      case 1:
        return <OTPVerification />;
      case 2:
        return <Passwords />;
      default:
        setCount(2);
        break;
    }
  };

  return { renderComponent, onNext, onBack } as const;
};
