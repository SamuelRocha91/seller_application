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
    neighborhood: string
}

export type entity = {
    id: number,
    src: string,
    active: boolean,
    name: string,
    price: string,
}
