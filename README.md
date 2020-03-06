# MixList

# Third Party

    Google OAUTH

# Server Documentation    

### Dependencies

| Package Name | Version |
| ------------ | ------- |
| bcrypt     | ^2.4.3  |
| cors         | ^2.8.5  |
| dotenv       | ^8.2.0  |
| express      | 4.17.1  |
| googleapis   | ^39.2.0 |
| jsonwebtoken | ^8.5.1  |
| pg           | ^7.18.1 |
| sequelize    | ^5.21.3 |
| @sendgrid/mail    | ^6.5.1 |

### Devpendencies

| Package Name | Version |
| ------------ | ------- |
| dotenv     | ^8.2.0  |

### Example .env

	DB_PASS=
	DB_USERNAME=
	secret=
	SENDGRID_API_KEY='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'

### Default Port

    SERVER = http://localhost:3000
    CLIENT = http://localhost:8080

## Server

    Tools: NodeJS, Express, sequelize, postgresql

## Table Responses

| Code | Description                                     |
| ---- | ----------------------------------------------- |
| 200  | Response Sukses                                 |
| 201  | Data berhasil ditambahkan                       |
| 400  | Request yang diberikan tidak lengkap atau salah |
| 403  | Tidak memiliki otoritas                         |
| 404  | Data tidak ditemukan / tidak ada                |
| 500  | Error dari sisi server / tidak diduga-duga :v   |


### USERS

| Url        | Method | Description                            |
| ---------- | ------ | -------------------------------------- |
| /users/register     | POST   | Menambahkan User baru                      |
| /users     | GET   | Mencari atau Melihat daftar Semua User                      |
| /users/login     | POST   | Mendapatkan token dan mengirim token ke client                      |
| /users/edit/:id     | PUT   | Mengganti Password atau Edit Password                      |


## API 

| No | API                                     	| Description |
| --- | -------------------------------------- 	| ----------- |
| 1.  | Last.fm                                 | Mencari judul-judul lagu|
| 2.  | SendGrid                       		| Untuk Mengirim Pemberitahuan bahwa email anda telah terdaftar|
| 3.  | Lyrics.Ovh 				| Mencari Lirik lagu berdasarkan nama lagu yang didapat dari "Last.fm"|



### 1. POST / Users / register

_Request header:_

```javascript
{
    "Content-Type": "application/json"
}
```

<br>

_Example Input (Request Body) :_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "123",	
}
```

_Response (201):_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "1aojadoa2sdasd4adplalaxlasclsml",	
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```


_Example Input (Request Body) :_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "",	
}
```

_Response ERROR (400):_

```javascript
{
	status: 400,
	msg: "Bad Request"
}
```
### 2. POST / users / login

<br>


_Request header:_

```javascript
{
    "Content-Type": "application/json"
}
```

<br>

_Example Input (Request Body) :_

```javascript
{
    "email": "marcel123@gmail.com",
    "password": "123",	
}
```

_Response (200):_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "1aojadoa2sdasd4adplalaxlasclsml",	
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```


_Example Error Input (Request Body) :_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "",	
}
```

_Response ERROR(400):_

```javascript
{
	status: 400,
	msg: "Password cannot empty."
}

```


### 3. GET / users 


_Response (200):_

```javascript
[
  {
    "id": 1,
    "username": "marcelus",
    "email": "marcel123456@gmail.com",
    "password": "$2b$10$I2JXLSnEFazR50WQ4EiMPuNsYlOgoQBwJMgqG33Q0IrFEZY8HlrFG",
    "createdAt": "2020-03-05T10:51:42.750Z",
    "updatedAt": "2020-03-05T10:51:42.750Z"
  },
  {
    "id": 2,
    "username": "marcellll",
    "email": "marcel1234555@gmail.com",
    "password": "$2b$10$WVYzEHBXfwd1X75iNUmA6OQMN80nrpXnp1VB7VZR/Gf8zGf3vGWlO",
    "createdAt": "2020-03-05T12:51:42.921Z",
    "updatedAt": "2020-03-05T12:51:42.921Z"
  }
]
```

_If the "data" was empty, the response will be :_

```javascript
"[]";
```

### 4. PUT / users

_Request header:_

```javascript
{
    "Content-Type": "application/json",
}
```

<br>

_Example Input (Request Body) :_

```javascript
{
    "email": "marcel123@gmail.com",
    "password": "123",	
}
```

_Response (200):_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "1aojadoa2sdasd4adplalaxlasclsml",	
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```


_Example Error Input (Request Body) :_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "",	
}
```

_Response ERROR(400):_

```javascript
{
	status: 400,
	msg: "Password cannot empty."
}

```


## Playlist


| Url        | Method | Description                            |
| ---------- | ------ | -------------------------------------- |
| /playlist     | POST   | Menambahkan playlist baru kedalam favorite                      |
| /playlist     | GET   | Mencari atau Melihat Playlist yang menjadi favorite User                     |
| /playlist/:id| PUT  | Mengedit Data playlist                      |
| /playlist/:id | DELETE   | Menghapus playlist dari table favorite                      |
| /playlist/search    | POST   | Mencari daftar playlist dari API                     |



### 1. POST /playlist

_Example Input (Request Body) :_

```javascript
{
"title": "Summer Paradise",
"artist": "Simple Plan"
}
```

_Response (201):_

```javascript
{
    "id": 1,
    "title": "summer paradise",
    "artist": "simple plan",
    "UserId": 1,
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"

}
```

### 2.  GET / playlist

_Response (200):_

```javascript
[
{
    "id": 1,
    "title": "summer paradise",
    "artist": "simple plan",
    "UserId": 1,
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"

},
{
    "id": 2,
    "title": "paradise",
    "artist": "coldplay",
    "UserId": 1,
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
]
```


### 3.  PUT / playlist /:id


_Example Input (Request Body) :_

```javascript
{
"title": "Summer Paradise",
"artist": "Simple Plan"
}
```
_Response (200):_

```javascript
{
    "id": 2,
    "title": "paradise",
    "artist": "coldplay",
    "UserId": 1,
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}

```


_Example Input (Request Body) :_

```javascript
{
"title": "Summer Paradise",
"artist": ""
}

```
_Response ERROR (400):_

```javascript
{
  "status": 400,
  "msg": "Artist cannot be empty."
}

```

### 4.  DELETE / playlist /:id



_Example Input (Request Params) :_

```javascript

 req.params.id = 2

```

	
_Response (200):_

```javascript
{
    "id": 2,
    "title": "paradise",
    "artist": "coldplay",
    "UserId": 1,
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}

```


_Example Error Input (Request Body) :_

```javascript
req.params.id = 2
```


_Response ERROR (404):_

```javascript
{
  status: 404
  msg: 'error not found'
}

```

### 5.  POST / playlist / search


_Example Input (Request Body) :_

```javascript

let search = req.body.search;
let url = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${search}&api_key=6d06b477bb91e3e396f172130f7952a3&format=json`;
axios.get(url)

```

_Response (200):_

```javascript
[{
    "id": 2,
    "title": "paradise",
    "artist": "coldplay",
    "UserId": null,
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
},
{
    "id": 12,
    "title": "paradise",
    "artist": "coldplay",
    "UserId": null,
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}]

```


_Example Input (Request Body) :_

```javascript
{
"title": "Summer Paradise",
"artist": ""
}

```
_Response ERROR(400):_

```javascript
{
  "status": 400,
  "msg": "Artist cannot be empty."
}
```