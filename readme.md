# socialchain

**socialchain** is an open source project I'm using to learn Cosmos SDk and Go.

The purpose is to build an L1 blockchain with the features of a social network, like:
- post
- like

It's built using Cosmos SDK and Tendermint, and created with Ignite.

## Prerequisites

- `go: 1.24.3`

## Get started

Run `ignite chain serve` to installs dependencies, builds, initializes, and starts your blockchain locally.

If everything went correctly, you should see something like this:

```
Blockchain is running

👤 alice's account address: cosmos1etlhrzcyx3ac5hk2pzmd47l6m42vlm8uxdjxna
👤 bob's account address: cosmos1dshpd7s2750u4szsu4lm2ey6mzxhn2n7yzl86t

🌍 Tendermint node: http://0.0.0.0:26657
🌍 Blockchain API: http://0.0.0.0:1317
🌍 Token faucet: http://0.0.0.0:4500

⋆ Data directory: <home directory>/.socialchain
⋆ App binary: <home directory>/go/bin/socialchaind
```

`App binary` is the executable and will be referenced with `<app_binary>` in this readme.


## Development

1) Project scaffolded (run `ignite scaffold chain socialchain`)
2) Added ability to Post contents and retrieve the number of Posts, [Issue #1](https://github.com/inmarelibero/social-chain/issues/1)

## Commands

**1) List all public keys stored locally**

    <app_binary> keys list

You should see all available accounts ready to be used in development, eg:

```
- address: cosmos1etlhrzcyx3ac5hk2pzmd47l6m42vlm8uxdjxna
  name: alice
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"Au0oHuVn1+stWAhw2ZLbL6iPzBpcvAmOfFd+61Zou2Rk"}'
  type: local
```

**2) Create a Post**

Run

    <app_binary> tx posts create-post "Hello, world\!" --from cosmos1etlhrzcyx3ac5hk2pzmd47l6m42vlm8uxdjxna --yes
    
to create a Post (use proper `--from` with `<app_binary> keys list`)

**3) Retrieve the Posts count**

Run

    <app_binary> query posts post-count

**4) Retrieve the latest Posts**

Run

    <app_binary> query posts latest-posts --limit 2

It should return something like:

    posts:
    - body: Hello, world!
      creator: cosmos1jfamrgr3glzjx2dfqu388xkjuqdp6552ytvprx
      id: "2"
      timestamp: "2025-05-13T14:23:14Z"
    - body: Hello, world!
      creator: cosmos1jfamrgr3glzjx2dfqu388xkjuqdp6552ytvprx
      id: "1"
      timestamp: "2025-05-13T14:23:12Z"

