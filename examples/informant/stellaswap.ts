import { createInformantAgent } from "@sodazone/ocelloids-client";

import stellaSwapAbi from "../../abis/stellaswap.json";

const informant = createInformantAgent({
  apiKey: process.env.OC_API_KEY,
});

// Subscribe to StellaSwap swapExactTokensForETH calls
informant.subscribe(
  {
    networks: ["urn:ocn:polkadot:2004"],
    filter: {
      type: "extrinsic",
      match: {
        to: "0x70085a09d30d6f8c4ecf6ee10120d1847383bb57",
        "decoded.functionName": "swapExactTokensForETH",
      },
      evm: [
        {
          abi: stellaSwapAbi,
          addresses: ["0x70085a09d30d6f8c4ecf6ee10120d1847383bb57"],
        },
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
