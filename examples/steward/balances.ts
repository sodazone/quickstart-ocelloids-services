import { createStewardAgent } from "@sodazone/ocelloids-client";
import "../../polyfills/sse";

const agent = createStewardAgent({
  httpUrl: process.env.OC_HTTP_URL,
  wsUrl: process.env.OC_WS_URL,
  apiKey: process.env.OC_API_KEY,
});

agent.stream(
  {
    streamName: "balances",
    args: {
      account: "15YCjbYkV9ETfGQy19JNp6fqURYnW9aJbGo33qUxmAr6FopV",
    },
  },
  {
    listeners: [
      {
        event: "balance",
        onData: (data) => console.log("balance:", data),
      },
      {
        event: "status",
        onData: (data) => console.log("status:", data),
      },
      {
        event: "synced",
        onData: (data) => console.log("synced:", data),
      },
    ],
    onError: console.error,
  },
);
