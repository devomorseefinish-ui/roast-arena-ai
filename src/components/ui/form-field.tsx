import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Label } from "./label";

interface FormFieldProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  helperText?: string;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    const [hasShaken, setHasShaken] = React.useState(false);
    
    React.useEffect(() => {
      if (error && !hasShaken) {
        setHasShaken(true);
        // Play error sound if available
        try {
          new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+Pr').play();
        } catch (e) {
          // Fallback for browsers that don't support audio
        }
        
        const timer = setTimeout(() => setHasShaken(false), 500);
        return () => clearTimeout(timer);
      }
    }, [error, hasShaken]);

    return (
      <div className="space-y-1">
        {label && (
          <Label className={cn("text-sm font-medium", error && "text-destructive")}>
            {label}
          </Label>
        )}
        <Input
          className={cn(
            "transition-all duration-200",
            error && "input-error",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive font-medium animate-shake">
            ⚠️ {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export { FormField };