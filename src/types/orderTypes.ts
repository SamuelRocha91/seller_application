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

export type orderHistory = {
    result: {
        orders: [{
            created_at: string,
            id: number,
            state: string,
            total_value: string,
        }],
        pagination: {
            current: number,
            count: number,
            next: number,
            pages: number,
            previous: number,
            per_page: number
        }
    }
}

export type orderById = {
    id: number,
    status: string,
    total: string,
    items: [{
        amount: number,
        price: string,
        product: string
    }]
}