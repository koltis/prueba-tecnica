FROM node:20

WORKDIR /app

COPY  package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

ENV JWT_SECRET="klthl6apiyi5*Ed3p_ep5If0pepro#tu3lfRu@l9"

ENV SESSION_SECRET="l6a0p*Ed3p_eepro#tklthl6apipiyi5*Ed"

ENV DATABASE_HOST="db"

EXPOSE  8080

RUN npm run build

RUN npm run seed

CMD ["npm" , "start"]