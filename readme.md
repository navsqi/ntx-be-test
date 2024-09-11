# NTX Solusi Teknologi Test - Nauval Shidqi

1. Lakukan Refactor function 'refactoreMe1' dan 'refactoreMe2' agar function tersebut lebih mudah dibaca. Pada proses Refactor wajib memakai query native (raw query). Dataset disediakan di folder files. ✅

Curl

```bash
curl --location 'http://localhost:3000/api/refactorme1'
```

Response

```
{
    "statusCode": 200,
    "success": true,
    "data": [
        137,
        248,
        357,
        465,
        27,
        0,
        0,
        0,
        0,
        0
    ]
}
```

Curl

```bash
curl --location 'http://localhost:3000/api/refactorme2' \
--header 'Content-Type: application/json' \
--data '{
  "userId": 3,
  "values": [100, 200, 300, 400]
}'
```

Response

```
{
    "statusCode": 201,
    "message": "Survey sent successfully!",
    "success": true,
    "data": {
        "id": 15,
        "values": [
            100,
            200,
            300,
            400
        ],
        "createdAt": "2024-09-11T10:40:58.388Z",
        "updatedAt": "2024-09-11T10:40:58.388Z",
        "userId": 3
    }
}
```

2. Buatkan endpoint berbasis websocket untuk melakukan fetch data dari api https://livethreatmap.radware.com/api/map/attacks?limit=10 dengan ketentuan fetch 3 menit sekali. Tulis code-mu di callmeWebSocket function.\*\*\*\* ✅

connect to web socket server

```bash
wscat -c ws://localhost:3000/websocket
```

3. Simpan data dari https://livethreatmap.radware.com/api/map/attacks?limit=10 ke database postgres, buatkan 1 endpoint sederhana untuk mendapatkan angka jumlah "destinationCountry" yang diserang dan "sourcecountry" yang menyerang. Tulis code-mu di getData function menggunakan query native (raw query). ✅

Curl

```bash
curl --location --request GET 'http://localhost:3000/api/threat/map/attack' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyMSIsImlhdCI6MTcyNjA1MjE1MiwiZXhwIjoxNzI2MDU1NzUyfQ.nTQ07LjfqJfL9VBVE3k68gXBoYX552adF1MF2sXqevI' \
--header 'Content-Type: application/json' \
--data '{
  "userId": 3,
  "values": [100, 200, 300, 400]
}'
```

Response

```
{
    "success": true,
    "statusCode": 200,
    "data": {
        "label": [
            "GB",
            "ID",
            "NL",
            "US",
            "AU",
            "IL",
            "IN",
            "US"
        ],
        "total": [
            "1",
            "1",
            "5",
            "6",
            "4",
            "4",
            "4",
            "1"
        ]
    }
}
```

4. Implementasikan redis catching pada saat melakukan fetch endpoint yang telah dibuat sebelumnya pada nomor 3. ✅
5. Buatkan middleware autentikasi jwt untuk melakukan proteksi API dan middleware yang berfungsi membatasi endpoint lain berdasarkan role user. Contoh: User A memiliki token valid, tetapi User A tidak memiliki role valid, sehingga User A tidak dapat membuka beberapa endpoint. ✅

if authorization header / bearer token is not provided then send response:

```
{
    "statusCode": 401,
    "success": false,
    "message": "You are not logged in! Please log in to get access"
}
```

if role not authorized then send response:

```
{
    "statusCode": 403,
    "success": false,
    "message": "You don't have permission to perform this action"
}
```

6. Buatkan unit test untuk melakukan test endpoint untuk memastikan endpoint tersebut berjalan dengan baik. ✅

simply run

```
npm run test
```

this command will run test cases & generate folder `coverage`

7. Push hasil test ke github. ✅
