import type { Message, NetworkURN, xcm } from "@sodazone/ocelloids-client";

const T: Record<xcm.XcmNotificationType, string> = {
  "xcm.sent": "📨",
  "xcm.received": "✅",
  "xcm.bridge": "🧊",
  "xcm.hop": "🦘",
  "xcm.relayed": "🏃",
  "xcm.timeout": "🕔",
};

const C: Record<NetworkURN, string> = {
  "urn:ocn:polkadot:0": "Polkadot",
  "urn:ocn:polkadot:2034": "HydraDX",
  "urn:ocn:polkadot:2030": "Bifrost",
  "urn:ocn:polkadot:2004": "Moonbeam",
  "urn:ocn:polkadot:2006": "Astar",
  "urn:ocn:polkadot:1000": "Asset Hub (P)",
};

const nn = (n: NetworkURN) => C[n] ?? n.substring(8);
const df = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "short",
  timeStyle: "short",
});
const ss = (h = "0x00000000", n = 4) =>
  `${h.substring(0, 2 + n)}.${h.substring(h.length - n)}`;

export const formatXcmMessage = ({
  metadata: { blockTimestamp, timestamp },
  payload: { type, messageId, origin, destination, waypoint },
}: Message<xcm.XcmMessagePayload>) =>
  `${T[type]} [${df.format(new Date(blockTimestamp ?? timestamp))}] ` +
  `(${ss(messageId)}) ${nn(origin.chainId)} -> ${nn(destination.chainId)}\t#${waypoint.blockNumber}`;
