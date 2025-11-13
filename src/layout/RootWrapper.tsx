import { Fragment, useEffect } from "react";
import type { ReactNode } from "react";
import { data$, setAttributes } from "./services/switcherServices";

type RootWrapperProps = {
  children: ReactNode;
};

function RootWrapper({ children }: RootWrapperProps) {
  useEffect(() => {
    const subscription = data$.subscribe(() => {
      setAttributes();
    });
    setAttributes();

    return () => subscription.unsubscribe();
  }, []);

  return <Fragment>{children}</Fragment>;
}

export default RootWrapper;

