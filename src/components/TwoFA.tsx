import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

interface TwoFAProps {
  pin: string;
  setPin: (val: string) => void;
  onSubmit: () => void;
  children: React.ReactNode;
}

const TwoFA = ({ pin, setPin, onSubmit, children }: TwoFAProps) => {
  const handleChange = (newValue: string) => {
    setPin(newValue);
  };
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (pin.length === 6) {
      onSubmit();
      setOpen(false);
    } else {
      setError("The pin must be 6 digits");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showX={false}>
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl space-y-6 mx-auto px-4">
          <div className="space-y-2 text-center sm:text-left">
            <label className="text-sm sm:text-base font-medium">
              One-Time Password
            </label>
            <InputOTP
              maxLength={6}
              value={pin}
              onChange={handleChange}
              className="flex justify-center sm:justify-start"
            >
              <InputOTPGroup>
                {[0, 1, 2].map((i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
                <InputOTPSeparator />
                {[3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <p className="text-xs sm:text-sm text-muted-foreground">
              Enter the OTP sent to your phone.
            </p>
          </div>
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto sm:px-6"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TwoFA;
