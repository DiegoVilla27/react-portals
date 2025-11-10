import type { ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * Interface defining the props accepted by the `Modal` component.
 */
interface IModalProps {
  /**
   * Controls the visibility of the modal.
   * When `true`, the modal is rendered using a React Portal.
   */
  isOpen: boolean;

  /**
   * Callback executed when the user clicks outside the modal content.
   * Commonly used to close the modal.
   */
  onClose: () => void;

  /**
   * The React elements or components to be displayed inside the modal.
   */
  children: ReactNode;
}

/**
 * A reusable modal component implemented using React Portals.
 * 
 * This component allows rendering its content outside of the main React DOM tree
 * (commonly under a root-level element such as `#modal-root`), ensuring that
 * visual overlays like modals or dialogs appear above other page content
 * without CSS stacking issues.
 * 
 * @param {IModalProps} props - The props used to configure the modal.
 * @returns {JSX.Element | null} The rendered modal portal or `null` if `isOpen` is false.
 */
const Modal = ({
  isOpen,
  onClose,
  children
}: IModalProps) => {

  // If the modal is not open, do not render anything.
  if (!isOpen) return null;

  /**
   * The DOM element where the modal will be mounted.
   * Typically, this should be a separate root node such as:
   * `<div id="root"></div>` defined in `index.html`.
   */
  const modalRoot = document.getElementById('root');
  if (!modalRoot) return null;

  /**
   * Creates a React Portal that renders the modal content into the `modalRoot` element.
   * The modal includes a semi-transparent background that captures clicks
   * to trigger the `onClose` callback.
   */
  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          minWidth: "300px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;