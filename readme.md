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

👤 alice's account address: cosmos1hqlxz7a9t4l8ym7pwer6xy0k6lh6zf24pngng9
👤 bob's account address: cosmos1dshpd7s2750u4szsu4lm2ey6mzxhn2n7yzl86t

🌍 Tendermint node: http://0.0.0.0:26657
🌍 Blockchain API: http://0.0.0.0:1317
🌍 Token faucet: http://0.0.0.0:4500

⋆ Data directory: <home directory>/.socialchain
⋆ App binary: <home directory>/go/bin/socialchaind
```

`App binary` is the executable and will be referenced with `<app_binary>` in this readme.

## Commands

**1) List all public keys stored locally:**

    <app_binary> keys list

You should see all available accounts ready to be used in development, eg:

```
- address: cosmos1z9ekam8cy886vcyurye46g03d3vxnvg0at6j0y
  name: alice
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"ApBBMScmNMt0sZU9EFUJ8d0uow7NYfnm7T4+BQpi1F2B"}'
  type: local
```


**2) Create a Post:**

Run

    <app_binary> tx posts create-post "Hello, world\!" --from cosmos19pcpvref07zshgvh0tv6e7mctzq90mnk8g9ltn --yes
    
to create a Post (use proper `--from` with `<app_binary> keys list`)

