import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { IDependencyProvider } from '@/dependencies/dependencies';
import { requestValidator } from '@/middlewares/requestValidator';
import { BadRequestError } from '@/middlewares/classes';
import { successResponse } from '@/httpHelper';
import { Subscriber } from '@/models/Subscriber.model';

const router = Router();

/**
 * @route POST /v1/ims/subscriber/add
*/

function addSubscriberRoute({  }: IDependencyProvider): Router {

    router.post(
        '/add',
        body('username')
            .notEmpty()
            .withMessage('Username is required.'),
        body('password')
            .notEmpty()
            .withMessage('Password is required.'),
        body('phoneNumber')
            .notEmpty()
            .withMessage('Phone number is required.'),
        body('domain')
            .notEmpty()
            .withMessage('Domain is required.'),
        body('features.callForwardNoReply.provisioned')
            .isBoolean()
            .withMessage('Features callForwardNoReply (provisioned) is required.'),
        body('features.callForwardNoReply.destination')
            .notEmpty()
            .withMessage('Features callForwardNoReply (destination) is required.'),
        requestValidator,
        async (req: Request, res: Response) => {
            const { body } = req;

            try {

                const subscriber = await Subscriber.build({
                    ...body
                }).save();

                return successResponse(res, {
                    message: 'Successfully added a subscriber.',
                    jsonResponse: {
                        subscriber
                    }
                });

            } catch (error: any) {
                throw new BadRequestError(error?.message || 'Something went wrong while adding a subscriber.')
            }

        }
    );

    return router;
}

export { addSubscriberRoute }