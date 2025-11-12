import type { FC, MouseEvent, ReactNode } from "react";
import SpkButton from "../../shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-buttons";

type ButtonType = "button" | "reset" | "submit";

type BaseButtonProps = {
  label?: ReactNode;
  type?: ButtonType;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  children?: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  divClass?: string;
  noPadding?: boolean;
  loader?: boolean;
  unstyled?: boolean;
};

const BaseButton: FC<BaseButtonProps> = ({
  label,
  type = "button",
  className = "",
  onClick,
  disabled = false,
  loading = false,
  children,
  startIcon,
  endIcon,
  divClass,
  noPadding = false,
  loader,
  unstyled = false,
}) => {
  const isLoading = loader ?? loading;
  const hasCustomBtnClass = /\bbtn\b/.test(className ?? "");
  const combinedClassName = [
    unstyled || hasCustomBtnClass ? undefined : "btn btn-primary",
    noPadding && "!p-0",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={divClass}>
      <SpkButton
        Buttontype={type}
        Customclass={combinedClassName}
        onClickfunc={onClick}
        Disabled={disabled || isLoading}
      >
        {isLoading ? (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          <>
            {startIcon && <span className="d-inline-flex me-2">{startIcon}</span>}
            {children ?? label}
            {endIcon && <span className="d-inline-flex ms-2">{endIcon}</span>}
          </>
        )}
      </SpkButton>
    </div>
  );
};

export default BaseButton;

