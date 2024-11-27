import { OcelloidsClient } from "@sodazone/ocelloids-client";

import erc20Abi from "../../abis/erc20.json";

const informant = new OcelloidsClient({
  apiKey: process.env.OC_API_KEY,
}).agent("informant");

// Subscribe to ERC20 transfers on Moonbeam
informant.subscribe(
  {
    networks: ["urn:ocn:polkadot:2004"],
    filter: {
      type: "extrinsic",
      match: {
        to: { $in: [
          "0xacc15dc74880c9944775448304b263d191c6077f",// WGLMR
          "0x511ab53f793683763e5a8829738301368a2411e3", // WELL
          "0xb536c1f9a157b263b70a9a35705168acc0271742", // Stella LP
          "0xffffffff1fcacbd218edc0eba20fc2308c778080", // DOT
        ]},
        'decoded.functionName':'transfer'
      },
      evm: [
        {
          abi: erc20Abi,
          addresses: [
            "0xacc15dc74880c9944775448304b263d191c6077f",
            "0x511ab53f793683763e5a8829738301368a2411e3",
            "0xb536c1f9a157b263b70a9a35705168acc0271742",
            "0xffffffff1fcacbd218edc0eba20fc2308c778080",
          ],
        }
      ],
    },
  },
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