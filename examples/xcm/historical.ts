import { createXcmAgent } from "@sodazone/ocelloids-client";

import { formatXcmMessage } from "./util";

const agent = createXcmAgent({
  httpUrl: process.env.OC_HTTP_URL,
  wsUrl: process.env.OC_WS_URL,
  apiKey: process.env.OC_API_KEY,
});

agent.subscribe(
  // TODO: types not yet released
  {
    destinations: "*",
    origins: "*",
    history: {
      timeframe: "previous_2_hours",
    },
  } as unknown as any,
  {
    onMessage: (msg) => {
      console.log(formatXcmMessage(msg));
    },
  },
);
