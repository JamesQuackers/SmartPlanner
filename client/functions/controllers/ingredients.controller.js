const admin = require('firebase-admin');

exports.create = async function(req, res) {
    const db = admin.firestore();
    try {
        await db.collection('ingredients')
            .add({
                name: req.body.name,
                price: req.body.price,
                totalWeight: req.body.totalWeight,
                categories: req.body.categories
            });
        return res.status(200).send();
    } catch (error) {
        return res.status(500).send(error);
    }
};

exports.get = async function(req, res) {
    const db = admin.firestore();
    try {
        let query = db.collection('ingredients');
        let response = [];
        await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = doc.data();
                selectedItem['id'] = doc.id;
                response.push(selectedItem);
            }
        });
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send(error);
    }
};

exports.delete = async function(req, res) {
    const db = admin.firestore();
    try {
        let query = db.collection('ingredients');
        let response = [];
        await query.doc(req.params.ingredientId).delete();
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send(error);
    }
};

