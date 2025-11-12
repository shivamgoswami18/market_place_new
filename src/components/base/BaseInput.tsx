import { useState } from "react";
import { Form } from "react-bootstrap";

type BaseInputProps = {
  label?: string;
  name: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  containerClassName?: string;
  controlId?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  handleBlur?: React.FocusEventHandler<HTMLInputElement>;
  showPasswordToggle?: boolean;
  touched?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  helperTextClassName?: string;
};

const BaseInput: React.FC<BaseInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  error,
  autoComplete,
  disabled,
  className,
  labelClassName,
  containerClassName,
  controlId,
  onBlur,
  handleBlur,
  showPasswordToggle = true,
  touched,
  fullWidth,
  helperText,
  helperTextClassName,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalTouched, setInternalTouched] = useState(false);
  const isPasswordField = type === "password";
  const resolvedControlId = controlId ?? name;
  const hasError = Boolean(error);
  const isTouched = touched ?? internalTouched;
  const shouldShowError = hasError && isTouched;

  const inputType =
    isPasswordField && showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

  const wrapperClassName =
    isPasswordField && showPasswordToggle ? "position-relative" : undefined;
  const controlClassName = ["form-control", className].filter(Boolean).join(" ");
  const toggleButtonClassName = [
    "show-password-button text-muted bg-transparent border-0 p-0 position-absolute top-50 translate-middle-y end-0",
    shouldShowError ? "me-4" : "me-3",
  ]
    .filter(Boolean)
    .join(" ");

  const handleInternalBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    if (touched === undefined) {
      setInternalTouched(true);
    }
    onBlur?.(event);
    handleBlur?.(event);
  };

  return (
    <Form.Group
      className={[fullWidth ? "w-100" : undefined, containerClassName]
        .filter(Boolean)
        .join(" ")}
      controlId={resolvedControlId}
    >
      {label && (
        <Form.Label className={labelClassName}>
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </Form.Label>
      )}
      {helperText && (
        <div className={helperTextClassName}>{helperText}</div>
      )}
      <div className={wrapperClassName}>
        <Form.Control
          id={resolvedControlId}
          name={name}
          type={inputType}
          className={controlClassName}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          disabled={disabled}
          onBlur={handleInternalBlur}
          isInvalid={shouldShowError}
        />
        {isPasswordField && showPasswordToggle && (
          <button
            type="button"
            className={toggleButtonClassName}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <i className="ri-eye-line align-middle" />
            ) : (
              <i className="ri-eye-off-line align-middle" />
            )}
          </button>
        )}
      </div>
      {shouldShowError && (
        <div className="invalid-feedback d-block">
          {error}
        </div>
      )}
    </Form.Group>
  );
};

export default BaseInput;

