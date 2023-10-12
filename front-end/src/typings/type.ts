export type CompanyType = {
    id? : number
    name : string
    address : string
}

export type AdvertisementType = {
    id? : number
    offerDate? : string
    title : string
    description : string
    working_time : string
    wage : string
    contract? : ContractType
    company? : CompanyType
}

export type ContractType = {
    id? : number
    name : string
}