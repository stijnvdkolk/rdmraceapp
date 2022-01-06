## Api Routes

- /Teapot
    - Returned 418 en 'Do you have some time for tea?'
- /auth
    - POST /token
        - Json {Email, Password}
            - returned Json{token: "String"}
- /channels
    - GET /
        - returned JSON {channel[]} alle channels
    - GET /:id
        - returned JSON {channel} een enkele channel met :id als channel
    - GET /:id/messages
        - returned Json {messages[]} | Not allowed;  alle messages uit de channel of not allowed
    - POST /:id/messages
        - returned JSON {message}; Post een message
    - PATCH /:id/messages/:messageId
        - returned JSON {message}; edit een message met :messageId als param
    - DELETE /:id/messages/:messageId
        - returned JSON {message}; verwijderd een bericht met :messageId als param

## Page routes

-  /Login
    - Login page
- /Signup
    - Sign up page
- /Chat/:channelID
    - Chat met al een window open
- /Chat
    - Chat zonder window open
- /Invalid
    - Invalid Link
- /Admin/:personId
    - Admin pannel met PersonID in window
- /Admin
    - Admin pannel zonder window open
- /
    - Debug