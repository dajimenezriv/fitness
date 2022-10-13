# fitness

## Screenshots
 
![scanner](https://raw.githubusercontent.com/dajimenezriv/fitness/main/images/scanner.PNG)
![foods](https://raw.githubusercontent.com/dajimenezriv/fitness/main/images/foods.png)
![menu_details](https://raw.githubusercontent.com/dajimenezriv/fitness/main/images/menu_details.PNG)
![login](https://raw.githubusercontent.com/dajimenezriv/fitness/main/images/login.PNG)

## How to run?

Create a .env in the backend folder.

.env
```
SECRET_KEY='<SECRET_KEY>'

# testing/production
MODE='testing'

PORT=3001

DB_HOST=localhost
DB_NAME=fitness
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=<password>
```

```bash
cd backend
npm install
npm run dev
```

```
cd frontend
npm install
npm start
```
