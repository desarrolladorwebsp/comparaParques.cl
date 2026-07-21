import { cn } from "@/lib/cn";
import type { FormStepperProps } from "@/types/ui";

export function FormStepper({
  steps,
  currentStep,
  className,
}: FormStepperProps) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className={cn("w-full", className)}>
      <ol className="relative mb-4 flex items-start justify-between gap-2">
        <div
          aria-hidden
          className="absolute left-[16.67%] right-[16.67%] top-4 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-slate-200"
        >
          <div
            className="h-full rounded-full bg-brand-orange transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {steps.map((step) => {
          const active = step.id === currentStep;
          const completed = step.id < currentStep;

          return (
            <li
              key={step.id}
              className="relative z-10 flex min-w-0 flex-1 flex-col items-center gap-2.5 text-center"
            >
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition duration-300",
                  active
                    ? "bg-brand-orange text-white shadow-[0_8px_20px_-6px_rgba(230,126,34,0.75)] ring-4 ring-brand-orange/20"
                    : completed
                      ? "bg-brand-dark text-white shadow-md"
                      : "border-2 border-slate-200 bg-white text-slate-400",
                )}
              >
                {completed ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M3 7.2 5.8 10 11 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  step.id
                )}
              </span>
              <span
                className={cn(
                  "max-w-full truncate text-[11px] font-medium sm:text-xs",
                  active
                    ? "font-semibold text-brand-orange"
                    : completed
                      ? "text-brand-dark"
                      : "text-slate-400",
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>

      <div
        className="h-2.5 overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-valuenow={currentStep}
        aria-label={`Paso ${currentStep} de ${steps.length}`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-dark to-brand-orange transition-all duration-500 ease-out"
          style={{
            width: `${currentStep === 1 ? 12 : progress}%`,
          }}
        />
      </div>
    </div>
  );
}
