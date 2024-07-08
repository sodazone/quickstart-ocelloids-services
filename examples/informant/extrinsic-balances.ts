import { OcelloidsClient } from "@sodazone/ocelloids-client";

const informant = new OcelloidsClient({
  apiKey: process.env.OC_API_KEY,
}).agent("informant");

informant.subscribe(
  {
    networks: ["urn:ocn:polkadot:0", "urn:ocn:polkadot:1000"],
    filter: {
      type: "extrinsic",
      match: {
        'extrinsic.call.section': 'balances',
        'extrinsic.call.method': { $in: [
          'transferAllowDeath',
          'transferKeepAlive'
        ]},
        'extrinsic.call.args.value': { 
          $bn_gte: "15000000" 
        },
        'extrinsic.tip': {
          $bn_lte: "1000"
        }
      },
    },
  },
  // Stream handlers
  {
    onMessage: (msg) => console.log(msg.metadata, msg.payload),
    onAuthError: console.error,
    onError: console.error,
    onClose: (error) => console.error(error.reason),
  },
  // On-demand handlers
  {
    onSubscriptionError: console.error,
    onSubscriptionCreated: console.log,
    onError: console.error,
  },
);
