# Apollo Connector Gen - Frontend

This app needs to be run along [Apollo Connector Generator](https://github.com/fernando-apollo/apollo-connector-gen). Head over to <https://github.com/fernando-apollo/apollo-connector-gen> and clone the repo.

Then, create a `docker-compose.yml` file:

```yaml
name: 'apollo-connector-gen'

services:
  generator:
    container_name: generator
    image: apollographql/apollo-connector-gen
    build:
      context: ./apollo-connector-gen
      dockerfile: Dockerfile
    ports:
      - '8080:8080'

  frontend:
    container_name: frontend
    image: apollographql/apollo-connector-gen-frontend
    build:
      context: ./apollo-connector-gen-frontend
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    depends_on:
      - generator
    command: npm run dev --port
```

And execute `docker compose up` to run both projects.

Once the containers have started, head over to <http://localhost:3000/> and upload your OAS / Swagger spec.
