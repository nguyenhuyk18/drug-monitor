let Drugdb = require('../model/model');


// creates and saves a new drug
exports.create = (req, res, next) => {
    // validate incoming request
    if (!req.body) {// if content of request (form data) is empty
        // res.status(400).send({ message : "Content cannot be emtpy!"});// respond with this
        const err = new Error('Content cannot be emtpy!');
        err.status = 400;
        next(err);

        return;
    }

    //create new drug
    const drug = new Drugdb({
        name: req.body.name,//take values from form and assign to schema
        card: req.body.card,
        pack: req.body.pack,
        perDay: req.body.perDay,
        dosage: req.body.dosage
    })

    //save created drug to database
    drug
        .save(drug)//use the save operation on drug
        .then(data => {
            console.log(`${data.name} added to the database`)
            res.redirect('/manage');
        })
        .catch(err => {
            // res.status(500).send({//catch error
            //     message: err.message || "There was an error while adding the drug"
            // });

            const err_1 = new Error('There was an error while adding the drug !');
            err_1.status = 500;
            next(err);
            return
        });

}


// can either retrieve all drugs from the database or retrieve a single user
exports.find = (req, res, next) => {

    if (req.query.id) {//if we are searching for drug using its ID
        const id = req.query.id;

        Drugdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Can't find drug with id: " + id })
                    // const err = new Error("Can't find drug with id: " + id);

                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving drug with id: " + id })
            })

    } else {
        Drugdb.find()
            .then(drug => {
                res.send(drug)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "An error occurred while retriving drug information" })
            })
    }
}


// edits a drug selected using its  ID
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Cannot update an empty drug" })
    }

    const id = req.params.id;
    Drugdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Drug with id: ${id} cannot be updated` })
            } else {
                res.send(data);
                //res.redirect('/');
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error in updating drug information" })
        })

}


// deletes a drug using its drug ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Drugdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete drug with id: ${id}. Pls check id` })
            } else {
                res.send({
                    message: `${data.name} was deleted successfully!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Drug with id=" + id
            });
        });

}


exports.drugsCusWant = async (req, res) => {
    // 1 card = 10 viên, 1 pack = 3 card
    const days = req.params.days;

    // const totalPills = days * 
    const list = await Drugdb.find();

    const data = list.map(row => {
        // console.log(row)
        let pills = days * row.perDay;
        const cardToBuy = Math.ceil(pills / row.card);
        const tmp = row.pack / row.card;
        const packToBuy = Math.ceil(pills / row.pack);
        return {
            ...row._doc,
            pills: pills,
            cardToBuy: cardToBuy,
            tmp: tmp,
            packToBuy: packToBuy
        }
    })

    res.status(201).json(data);

}