export type storeType = {
    id?: number,
    src: File | string,
    name: string,
    description: string,
    address: string,
    category: string
    active?: boolean,
    image?: File | string,
    cep: string,
    cnpj: string,
    city: string,
    state: string,
    numberAddress: string,
    neighborhood: string,
    isOpen?: boolean,
    colorTheme: string
}

export type entity = {
    id: number,
    src: string,
    active: boolean,
    name: string,
    price?: string,
    category?: string,
    isOpen?: boolean
    is_inventory_product?: boolean
    quantity_in_stock?: number
}
