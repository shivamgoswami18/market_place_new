import React, { Fragment, type CSSProperties, type ReactNode, type MouseEventHandler } from "react";
import { Button } from "react-bootstrap";

type ButtonType = "button" | "reset" | "submit" | undefined;
type SizeType = "sm" | "lg";

type SpkButtonProps = {
  bsPrefix?: string;
  as?: any;
  Buttonvariant?: string;
  Buttontype?: ButtonType;
  Customclass?: string;
  children?: ReactNode;
  Dismiss?: boolean;
  Closebutton?: string;
  Value?: string;
  Buttontoggle?: string;
  Expand?: boolean;
  Id?: string;
  Buttondismiss?: string;
  Buttontarget?: string;
  Role?: string;
  Buttoncontrols?: string;
  Buttonlabel?: string;
  Style?: CSSProperties;
  Size?: SizeType;
  Active?: boolean;
  Tabindex?: number;
  Disabled?: boolean;
  Navigate?: string;
  onClickfunc?: MouseEventHandler<HTMLButtonElement>;
  onChangefunc?: (event: React.MouseEvent<HTMLButtonElement>) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const SpkButton: React.FC<SpkButtonProps> = ({
  Buttonvariant = "",
  Style,
  Buttontype,
  Customclass,
  children,
  bsPrefix,
  Role,
  as,
  Size,
  Active,
  Expand,
  Navigate,
  Disabled,
  Id,
  onClickfunc,
  onChangefunc,
  Buttontoggle,
  Buttonlabel,
  Buttondismiss,
  Buttoncontrols,
  Value,
  Tabindex,
  Buttontarget,
  ...props
}) => {
  return (
    <Fragment>
      <Button
        type={Buttontype}
        id={Id}
        style={Style}
        bsPrefix={bsPrefix}
        as={as}
        variant={Buttonvariant}
        role={Role}
        href={Navigate}
        size={Size}
        active={Active}
        disabled={Disabled}
        data-bs-toggle={Buttontoggle}
        aria-expanded={Expand}
        data-bs-target={Buttontarget}
        tabIndex={Tabindex}
        onClick={onClickfunc}
        value={Value}
        className={`btn-wave ${Customclass}`}
        onChange={onChangefunc}
        data-bs-dismiss={Buttondismiss}
        aria-label={Buttonlabel}
        aria-controls={Buttoncontrols}
        {...props}
      >
        {children}
      </Button>
    </Fragment>
  );
};

export default SpkButton;

