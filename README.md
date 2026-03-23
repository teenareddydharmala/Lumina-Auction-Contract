# ✨ LuminaAuction: Decentralized Soroban Auction

## 📖 Project Overview
LuminaAuction is a full-stack decentralized auction platform built on the **Stellar Testnet** using **Soroban Smart Contracts**. It allows sellers to initiate auctions with a starting bid and duration, and enables bidders to compete in real-time.

### Core Features
* **Rust Smart Contract:** Handles auction logic, bid validation, and state management.
* **Multi-Wallet Support:** Integrated with `@creit.tech/stellar-wallets-kit` to support Freighter and Albedo.
* **Real-Time State:** React frontend fetches live ledger data using generated Soroban bindings.

---

## 🛠️ Technical Stack
* **Smart Contract:** Rust (Soroban SDK)
* **Frontend:** React.js (Hooks & Context)
* **Identity Management:** Stellar CLI (Alice & Bob identities)
* **Network:** Stellar Testnet (Test SDF Network)

---

## 🚀 Development & Testing Journey

### 1. Smart Contract Build & Identity
The project began by writing the Rust logic for `init`, `place_bid`, and `get_status`. I established a local identity `alice` to act as the contract owner and deployer.

**Evidence (See yb1.PNG):**
* Successful compilation of `hello_world.wasm`.
* Generation of the `alice` key locally.

### 2. Deployment & Initialization
The contract was deployed to the Testnet, generating a unique Contract ID. I then initialized the auction with a starting bid of **100 XLM** (1,000,000,000 Stroops).

**Evidence (See yb2.PNG & yb3.PNG):**
* **Contract ID:** `CANDYC3FI2F75CYMYGIK7LKDRMZVZVKKYSHO3ZY3VWWR2MTLIMW6IVRZ`
* Successful `init` invocation by the seller.

### 3. Integration Testing (The "Bob" Test)
To verify the contract logic before building the UI, I simulated a second user, `bob`. 
* **Action:** Bob placed a bid of **150 XLM**.
* **Validation:** The contract accepted the bid and updated the state.

**Evidence (See yb4.PNG):**
* The `get_status` command confirms the high bidder changed from Alice's address to Bob's address (`GA23LZ...`).

---

## 🛑 Challenges & Error Handling

### Terminal Logic Errors
During the testing phase, I intentionally attempted to bid **less** than the current high bid. The contract correctly triggered a `VM call trapped` error, confirming that our Rust security checks prevent invalid bids.

### Frontend Integration Hurdles
* **Binding Paths:** Resolved a `Module not found` error by re-mapping the Soroban generated bindings into the React `src` folder using the `--overwrite` flag.
* **Version Mismatch:** Successfully migrated from `@stellar/stellar-wallets-kit` to `@creit.tech/stellar-wallets-kit` to support a modern multi-wallet modal.
* **Race Conditions:** Fixed `TypeError: Cannot read properties of undefined (reading 'slice')` by implementing optional chaining (`?.`) to handle the delay in blockchain data fetching.

---

## 🏃 How to Run Locally

### Prerequisites
* [Stellar CLI](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup)
* Node.js v18+

### Steps
1.  **Build the Contract Bridge:**
    ```cmd
    cd frontend/src/contracts/auction
    npm install
    npm run build
    ```
2.  **Launch the Dashboard:**
    ```cmd
    cd ../../../
    npm install
    npm start
    ```

---

## 👤 Author
**Dharmala Teena Reddy**
