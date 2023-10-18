import { Router, Request, Response } from 'express';
import { param } from 'express-validator';
import { IDependencyProvider } from '@/dependencies/dependencies';
import { requestValidator } from '@/middlewares/requestValidator';
import { BadRequestError } from '@/middlewares/classes';
import { successResponse } from '@/httpHelper';

const router = Router();

/**
 * @route GET /v1/ims/subscriber
 * @route GET /v1/ims/subscriber/:phoneNumber
*/

function getSubscriberRoute({ subscriberRepository }: IDependencyProvider): Router {


    router.get(
        '/',
        requestValidator,
        async (req: Request, res: Response) => {

            try {

                const subscribers = await subscriberRepository.getSubscribers();

                return successResponse(res, {
                    message : 'Successfully retrieve the list of subscriber.',
                    jsonResponse: {
                        subscribers
                    }
                });

            }catch(error : any) {
                throw new BadRequestError(error?.message || 'Something went wrong while retrieving the list of subscriber.')
            }

        }
    );

    router.get(
        '/:phoneNumber',
        param('phoneNumber')
            .if(param('phoneNumber').exists()) 
            .isNumeric()
            .withMessage('Phone number is required.'),
        requestValidator,
        async (req: Request, res: Response) => {
            const { params } = req,
                  { phoneNumber } = params;

                try {

                const subscriber = await subscriberRepository.getSubscriberByPhoneNumber(Number(phoneNumber));

                return successResponse(res, {
                    message : 'Successfully retrieve the single subscriber.',
                    jsonResponse: {
                        subscriber
                    }
                });

            }catch(error : any) {
                throw new BadRequestError(error?.message || 'Something went wrong while retrieving the single subscriber.')
            }

        }
    );
    
    return router;
}

export { getSubscriberRoute }

