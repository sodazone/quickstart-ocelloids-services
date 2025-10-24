import { createXcmAgent, xcm } from "@sodazone/ocelloids-client";

/**
 * STEP 1: Create the XCM Agent
 */
const xcmAgent = createXcmAgent({
  httpUrl: process.env.OC_HTTP_URL,
  wsUrl: process.env.OC_WS_URL,
  apiKey: process.env.OC_API_KEY,
});

/* -----------------------------------------------------------
 * USE CASE 1: READ-ONLY (PUBLIC) SUBSCRIPTION
 * -----------------------------------------------------------
 * Anyone with a public (read-only) access token can:
 *  - List all available public subscriptions
 *  - Subscribe to them via WebSocket
 */

const subscriptions = await xcmAgent.allSubscriptions();
console.log("Available public subscriptions:", subscriptions);

// Pick one of the public subscriptions
const subscriptionId = subscriptions[0].id;

// Subscribe via WebSocket and listen to live XCM events
const ws = await xcmAgent.subscribe(subscriptionId, {
  onMessage: (msg) => {
    // In an UI, it could be useful to filter by extrinsic hash
    // if (
    //   msg.payload.origin.extrinsicHash === "0x"
    // ) {
    // Example: filter or react to different XCM message types
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
      console.log(msg.payload.type, msg.payload.waypoint);
    }
  },
  onError: (error) => console.error("WebSocket error:", error),
  onClose: (event) => console.log("WebSocket closed:", event.reason),
});

// Close after 5 minutes
setTimeout(() => {
  console.log("Closing WebSocket and exiting...");
  ws.close();
  process.exit();
}, 300_000);

/* -----------------------------------------------------------
 * USE CASE 2: PERSISTENT (READ + WRITE) SUBSCRIPTION
 * -----------------------------------------------------------
 * Requires an access token with read/write permissions.
 * This allows you to create custom subscriptions that persist
 * and can be reconnected to later.
 *
 * 👉 If your team needs to create persistent subscriptions,
 * please contact us at: projects@soda.zone
 */

// Example of creating your own subscription
/*
const subscriptionId = "my-custom-subscription";

const reply = await xcmAgent.createSubscription({
  id: subscriptionId,
  args: {
    origins: ["urn:ocn:polkadot:2034"],  // Which chain(s) to monitor
    senders: "*",                         // Who is sending
    events: "*",                          // Which events to include
    destinations: [
      "urn:ocn:polkadot:0",
      "urn:ocn:polkadot:1000",
    ],
  },
  channels: [
    {
      // Receive webhook notifications
      type: "webhook",
      url: "https://your.webhook.endpoint",
    },
    {
      // Enable WebSocket access
      type: "websocket",
    },
  ],
});

console.log("Persistent subscription created:", reply);

// Subscribe to your newly created subscription with xcmAgent.subscribe...
*/
