const handleDuplicateKeyError = (err, res) => {
    return res.status(409).send({ status : false, statusCode : 409, message: `An account with the ${Object.keys(err.keyValue)} already exists.` });
 }

 const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map(el => el.message);
    return res.status(400).send({ status: false, statusCode : 400, message: errors[0] })
 }
 
 module.exports = (err, req, res, next) => {
    try {
        if(err.name === 'ValidationError') return err = handleValidationError(err, res);
        if(err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res);
        return res.status(500).send( { status: false, statusCode : 500, message:'Something went wrong. Please try again.' } );
    } catch(err) {
        return res.status(500).send({ status: false, statusCode : 500, message:'Something went wrong. Please try again.'} );
    }
 }