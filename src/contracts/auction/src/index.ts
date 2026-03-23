import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CANDYC3FI2F75CYMYGIK7LKDRMZVZVKKYSHO3ZY3VWWR2MTLIMW6IVRZ",
  }
} as const

export type DataKey = {tag: "Seller", values: void} | {tag: "HighBidder", values: void} | {tag: "HighAmount", values: void} | {tag: "Expiry", values: void};

export interface Client {
  /**
   * Construct and simulate a init transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  init: ({seller, starting_bid, duration}: {seller: string, starting_bid: i128, duration: u64}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a place_bid transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  place_bid: ({bidder, amount}: {bidder: string, amount: i128}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a get_status transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_status: (options?: MethodOptions) => Promise<AssembledTransaction<readonly [string, i128, u64]>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABAAAAAAAAAAAAAAABlNlbGxlcgAAAAAAAAAAAAAAAAAKSGlnaEJpZGRlcgAAAAAAAAAAAAAAAAAKSGlnaEFtb3VudAAAAAAAAAAAAAAAAAAGRXhwaXJ5AAA=",
        "AAAAAAAAAAAAAAAEaW5pdAAAAAMAAAAAAAAABnNlbGxlcgAAAAAAEwAAAAAAAAAMc3RhcnRpbmdfYmlkAAAACwAAAAAAAAAIZHVyYXRpb24AAAAGAAAAAA==",
        "AAAAAAAAAAAAAAAJcGxhY2VfYmlkAAAAAAAAAgAAAAAAAAAGYmlkZGVyAAAAAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAA",
        "AAAAAAAAAAAAAAAKZ2V0X3N0YXR1cwAAAAAAAAAAAAEAAAPtAAAAAwAAABMAAAALAAAABg==" ]),
      options
    )
  }
  public readonly fromJSON = {
    init: this.txFromJSON<null>,
        place_bid: this.txFromJSON<null>,
        get_status: this.txFromJSON<readonly [string, i128, u64]>
  }
}