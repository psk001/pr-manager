# Local Test Postman Collection

## Overview
This Postman collection provides a set of API requests for testing a local environment. The APIs included in this collection cover various functionalities related to roles, users, pull requests, approvals, comments, and more. It is designed to interact with a local server running on `localhost` at port `8008`.

## Usage

1. **Roles:**
   - **GET Roles:** Retrieve information about roles.
   - **POST Roles:** Create a new role.

2. **Users:**
   - **GET Users:** Retrieve information about users.
   - **POST User:** Create a new user.

3. **Pull Requests:**
   - **POST Pull Request:** Create a new pull request.
   - **GET Pull Request:** Retrieve information about a specific pull request.

4. **Approvals:**
   - **POST Approval:** Add an approval for a specific pull request.
   - **GET Approval:** Retrieve approval status for a specific pull request.

5. **Comments:**
   - **POST Comment:** Add a comment to a specific pull request.
   - **GET Comments:** Retrieve comments for a specific pull request.

## Requests

### Roles
#### GET Roles
- **Method:** GET
- **URL:** `localhost:8008/roles`
- **Body:**
  ```json
  {
      "roleName": "Reviewer"
  }
  ```
#### POST Roles
- **Method:** POST
- **URL:** `localhost:8008/roles`
- **Body:**
  ```json
  {
      "roleName": "Reviewer"
  }
  ```

### Users
#### GET Users
- **Method:** GET
- **URL:** `localhost:8008/users`

#### POST User
- **Method:** POST
- **URL:** `localhost:8008/users`
- **Body:**
  ```json
  {
      "name": "abc6",
      "email": "abc6@m.c",
      "password": "abc6",
      "roles": [
          "65aeac6ab87583abfd346449"
      ]
  }
  ```

### Pull Requests
#### POST Pull Request
- **Method:** POST
- **URL:** `localhost:8008/pull-requests`
- **Body:**
  ```json
  {
      "title": "Req 2",
      "description": "changes 2",
      "requesterId": "65acde0968c6a6f29696aea1",
      "approvers": [
          {
              "approverId": "65acde2268c6a6f29696aea7"
          },
          {
              "approverId": "65acde2f68c6a6f29696aeaa"
          }
      ],
      "mode": "Sequential"
  }
  ```

#### GET Pull Request
- **Method:** GET
- **URL:** `localhost:8008/pull-requests/65ad293781e1a7c63c680a34`

### Approvals
#### POST Approval
- **Method:** POST
- **URL:** `localhost:8008/pull-requests/65ad293781e1a7c63c680a34/approvals`
- **Body:**
  ```json
  {
      "approverId": "65acde2268c6a6f29696aea7",
      "status": "Rejected"
  }
  ```

#### GET Approval
- **Method:** GET
- **URL:** `localhost:8008/pull-requests/65ad293781e1a7c63c680a34/approvals`
- **Body:**
  ```json
  {
      "approverId": "65acddf068c6a6f29696ae9b",
      "status": "Approved"
  }
  ```

### Comments
#### POST Comment
- **Method:** POST
- **URL:** `localhost:8008/pull-requests/65ad293781e1a7c63c680a34/comments`
- **Body:**
  ```json
  {
      "comment": "code quality",
      "userId": "65acddf068c6a6f29696ae9b"
  }
  ```

#### GET Comments
- **Method:** GET
- **URL:** `localhost:8008/pull-requests/65ad293781e1a7c63c680a34/comments`

