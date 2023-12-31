# API-Banking-System

## Entity Relationship Diagram

![Challenge 4](https://github.com/rasyadpras/API-Banking-System/assets/106673670/af5ea9f8-5c77-4ee1-a174-4bf7fe9aee75)


## Delivery

1. Inisialisasi proyek Express.js dengan menggunakan perintah npm init -y
2. Instal Express.js dan Prisma.js dengan menjalankan perintah npm install express prisma
3. Implementasikan server Express.js dengan beberapa endpoint yang memanfaatkan Prisma.js untuk berinteraksi dengan basis data PostgreSQL yang telah Anda buat pada Challenge 3
4. Contoh endpoint: /accounts untuk mengambil daftar akun, /deposit untuk melakukan deposit, /withdraw untuk melakukan penarikan, dan lainnya
5. Buatlah pull request dari branch feature ke branch main di repositori GitHub

## API Endpoint

| Endpoint                          |  Description                |
| :------------------------------   |  :------------------------  |
| `GET /api/v1/users`               |  Get all user data          |
| `GET /api/v1/users/:{id}`         |  Get user data by id        |
| `GET /api/v1/accounts`            |  Get all account data       |
| `GET /api/v1/accounts/:{id}`      |  Get user account by id     |
| `GET /api/v1/transactions`        |  Get all transaction data   |
| `GET /api/v1/transactions/:{id}`  |  Get user transaction by id |
| `POST /api/v1/users`              |  Add new user data          |
| `POST /api/v1/accounts`           |  Add new account data       |
| `POST /api/v1/transactions`       |  Add new transaction data   |

