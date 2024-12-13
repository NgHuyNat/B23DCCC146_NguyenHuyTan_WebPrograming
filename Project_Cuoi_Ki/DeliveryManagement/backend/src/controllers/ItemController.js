const Item = require('../models/Item');

exports.getAllItems = (req, res) => {
    Item.getAllItems((err, items) => {
        if (err) {
            res.send(err);
        }
        console.log('Get All Items Successful');
        res.send(items);
    });
}

exports.getItemById = (req, res) => {
    Item.getItemById(req.params.id, (err, item) => {
        if (err) {
            res.send(err);
        }
        console.log('Get Item by id Successful');
        res.send(item);
    });
};

exports.addItem = (req, res) => {
    const item = req.body;
    Item.addItem(item, (err, item) => {
        if (err) {
            res.send(err);
        }
        console.log('Add Item Successful');
        res.send(item);
    });
}

exports.updateItem = (req, res) => {
    const item = req.body;
    Item.updateItem(item, (err, item) => {
        if (err) {
            res.send(err);
        }
        console.log('Update Item Successful');
        res.send(item);
    });
}

exports.deleteItem = (req, res) => {
    Item.deleteItem(req.params.id, (err, item) => {
        if (err) {
            res.send(err);
        }
        console.log('Delete Item Successful');
        res.send(item);
    });
}