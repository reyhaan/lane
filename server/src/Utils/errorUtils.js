import { errors } from './enumUtils';

export const handleError = (e, error) => {
    if (error === errors.UserNotFound) {
        throw new Error('User not found')
    }

    if (error === errors.GeneralIOError) {
        throw new Error('Something went wrong while writing to database')
    }
}