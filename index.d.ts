declare module 'tinyfiledialogs-node' {
    /**
     * Shows a simple message popup.
     * @param title - The title of the popup window.
     * @param message - The message to display.
     */
    function popup(title: string, message: string): void;

    /**
     * Opens a file picker dialog and returns the selected file path.
     * @returns The selected file path or null if canceled.
     */
    function pickFile(filters?: string[], allowMultiple?: boolean): string[];

    /**
     * Opens a folder picker dialog and returns the selected folder path.
     * @returns The selected folder path or null if canceled.
     */
    function pickFolder(defaultPath?: string): string | null;

    /**
     * Displays an input box for user text input.
     * @param title - The title of the input box.
     * @param message - The message prompt.
     * @param defaultInput - (Optional) The default text input.
     * @returns The entered text or null if canceled.
     */
    function inputBox(title: string, message: string, defaultInput?: string): string | null;

    /**
     * Opens a save file dialog with an optional filter.
     * @param filter - The file type filter (e.g., "*.txt", "*.png").
     * @returns The selected file path or null if canceled.
     */
    function saveFileDialog(filter: string): string | null;
}


