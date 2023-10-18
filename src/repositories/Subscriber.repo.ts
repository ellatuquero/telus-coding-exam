import { Subscriber } from '@/models/Subscriber.model';

class SubscriberRepository {

    getSubscribers(){
        return Subscriber.find().sort({dateCreated : -1}).exec()
    }
    
    getSubscriberByPhoneNumber( phoneNumber : number ){
        return Subscriber.findOne({
            phoneNumber
        }).exec()
    }

    async updateSubscriberByPhoneNumber( phoneNumber : number, updatedObj : object ){
        return await Subscriber.findOneAndUpdate(
            { phoneNumber },
            { ...updatedObj },
            { new : true }
        );
    }

    async deleteSubscriberByPhoneNumber( phoneNumber : number ){
        return await Subscriber.deleteOne(
            { phoneNumber }
        );
    }
}

export { SubscriberRepository }