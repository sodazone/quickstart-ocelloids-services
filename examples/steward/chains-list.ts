import { createStewardAgent } from "@sodazone/ocelloids-client";

// Instantiate an Ocelloids Client
const steward = createStewardAgent({
  apiKey: process.env.OC_API_KEY,
});

// Get the chains information
try {
  const { items } = await steward.query(
    {
      op: "chains.list",
    },
    {
      limit: 100,
    },
  );

  console.log("CHAIN DATA:\n", items);
} catch (error) {
  console.error(error);
}
