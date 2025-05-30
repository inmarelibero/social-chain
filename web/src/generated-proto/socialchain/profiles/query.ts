// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               unknown
// source: socialchain/profiles/query.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { Params } from "./params";

export const protobufPackage = "socialchain.profiles";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

/** Request type for getting the owner of a handle */
export interface QueryOwnerOfRequest {
  handle: string;
}

/** Response type */
export interface QueryOwnerOfResponse {
  id: string;
  handle: string;
  owner: string;
}

/** Request type for getting the handle of an owner */
export interface QueryOwnedByRequest {
  owner: string;
}

/** Response type */
export interface QueryOwnedByResponse {
  id: number;
  handle: string;
  owner: string;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest: MessageFns<QueryParamsRequest> = {
  encode(_: QueryParamsRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(base?: I): QueryParamsRequest {
    return QueryParamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse: MessageFns<QueryParamsResponse> = {
  encode(message: QueryParamsResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
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

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(base?: I): QueryParamsResponse {
    return QueryParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryOwnerOfRequest(): QueryOwnerOfRequest {
  return { handle: "" };
}

export const QueryOwnerOfRequest: MessageFns<QueryOwnerOfRequest> = {
  encode(message: QueryOwnerOfRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.handle !== "") {
      writer.uint32(10).string(message.handle);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): QueryOwnerOfRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOwnerOfRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
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

  fromJSON(object: any): QueryOwnerOfRequest {
    return { handle: isSet(object.handle) ? globalThis.String(object.handle) : "" };
  },

  toJSON(message: QueryOwnerOfRequest): unknown {
    const obj: any = {};
    if (message.handle !== "") {
      obj.handle = message.handle;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryOwnerOfRequest>, I>>(base?: I): QueryOwnerOfRequest {
    return QueryOwnerOfRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryOwnerOfRequest>, I>>(object: I): QueryOwnerOfRequest {
    const message = createBaseQueryOwnerOfRequest();
    message.handle = object.handle ?? "";
    return message;
  },
};

function createBaseQueryOwnerOfResponse(): QueryOwnerOfResponse {
  return { id: "", handle: "", owner: "" };
}

export const QueryOwnerOfResponse: MessageFns<QueryOwnerOfResponse> = {
  encode(message: QueryOwnerOfResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.handle !== "") {
      writer.uint32(18).string(message.handle);
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): QueryOwnerOfResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOwnerOfResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.handle = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.owner = reader.string();
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

  fromJSON(object: any): QueryOwnerOfResponse {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      handle: isSet(object.handle) ? globalThis.String(object.handle) : "",
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
    };
  },

  toJSON(message: QueryOwnerOfResponse): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.handle !== "") {
      obj.handle = message.handle;
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryOwnerOfResponse>, I>>(base?: I): QueryOwnerOfResponse {
    return QueryOwnerOfResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryOwnerOfResponse>, I>>(object: I): QueryOwnerOfResponse {
    const message = createBaseQueryOwnerOfResponse();
    message.id = object.id ?? "";
    message.handle = object.handle ?? "";
    message.owner = object.owner ?? "";
    return message;
  },
};

function createBaseQueryOwnedByRequest(): QueryOwnedByRequest {
  return { owner: "" };
}

export const QueryOwnedByRequest: MessageFns<QueryOwnedByRequest> = {
  encode(message: QueryOwnedByRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): QueryOwnedByRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOwnedByRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
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

  fromJSON(object: any): QueryOwnedByRequest {
    return { owner: isSet(object.owner) ? globalThis.String(object.owner) : "" };
  },

  toJSON(message: QueryOwnedByRequest): unknown {
    const obj: any = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryOwnedByRequest>, I>>(base?: I): QueryOwnedByRequest {
    return QueryOwnedByRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryOwnedByRequest>, I>>(object: I): QueryOwnedByRequest {
    const message = createBaseQueryOwnedByRequest();
    message.owner = object.owner ?? "";
    return message;
  },
};

function createBaseQueryOwnedByResponse(): QueryOwnedByResponse {
  return { id: 0, handle: "", owner: "" };
}

export const QueryOwnedByResponse: MessageFns<QueryOwnedByResponse> = {
  encode(message: QueryOwnedByResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.handle !== "") {
      writer.uint32(18).string(message.handle);
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): QueryOwnedByResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOwnedByResponse();
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

          message.handle = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.owner = reader.string();
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

  fromJSON(object: any): QueryOwnedByResponse {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      handle: isSet(object.handle) ? globalThis.String(object.handle) : "",
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
    };
  },

  toJSON(message: QueryOwnedByResponse): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.handle !== "") {
      obj.handle = message.handle;
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryOwnedByResponse>, I>>(base?: I): QueryOwnedByResponse {
    return QueryOwnedByResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryOwnedByResponse>, I>>(object: I): QueryOwnedByResponse {
    const message = createBaseQueryOwnedByResponse();
    message.id = object.id ?? 0;
    message.handle = object.handle ?? "";
    message.owner = object.owner ?? "";
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  OwnerOf(request: QueryOwnerOfRequest): Promise<QueryOwnerOfResponse>;
  OwnedBy(request: QueryOwnedByRequest): Promise<QueryOwnedByResponse>;
}

export const QueryServiceName = "socialchain.profiles.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.OwnerOf = this.OwnerOf.bind(this);
    this.OwnedBy = this.OwnedBy.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new BinaryReader(data)));
  }

  OwnerOf(request: QueryOwnerOfRequest): Promise<QueryOwnerOfResponse> {
    const data = QueryOwnerOfRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "OwnerOf", data);
    return promise.then((data) => QueryOwnerOfResponse.decode(new BinaryReader(data)));
  }

  OwnedBy(request: QueryOwnedByRequest): Promise<QueryOwnedByResponse> {
    const data = QueryOwnedByRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "OwnedBy", data);
    return promise.then((data) => QueryOwnedByResponse.decode(new BinaryReader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
