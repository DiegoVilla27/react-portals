import { useState } from "react";
import Modal from "./components/modal";

/**
 * The main application component.
 * 
 * This component demonstrates the practical use of React Portals
 * by rendering a `Modal` component outside of the main React DOM hierarchy.
 * 
 * The modal is toggled using local state and shows how to control
 * component visibility and event handling between parent and portal-based children.
 * 
 * @returns {JSX.Element} The rendered application.
 */
function App() {
  
  /**
   * Local state controlling the modal visibility.
   * - `true`: the modal is visible.
   * - `false`: the modal is hidden.
   */
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>React Portal Example</h1>
      <p>This demonstrates how to render modals outside the root element.</p>

      {/**
       * Button that toggles the modal open state.
       * When clicked, it sets `isOpen` to `true`, rendering the modal.
       */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Open Modal
      </button>

      {/**
       * Modal component rendered using a React Portal.
       * It receives:
       *  - `isOpen`: determines visibility.
       *  - `onClose`: callback used to hide the modal when clicking outside or pressing the close button.
       * 
       * The content inside (`children`) demonstrates how portals
       * maintain access to React state and context even when rendered outside the DOM tree.
       */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Hello from the Portal 👋</h2>
        <p>This content is rendered outside the main DOM tree!</p>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default App;
