export type analysis = {
    result: number
}

export type monthly_analysis = {
    result: {
        Sunday?: number,
        Monday?: number,
        Tuesday?: number,
        Wednesday?: number,
        Thursday?: number,
        Friday?: number,
        Saturday?: number
    }
}