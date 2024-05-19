import { Button } from "./Button";
import { Input } from "./Input";


export const Passwords = () => {
  return (
    <div className="flex flex-col items-center my-2">
      <Input type="password" placeholder="Enter Password" />
      <Input type="password" placeholder="Confirm Password" />
      <Button name="Register" handleClick={onNext} />
    </div>
  );
};
