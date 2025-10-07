import { EventSource as EventSourcePolyfill } from "eventsource";

/**
 * Polyfill EventSource in globalThis safely for TypeScript
 */
if (!("EventSource" in globalThis)) {
  class SafeEventSource extends EventSourcePolyfill {
    constructor(url?: string | URL, init?: EventSourceInit) {
      if (!url) {
        throw new Error(
          "EventSource requires a URL. This is a TypeScript-safe polyfill.",
        );
      }
      super(url, init);
    }
  }

  (
    globalThis as typeof globalThis & {
      EventSource: typeof SafeEventSource;
    }
  ).EventSource = SafeEventSource;
}
