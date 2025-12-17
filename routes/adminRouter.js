const router = require('express').Router();
const verifySession = require('../public/js/middlewares')
const db = require('../db');
const path = require('path');

//ADMINISTRATION LOGIN ENDPOINT

router.post('/admin/login', (req, res) => {
    const { username, user_pass } = req.body;
    
    const sql = 'SELECT * FROM admins WHERE username = ?'

    db.query(sql, [ username ], (err, result) => {
        if(err) return res.status(500).json({message: 'Error getting user', err});

        if(result.length === 0) {
            return res.status(404).json( { message: 'User not found' })
        }

        const user = result[0]

        if(user.user_pass === user_pass){
            req.session.user = {
                id : user.id,
                username : user.username
            }
        }
        res.redirect('/api/admin/dashboard')
    })
})


//VERIFY SESSION FROM MIDDLEWARES.JS FILE 
router.use(verifySession)


//POST COMPANIES ENDPOINT, TO ADD COMPANIES TO DB
router.post('/admin/companies', (req, res) => {
    const { nombre, direccion, telefono, email, estado } = req.body;

    const sql = 'INSERT INTO companies (nombre, direccion, telefono, email, estado) VALUES (?, ?,?,?,?)'
    db.query(sql, [ nombre, direccion, telefono, email, estado ], (err, result) => {
        if(err) return res.status(500).json({ message: 'Error inserting companie to DB' });

        res.status(200).json({ message: 'Companie added', id: result.insertId });
    })
})

//POST PRODUCTS ENDPOINT, TO ADD PRODUCTS TO DB
router.post('/admin/products', (req, res) => {
    const { gtin ,nombre, descripcion, marca, origen, bruto, neto, unidad, estado, companie_id  } = req.body;

    const sql = 'INSERT INTO products (gtin ,nombre, descripcion, marca, origen, bruto, neto, unidad, estado, companie_id) VALUES (?,?,?,?,?,?,?,?,?,?)'
    db.query(sql, [ gtin ,nombre, descripcion, marca, origen, bruto, neto, unidad, estado, companie_id ], (err, result) => {
        if(err) return res.status(500).json({ message: 'Error inserting product to DB' });

        res.status(200).json({ message: 'product added', id: result.insertId });
    })
})


//PUT PRODUCTS ENDPOINT, TO UPDATE PRODUCTS ON DB
router.put('/admin/products/:gtin', (req, res) => {
    const { gtin } = req.params;
    const { nombre, descripcion, marca, origen, bruto, neto, unidad, estado, companie_id  } = req.body;

    const sql = 'UPDATE products SET nombre = ?, descripcion = ?, marca = ?, origen = ?, bruto = ?, neto = ?, unidad = ?, estado = ?, companie_id = ? WHERE gtin = ?'

    db.query(sql, [ nombre, descripcion, marca, origen, bruto, neto, unidad, estado, companie_id, gtin  ], (err, result) => {
        if(err) return res.status(500).json({ message: 'Error updating product to DB' });

        if(result.length === 0) {
            return res.status(500).json({ message: 'product Not found' })
        }

        res.status(200).json({ message: 'product updated' });
    })
})

//PUT COMPANIES ENDPOINT, TO UPDATE COMPANIES ON DB
router.put('/admin/companies/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, telefono, email, estado } = req.body;

    const sql = 'UPDATE companies SET nombre= ? , direccion = ?, telefono =?, email = ?, estado = ? WHERE id = ?'
    db.query(sql, [ nombre, direccion, telefono, email, estado, id ], (err, result) => {
        if(err) return res.status(500).json({ message: 'Error updating companie to DB' });

        if(result.length === 0) {
            return res.status(500).json({ message: 'Comapnie Not found' })
        }

        res.status(200).json({ message: 'Companie updated' });
    })
})


//GET ALL PRODUCTS FROM THE DATABASE 
router.get('/admin/product', (req, res) => {
    const sql = 'SELECT products.*, companies.nombre AS companie_name FROM products JOIN companies ON products.companie_id = companies.id';

    db.query(sql, (err, results) => {
        if(err) return res.status(500).json({ message: 'Error getting products from db' });


        res.send(results);

    })
})


//GET PRODUCTS ON DB BY GTIN
router.get('/admin/products/:gtin', (req, res) => {
    const {gtin} = req.params;
    const sql = 'SELECT * FROM products WHERE gtin = ?';

    db.query(sql, [ gtin ],  (err, results) => {
        if(err) return res.status(500).json({ message: 'Error getting products from db' });
        res.send(results);
    })
})

//GET ALL COMPANIES FROM DB
router.get('/admin/companies', (req, res) => {
    const sql = 'SELECT * FROM companies';

    db.query(sql, (err, results) => {
        if(err) return res.status(500).json({ message: 'Error getting companies from db' });


        res.send(results);

    })
})

//GET PRODUCTS FROM DB BY ID
router.get('/admin/companies/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM companies WHERE id = ?';

    db.query(sql, [ id ], (err, result) => {
        if(err) return res.status(500).json({ message: 'Error getting companie from db', err });


        res.send(result);

    })
})

//DELETE ENDPOINT TO DELETE PRODUCTS FROM DB
router.delete('/admin/products/:gtin', (req, res) => {
    const { gtin } = req.params;

    const sql = 'DELETE FROM products WHERE estado = FALSE AND gtin = ?';

    db.query(sql, [ gtin ], (err, result) => {

        console.log(result);
        
        
        if(err) return res.status(500).json({ message: 'Error deleting a product', err });
        
        if(!result || result.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'product deleted' })
    })
})

//ENDPOINT TO DESTROY THJE SESSION THAT STARTED TO OPEN THE DASHBOARD 
router.get('/admin/logOut', (req, res) => {
    req.session.destroy( err => {
        if(err) return res.json({ message: 'Error loggin Out', err });
        
        res.redirect('/admin/login')
    })
} )

router.get('/admin/dashboard', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../public/admin/admin.html')
    )
})
router.get('/admin/dashboard/companies', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../public/admin/companies.html')
    )
})
router.get('/admin/dashboard/products', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../public/admin/products.html')
    )
})
router.get('/admin/dashboard/newCompanie', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../public/admin/addCompanie.html')
    )
})
router.get('/admin/dashboard/newProduct', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../public/admin/addProduct.html')
    )
})


module.exports = router