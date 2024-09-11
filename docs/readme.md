## Microservices Demo

This repository contains a demo of a microservices architecture, showcasing various services and their interactions.

**Repository:** [thms/microservices-demo](https://github.com/thms/microservices-demo)

### Services

The demo includes the following microservices:

* **Authentication Service:**
    * **API:**
        * `/`: Healthcheck endpoint
        * `/services`: List all services
        * `/services`: Create a new service
        * `/keys/public`: Get public key for JWT verification
        * `/tokens`: Get access token using client credentials grant type
    * **Data Model:**
        * `Service`: Stores service information (name, secret, roles, scopes)
    * **Business Logic:**
        * Authenticates services using client credentials grant type
        * Generates JWT access tokens with roles and permissions
        * Provides public key for JWT verification
    * **Events Consumed:** None
    * **Events Published:** None
* **User Service:**
    * **API:**
        * `/`: Healthcheck endpoint
        * `/users`: List all users
        * `/users`: Create a new user
        * `/users/:id`: Get user by ID
        * `/users?email=:email`: Get user by email
        * `/contract-testing/state`: Set state for contract testing
    * **Data Model:**
        * `User`: Stores user information (name, email)
    * **Business Logic:**
        * Manages user creation and retrieval
        * Provides data for contract testing
    * **Events Consumed:** None
    * **Events Published:** None
* **Loan Service:**
    * **API:**
        * `/`: Healthcheck endpoint
        * `/loans`: List all loans
        * `/loans`: Create a new loan
        * `/loans/:id`: Get loan by ID
        * `/loans?borrower_id=:borrower_id`: Get loans for a borrower
        * `/info/datastores`: Get datastore schema
    * **Data Model:**
        * `Loan`: Stores loan information (borrower_id, amount, maturity, interest_rate, product_id)
    * **Business Logic:**
        * Manages loan creation and retrieval
        * Provides datastore schema for documentation
    * **Events Consumed:** None
    * **Events Published:** None
* **Loan Factory Service:**
    * **API:**
        * `/`: Healthcheck endpoint
        * `/loans`: Create a new loan application
        * `/info/datastores`: Get datastore schema
    * **Data Model:** None
    * **Business Logic:**
        * Orchestrates loan application process
        * Calls other services (User, Scoring, Installment Calculator, Loan)
        * Provides datastore schema for documentation
    * **Events Consumed:** None
    * **Events Published:** None
* **Scoring Service:**
    * **API:**
        * `/`: Healthcheck endpoint
        * `/scores`: Score a loan application
    * **Data Model:** None
    * **Business Logic:**
        * Evaluates loan applications based on predefined criteria
        * Returns approval status, interest rate, amount, and maturity
    * **Events Consumed:** None
    * **Events Published:** None
* **Installment Calculator Service:**
    * **API:**
        * `/`: Healthcheck endpoint
        * `/installment-plans`: Calculate installment plan for a loan
    * **Data Model:** None
    * **Business Logic:**
        * Calculates installment plan based on loan amount, maturity, and interest rate
    * **Events Consumed:** None
    * **Events Published:** None
* **Viban Service:**
    * **API:**
        * `/`: Healthcheck endpoint
        * `/vibans`: List all IBANs
        * `/vibans/:id`: Get IBAN by ID
        * `/vibans?borrower_id=:borrower_id`: Get IBANs for a borrower
        * `/info/datastores`: Get datastore schema
    * **Data Model:**
        * `Viban`: Stores IBAN information (borrower_id, iban)
    * **Business Logic:**
        * Manages IBAN creation and retrieval
        * Provides datastore schema for documentation
    * **Events Consumed:** None
    * **Events Published:** None
* **Invoice Service:**
    * **API:**
        * `/`: Healthcheck endpoint
        * `/invoices`: List all invoices
        * `/invoices`: Create a new invoice
        * `/invoices/:id`: Get invoice by ID
        * `/invoices?user_id=:user_id`: Get invoices for a user
        * `/info/datastores`: Get datastore schema
    * **Data Model:**
        * `Invoice`: Stores invoice information (user_id, amount, from, client_name, invoice_number, invoice_date)
    * **Business Logic:**
        * Manages invoice creation and retrieval
        * Provides datastore schema for documentation
    * **Events Consumed:** None
    * **Events Published:** None
* **Document Generation Service:**
    * **API:**
        * `/`: Healthcheck endpoint
        * `/documents`: Generate a document (Markdown, HTML, PDF)
    * **Data Model:** None
    * **Business Logic:**
        * Renders documents from Markdown templates with data substitution
        * Supports Markdown, HTML, and PDF output formats
    * **Events Consumed:** None
    * **Events Published:** None

### Contract Testing

The demo includes contract testing between the Loan Factory Service and the User Service using Pact.

* **Consumer:** Loan Factory Service
* **Provider:** User Service
* **Pact File:** `contract-testing/pacts/loan-factory-service-user-service.json`

### Notes

* The demo uses Consul for service discovery.
* The demo uses JWT for authentication and authorization.
* The demo uses Sequelize for database interactions.
* The demo uses React Native for the mobile app.

This README provides a high-level overview of the microservices demo. For more detailed information, please refer to the codebase.
