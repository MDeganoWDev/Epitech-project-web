export type CompanyType = {
    id? : number
    name : string
    address : string
    user? : UtilisateurType
    user_id? : number
}

export type AdvertisementType = {
    id? : number
    offerDate? : string
    title : string
    full_description : string
    quick_description : string
    working_time : string
    wage : string
    isOnline : boolean
    contract? : ContractType
    contract_id? : number
    company? : CompanyType
    company_id? : number
}

export type UtilisateurType = {
    id? : number
    firstname : string
    lastname : string
    email : string
    phone : string,
    cv : string
    sex? : SexType
    sex_id? : number
    permission? : PermissionType
    permission_id? : number
    password? : string
    is_superuser? : false,
    last_login? : string
    token? : number
    groups? : null
    user_permissions? : null
}

export type UnregisterType = {
    id? : number
    firstname : string
    lastname : string
    email : string
    phone : string,
    cv : string
    sex? : SexType
    sex_id? : number
}

export type ApplicationType = {
    id? : number
    message : string
    apply_date? : string
    unregisterUser? : UnregisterType
    unregisterUser_id? : number
    user? : UtilisateurType
    user_id? : number
    advertisement? : AdvertisementType
    advertisement_id? : number
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