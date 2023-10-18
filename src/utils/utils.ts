
import bcryptjs from 'bcryptjs'
import { PASSWORD_SALT_ROUNDS } from '../constants/constants'

/**
 *  Shorthand function helper for console.log
 */
export const log = (message : string, ...options : any[]) : void => {
    console.log(message, ...options)
}

/**
 *
 * Converts normal string to encrypted/hashed password
 * @static
 * @param {string} password
 * @return {string} Encrypted password
*/
export function toHash ( password : string ) {
    const salt = bcryptjs.genSaltSync(PASSWORD_SALT_ROUNDS)
    const hashedPassword = bcryptjs.hashSync(password, salt)
    return hashedPassword;
}