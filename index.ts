import { OcelloidsClient } from "@sodazone/ocelloids-client";

const client = new OcelloidsClient({
  apiKey: process.env.OC_API_KEY,
});

client.health().then(console.log).catch(console.error);
