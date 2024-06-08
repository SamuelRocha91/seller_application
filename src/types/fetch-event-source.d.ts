declare module '@microsoft/fetch-event-source' {
    export function fetchEventSource(
        url: string,
        options: {
            method?: string;
            headers?: Record<string, string>;
            onopen?: (response: Response) => void;
            onmessage?: (event: { data: string }) => void;
            onerror?: (error: any) => void;
        }
    ): void;
}
