# SD Kudangan 2 
This project for SD Kudangan 2 Learning Management System and School Management System

## Preparing 
```bash
  git clone 
```

## Installation Dependencies

### Install Packages
```bash
  npm install
```

### Install Prisma
```bash
  npm install prisma
```

### Initation Database Using Prisma
```bash
  npx prisma init
```

### Migrate Prisma into Database
```bash
  npx prisma migrate dev --name init
```
    
### Install Prisma Client
```bash
  npm install @prisma/client
```

## Database Seeding

### Adding Prisma Seeding into "package.json"
```json
# Using non Next JS
"prisma": {
    "seed": "ts-node prisma/seed.ts"
  },

# Using NextJS
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
},
```

### Install ts-node "for typescript node.js"
```bash
npm i -d ts-node
```

### Seeding the database
```bash
npx prisma db seed
```
### Force Reset Database
```bash
npx prisma db pus --force-reset
```

## Running the Project
1. Runing Prisma Studio
```bash
npx prisma studio
```
2. Running the Project
```bash
npm run dev
```


