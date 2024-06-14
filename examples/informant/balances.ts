import { OcelloidsClient } from "@sodazone/ocelloids-client";

// Instantiate an Ocelloids Client
const informant = new OcelloidsClient({
  wsUrl: "ws://127.0.0.1:3000",
  //apiKey: process.env.OC_API_KEY,
}).agent("informant");

// Subscribe to Events
// This subscription configuration allows you to track specific events on the specified networks
informant.subscribe(
  {
    // Define the networks to subscribe to using their URNs
    // in this case: Polkadot and AssetHub
    networks: ["urn:ocn:polkadot:0", "urn:ocn:polkadot:1000"],

    // Set the filter criteria for the events
    filter: {
      type: "event",
      match: {
        section: "balances",
        $or: [{ method: "Deposit" }, { method: "Transfer" }],
        "data.amount": {
          $bn_gte: 200, // Filter for bignumber amounts greater than or equal to 200
        },
      },
    },
  },

  // Stream Handlers
  // These handlers define how to handle the data stream
  {
    onMessage: (msg) => console.log(msg.metadata, msg.payload), // Handle incoming messages
    onAuthError: console.error, // Handle authentication errors
    onError: console.error, // Handle general errors
    onClose: (error) => console.error(error.reason), // Handle WebSocket close
  },

  // On-Demand Handlers
  // These handlers manage the subscription lifecycle
  {
    onSubscriptionError: console.error, // Handle errors during subscription creation
    onSubscriptionCreated: console.log, // Handle successful subscription creation
    onError: console.error, // Handle other errors
  },
);
