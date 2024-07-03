import {
  OcelloidsClient,
  type steward as types,
} from "@sodazone/ocelloids-client";

// Instantiate an Ocelloids Client
const steward = new OcelloidsClient({
  httpUrl: "http://127.0.0.1:3000",
  //apiKey: process.env.OC_API_KEY,
}).agent("steward");

// List the assets metadata of a network
try {
  const { items, pageInfo } = await steward.query<
    types.StewardQueryArgs,
    types.AssetMetadata
  >(
    {
      op: "assets.metadata.list",
      criteria: {
        network: "urn:ocn:polkadot:1000",
      },
    },
    { limit: 15 },
  );

  console.log(`ASSETS LIST (${JSON.stringify(pageInfo)})\n`, items);
} catch (error) {
  console.error(error);
}
