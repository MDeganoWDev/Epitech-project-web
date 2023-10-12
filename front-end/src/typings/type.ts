export type CompanyType = {
    id? : number
    name : string
    address : string
}

export type AdvertisementType = {
    id? : number
    offerDate? : string
    title : string
    full_description : string
    quick_description : string
    working_time : string
    wage : string
    contract? : ContractType
    company? : CompanyType
}

export type UtilisateurType = {
    id? : number
    token? : number
    last_login? : string
    is_superuser? : false,
    firstname : string
    lastname : string
    phone : string,
    email : string
    cv : string
    password : string
    sex : SexType
    permission : PermissionType
    groups : null
    user_permissions : null
}

export type ApplicationType = {
    id? : number
    message : string
    apply_date : string
    firstname : string
    lastname : string
    phone : string
    email : string
    cv : string
    user : UtilisateurType
    advertisement : AdvertisementType
}

export type SexType = {
    id? : number
    name : string
}

export type PermissionType = {
    id? : number
    name : string
}

export type ContractType = {
    id? : number
    name : string
}