# tinyfiledialogs-node

A simple Node.js wrapper for `tinyfiledialogs`, providing cross-platform file dialogs with minimal dependencies.

## Installation

```sh
npm install tinyfiledialogs-node
```

## Usage

```javascript
const { popup, pickFile, pickFolder, inputBox, saveFileDialog } = require('tinyfiledialogs-node');
```

### **Functions**

#### `popup(title: string, message: string): void`
Displays a simple message popup.

```javascript
popup('Hello', 'This is a message');
```

#### `pickFile(filters?: string[], allowMultiple?: boolean): string[]`
Opens a file picker dialog and returns an array of selected file paths.

```javascript
const files = pickFile(['png', 'jpg'], true);
console.log(files);
```

#### `pickFolder(defaultPath?: string): string | null`
Opens a folder picker dialog and returns the selected folder path.

```javascript
const folder = pickFolder();
console.log(folder);
```

#### `inputBox(title: string, message: string, defaultInput?: string): string | null`
Displays an input box for user text input.

```javascript
const name = inputBox('Enter Name', 'What is your name?', 'John Doe');
console.log(name);
```

#### `saveFileDialog(filter?: string): string | null`
Opens a save file dialog with an optional file type filter.

```javascript
const filePath = saveFileDialog('*.txt');
console.log(filePath);
```

