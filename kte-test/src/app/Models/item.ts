export interface IItem{
    id: number,
    brand: string,
    category: string,
    description: string,
    discountPercentage: number,
    images: [],
    price: number,
    rating: number,
    stock: number,
    thumbnail: string,
    title: string
}

export interface IPageParams{
    page:number,
    skip: number,
    limit: number,
    total: number,
    totalPages: number,
    category: string,
    search: string
}