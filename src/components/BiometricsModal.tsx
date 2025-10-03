import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Fingerprint, CheckCircle2 } from "lucide-react";

interface BiometricsModalProps {
  children: React.ReactNode;
  handleBiometrics: () => void;
}

const BiometricsModal = ({
  children,
  handleBiometrics,
}: BiometricsModalProps) => {
  const [open, setOpen] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    let timer: number | undefined;

    if (open) {
      setVerified(false);

      timer = setTimeout(() => {
        setVerified(true);

        setTimeout(() => {
          setOpen(false);
          handleBiometrics();
        }, 1200);
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [open, handleBiometrics]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[320px] max-w-xs p-8 rounded-2xl border border-border/50 backdrop-blur-lg shadow-xl bg-background/80"
        showX={false}
      >
        <div className="flex flex-col items-center text-center space-y-5">
          <div
            className={`size-28 rounded-full flex items-center justify-center transition-all duration-700 ${
              verified ? "bg-green-100 scale-110" : "bg-blue-100"
            }`}
          >
            {verified ? (
              <CheckCircle2 className="size-14 text-green-600 transition-transform duration-700" />
            ) : (
              <Fingerprint className="size-14 text-blue-600 animate-pulse" />
            )}
          </div>

          <div className="space-y-1">
            <p className="font-medium text-base">
              {verified ? "Verified" : "Biometric Authentication"}
            </p>
            <p className="text-sm text-muted-foreground">
              {verified
                ? "Authentication successful"
                : "Place your finger on the sensor to continue"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BiometricsModal;
