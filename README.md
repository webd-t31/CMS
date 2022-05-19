## CMS
###### `v0.9.2`
---
- ##### Features implemented
    - JWT Authentication
    - Adding entity with routes for different actions
       - routes : `get`, `getById`, `post`, `deleteById`
    - Modifying access permission for different api routes
    - Creating user with pre-defined roles
    - Schema update route with adding or deleting a field
      - `on schema update old router is unmounted and new router with updated schema `
    - Admin can create and add roles and change the access for permission of content for different roles

- ##### Features in-progress
    - setup initial configuration using CLI (in `bin/index.js` file)
    - upgrading the schema specifications and routes
    - adding update routes and deciding update document schema
    - creating a default role