const viewtransitionClass = "vt-element-animation";
const viewtransitionClassClosing = "vt-element-animation-closing";

/**
 * Custom hook to manage view transitions for dialog elements
 */
export function useViewTransition() {
  /**
   * Opens a dialog with a view transition animation
   * @param {HTMLDialogElement} dialog - The dialog element to open
   * @param {HTMLElement} originElement - The element that triggers the dialog
   */
  const openWithTransition = async (dialog, originElement) => {
    if (!dialog || !originElement) return;

    // Setup view transition names and classes for opening animation
    dialog.style.viewTransitionName = "vt-shared";
    dialog.style.viewTransitionClass = viewtransitionClass;

    originElement.style.viewTransitionName = "vt-shared";
    originElement.style.viewTransitionClass = viewtransitionClass;
    originElement.setAttribute("origin-element", "");

    // Start the view transition
    const viewTransition = document.startViewTransition(() => {
      originElement.style.viewTransitionName = "";
      originElement.style.viewTransitionClass = "";
      dialog.showModal();
    });

    await viewTransition.finished;
  };

  /**
   * Closes a dialog with a view transition animation
   * @param {HTMLDialogElement} dialog - The dialog element to close
   * @param {HTMLElement} originElement - The element that triggered the dialog
   */
  const closeWithTransition = async (dialog, originElement) => {
    if (!dialog || !originElement) return;

    // Setup view transition names and classes for closing animation
    dialog.style.viewTransitionName = "vt-shared";
    dialog.style.viewTransitionClass = viewtransitionClassClosing;

    const viewTransition = document.startViewTransition(() => {
      originElement.style.viewTransitionName = "vt-shared";
      originElement.style.viewTransitionClass = viewtransitionClassClosing;

      dialog.style.viewTransitionName = "";
      dialog.style.viewTransitionClass = "";

      dialog.close();
    });

    await viewTransition.finished;

    // Cleanup
    originElement.style.viewTransitionName = "";
    originElement.style.viewTransitionClass = "";
    originElement.removeAttribute("origin-element");
  };

  return {
    openWithTransition,
    closeWithTransition,
  };
}
