// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               unknown
// source: socialchain/posts/post.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "socialchain.posts";

export interface Post {
  id: number;
  profileId: number;
  timestamp: string;
  body: string;
}

/**  */
export interface PostInQuery {
  id: number;
  profile: ProfileForPostInQuery | undefined;
  timestamp: string;
  body: string;
}

export interface ProfileForPostInQuery {
  id: number;
  handle: string;
}

function createBasePost(): Post {
  return { id: 0, profileId: 0, timestamp: "", body: "" };
}

export const Post: MessageFns<Post> = {
  encode(message: Post, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.profileId !== 0) {
      writer.uint32(16).uint64(message.profileId);
    }
    if (message.timestamp !== "") {
      writer.uint32(26).string(message.timestamp);
    }
    if (message.body !== "") {
      writer.uint32(34).string(message.body);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Post {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePost();
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
          if (tag !== 16) {
            break;
          }

          message.profileId = longToNumber(reader.uint64());
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.timestamp = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.body = reader.string();
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

  fromJSON(object: any): Post {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      profileId: isSet(object.profileId) ? globalThis.Number(object.profileId) : 0,
      timestamp: isSet(object.timestamp) ? globalThis.String(object.timestamp) : "",
      body: isSet(object.body) ? globalThis.String(object.body) : "",
    };
  },

  toJSON(message: Post): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.profileId !== 0) {
      obj.profileId = Math.round(message.profileId);
    }
    if (message.timestamp !== "") {
      obj.timestamp = message.timestamp;
    }
    if (message.body !== "") {
      obj.body = message.body;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Post>, I>>(base?: I): Post {
    return Post.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Post>, I>>(object: I): Post {
    const message = createBasePost();
    message.id = object.id ?? 0;
    message.profileId = object.profileId ?? 0;
    message.timestamp = object.timestamp ?? "";
    message.body = object.body ?? "";
    return message;
  },
};

function createBasePostInQuery(): PostInQuery {
  return { id: 0, profile: undefined, timestamp: "", body: "" };
}

export const PostInQuery: MessageFns<PostInQuery> = {
  encode(message: PostInQuery, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.profile !== undefined) {
      ProfileForPostInQuery.encode(message.profile, writer.uint32(18).fork()).join();
    }
    if (message.timestamp !== "") {
      writer.uint32(26).string(message.timestamp);
    }
    if (message.body !== "") {
      writer.uint32(34).string(message.body);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): PostInQuery {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePostInQuery();
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

          message.profile = ProfileForPostInQuery.decode(reader, reader.uint32());
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.timestamp = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.body = reader.string();
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

  fromJSON(object: any): PostInQuery {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      profile: isSet(object.profile) ? ProfileForPostInQuery.fromJSON(object.profile) : undefined,
      timestamp: isSet(object.timestamp) ? globalThis.String(object.timestamp) : "",
      body: isSet(object.body) ? globalThis.String(object.body) : "",
    };
  },

  toJSON(message: PostInQuery): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.profile !== undefined) {
      obj.profile = ProfileForPostInQuery.toJSON(message.profile);
    }
    if (message.timestamp !== "") {
      obj.timestamp = message.timestamp;
    }
    if (message.body !== "") {
      obj.body = message.body;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PostInQuery>, I>>(base?: I): PostInQuery {
    return PostInQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PostInQuery>, I>>(object: I): PostInQuery {
    const message = createBasePostInQuery();
    message.id = object.id ?? 0;
    message.profile = (object.profile !== undefined && object.profile !== null)
      ? ProfileForPostInQuery.fromPartial(object.profile)
      : undefined;
    message.timestamp = object.timestamp ?? "";
    message.body = object.body ?? "";
    return message;
  },
};

function createBaseProfileForPostInQuery(): ProfileForPostInQuery {
  return { id: 0, handle: "" };
}

export const ProfileForPostInQuery: MessageFns<ProfileForPostInQuery> = {
  encode(message: ProfileForPostInQuery, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.handle !== "") {
      writer.uint32(18).string(message.handle);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ProfileForPostInQuery {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProfileForPostInQuery();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProfileForPostInQuery {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      handle: isSet(object.handle) ? globalThis.String(object.handle) : "",
    };
  },

  toJSON(message: ProfileForPostInQuery): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.handle !== "") {
      obj.handle = message.handle;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProfileForPostInQuery>, I>>(base?: I): ProfileForPostInQuery {
    return ProfileForPostInQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProfileForPostInQuery>, I>>(object: I): ProfileForPostInQuery {
    const message = createBaseProfileForPostInQuery();
    message.id = object.id ?? 0;
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
