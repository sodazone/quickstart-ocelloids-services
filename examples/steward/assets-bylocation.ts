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
    op: "assets.metadata.by_location",
    criteria: [
      {
        network: "urn:ocn:polkadot:2030",
        locations: [
          '{"interior":{"X1":{"GeneralKey":{"data":"0x0900000000000000000000000000000000000000000000000000000000000000","length":2}}},"parents":0}',
        ],
      },
      {
        network: "urn:ocn:polkadot:2004",
        locations: ['{"interior":{"X1":{"Parachain":2104}},"parents":1}'],
      },
      {
        network: "urn:ocn:polkadot:1000",
        locations: [
          '{"parents":1,"interior":{"x1":{"parachain":2004}}}',
          '{"interior":{"X3":[{"Parachain":1000},{"PalletInstance":50},{"GeneralIndex":"17"}]},"parents":1}',
          '{"interior":{"X3":[{"Parachain":1000},{"PalletInstance":50},{"GeneralIndex":"1984"}]},"parents":1}',
        ],
      },
    ],
  });

  console.log("ASSETS METADATA\n", items);
} catch (error) {
  console.error(error);
}
