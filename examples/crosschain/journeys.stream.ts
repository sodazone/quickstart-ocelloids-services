import { createCrosschainAgent } from "@sodazone/ocelloids-client";
import "../../polyfills/sse";

const agent = createCrosschainAgent({
  httpUrl: process.env.OC_HTTP_URL,
  wsUrl: process.env.OC_WS_URL,
  apiKey: process.env.OC_API_KEY,
});

const stream = await agent.stream(
  {
    streamName: "default",
    args: {
      actions: ["teleport", "transfer", "transact", "swap", "queryResponse"],
    },
  },
  {
    listeners: [
      {
        event: "new_journey",
        onData: async (event) => {
          console.log("New journey event received:", event);
        },
      },
      {
        event: "update_journey",
        onData: async (event) => {
          console.log("Update journey event received:", event);
        },
      },
    ],
    onError: async (error) => {
      console.error("Error occurred:", error);
    },
    onOpen: async () => {
      console.log("Stream opened");
    },
  },
);

setTimeout(() => {
  console.log("Closing stream...");
  stream.close();
}, 60 * 60_000);
