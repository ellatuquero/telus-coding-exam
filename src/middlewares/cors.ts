import cors from 'cors'

const DEV_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'https://squaad.hummingbird.ph/',
    'https://cms-squaad.hummingbird.ph/',
    'https://squaad.hummingbird.ph',
    'https://cms-squaad.hummingbird.ph',
    'https://appleid.apple.com',
]

function devOrigin ( origin : string | undefined, callback : any ) {

    if (!origin) return callback(null, true);

    // Check if origin is in default allowed origins
    if ( DEV_ALLOWED_ORIGINS.indexOf(origin) >= 0 ) {
        return callback(null, true);
    }

    // Throw an error - Origin not allowed
    var msg = 'The CORS policy for development site does not allow access from the specified origin.';
    return callback(new Error(msg), false);
}

const CORS_POLICY = ( ENV : string ) => {

    let origin = { origin : devOrigin  }

    return cors (origin)

}

export { CORS_POLICY }