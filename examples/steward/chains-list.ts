import {
  OcelloidsClient,
  type steward as types,
} from "@sodazone/ocelloids-client";

// Instantiate an Ocelloids Client
const steward = new OcelloidsClient({
  apiKey: process.env.OC_API_KEY,
}).agent("steward");

// Get the chains information
try {
  const { items } = await steward.query<
    types.StewardQueryArgs,
    types.AssetMetadata
  >({
    
    op: "chains.list"
  }, {
    limit: 100
  });

  console.log("CHAIN DATA:\n", items);
} catch (error) {
  console.error(error);
}
