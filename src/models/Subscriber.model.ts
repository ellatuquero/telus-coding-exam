import { toHash } from '@/utils/utils';
import { Schema, model, Types, HydratedDocument, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

// An interface that describes the properties
// that a Subscriber Document has

export enum EStatusTypes {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
};

// An interface that describes the properties
// that are required to create a subscriber
export interface SubscriberOnboard {
    username : string;
    password ?: string;
    phoneNumber : number;
    domain : string;
    features : {
        callForwardNoReply : {
            provisioned : boolean;
            destination : string;
        }
    }
}

export interface SubscriberDoc extends Document {
    _id : Types.ObjectId;
    username : string;
    password : string;
    phoneNumber : number;
    domain : string;
    status : EStatusTypes;
    features : {
        callForwardNoReply : {
            provisioned : boolean;
            destination : string;
        }
    }
    dateCreated : Date;
    lastUpdated : Date;
}

interface SubscriberModel extends PaginateModel<SubscriberDoc>{
    build(attrs: SubscriberOnboard): HydratedDocument<SubscriberDoc>;
}

const subscriberSchema = new Schema({
    username : String,
    password : String,
    phoneNumber : Number,
    domain : String,
    status : {
        type: String,
        enum : Object.values(EStatusTypes),
        default : EStatusTypes.ACTIVE
    },
    features : {
        callForwardNoReply : {
            provisioned : Boolean,
            destination : String,
        }
    },
    dateCreated : { type : Date, default : Date.now },
    lastUpdated : { type : Date, default : Date.now },
},
{
    toJSON : {
        transform : (doc, ret) => {
            delete ret.__v
            delete ret.password
        }
    }
});


subscriberSchema
.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashedPassword = toHash(this.get('password'));
        this.set('password', hashedPassword);
    }
    done();
})
.static('build', function build(attrs: SubscriberDoc) {
    return new Subscriber(attrs);
})
.plugin(paginate);


const Subscriber = model<SubscriberDoc, SubscriberModel>('Subscriber', subscriberSchema);

export { Subscriber };