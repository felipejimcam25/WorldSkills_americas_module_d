
const API_URL = 'http://localhost:3000/api/admin'

const companieBody = document.getElementById('companieBody');
const productsBody = document.getElementById('productsBody');
const public = document.getElementById('productPublic');
const addproduct = document.getElementById('addproduct');
const addCompanie = document.getElementById('addCompanie');
const inputGtin = document.getElementById('searchGtin');
const inputName = document.getElementById('searchName');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');


//PAGINATION VARIABLES & CONSTANTS
let currentPage = 1;
const limit = 10;
let currentQuery = '';


//EVENTLISTENERS
if(nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentPage++;
        displayVisibleProducts(currentPage, limit, currentQuery);
    })
}
if(prevBtn) {
    prevBtn.addEventListener('click', () => {
        if(currentPage > 1) {
            currentPage--;
            displayVisibleProducts(currentPage, limit, currentQuery);
        }
    })
}

if(inputName) {
    inputName.addEventListener('input', () => {
        currentQuery = inputName.value.trim();
        displayVisibleProducts(currentPage, limit, currentQuery);
    })
}

if(inputGtin){
    inputGtin.addEventListener('input', () => {
        displayVisibleProducts();
    })
}


let mode = 'add';

if(companieBody) {
    displayCompanies();
}
if(productsBody) {
    displayProducts();
}
if(addproduct) {
    newProduct();
}
if(addCompanie) {
    newCompanie();
}

if(public) {
    displayVisibleProducts()
}



async function fetchURL(endpoint) {
    try{
        const res = await fetch(`${API_URL}/${endpoint}`);
        if(!res.ok) throw new Error('Error fetching URL');
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}



async function getCompanies() {
    const data = await fetchURL('companies');
    console.log(data);
    
    return data;
}


async function displayCompanies() {
    const data = await fetchURL('companies');

    console.log(data);
    

    data.forEach(companie => {
        let tr = document.createElement('tr');

        tr.innerHTML = `
        <td>${companie.nombre}</td>
        <td>${companie.direccion}</td>
        <td>${companie.telefono}</td>
        <td>${companie.email}</td>
        <td>${companie.estado == 1 ? 'visible' : 'oculto'}</td>
        <td>
        <button onclick="updateCompanie(${companie.id})">Update</button>
        </td>


        `;
        companieBody.appendChild(tr)
    })
}


async function displayProducts() {
     const data = await fetchURL('product');
     productsBody.innerHTML = ''

    console.log(data);
    

    data.forEach(product => {
        let tr = document.createElement('tr');

        tr.innerHTML = `
        <td>${product.gtin}</td>
        <td>${product.nombre}</td>
        <td>${product.descripcion}</td>
        <td>${product.marca}</td>
        <td>${product.origen}</td>
        <td>${product.bruto}${product.unidad}</td>
        <td>${product.neto}${product.unidad}</td>
        <td>${product.companie_name}</td>
        <td>${product.estado == 1 ? 'visible' : 'oculto'}</td>
        <td>
        <button onclick="updateProduct('${product.gtin}')">Update</button>
        <button onclick="deleteProduct('${product.gtin}')">Delete</button>
        </td>
        `;
        productsBody.appendChild(tr)
    })
}

let actualGtin = null
async function updateProduct(gtin) {
    mode = 'edit';
    const modal = document.getElementById('modal');

    modal.classList.add('visible')
    const data = await fetchURL(`products/${gtin}`)
    const product = data[0];

    modal.innerHTML = `
        <h2 id="viewTitle">Updating Product..</h2>
        ${renderProductForm(product, mode)}
    
    `;


    const select = modal.querySelector('#companieSelect');

    const companies = await getCompanies();

    companies.forEach(companie => {
        let option = document.createElement('option')

        option.value = companie.id
        option.textContent = companie.nombre;

        if(product.companie_id === companie.id){
            option.selected = true;
        }
        select.appendChild(option);
    })

    
    actualGtin = product.gtin

    const formProduct = modal.querySelector('#productForm');

    document.querySelector('#cancelBtn').onclick = () => modal.classList.remove('visible');

    formProduct.addEventListener('submit', handleSubmitProduct)
}


async function handleSubmitProduct(e) {
    e.preventDefault();

    if(mode === 'add'){
        //NEWPRODUCT OBJECT
        const newProduct = {
            gtin: document.getElementById('gtin').value.trim(),
            nombre : document.getElementById('nombre').value.trim(),
            descripcion : document.getElementById('des').value.trim(),
            marca : document.getElementById('mar').value.trim(),
            origen : document.getElementById('origen').value.trim(),
            bruto : document.getElementById('bruto').value.trim(),
            neto : document.getElementById('neto').value.trim(),
            unidad : document.getElementById('un').value,
            companie_id: document.getElementById('companieSelect').value,
            estado : document.getElementById('estado').value,
        }
        //NEWPRODUCT OBJECT

        //GTIN VALIDATION
        const products = await fetch('http://localhost:3000/api/admin/product');        
        
        if(!products.ok) throw new Error('Error fetching Products');
        
        const data = await products.json();
        
        let filterGtin = data.filter(product => product.gtin.includes(newProduct.gtin));
        
        if(filterGtin) {
            return alert('The GTIN number is already in use');
        }
        //GTIN VALIDATION

        //SAVE THE NEW PRODUCT ON DB
        const res = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newProduct)
        })
        
        if(!res.ok) throw new Error('Error Fetching URL');
        displayProducts();
        alert('Product added successfully');
        window.location.reload();
        //SAVE THE NEW PRODUCT ON DB
        
    }else{
        
        const updatedProduct = {
                nombre : document.getElementById('nombre').value.trim(),
                descripcion : document.getElementById('des').value.trim(),
                marca : document.getElementById('mar').value.trim(),
                origen : document.getElementById('origen').value.trim(),
                bruto : document.getElementById('bruto').value.trim(),
                neto : document.getElementById('neto').value.trim(),
                unidad : document.getElementById('un').value,
                companie_id: document.getElementById('companieSelect').value,
                estado : document.getElementById('estado').value,
            }
            const res = await fetch(`${API_URL}/products/${actualGtin}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedProduct)
            })
            
            if(!res.ok) throw new Error('error fetch')
                displayProducts();
            alert('Product updated successfully');
            window.location.reload();
        }
}




async function newProduct() {
    addproduct.innerHTML = renderProductForm({ }, mode);

      const select = addproduct.querySelector('#companieSelect');

    const companies = await getCompanies();

    companies.forEach(companie => {
        let option = document.createElement('option')

        option.value = companie.id
        option.textContent = companie.nombre;
        select.appendChild(option);
    })

    const formProduct = addproduct.querySelector('#productForm');
    formProduct.addEventListener('submit', handleSubmitProduct);
}




async function newCompanie() {
    addCompanie.innerHTML = renderCompanieForm({ }, mode);
    const companieForm = addCompanie.querySelector('#companieForm')
    companieForm.addEventListener('submit', handleSubmitCompanie)
}


let actualCompanie = null
async function updateCompanie(id) {
    mode = 'edit';
    const modal = document.getElementById('modal');

    modal.classList.add('visible')
    try {
        const data = await fetchURL(`companies/${id}`)
        console.log(data);
        
        const companie = data[0];
        console.log(companie);
        
    
        modal.innerHTML = renderCompanieForm(companie, mode);
    
    
        
        actualCompanie = companie.id
        
        console.log(actualCompanie);
        const companieForm = modal.querySelector('#companieForm');
    
        modal.querySelector('.cancelBtn').onclick = () => modal.classList.remove('visible');

        companieForm.addEventListener('submit', handleSubmitCompanie)

    } catch (err) {
        console.error(err);
    }
}


async function handleSubmitCompanie(e) {
    e.preventDefault();

    if(mode === 'add'){
        const newCompanie = {
            nombre : document.getElementById('nombre').value.trim(),
            direccion : document.getElementById('direccion').value.trim(),
            telefono : document.getElementById('telefono').value.trim(),
            email : document.getElementById('email').value.trim(),
            estado : document.getElementById('estado').value
        }
        const res = await fetch(`${API_URL}/companies`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCompanie)
        })

        if(!res.ok) throw new Error('Error fetching URL');
        displayProducts()
        alert('Companie added successfully');
        window.location.reload();
    }else{
        const updatedCompanie = {
            nombre : document.getElementById('nombre').value.trim(),
            direccion : document.getElementById('direccion').value.trim(),
            telefono : document.getElementById('telefono').value.trim(),
            email : document.getElementById('email').value.trim(),
            estado : document.getElementById('estado').value
            
        }
        const res = await fetch(`${API_URL}/companies/${actualCompanie}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedCompanie)
        })
    
        if(!res.ok) throw new Error('error fetch')
            displayCompanies();
            alert('Companie updated successfully');
            window.location.reload();
        }
}


async function deleteProduct(gtin) {
    try {
        
        const data = await fetchURL(`products/${gtin}`)
        const product = data[0];
        console.log('product', product);
        
        if(product.estado === 1) {
            return alert('A product cannot be deleted if it is visible)');
        } else {
            let confirmation = confirm(`Are you sure to delete this product (${product.nombre})?`);
            if(confirmation) {
                const res = await fetch(`${API_URL}/products/${gtin}`, {
                    method: 'DELETE'
                })
                
                if(!res.ok) throw new Error('Error fetch');
                displayProducts();
            } else {
                return; 
            }
        }
    }catch (err) {
        console.error(err);
    }

}


//_____________________ PUBLIC API ______________________//


async function displayVisibleProducts(page = 1, limit = 10, query = '') {
    public.innerHTML = '';
    try {
        const res = await fetch(`http://localhost:3000/api/products.json?page=${page}&limit=${limit}&query=${encodeURIComponent(query)}`);

        if(!res.ok) throw new Error('Error fetching URL');

        const data = await res.json();

        const filter = inputGtin.value.toLowerCase();

        let filtered = data.filter(product => product.gtin.toLowerCase().includes(filter) || product.nombre.toLowerCase().includes(query.toLowerCase()));

        filtered.forEach(product => {
            let tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${product.nombre}</td>
                <td>${product.gtin}</td>
                <td>${product.descripcion}</td>
                <td>${product.companie_name}</td>
                <td>${product.origen}</td>
                <td>${product.bruto}${product.unidad}</td>
                <td>${product.neto}${product.unidad}</td>
                <td>
                    <button onClick="showProduct('${product.gtin}')">Ver</button>
                </td>
            `

            public.appendChild(tr);
        })
        
    } catch (err) {
        console.error(err);
    }
}


async function showProduct(gtin) {
    const modal = document.getElementById('modalPublic');
    try {
        const res = await fetch(`http://localhost:3000/api/products/${gtin}`);
        
        if(!res.ok) throw new Error('Error Fetching URL');

        const data = await res.json();

        const product = data[0];


        console.log(modal);
        modal.classList.add('visible');
        

        modal.innerHTML = `
            <div class="closeModal">
                <button class="closeBtn">X</button>
            </div>
            <h2>${product.nombre}</h2>
            <p><strong>GTIN: </strong>${product.gtin}</p>
            <p><strong>Descripcion </strong>${product.descripcion}</p>
            <p><strong>Compañia: </strong>${product.companie_name}</p>
            <p><strong>Origen: </strong>${product.origen}</p>
            <p><strong>Peso Bruto: </strong>${product.bruto}${product.unidad}</p>
            <p><strong>Peso Neto: </strong>${product.neto}${product.unidad}</p>
        `
        document.querySelector('.closeBtn').onclick = () => modal.classList.remove('visible')

    } catch (err) {
        console.error(err);
    }
}
