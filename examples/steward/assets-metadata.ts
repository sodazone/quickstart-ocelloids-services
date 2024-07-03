import {
  OcelloidsClient,
  type steward as types,
} from "@sodazone/ocelloids-client";

// Instantiate an Ocelloids Client
const steward = new OcelloidsClient({
  httpUrl: "http://127.0.0.1:3000",
  //apiKey: process.env.OC_API_KEY,
}).agent("steward");

// Get the assets metadata from multiple networks
try {
  const { items } = await steward.query<
    types.StewardQueryArgs,
    types.AssetMetadata
  >({
    op: "assets.metadata",
    criteria: [
      {
        network: "urn:ocn:polkadot:1000",
        assets: ["1984", '{"parents":1,"interior":{"x1":{"parachain":2011}}}'],
      },
      {
        network: "urn:ocn:polkadot:2034",
        assets: ["15", "10", "25"],
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
        assets: ['{"token2":10}', '{"vToken2":0}'],
      },
    ],
  });

  console.log("ASSETS METADATA\n", items);
} catch (error) {
  console.error(error);
}
