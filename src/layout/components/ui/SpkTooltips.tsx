import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

type Placement = "top" | "bottom" | "left" | "right" | "auto";

interface SpkTooltipsProps {
  title: string;
  id?: string;
  children: React.ReactElement;
  tooltipClass?: string;
  trigger?: any;
  placement?: Placement;
}

const SpkTooltips: React.FC<SpkTooltipsProps> = ({
  title,
  id,
  children,
  tooltipClass,
  trigger,
  placement,
}) => {
  return (
    <OverlayTrigger
      placement={placement}
      trigger={trigger}
      overlay={
        <Tooltip id={id} className={tooltipClass}>
          {title}
        </Tooltip>
      }
    >
      {children}
    </OverlayTrigger>
  );
};

export default SpkTooltips;

