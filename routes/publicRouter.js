const router = require('express').Router();
const db = require('../db');

router.get('/products.json', (req, res) => {
    const { query = '', page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const params = [ `%${query}%`, parseInt(limit), parseInt(offset) ];


    const sql = 'SELECT products.*, companies.nombre AS companie_name FROM products JOIN companies ON products.companie_id = companies.id WHERE companies.estado = TRUE AND products.estado = TRUE AND products.nombre LIKE ? LIMIT ? OFFSET ? ' 

    db.query(sql, params, (err, results) => {
        if(err) return res.status(500).json({ message: 'Error getting companies from db', err });

        if(results.length === 0) {
            return res.status(404).json({ message: 'Products Not Found' })
        }

        res.json(results);

    })
})

router.get('/products/:gtin', (req, res) => {
    const { gtin } = req.params;
    const sql = 'SELECT products.*, companies.nombre AS companie_name FROM products JOIN companies ON products.companie_id = companies.id WHERE companies.estado = TRUE AND products.estado = TRUE AND gtin =?'

    db.query(sql, [ gtin ], (err, results) => {
        if(err) return res.status(500).json({ message: 'Error getting companies from db', err });

        if(results.length === 0) {
            res.status(404).json({ message: 'Product Not Found' })
        }

        res.json(results);

    })
})



module.exports = router;