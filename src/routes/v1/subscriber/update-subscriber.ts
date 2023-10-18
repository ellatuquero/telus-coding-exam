import { Router, Request, Response } from 'express';
import { body, param } from 'express-validator';
import { IDependencyProvider } from '@/dependencies/dependencies';
import { requestValidator } from '@/middlewares/requestValidator';
import { BadRequestError } from '@/middlewares/classes';
import { successResponse } from '@/httpHelper';
import { toHash } from '@/utils/utils';

const router = Router();

/**
 * @route PUT /v1/ims/subscriber/:phoneNumber
*/

function updateSubscriberRoute({ subscriberRepository }: IDependencyProvider): Router {

    router.put(
        '/:phoneNumber',
        param('phoneNumber')
            .isNumeric()
            .withMessage('Phone number is required.'),
        body('username')
            .if(body('username').exists()) 
            .notEmpty()
            .withMessage('Username is required.'),
        body('password')
            .if(body('password').exists()) 
            .notEmpty()
            .withMessage('Password is required.'),
        body('phoneNumber')
            .if(body('phoneNumber').exists()) 
            .notEmpty()
            .withMessage('Phone number is required.'),
        body('domain')
            .if(body('domain').exists()) 
            .notEmpty()
            .withMessage('Domain is required.'),
        body('features.callForwardNoReply.provisioned')
            .if(body('features.callForwardNoReply.provisioned').exists()) 
            .isBoolean()
            .withMessage('Features callForwardNoReply (provisioned) is required.'),
        body('features.callForwardNoReply.destination')
            .if(body('features.callForwardNoReply.destination').exists()) 
            .notEmpty()
            .withMessage('Features callForwardNoReply (destination) is required.'),
        requestValidator,
        async (req: Request, res: Response) => {
            const { params, body } = req,
                  { phoneNumber }  = params;

            try {


                let tempUpdateObj = body;
                if(body.password) {
                    tempUpdateObj.password = toHash(body.password)
                }

                const updateSubscriber = await subscriberRepository.updateSubscriberByPhoneNumber(
                    Number(phoneNumber),
                    { ...tempUpdateObj }
                );

                return successResponse(res, {
                    message : "Successfully updated subscriber's info.",
                    jsonResponse: {
                        subscriber : updateSubscriber
                    }
                });

            }catch(error : any) {
                throw new BadRequestError(error?.message || "Something went wrong while updating subscriber's info.")
            }

        }
    );
    
    return router;
}

export { updateSubscriberRoute }