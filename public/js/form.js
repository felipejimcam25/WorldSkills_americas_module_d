
//PRODUCT FORM, IT RETURN THE FORM DEPENDS ON THE MODE, IF MODE === ADD JUST THE FORM ELSE IT RETURNS THE FORM WITH VALUES FROM DB
function renderProductForm(product, mode) {
    console.log(product);
    
    if(mode === 'add'){

        return `
        <form action="#" id="productForm">
            <div class="formControl helpControl">
                <label for="gtin">Gtin: 
                </label>
                <input type="text" name="gtin" id="gtin" required minlength="13" maxlength="14">
                <span class="help">?</span>
            </div>
            <div class="formControl">
                <label for="nombre">Name: </label>
                <input type="text" name="nombre" id="nombre" required>
            </div>
            <div class="formControl">
                <label for="des">Description: </label>
                <input type="text" name="descripcion" id="des" required>
            </div>
            <div class="formControl">
                <label for="mar">Brand: </label>
                <input type="text" name="marca" id="mar" required>
            </div>
            <div class="formControl">
                <label for="origen">Origin: </label>
                <input type="text" name="origen" id="origen" required>
            </div>
            <div class="formControl">
                <label for="bruto">Gross Weight: </label>
                <input type="number" name="bruto" id="bruto" required>
            </div>
            <div class="formControl">
                <label for="neto">Net Weight: </label>
                <input type="number" name="neto" id="neto" required>
            </div>
            <div class="formControl">
                <label for="un">Unit: </label>
                <input type="text" name="unidad" id="un" placeholder="e.g: kg, lb" required>
            </div>
            <div class="formControl">
                <label for="companieSelect">Companie: </label>
                <select name="companie_id" id="companieSelect" required>
                    <option value="">Select Companie</option>
                </select>
            </div>
            <div class="formControl">
                <label for="un">State: </label>
                <select name="estado" id="estado" required>
                    <option value="1">Visible</option>
                    <option value="0">Hidden</option>
                </select>
            </div>
            <button type="submit">Add</button>
        </form>
        `
    }else {
        return `
        <form action="" id="productForm">
        <div class="formControl">
            <label for="nombre">Name: </label>
            <input type="text" name="nombre" id="nombre" required value="${product.nombre}">
        </div>
        <div class="formControl">
            <label for="des">Description: </label>
            <input type="text" name="descripcion" id="des" required value="${product.descripcion}">
        </div>
        <div class="formControl">
            <label for="mar">Brand: </label>
            <input type="text" name="marca" id="mar" required value="${product.marca}">
        </div>
        <div class="formControl">
            <label for="origen">Origin: </label>
            <input type="text" name="origen" id="origen" required value="${product.origen}">
        </div>
        <div class="formControl">
            <label for="bruto">Gross Weight: </label>
            <input type="number" name="bruto" id="bruto" required value="${product.bruto}">
        </div>
        <div class="formControl">
            <label for="neto">Net Weight: </label>
            <input type="number" name="neto" id="neto" required value="${product.neto}">
        </div>
        <div class="formControl">
            <label for="un">Unit: </label>
            <input type="text" name="unidad" id="un" required value="${product.unidad}">
        </div>
        <div class="formControl">
            <label for="companieSelect">Companie: </label>
            <select name="companie_id" id="companieSelect" required>
                
            </select>
        </div>
        <div class="formControl">
            <label for="un">State: </label>
            <select name="estado" id="estado">
                <option value="1">Visible</option>
                <option value="0">Hidden</option>
            </select>
        </div>
        <button type="submit">Update </button>
        <button type="button" id="cancelBtn">Cancel</button>
    </form>
        `;
    }
    
}

//COMPANIE FORM, IT RETURN THE FORM DEPENDS ON THE MODE, IF MODE === ADD JUST THE FORM ELSE IT RETURNS THE FORM WITH VALUES FROM DB
function renderCompanieForm(companie, mode) {
    if(mode === 'add') {
        return `
            <form action="#" id="companieForm">
        <div class="formControl">
            <label for="nombre">Name: </label>
            <input type="text" name="nombre" id="nombre" required >
        </div>
        <div class="formControl">
            <label for="nombre">Direction: </label>
            <input type="text" name="direccion" id="direccion" required >
        </div>
        <div class="formControl">
            <label for="nombre">Phone: </label>
            <input type="text" name="telefono" id="telefono" required >
        </div>
        <div class="formControl">
            <label for="nombre">Email: </label>
            <input type="email" name="email" id="email" required >
        </div>
        
        <div class="formControl">
            <label for="un">State: </label>
            <select name="estado" id="estado">
                <option value="1">Visible</option>
                <option value="0">Hidden</option>
            </select>
        </div>
        <button type="submit">Add</button>
    </form>
        `
    }else {
        return `
        <form action="" id="companieForm">
        <div class="formControl">
            <label for="nombre">Name: </label>
            <input type="text" name="nombre" id="nombre" required value="${companie.nombre}" >
        </div>
        <div class="formControl">
            <label for="direcion">Direction: </label>
            <input type="text" name="direccion" id="direccion" required  value="${companie.direccion}" >
        </div>
        <div class="formControl">
            <label for="telefono">Phone: </label>
            <input type="text" name="telefono" id="telefono" required  value="${companie.telefono}">
        </div>
        <div class="formControl">
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" required value="${companie.email}" />
        </div>
        
        <div class="formControl">
            <label for="estado">State: </label>
            <select name="estado" id="estado">
                <option value="1" ${companie.estado == 1 ? 'selected' : ''}>Visible</option>
                <option value="0" ${companie.estado == 0 ? 'selected' : ''}>Oculto</option>
            </select>
        </div>
        <button type="submit">Update</button>
        <button type="button" class="cancelBtn">Cancel</button>
    </form>
        
        `
    }
}