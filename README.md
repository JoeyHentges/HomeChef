## WORK IN PROGRESS

To start the server run:

- pnpm dev
- pnpm mockserver
- npx prisma studio

To migrate / deploy prisma changes:

- npx prisma migrate dev

To seed the prisma db:

- Log in to the app using a "Google" account
- npx prisma db seed

To Destroy / Remove the seeded data in db:

- ts-node --compilerOptions {\"module\":\"CommonJS\"} prisma/destroy.ts

# Work to Come

- complete recipe editing
- add a create new recipe page
- add advanced recipe search
- incorporate advanced recipe search in "saved" recipes page
- create "random" recipe feature
- Create "Profile" view for user's recipes - like a public page to view a users created recipes
