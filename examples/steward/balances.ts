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
      account: ["131d4YS25qpuXiHrfJibuFYXwZrzwxpvU1ahvr3TJFNYcmfk"],
    },
  },
  {
    listeners: [
      {
        event: "balance",
        onData: (data) =>
          console.log(
            `balance ${data.origin}: ${(Number(data.balance) / 10 ** (data.decimals ?? 0)).toFixed(4)} ${data.symbol ?? data.assetId} (${data.chainId})`,
          ),
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
