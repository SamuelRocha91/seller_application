export type storeType = {
    src: File,
    name: string,
    price: string,
    active: boolean,
    id: number,
    description: string,
    address: string,
    category: string
    phoneNumber: string,
    image: File
}

export type storeCreateType = {
    src: File,
    name: string,
    price: string,
    description: string,
    address: string,
    category: string,
    phoneNumber: string
}