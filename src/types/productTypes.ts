export type dataProductsRequest = {
    result: {
        pagination: {
            count: number,
            current: number | null,
            next: number | null,
            pages: number,
            per_page: number,
            previous: number | null
        }
        products: [
            {
                category: string | null,
                description: string | null,
                id: number,
                name: string | null,
                image_url?: string,
                price: string
            }
        ]
    }
}