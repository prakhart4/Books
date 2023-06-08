## User Routes

### Get User Details

Returns the details of the authenticated user.

- **URL**: `/api/user/`
- **Method**: `GET`
- **Auth Required**: Yes
- **Middleware**: `authenticateToken`
- **Handler**: `getUser`

### Sign Up

Creates a new user account.

- **URL**: `/api/user/signup`
- **Method**: `POST`
- **Handler**: `signupUser`

### Sign In

Authenticates the user and generates a JWT token.

- **URL**: `/api/user/signIn`
- **Method**: `POST`
- **Handler**: `signInUser`

### Get Orders

Returns the orders of the authenticated user.

- **URL**: `/api/user/orders`
- **Method**: `GET`
- **Auth Required**: Yes
- **Middleware**: `authenticateToken`
- **Handler**: `getOrders`

### Cancel Order

Cancels a specific order for the authenticated user.

- **URL**: `/api/user/cancel-order/:orderId`
- **Method**: `DELETE`
- **Auth Required**: Yes
- **Middleware**: `authenticateToken`
- **Handler**: `cancelOrder`

### Delete All Users

Deletes all user records. (TODO: Remove this route)

- **URL**: `/api/user/deleteAll`
- **Method**: `DELETE`
- **Handler**: `deleteAllUsers` (TODO: Remove this handler)

## Book Routes

### Get All Books

Returns all books.

- **URL**: `/api/book/`
- **Method**: `GET`
- **Handler**: `getBooks`

### Create Books

Creates new books.

- **URL**: `/api/book/createBooks`
- **Method**: `POST`
- **Handler**: `createBook`

### Search Books

Searches books based on provided query parameters.

- **URL**: `/api/book/search`
- **Method**: `GET`
- **Handler**: `searchBooks`

### Get Book by ID

Returns a specific book by its ID.

- **URL**: `/api/book/:id`
- **Method**: `GET`
- **Handler**: `getBook`

### Buy Book

Allows the authenticated user to purchase a book.

- **URL**: `/api/book/buy`
- **Method**: `POST`
- **Auth Required**: Yes
- **Middleware**: `authenticateToken`
- **Handler**: `buyBook`

### Delete All Books

Deletes all book records.

- **URL**: `/api/book/deleteAll`
- **Method**: `DELETE`
- **Handler**: `deleteAllBooks` (TODO: Remove this handler)
