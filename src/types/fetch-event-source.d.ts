import type { msg } from "./msgType";

declare module '@microsoft/fetch-event-source' {
    export function fetchEventSource(
        url: string,
        options: {
            method?: string;
            headers?: Record<string, string>;
            onopen?: (response: Response) => void;
            onmessage?: (event: msg) => void;
            onerror?: (error: any) => void;
        }
    ): void;
}
