import { errors } from './enumUtils';

export const handleError = (e, error) => {
    if (error === errors.UserNotFound) {
        throw new Error('User not found')
    }
}