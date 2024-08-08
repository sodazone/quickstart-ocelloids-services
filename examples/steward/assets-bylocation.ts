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
      {
        xcmLocationAnchor: "urn:ocn:polkadot:2034",
        locations: [
          '{"V3":{"parents":"1","interior":{"X1":{"Parachain":"2006"}}}}',
          JSON.stringify({
            V3: {
              parents: "1",
              interior: {
                X2: [
                  {
                    Parachain: "2,000",
                  },
                  {
                    GeneralKey: {
                      data: "0x0003000000000000000000000000000000000000000000000000000000000000",
                      length: 2,
                    },
                  },
                ],
              },
            },
          }),
          JSON.stringify({
            V2: {
              parents: "1",
              interior: {
                X2: [
                  {
                    Parachain: "2,000",
                  },
                  {
                    GeneralKey: "0x0001",
                  },
                ],
              },
            },
          }),
          JSON.stringify({
            V3: {
              parents: "1",
              interior: {
                X2: [
                  {
                    Parachain: "2,094",
                  },
                  {
                    PalletInstance: "10",
                  },
                ],
              },
            },
          }),
          JSON.stringify({
            V3: {
              parents: "1",
              interior: {
                X5: [
                  {
                    Parachain: "2,094",
                  },
                  {
                    PalletInstance: "53",
                  },
                  {
                    GeneralIndex: "2",
                  },
                  {
                    GeneralKey: {
                      length: "4",
                      data: "0x545a530000000000000000000000000000000000000000000000000000000000",
                    },
                  },
                  {
                    GeneralKey: {
                      length: "32",
                      data: "0x34c94b2a4ba9e8b57b22547dcbb30f443c4cb02da3829a89aa1bd4780e4466ba",
                    },
                  },
                ],
              },
            },
          }),
        ],
      },
      {
        xcmLocationAnchor: "urn:ocn:polkadot:2004",
        locations: [
          '{"V3":{"interior":{"X1":{"Parachain":2104}},"parents":1}}',
        ],
      },
      {
        xcmLocationAnchor: "urn:ocn:polkadot:2000",
        locations: [
          JSON.stringify({
            V3: {
              parents: "1",
              interior: {
                Here: null,
              },
            },
          }),
        ],
      },
      {
        xcmLocationAnchor: "urn:ocn:polkadot:1000",
        locations: [
          '{"V3": {"parents":1,"interior":{"x1":{"parachain":2004}}}}',
          '{"V3":{"parents":"0","interior":{"X2":[{"PalletInstance":"50"},{"GeneralIndex":"1984"}]}}}',
          '{"V3":{"parents":"0","interior":{"X2":[{"PalletInstance":"50"},{"GeneralIndex":"1337"}]}}}',
        ],
      },
      {
        xcmLocationAnchor: "urn:ocn:polkadot:2006",
        locations: ['{"V3":{"interior":{"Here":null},"parents":0}}'],
      },
      {
        xcmLocationAnchor: "urn:ocn:polkadot:2032",
        locations: [
          JSON.stringify({
            V3: {
              interior: {
                X1: {
                  GeneralKey: {
                    data: "0x0001000000000000000000000000000000000000000000000000000000000000",
                    length: 2,
                  },
                },
              },
              parents: 0,
            },
          }),
        ],
      },
      {
        xcmLocationAnchor: "urn:ocn:polkadot:2030",
        locations: [
          JSON.stringify({
            V3: {
              interior: {
                X1: {
                  GeneralKey: {
                    data: "0x0001000000000000000000000000000000000000000000000000000000000000",
                    length: 2,
                  },
                },
              },
              parents: 0,
            },
          }),
        ],
      },
    ],
  });

  console.log("ASSETS\n", items);
} catch (error) {
  console.error(error);
}
