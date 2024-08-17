export interface HomeQResult {
    results: Result[]
    total_hits: number
  }
  
  export interface Result {
    id: number
    references: References
    type: string
    uri: string
    municipality: string
    county: string
    city: string
    location: Location
    images: Image[]
    videos: any[]
    boost_value: number
    title: string
    audience: string
    is_short_lease: boolean
    early_access: EarlyAccess
    rent: number
    rooms: number
    area: number
    date_access?: string
    object_ad?: ObjectAd
  }
  
  export interface References {
    estate: number
    apartment: number
    object_ad: number
    company: number
    office: number
    project: any
  }
  
  export interface Location {
    lat: number
    lon: number
  }
  
  export interface Image {
    image: string
    caption: string
    position: number
  }
  
  export interface EarlyAccess {
    start: string
    end: string
    active: boolean
    mode: string
  }  

  export interface ObjectAd {
    campaign_id: any
    is_renovated: boolean
    heat_included: boolean
    water_included: boolean
    electricity_included: boolean
    tv_included: boolean
    internet_included: boolean
    has_washing_machine: boolean
    is_prepared_for_washing_machine: boolean
    is_prioritizing_company_customers: boolean
    has_dishwasher: boolean
    is_prepared_for_dishwasher: boolean
    has_drier: boolean
    has_bathtub: boolean
    has_shower: boolean
    has_kitchen_fan: boolean
    has_patio: boolean
    has_balcony: boolean
    has_elevator: boolean
    has_parking: boolean
    parking: string
    has_garage: boolean
    garage: string
    city: string
    street: string
    street_number: string
    zip_code: string
    municipality: string
    county: string
    rooms: string
    get_rooms: string
    floor: number
    area: string
    rent: number
    description: string
    status: string
    promotion_file: any
    plan_image: any
    images: Image[]
    videos: any[]
    three_d_views: any[]
    agreement_access: boolean
    prior_access: boolean
    landlord_logo: string
    landlord_company: string
    public_profile_slug: string
    date_access: string
    can_apply: boolean
    longitude: string
    latitude: string
    date_publish: string
    new_production: boolean
    estate_id: number
    area_description: string
    landlord_object_id: string
    has_applied_on_estate: boolean
    is_short_lease: boolean
    security_door: boolean
    short_lease_min_date: any
    short_lease_max_date: any
    contract_system: string
    is_senior: boolean
    capacity: number
    senior_age: number
    is_youth: boolean
    youth_age: number
    is_student: boolean
    allows_smoking: boolean
    allows_pets: boolean
    candidate_sorting_mode: string
    handicap_friendly: boolean
    last_accept: number
    office: Office
    landlord: Landlord
    early_access: EarlyAccess
  }
  
  export interface Image {
    image: string
    caption: string
    position: number
  }
  
  export interface Office {
    id: number
  }
  
  export interface Landlord {
    id: number
  }
  
  export interface EarlyAccess {
    start: string
    end: string
    active: boolean
    mode: string
  }
  