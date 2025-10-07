import {
  createCrosschainAgent,
  crosschainQueryApi,
} from "@sodazone/ocelloids-client";

const agent = createCrosschainAgent({
  httpUrl: process.env.OC_HTTP_URL,
  wsUrl: process.env.OC_WS_URL,
  apiKey: process.env.OC_API_KEY,
});

const api = crosschainQueryApi(agent);
const journeys = await api.journeysList();
console.log(
  journeys.map(
    (j) =>
      `${j.origin} - ${j.destination} (${j.assets.map((a) => `${Number(a.amount) / 10 ** (a.decimals ?? 0)} ${a.symbol ?? a.asset}`)})`,
  ),
);
