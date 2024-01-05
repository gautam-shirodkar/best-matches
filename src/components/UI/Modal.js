import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.scss";

const Modal = ({ children, onClose }) => {
  const dialog = useRef();
  useEffect(() => {
    const modal = dialog.current;
    modal.showModal();
    return () => {
      modal.close();
    };
  }, []);

  return createPortal(
    <dialog className={classes.Modal} ref={dialog}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
