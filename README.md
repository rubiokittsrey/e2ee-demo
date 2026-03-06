# E2EE Demo

A browser-based simulation of end-to-end encrypted messaging built with Next.js and the Web Crypto API.

## Features

* Simulated messaging between two users
* RSA key pair generation for secure key exchange
* AES-GCM symmetric encryption for messages
* Interactive encryption and decryption flow
* Dark and light theme support
* Responsive UI

## Getting Started

### Prerequisites

* Node.js 18+

### Installation

```bash
git clone https://github.com/yourusername/e2ee-demo.git
cd e2ee-demo
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Features

* **Generate Key**: Create RSA key pair for a user
* **Send Message**: Encrypt and deliver a message
* **Decrypt**: Reveal the message using the recipient’s private key
* **Switch User**: Toggle between Alice and John

## Hybrid Encryption Model

```
RSA-OAEP (2048-bit) — key exchange
AES-GCM (256-bit)  — message encryption
```

Encryption flow:

```
1. Generate AES key
2. Encrypt message with AES-GCM
3. Encrypt AES key with recipient public key
4. Send encrypted message and encrypted key
```

Decryption flow:

```
1. Decrypt AES key with RSA private key
2. Decrypt message using AES key
```

---

**Author**: [@yourusername](https://github.com/yourusername)
