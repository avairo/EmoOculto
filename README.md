# Emoji Steganography Tool

A web-based tool that hides secret messages inside emoji text using zero-width Unicode characters. The hidden message remains invisible while preserving the original appearance of the emoji sequence.

---

## Features

- Hide secret messages inside emoji strings
- Extract hidden messages from encoded emoji text
- Uses zero-width Unicode characters for data embedding
- Client-side processing
- Simple encode/decode workflow
- Demonstrates Unicode steganography techniques

---

## How It Works

### Encoding Process

1. Enter a visible emoji sequence.
2. Enter a secret message.
3. The message is converted into binary.
4. Binary data is mapped to zero-width Unicode characters.
5. The invisible payload is appended to the emoji sequence.

### Example

**Visible Cover**

```text
💀💀💀
```

**Secret Message**

```text
password123
```

**Result**

```text
💀💀💀[hidden zero-width payload]
```

The encoded text looks identical to the original emoji string while containing hidden data.

---

### Decoding Process

1. Paste an encoded emoji sequence.
2. The application extracts zero-width Unicode characters.
3. The hidden binary data is reconstructed.
4. The original message is displayed.

---

## Technical Details

The application uses invisible Unicode characters, including:

| Character | Unicode |
|------------|------------|
| Zero Width Space | U+200B |
| Zero Width Non-Joiner | U+200C |
| Zero Width Joiner | U+200D |
| Word Joiner | U+2060 |

These characters are not visible when rendered, making them useful for demonstrating Unicode-based steganography.

---

## Use Cases

- Cybersecurity education
- Unicode security research
- Digital forensics demonstrations
- Steganography learning
- Hidden metadata experiments

---

## Security Considerations

Zero-width Unicode characters may survive copying, pasting, and transmission across some platforms. This project demonstrates how hidden information can be embedded within otherwise normal-looking text and how such information can be detected and extracted.

---

## Disclaimer

This project is intended for educational, research, and demonstration purposes only. It is designed to help users understand Unicode steganography techniques and methods for detecting hidden text data.

---

## License

This project is licensed under the MIT License.
