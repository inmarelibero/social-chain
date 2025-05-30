// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               unknown
// source: socialchain/profiles/events.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "socialchain.profiles";

/** EventCreateProfile is emitted when a Handle is created */
export interface EventCreateProfile {
  id: number;
  owner: string;
  handle: string;
}

function createBaseEventCreateProfile(): EventCreateProfile {
  return { id: 0, owner: "", handle: "" };
}

export const EventCreateProfile: MessageFns<EventCreateProfile> = {
  encode(message: EventCreateProfile, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    if (message.handle !== "") {
      writer.uint32(26).string(message.handle);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): EventCreateProfile {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventCreateProfile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.id = longToNumber(reader.uint64());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.owner = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.handle = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventCreateProfile {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      handle: isSet(object.handle) ? globalThis.String(object.handle) : "",
    };
  },

  toJSON(message: EventCreateProfile): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.handle !== "") {
      obj.handle = message.handle;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventCreateProfile>, I>>(base?: I): EventCreateProfile {
    return EventCreateProfile.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventCreateProfile>, I>>(object: I): EventCreateProfile {
    const message = createBaseEventCreateProfile();
    message.id = object.id ?? 0;
    message.owner = object.owner ?? "";
    message.handle = object.handle ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(int64: { toString(): string }): number {
  const num = globalThis.Number(int64.toString());
  if (num > globalThis.Number.MAX_SAFE_INTEGER) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  if (num < globalThis.Number.MIN_SAFE_INTEGER) {
    throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
  }
  return num;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
