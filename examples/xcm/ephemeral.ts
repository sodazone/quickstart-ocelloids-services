import { type Message, createXcmAgent, xcm } from "@sodazone/ocelloids-client";

function handleMessage(msg: Message<xcm.XcmMessagePayload>) {
  // In an UI, it could be useful to filter by extrinsic hash
  // if (
  //   msg.payload.origin.extrinsicHash === "0x"
  // ) {
  // handle cases for each step of the XCM journey
  if (xcm.isXcmSent(msg)) {
    console.log("SENT", msg.payload.waypoint);
  } else if (xcm.isXcmRelayed(msg)) {
    console.log("RELAYED", msg.payload.waypoint);
  } else if (xcm.isXcmHop(msg)) {
    console.log("HOP", msg.payload.direction, msg.payload.waypoint);
  } else if (xcm.isXcmReceived(msg)) {
    console.log("RECEIVED", msg.payload.waypoint);
  } else if (xcm.isXcmTimeout(msg)) {
    console.log(
      "TIMEOUT",
      msg.payload.origin.chainId,
      msg.payload.destination.chainId,
    );
  } else {
    throw new Error("XCM payload type not supported");
  }
  // }
}

const agent = createXcmAgent({
  httpUrl: process.env.OC_HTTP_URL ?? undefined,
  wsUrl: process.env.OC_WS_URL ?? undefined,
  apiKey: process.env.OC_API_KEY,
});

// Check health
console.log(await agent.health())

// Subscribe on-demand
const ws = await agent.subscribe(
  {
    origins: "*",
    destinations: "*",
    senders: "*",
    events: "*",
  },
  // Stream handlers
  {
    onMessage: handleMessage,
    onAuthError: console.error,
    onError: console.error,
    onClose: (error) => console.error(error.reason),
  },
  // On-demand subscription handlers (optional)
  {
    onSubscriptionError: console.error,
    onSubscriptionCreated: console.log,
    onError: console.error,
  },
);

// Close and exit after 5 minutes
// Subscription will be automatically removed
setTimeout(() => {
  console.log("Closing websocket and exiting...");
  ws.close();
  process.exit();
}, 300_000);
