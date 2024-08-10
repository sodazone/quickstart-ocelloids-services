import {
  OcelloidsClient,
  type steward as types,
} from "@sodazone/ocelloids-client";

// Instantiate an Ocelloids Client
const steward = new OcelloidsClient({
  apiKey: process.env.OC_API_KEY,
}).agent("steward");

// Get the chains information for multiple networks
try {
  const { items } = await steward.query<
    types.StewardQueryArgs,
    types.AssetMetadata
  >({
    op: "chains",
    criteria: {
      networks: [
        "urn:ocn:polkadot:0",
        "urn:ocn:polkadot:1000",
        "urn:ocn:polkadot:1002",
        "urn:ocn:polkadot:2004",
        "urn:ocn:polkadot:2030",
        "urn:ocn:polkadot:2034",
      ],
    },
  });

  console.log("CHAIN DATA:\n", items);
} catch (error) {
  console.error(error);
}
