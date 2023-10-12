export type CompanyType = {
    id? : number
    name : string
    address : string
}

export type AdvertisementType = {
    id?: number
    title: string
    description: string
    working_time: string
    wage: string
    contract: number
    company: number
}