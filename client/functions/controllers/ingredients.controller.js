const admin = require('firebase-admin');

exports.create = async function(req, res) {
    const db = admin.firestore();
    try {
        await db.collection('ingredients')
            .add({
                name: req.body.name,
                price: req.body.price,
                servingSize: req.body.servingSize,
                totalWeight: req.body.totalWeight
            });
        return res.status(200).send();
    } catch (error) {
        return res.status(500).send(error);
    }

};
