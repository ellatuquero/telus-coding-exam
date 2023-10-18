import { Router, Request, Response } from 'express';
import { ENVIRONMENT } from '@/constants/constants';
import { IDependencyProvider } from '@/dependencies/dependencies';
import { subscriberRoutes } from './subscriber';

const router = Router();

// @route /v1/ims
function apiV1Routes (
    dependencies : IDependencyProvider
    ) : Router {

        router.get('/_health', (req : Request, res : Response) => {
            res.status(200)
                .send({
                    success : true,
                    env: ENVIRONMENT.toLocaleUpperCase(),
                    message : 'Connection successful.',
                    status : 'Available',
                    statusCode : res.statusCode,
                    
                })
        })


        router.use('/subscriber', subscriberRoutes(dependencies));
        

    return router;
}

export { apiV1Routes };