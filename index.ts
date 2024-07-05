import { OcelloidsClient } from "@sodazone/ocelloids-client";

const client = new OcelloidsClient({
  apiKey: process.env.OC_API_KEY,
});

try {
  console.log(await client.health());
} catch (error) {
  console.error(error);
}
