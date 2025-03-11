import { createStewardAgent } from "@sodazone/ocelloids-client";

// Instantiate an Ocelloids Client
const steward = createStewardAgent({
  apiKey: process.env.OC_API_KEY,
});

// List the assets metadata of a network
try {
  const { items, pageInfo } = await steward.query(
    {
      op: "assets.list",
      criteria: {
        network: "urn:ocn:polkadot:2034",
      },
    },
    { limit: 20 },
  );

  console.log(`ASSETS LIST (${JSON.stringify(pageInfo)})\n`, items);
} catch (error) {
  console.error(error);
}
