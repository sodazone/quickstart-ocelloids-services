import { parseArgs } from "node:util";

import { createXcmAgent } from "@sodazone/ocelloids-client";

import { formatXcmMessage } from "./util";

const { positionals } = parseArgs({
  args: Bun.argv,
  allowPositionals: true,
});

const agent = createXcmAgent({
  httpUrl: process.env.OC_HTTP_URL,
  wsUrl: process.env.OC_WS_URL,
  apiKey: process.env.OC_API_KEY,
});

const timeframe = positionals.length > 2 ? positionals[2] : "previous_2_hours";

agent.subscribe(
  {
    destinations: "*",
    origins: "*",
    history: {
      timeframe,
    },
  },
  {
    onMessage: (msg) => {
      console.log(formatXcmMessage(msg));
    },
    onClose: ({ reason }) => {
      console.log(reason);
    },
  },
);
