import { createXcmAgent, xcm } from "@sodazone/ocelloids-client";

// Create an Xcm Monitor agent
const xcmAgent = createXcmAgent({
  httpUrl: process.env.OC_HTTP_URL,
  wsUrl: process.env.OC_WS_URL,
  apiKey: process.env.OC_API_KEY,
});

// The subscription unique identifier
const subscriptionId = "my-subscription-id";

// Create a subscription with support for WebSockets and webhooks
const reply = await xcmAgent.createSubscription({
  id: subscriptionId,
  args: {
    origins: ["urn:ocn:polkadot:2034"],
    senders: "*",
    events: "*",
    destinations: ["urn:ocn:polkadot:0", "urn:ocn:polkadot:1000"],
  },
  channels: [
    {
      // Enables webhook notifications
      type: "webhook",
      url: "https://some.webhook",
    },
    {
      // Enables WebSocket access
      type: "websocket",
    },
  ],
});

// Subscribe by WebSocket and stream messages
const ws = await xcmAgent.subscribe(
  subscriptionId, // id of subscription
  {
    onMessage: (msg) => {
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
    },
    // handle WebSocket errors
    onError: (error) => console.log(error),
    // handle WebSocket close
    onClose: (event) => console.log(event.reason),
  },
);

// Close and exit after 5 minutes
// Subscription will remain active and you can subscribe to it again later with the subscription id.
setTimeout(() => {
  console.log("Closing websocket and exiting...");
  ws.close();
  process.exit();
}, 300_000);
