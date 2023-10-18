import { Router } from 'express';
import { IDependencyProvider } from '@/dependencies/dependencies';

import { getSubscriberRoute } from './get-subscriber';
import { addSubscriberRoute } from './add-subscriber';
import { updateSubscriberRoute } from './update-subscriber';
import { deleteSubscriberRoute } from './delete-subscriber';


const router = Router();

// List all sub routes here under /v1/telus/subscriber
function subscriberRoutes (dependencies : IDependencyProvider) : Router {

    router.use(getSubscriberRoute(dependencies));
    router.use(addSubscriberRoute(dependencies));
    router.use(updateSubscriberRoute(dependencies));
    router.use(deleteSubscriberRoute(dependencies));
    

    return router;
}

export { subscriberRoutes }