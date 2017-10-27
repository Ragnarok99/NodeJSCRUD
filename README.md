# NodeJSCRUD

### Getting Started

For getting started with this repo.

```
> git clone https://github.com/Ragnarok99/NodeJSCRUD
> cd NodeJSCRUD
> npm install
> nodemon server.js
> open localhost:3000
```

### Endpoints

```
> GET     - /api/providers       -> no body needed
> POST    - /api/new_provider    -> body-raw data e.g. {property1: <property>, property2:<property>, ...}
> DELETE  - /api/remove_provider -> body-raw data e.g. {id: <mongo id of element>}
> PUT     - /api/update_provider -> body-raw data e.g. {id: <mongo id of element>, property1: <property>, property2:<property>, ...}
```