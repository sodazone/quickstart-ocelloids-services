import {
  OcelloidsClient,
  type steward as types,
} from "@sodazone/ocelloids-client";

// Instantiate an Ocelloids Client
const steward = new OcelloidsClient({
  apiKey: process.env.OC_API_KEY,
}).agent("steward");

// Get the assets metadata from multiple networks
try {
  const { items } = await steward.query<
    types.StewardQueryArgs,
    types.AssetMetadata
  >({
    op: "assets.by_location",
    criteria: [
      // Assets accessed from Asset Hub
      {
        xcmLocationAnchor: "urn:ocn:polkadot:1000",
        locations: [
          '{"parents":0,"interior":{"type":"X2","value":[{"type":"PalletInstance","value":50},{"type":"GeneralIndex","value":"1984"}]}}',
        ],
      },
      // Assets accessed from Hydration
      {
        xcmLocationAnchor: "urn:ocn:polkadot:2034",
        locations: [
          '{"parents":1,"interior":{"type":"X3","value":[{"type":"Parachain","value":1000},{"type":"PalletInstance","value":50},{"type":"GeneralIndex","value":"1337"}]}}',
          '{"parents":1,"interior":{"type":"X2","value":[{"type":"Parachain","value":2004},{"type":"PalletInstance","value":10}]}}',
        ],
      },
    ],
  });

  console.log("ASSETS\n", items);
} catch (error) {
  console.error(error);
}
