import { Router, Request, Response } from 'express';
import { param } from 'express-validator';
import { IDependencyProvider } from '@/dependencies/dependencies';
import { requestValidator } from '@/middlewares/requestValidator';
import { BadRequestError } from '@/middlewares/classes';
import { successResponse } from '@/httpHelper';


const router = Router();

/**
 * @route DELETE /v1/ims/subscriber/:phoneNumber
*/

function deleteSubscriberRoute({ subscriberRepository }: IDependencyProvider): Router {

    router.delete(
        '/:phoneNumber',
        param('phoneNumber')
            .isNumeric()
            .withMessage('Phone number is required.'),
        requestValidator,
        async (req: Request, res: Response) => {
            const { params } = req,
                  { phoneNumber } = params;

            try {

                const checkIfExist = await subscriberRepository.getSubscriberByPhoneNumber(Number(phoneNumber));
          
                if(!checkIfExist) {
                    throw new Error("Something went wrong. Subscriber does not exist.");
                }

                await subscriberRepository.deleteSubscriberByPhoneNumber(Number(phoneNumber));

                return successResponse(res, {
                    message : 'Successfully deleted the subscriber.',
                });

            }catch(error : any) {
                throw new BadRequestError(error?.message || 'Something went wrong while deleting the subscriber.')
            }

        }
    );
    
    return router;
}

export { deleteSubscriberRoute }

