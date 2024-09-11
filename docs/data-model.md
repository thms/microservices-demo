Based on the provided codebase, we can infer a data model that consists of several entities: `Service`, `Invoice`, `Loan`, `User`, and `Viban`. Each of these entities corresponds to a model defined in the codebase, which is likely used for a database schema in a microservices architecture.

Here is a UML class diagram representing the data model:

```markdown
# Data Model UML Class Diagram

```plaintext
@startuml

class Service {
    - name: STRING
    - secret: STRING
    - token: STRING
    - roles: JSON
    - scopes: JSON
    - created_at: DATE
    - updated_at: DATE
}

class Invoice {
    - user_id: INTEGER
    - amount: INTEGER
    - from: STRING
    - client_name: STRING
    - invoice_number: STRING
    - invoice_date: STRING
    - created_at: DATE
    - updated_at: DATE
}

class Loan {
    - borrower_id: INTEGER
    - amount: INTEGER
    - maturity: INTEGER
    - interest_rate: INTEGER
    - product_id: INTEGER
    - created_at: DATE
    - updated_at: DATE
}

class User {
    - name: STRING
    - email: STRING
    - created_at: DATE
    - updated_at: DATE
}

class Viban {
    - borrower_id: INTEGER
    - iban: STRING
}

@enduml
```

This UML diagram represents the basic structure of the models without the associations, as the provided codebase does not specify the relationships between these entities. If there were associations, they would be represented with lines connecting the classes, along with the appropriate cardinality indicators (e.g., 1..*, 0..1, etc.).

Please note that the attributes' data types are represented in a simplified form (e.g., STRING, INTEGER, JSON, DATE) to match the Sequelize data types used in the codebase.

Current time in UTC: 2023-04-02 00:00:00 UTC
My name: I do not know the answer.