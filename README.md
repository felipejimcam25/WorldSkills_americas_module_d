### Product & Company Management System

WorldSkills Americas – Santiago 2025

This project was developed as a technical challenge during WorldSkills Americas 2025 (Santiago, Chile).
It focuses on building a simplified product management system with a public API, a public product page, and a protected administration panel.

The solution was designed to be completed within a limited time frame (approximately 3 hours), while maintaining basic standards of code quality, server-side validation, and accessibility.

###📌 Project Overview

In Latin America, the trade of local food products plays an important economic and cultural role. Products such as Brazilian coffee, Argentine yerba mate, Ecuadorian cocoa, and Dominican vanilla are part of the region’s identity.

This project allows an administrator to:

-Register companies and their products

-Expose visible products through a public JSON API

-Display product information on a public web page

-Manage data through a secure admin dashboard

###🚀 Features
#🔐 Administration Panel

Access protected by a passphrase-based login

Dashboard to:

-Create, update, and delete companies

-Create, update, and delete products

-Products can only be deleted if they are marked as hidden

-Companies can be set as active or inactive

###🌐 Public API

Returns only visible products belonging to active companies

Supports:

-Keyword search

-Pagination

-Provides detailed product information by GTIN

###📄 Public Product Page

Public HTML page that displays:

-Product name

-GTIN

-Description

-Brand

-Company

-Country of origin

-Gross and net weight

-Includes pagination in the public product listing

-Simple, and accessible design

###🔗 API Endpoints
#Public API
Method	Endpoint	Description
GET	/api/products.json?query=&page=1&limit=10	List of visible products
GET	/api/products/:gtin	Public product detail

#Admin API (Login Required)
Method	Endpoint	Description
POST	/admin/login	Admin login
GET	/api/admin/companies	List companies
POST	/api/admin/companies	Create company
PUT	/api/admin/companies/:id	Update company
GET	/api/admin/product	List products
POST	/api/admin/products	Create product
PUT	/api/admin/products/:gtin	Update product
DELETE	/api/admin/products/:gtin	Delete product (only if hidden)

###📋 Data Model & Validations
-Companies

-Name

-Address

-Phone

-Email

-Status (active / inactive)

-Products

-GTIN (13–14 digits, unique, server-side validated)

-Name

-Description

-Brand

-Country of origin

-Gross weight

-Net weight

-Unit

-Hidden status (visible / hidden)

##Business Rules

-Products from inactive companies are not shown in the public API

-Hidden products are never displayed publicly

-Product detail endpoint returns 404 if:

-GTIN does not exist

-Product is hidden

-Company is inactive

###🧑‍💻 Technologies

-Backend: Node.js/Express

-Database: MySQL

-Frontend: HTML, CSS, JavaScript

-API Format: JSON

#⚠️ This project is not deployed yet and runs locally.

###▶️ How to Run Locally

Clone the repository:

-git clone https://github.com/felipejimcam25/WorldSkills_americas_module_d.git


-Install dependencies (if applicable)

-Configure the database (MySQL)---Always with module_d name

-Start the server

###Access:

Admin panel: http://localhost:3000/admin/login
Credentials: Username: admin, pass: 12345678 

Public products page: http://localhost:3000/public/producto/:gtin

### 🏁 Competition Context

Event: WorldSkills Americas 2025

Location: Santiago, Chile

Category: Web Technologies

Time Constraint: ~3 hours

Focus: Backend logic, API design, validation, and frontend integration

📌 Notes

No image handling included

No mandatory multilingual support

Designed for clarity, simplicity, and correctness under time constraints
