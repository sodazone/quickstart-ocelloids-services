import { createStewardAgent } from "@sodazone/ocelloids-client";

// Instantiate an Ocelloids Client
const steward = createStewardAgent({
  apiKey: process.env.OC_API_KEY,
});

// Get the assets metadata from multiple networks
try {
  const { items } = await steward.query({
    op: "assets",
    criteria: [
      {
        network: "urn:ocn:polkadot:1000",
        assets: [
          "1984",
          "1337",
          "parents:2:interior:X1:GlobalConsensus:Kusama",
        ],
      },
      {
        network: "urn:ocn:polkadot:2004",
        assets: [
          "78407957940239408223554844611219482002",
          "133307414193833606001516599592873928539",
        ],
      },
      {
        network: "urn:ocn:polkadot:2030",
        assets: ["token2:10", "vtoken2:0"],
      },
    ],
  });

  console.log("ASSETS METADATA\n", items);
} catch (error) {
  console.error(error);
}
