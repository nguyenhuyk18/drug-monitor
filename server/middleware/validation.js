exports.validationName = (req, res, next) => {
    const data = req.body;

    if (data?.name?.length <= 5) {
        const err = new Error('Name length must be more than five');
        err.status = 400;
        next(err);
        return;
    }

    next();
}

exports.validationDosage = (req, res, next) => {
    const data = req.body;
    const regex1 = /^[0-9]{2}-morning,[0-9]{2}-afternoon,[0-9]{2}-night$/;
    // const regex2 = /^[0-9]{2}-afternoon$/;
    // const regex3 = /^[0-9]{2}-night$/;
    if (!regex1.test(data.dosage)) {
        const err = new Error('Dosage follows the format: XX-morning,XX-afternoon,XX-night . In there, X is digit.');
        err.status = 400;
        next(err);
        return;
    }

    next();
}

exports.validationCard = (req, res, next) => {
    const data = req.body;
    const regex = /^[0-9]+$/;

    if (!regex.test(data.card)) {
        const err = new Error('Card must be integer !!!');
        err.status = 400;
        next(err);
        return;
    }

    if (data.card > 1000) {
        const err1 = new Error('Card must be more than 1000');
        err1.status = 400;
        next(err1);
        return
    }

    next()
}

exports.validationPack = (req, res, next) => {
    const data = req.body;
    const regex = /^[0-9]+$/;

    // check số nguyên
    if (!regex.test(data.card)) {
        const err = new Error('Pack must be integer !!!');
        err.status = 400;
        next(err);
        return;
    }

    // check lớn hơn 0
    if (data.card <= 0) {
        const err1 = new Error('Pack must be more than 0');
        err1.status = 400;
        next(err1);
        return
    }

    next()
}

exports.validationPerDay = (req, res, next) => {
    const data = req.body;
    const regex = /^[0-9]+$/;

    // check số nguyên
    if (!regex.test(data.perDay)) {
        const err = new Error('perDay must be integer !!!');
        err.status = 400;
        next(err);
        return;
    }

    // check lớn hơn 0
    if (data.perDay <= 0 || data.perDay >= 90) {
        const err1 = new Error('perDay must more than 0 and less than 90');
        err1.status = 400;
        next(err1);
        return
    }

    next()
}





