import mongoose, { Schema, Document } from 'mongoose';

interface IImage {
    image: string;
    caption?: string;
    position?: number;
}

interface IEarlyAccess {
    start?: Date;
    end?: Date;
    active?: boolean;
    mode?: string;
}

interface IObjectAd {
    campaign_id?: any;
    is_renovated?: boolean;
    heat_included?: boolean;
    water_included?: boolean;
    electricity_included?: boolean;
    tv_included?: boolean;
    internet_included?: boolean;
    has_washing_machine?: boolean;
    is_prepared_for_washing_machine?: boolean;
    is_prioritizing_company_customers?: boolean;
    has_dishwasher?: boolean;
    is_prepared_for_dishwasher?: boolean;
    has_drier?: boolean;
    has_bathtub?: boolean;
    has_shower?: boolean;
    has_kitchen_fan?: boolean;
    has_patio?: boolean;
    has_balcony?: boolean;
    has_elevator?: boolean;
    has_parking?: boolean;
    parking?: string;
    has_garage?: boolean;
    garage?: string;
    city?: string;
    street?: string;
    street_number?: string;
    zip_code?: string;
    municipality?: string;
    county?: string;
    rooms?: string;
    get_rooms?: string;
    floor?: number;
    area?: string;
    rent?: number;
    description?: string;
    status?: string;
    promotion_file?: any;
    plan_image?: any;
    images?: IImage[];
    videos?: any[];
    three_d_views?: any[];
    agreement_access?: boolean;
    prior_access?: boolean;
    landlord_logo?: string;
    landlord_company?: string;
    public_profile_slug?: any;
    date_access?: Date;
    can_apply?: boolean;
    longitude?: string;
    latitude?: string;
    date_publish?: Date;
    new_production?: boolean;
    estate_id?: number;
    area_description?: string;
    landlord_object_id?: string;
    has_applied_on_estate?: boolean;
    is_short_lease?: boolean;
    security_door?: boolean;
    short_lease_min_date?: any;
    short_lease_max_date?: any;
    contract_system?: string;
    is_senior?: boolean;
    capacity?: number;
    senior_age?: number;
    is_youth?: boolean;
    youth_age?: number;
    is_student?: boolean;
    allows_smoking?: boolean;
    allows_pets?: boolean;
    candidate_sorting_mode?: string;
    handicap_friendly?: boolean;
    last_accept?: number;
    office?: {
        id?: number;
    };
    landlord?: {
        id?: number;
    };
    early_access?: IEarlyAccess;
}

interface ILocation {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
}

interface IListing extends Document {
    id?: number;
    references?: {
        estate?: number;
        apartment?: number;
        object_ad?: number;
        company?: number;
        office?: number;
        project?: any;
    };
    type?: string;
    uri?: string;
    municipality?: string;
    county?: string;
    city?: string;
    location: ILocation;
    images?: IImage[];
    videos?: any[];
    boost_value?: number;
    title?: string;
    audience?: string;
    is_short_lease?: boolean;
    early_access?: IEarlyAccess;
    rent?: number;
    rooms?: number;
    area?: number;
    date_access?: Date;
    object_ad?: IObjectAd;
}

const ImageSchema: Schema = new Schema({
    image: { type: String, required: true },
    caption: { type: String, default: '' },
    position: { type: Number, required: true }
});

const EarlyAccessSchema: Schema = new Schema({
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    active: { type: Boolean, required: true },
    mode: { type: String, required: true }
});

const ObjectAdSchema: Schema = new Schema({
    campaign_id: { type: Schema.Types.Mixed, required: false },
    is_renovated: { type: Boolean, required: false },
    heat_included: { type: Boolean, required: false },
    water_included: { type: Boolean, required: false },
    electricity_included: { type: Boolean, required: false },
    tv_included: { type: Boolean, required: false },
    internet_included: { type: Boolean, required: false },
    has_washing_machine: { type: Boolean, required: false },
    is_prepared_for_washing_machine: { type: Boolean, required: false },
    is_prioritizing_company_customers: { type: Boolean, required: false },
    has_dishwasher: { type: Boolean, required: false },
    is_prepared_for_dishwasher: { type: Boolean, required: false },
    has_drier: { type: Boolean, required: false },
    has_bathtub: { type: Boolean, required: false },
    has_shower: { type: Boolean, required: false },
    has_kitchen_fan: { type: Boolean, required: false },
    has_patio: { type: Boolean, required: false },
    has_balcony: { type: Boolean, required: false },
    has_elevator: { type: Boolean, required: false },
    has_parking: { type: Boolean, required: false },
    parking: { type: String, required: false },
    has_garage: { type: Boolean, required: false },
    garage: { type: String, required: false },
    city: { type: String, required: false },
    street: { type: String, required: false },
    street_number: { type: String, required: false },
    zip_code: { type: String, required: false },
    municipality: { type: String, required: false },
    county: { type: String, required: false },
    rooms: { type: String, required: false },
    get_rooms: { type: String, required: false },
    floor: { type: Number, required: false },
    area: { type: String, required: false },
    rent: { type: Number, required: false },
    description: { type: String, required: false },
    status: { type: String, required: false },
    promotion_file: { type: Schema.Types.Mixed, required: false },
    plan_image: { type: Schema.Types.Mixed, required: false },
    images: [{ type: ImageSchema, required: false }],
    videos: [{ type: Schema.Types.Mixed, required: false }],
    three_d_views: [{ type: Schema.Types.Mixed, required: false }],
    agreement_access: { type: Boolean, required: false },
    prior_access: { type: Boolean, required: false },
    landlord_logo: { type: String, required: false },
    landlord_company: { type: String, required: false },
    public_profile_slug: { type: Schema.Types.Mixed, required: false },
    date_access: { type: Date, required: false },
    can_apply: { type: Boolean, required: false },
    longitude: { type: String, required: false },
    latitude: { type: String, required: false },
    date_publish: { type: Date, required: false },
    new_production: { type: Boolean, required: false },
    estate_id: { type: Number, required: false },
    area_description: { type: String, required: false },
    landlord_object_id: { type: String, required: false },
    has_applied_on_estate: { type: Boolean, required: false },
    is_short_lease: { type: Boolean, required: false },
    security_door: { type: Boolean, required: false },
    short_lease_min_date: { type: Schema.Types.Mixed, required: false },
    short_lease_max_date: { type: Schema.Types.Mixed, required: false },
    contract_system: { type: String, required: false },
    is_senior: { type: Boolean, required: false },
    capacity: { type: Number, required: false },
    senior_age: { type: Number, required: false },
    is_youth: { type: Boolean, required: false },
    youth_age: { type: Number, required: false },
    is_student: { type: Boolean, required: false },
    allows_smoking: { type: Boolean, required: false },
    allows_pets: { type: Boolean, required: false },
    candidate_sorting_mode: { type: String, required: false },
    handicap_friendly: { type: Boolean, required: false },
    last_accept: { type: Number, required: false },
    office: {
        id: { type: Number, required: false }
    },
    landlord: {
        id: { type: Number, required: false }
    },
    early_access: { type: EarlyAccessSchema, required: false }
});

const ListingSchema: Schema = new Schema({
    id: { type: Number },
    references: {
        estate: { type: Number },
        apartment: { type: Number },
        object_ad: { type: Number },
        company: { type: Number },
        office: { type: Number },
        project: { type: Schema.Types.Mixed }
    },
    type: { type: String },
    uri: { type: String },
    municipality: { type: String },
    county: { type: String },
    city: { type: String },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
    },
    images: [{ type: ImageSchema }],
    videos: [{ type: Schema.Types.Mixed }],
    boost_value: { type: Number },
    title: { type: String },
    audience: { type: String },
    is_short_lease: { type: Boolean },
    early_access: { type: EarlyAccessSchema },
    rent: { type: Number },
    rooms: { type: Number },
    area: { type: Number },
    date_access: { type: Date },
    object_ad: { type: ObjectAdSchema }
});

ListingSchema.index({ location: '2dsphere' }); // Define a 2dsphere index for location

export default mongoose.model<IListing>('Listing', ListingSchema);