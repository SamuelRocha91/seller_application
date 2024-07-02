export type orderStream = {
    time: string,
    orders: [
        {
            buyer_id: number,
            created_at: string,
            id: number,
            state: string,
            store_id: number,
            updated_at: string
        }
    ]
}

export type orderColumn = {
    id: number,
    status: string,
    hour: string,
    date: string
}