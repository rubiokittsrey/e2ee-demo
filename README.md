# E2EE Demo

A demonstration of end-to-end encrypted messaging using RSA key exchange and AES encryption in the browser.

## Overview

This interactive web application showcases the fundamental principles of end-to-end encryption (E2EE) through a simulated messaging system between two users. Built with Next.js and the Web Crypto API, it demonstrates hybrid encryption using RSA for secure key exchange and AES-GCM for efficient message encryption. Users can generate cryptographic keys, send encrypted messages, and decrypt them while observing each step of the encryption process in real-time.

## Features

- Real-time demonstration of E2EE messaging between two users (Alice and John)
- RSA key pair generation for secure key exchange
- AES-GCM symmetric encryption for message confidentiality
- Step-by-step visualization of encryption and decryption processes
- Interactive message composer and user panels
- Dark and light theme support
- Responsive design for desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository

    ```bash
    git clone https://github.com/yourusername/e2ee-demo.git
    cd e2ee-demo
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Start the development server

    ```bash
    npm run dev
    ```

4. Open your browser to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## Usage

### Key Generation

1. Click the "Generate Key" button for each user to create RSA key pairs
2. Observe the step-by-step process in the activity log

### Sending Messages

1. Select a sender user (Alice or John)
2. Type a message in the composer
3. Click "Send Message" to encrypt and deliver the message
4. The message appears encrypted in both user panels

### Decrypting Messages

1. Switch to the recipient user
2. Click "Decrypt" on any received message
3. Watch the decryption process unfold step by step

### Switching Users

Use the user toggle to switch between Alice and John to see messages from their perspective.

## Architecture

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Main demo page
│   └── globals.css        # Global styles
├── components/
│   ├── e2ee-demo/         # E2EE-specific components
│   │   ├── provider.tsx   # E2EE context and logic
│   │   └── ui/            # Demo UI components
│   └── ui/                # Reusable UI components (shadcn/ui)
└── lib/
    ├── utils.ts           # Utility functions
    └── e2ee-demo/
        └── types.d.ts     # TypeScript type definitions
```

### Technologies

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Web Crypto API** - Browser-based cryptography
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icons
- **next-themes** - Theme management
- **shadcn/ui** - Re-usable component library

### Cryptographic Implementation

The demo implements hybrid encryption:

1. **RSA-OAEP** (2048-bit) for asymmetric key exchange
2. **AES-GCM** (256-bit) for symmetric message encryption

**Encryption Flow:**

- Generate AES key for each message
- Encrypt message with AES-GCM
- Encrypt AES key with recipient's RSA public key
- Transmit encrypted message and encrypted key

**Decryption Flow:**

- Decrypt AES key with recipient's RSA private key
- Decrypt message with recovered AES key

## Security Notes

This is a demonstration application for educational purposes. In production systems:

- Use established E2EE protocols like Signal Protocol
- Implement proper key management and rotation
- Add authentication and authorization
- Use secure random number generation
- Consider forward secrecy and deniability

## License

MIT License
