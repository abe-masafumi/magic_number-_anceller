# PHP Magic Number Detector

This extension helps you detect magic numbers in PHP files and suggests replacing them with named constants.

## Features

- Automatically detects magic numbers in PHP files.
- Provides warnings for detected magic numbers.
- Offers suggestions to replace magic numbers with named constants.

## Installation

1. Open Visual Studio Code.
2. Go to Extensions (`Ctrl+Shift+X` or `Cmd+Shift+X`).
3. Search for `PHP Magic Number Detector` and click "Install".

## Usage

1. Open a PHP file.
2. Run the command `Detect PHP Magic Numbers` from the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
3. View warnings directly in your editor for detected magic numbers.

## Configuration

You can configure the allowed magic numbers in your settings.json file:

```json
{
    "magicNumberDetector.allowedNumbers": [0, 1]
}
```

License
MIT
