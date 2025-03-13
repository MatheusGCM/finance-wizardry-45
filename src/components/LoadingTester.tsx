import { useState } from "react";
import { Switch } from "./ui/switch";

interface LoadingTesterProps {
  onToggleLoading: (isLoading: boolean) => void;
  isCurrentlyLoading: boolean;
}

export const LoadingTester = ({
  onToggleLoading,
  isCurrentlyLoading,
}: LoadingTesterProps) => {
  const [delay, setDelay] = useState(2000);

  const handleToggle = (checked: boolean) => {
    onToggleLoading(checked);

    if (checked) {
      // Voltar ao estado normal após o delay
      setTimeout(() => {
        // onToggleLoading(false);
      }, delay);
    }
  };

  return (
    <Switch
      id="loading-mode"
      checked={isCurrentlyLoading}
      onCheckedChange={handleToggle}
    />
  );
};
