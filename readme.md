SocialChain
===========

**socialchain** is an open source project I'm using to learn Cosmos SDK and Go.

The purpose is to build an L1 blockchain with the features of a social network:
- profiles
- posts
- likes

Tech stack: Cosmos SDK Tendermint, Ignite, Vue3, Vite, Vuetify.

# Prerequisites

- `go: 1.24.3`

# Development roadmap

1) Project scaffolded (with `ignite scaffold chain socialchain`)
2) Added ability to Post contents and retrieve the number of Posts
3) Implemented Profiles, and now Posts are tied to Profiles and not to accounts directly
4) Implemented a simple frontend to show latest Posts
5) Added the possibility to create a Profile from frontend

# Get started

Be sure to check the [Prerequisites](#Prerequisites) section before continuing.

## 1) run local blockchain node

There are some useful bash scripts involved when running a local node:
    - `bin/build.sh` compiles the source code of the project into a binary and installs the binary into `bin/socialchaind`, necessary to execute once before the other scripts
    - `bin/bootstrap.sh` starts a node from scratch, erasing previous blockchain state and starting from genesis
    - `bin/start.sh` starts a node by resuming the previous blockchain state
    - `bin/load_fixtures.sh` load fixtures (eg some Posts), to be run only once after `bin/bootstrap.sh`

Note: the folder `[project]/.data` is used as temporary folder to store the blockchain data.

If it's the first time that you bootstrap the blockchain, run:
    - `bin/build.sh && bin/bootstrap.sh`
    - `bin/load_fixtures.sh` (in a separate terminal and wait some seconds after bootstrapping)

While if you want to resume the blockchain from the previous state, just run `bin/start.sh`


## 2) run local frontend

Start the local webserver serving the frontend, by running:
- `cd web/`
- `pnpm run dev`

### Prerequisites

#### a) Install frontend dependencies

Install frontend dependencies with:
- `cd web/`
- `pnpm i`

#### b) Setup https for local frontend

Connecting with Keplr requires a working https website.

Follow these steps to setup a local https dev server:
- `mkcert -install` this will install `localhost` certificates

# Utilities

## How to generate js classes from proto messages

Run `buf generate --template proto/buf.gen.ts.yaml --output web/src/generated-proto` to generate js classes from proto messages.

## Useful commands

**1) List all public keys stored locally**

    bin/socialchaind keys list

You should see all available accounts ready to be used in development, eg:

```
- address: cosmos1etlhrzcyx3ac5hk2pzmd47l6m42vlm8uxdjxna
  name: alice
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"Au0oHuVn1+stWAhw2ZLbL6iPzBpcvAmOfFd+61Zou2Rk"}'
  type: local
```

**2) Create a Profile**


Run

    bin/socialchaind tx profiles create-profile "inmarelibero" --from cosmos1etlhrzcyx3ac5hk2pzmd47l6m42vlm8uxdjxna --yes

to create a Profile, necessary in order to Post

**3) Verify the owner of a handle**

Run

    bin/socialchaind query profiles owner-of --handle  "inmarelibero"

to get the info about the owner of the handle `inmarelibero`:

    handle: inmarelibero
    id: "1"
    owner: cosmos1etlhrzcyx3ac5hk2pzmd47l6m42vlm8uxdjxna

**4) Get the Profile owned by an account**

Run

    bin/socialchaind query profiles owned-by --owner "cosmos1etlhrzcyx3ac5hk2pzmd47l6m42vlm8uxdjxna"

to get the Profile (if any) owned by a given account:

    handle: inmarelibero
    id: "1"
    owner: cosmos1etlhrzcyx3ac5hk2pzmd47l6m42vlm8uxdjxna
    
**5) Create a Post**

The `--from` account must have alreay created a Profile, otherwise creating a Post will fail because there's not a Profile attached to the sender.

Run

    bin/socialchaind tx posts create-post "Hello, world\!" --from cosmos1etlhrzcyx3ac5hk2pzmd47l6m42vlm8uxdjxna --yes
    
to create a Post (use proper `--from` with `bin/socialchaind keys list`)

**6) Retrieve the Posts count**

Run

    bin/socialchaind query posts post-count

**7) Retrieve the latest Posts**

Run

    bin/socialchaind query posts latest-posts --limit 2

It should return something like:

    posts:
    - body: Hello, world!
      creator: cosmos1etlhrzcyx3ac5hk2pzmd47l6m42vlm8uxdjxna
      id: "2"
      timestamp: "2025-05-13T14:23:14Z"
    - body: Hello, world!
      creator: cosmos1etlhrzcyx3ac5hk2pzmd47l6m42vlm8uxdjxna
      id: "1"
      timestamp: "2025-05-13T14:23:12Z"
