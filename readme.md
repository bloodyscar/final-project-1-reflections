# Final Project 1 - Reflection API
========================
db_name : project1




**Requirment:**

1. Buat Rest API dengan menggunakan stack: ExpressJs, bcyrpt, jwt, pg. **********************************************************************(tidak boleh menggunakan sequelize)**********************************************************************
2. Menggunakan sql query untuk CRUD ke database
3. Password yang disimpan di database harus dihash
4. Implement Authentication dan Authorization menggunakan jwt
5. Setiap user hanya bisa CRUD terhadap Reflection miliknya sendiri
6. Table Users: id, email, password
7. Table Reflections: id, success, low_point, take_away, UserId, createdAt, updatedAt 
8. Relasi table Users ke Reflections (One to Many)

**Deadline: 03 Novemeber 2023 jam 23:59**

**Spec API**

- **POST /api/v1/users/register**
    
    *Request Body*
    
    ```markdown
    {
      "email": "<email>",
      "password": "<password>"
    }
    
    ```
    
    *Response (201 - Created)*
    
    ```markdown
    {
      "id": <given id by system>,
    	"email": "<email>"
    }
    
    ```
    
    *Response (400 - Bad Request)*
    
    ```markdown
    {
      "message": "Email already used!"
    }
    
    ```
    

- **POST /api/v1/users/login**
    
    *Request Body*
    
    ```markdown
    {
      "email": "<email>",
      "password": "<password>"
    }
    
    ```
    
    *Response (200)*
    
    ```markdown
    {
      "access_token": "<your access token>"
    }
    
    ```
    
    *Response (401)*
    
    ```markdown
    {
      "message": "Email or password invalid!"
    }
    
    ```
    

- **POST /api/v1/reflections ⇒ create reflection**
    
    *Request Body*
    

```markdown
{
  "success": "<posted success>",
  "low_point": "<posted low point>",
  "take_away": "<posted take away>",
}
```

*Request Header*

```markdown
{
  "Authorization": "bearer <your access token>"
}
```

*Response (201 - Created)*

```markdown
{
  "id": <given id by system>,
  "success": "<posted success>",
  "low_point": "<posted low point>",
  "take_away": "<posted take away>",
  "UserId": "<UserId>",
  "createdAt": "2023-04-20T07:15:12.149Z",
  "updatedAt": "2023-04-20T07:15:12.149Z",
}

```

*Response (401)*

```markdown
{
  "message": "Unauthorized"
}
```

- **GET /api/v1/reflections** **⇒ mendapatkan semua data reflections milikinya sendiri**
    
    *Request Header*
    
    ```markdown
    {
      "Authorization": "bearer <your access token>"
    }
    ```
    
    *Response (200)*
    
    ```markdown
    [
    	{
      "id": <given id by system>,
      "success": "<posted success>",
      "low_point": "<posted low point>",
      "take_away": "<posted take away>",
      "UserId": "<UserId>",
      "createdAt": "2023-04-20T07:15:12.149Z",
      "updatedAt": "2023-04-20T07:15:12.149Z",
    	}
    ]
    ```
    
    *Reponse (401)*
    
    ```markdown
    {
      "message": "Unauthorized"
    }
    ```
    

- **PUT /api/v1/reflections/:id ⇒ edit reflection miliknya sendiri**
    
    *Request Header*
    
    ```markdown
    {
      "Authorization": "bearer <your access token>"
    }
    ```
    
    *Request Param*
    
    ```markdown
    {
      "id": "<id reflections>"
    }
    ```
    
    *Request Body*
    
    ```markdown
    {
      "success": "<posted success>",
      "low_point": "<posted low point>",
      "take_away": "<posted take away>"
    }
    ```
    
    *Response (200)*
    
    ```markdown
    
    {
      "id": <given id by system>,
      "success": "<posted success>",
      "low_point": "<posted low point>",
      "take_away": "<posted take away>",
      "UserId": "<UserId>",
      "createdAt": "2023-04-20T07:15:12.149Z",
      "updatedAt": "2023-04-20T07:15:12.149Z",
    }
    
    ```
    
    *Response (401)*
    
    ```markdown
    {
      "message": "Unauthorized"
    }
    ```
    

- **DELETE /api/v1/reflections/:id ⇒ menghapus reflection sendiri**
    
    *Request Header*
    
    ```markdown
    {
      "Authorization": "bearer <your access token>"
    }
    ```
    
    *Request Params*
    
    ```markdown
    {
      "id": "<id reflections>"
    }
    ```
    
    *Response (200)*
    
    ```markdown
    {
      "message": "Success delete"
    }
    ```
    
    *Response (401)*
    
    ```markdown
    {
      "message": "Unauthorized"
    }
    ```