
import { SubscriberRepository } from '@/repositories/Subscriber.repo';


export interface IDependencyProvider {
    subscriberRepository: SubscriberRepository;
}

export function dependencyProvider(): IDependencyProvider {
    return {
        subscriberRepository: new SubscriberRepository(),

    };
}