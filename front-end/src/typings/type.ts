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
    firstname : string
    lastname : string
    email : string
    phone : string,
    cv : string
    sex : SexType
    permission : PermissionType
    password? : string
    is_superuser? : false,
    last_login? : string
    token? : number
    groups? : null
    user_permissions? : null
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