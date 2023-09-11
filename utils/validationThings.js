const yup = require('yup');

/*

1. body не має бути пустим
2. body має довжину від 3 до 100 символів

*/

const ThingSCHEMA = yup.object({
    body: yup.string().required().min(3).max(100)
});

module.exports.validateThing = async (req, res, next) => {
    const { body } = req;
    try {
        const validated = await ThingSCHEMA.validate(body);

        if(validated) {
            next();
        }
    } catch (error) {
        next(error);
    }
}