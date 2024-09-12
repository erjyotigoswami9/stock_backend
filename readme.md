<div>
      <div>
        <div>
            <h1>
                STOCK BACKEND APP ASSIGNMENT
            </h1>
        </div>
        <div>
            <h3>
              Tech Stacks
            </h3>
            <div>
                <img width="50" height="50" src="https://img.icons8.com/?size=48&id=108784&format=png" alt="js" />
                <img width="50" height="50" src="https://img.icons8.com/?size=48&id=54087&format=png" alt="nodejs" />
                <img width="50" height="50" src="https://img.icons8.com/?size=48&id=PZQVBAxaueDJ&format=png" alt="expressjs" />
                <img width="50" height="50" src="https://img.icons8.com/?size=48&id=24895&format=png" alt="npm" />
                <img width="50" height="50" src="https://img.icons8.com/?size=48&id=bosfpvRzNOG8&format=png" alt="mongoDB"/>
                <img width="50" height="50" src="https://cdn.iconscout.com/icon/free/png-512/free-postman-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-5-pack-logos-icons-2945092.png?f=webp&w=256" alt="postmanAPI"/>
                <img width="50" height="50" src="https://cdn-icons-png.flaticon.com/128/733/733553.png" alt="git"/>
            </div>
            <p>
                This backend app has the following functionality and features :
                <ul>
                    <li>----------USER AUTHENTICATION AND MANAGEMENT----------</li>
                    <li>User Registration using email, password, username (req.body) [POST request]</li>
                    <li>User Login using email, password (req.body) and generate jsonwebtoken [POST request]</li>
                    <li>External npm modules used:- express, mongoose, nodemon, bcrypt, jsonwebtoken, dotenv etc.</li>
                    <li>User can update bio, profile picture(link maybe drive or github link image generation etc) and username [PUT request] token after login can passed in the headers</li>
                    <li>Get user details bio, username, userId after generation of document from mongoDB collection user, and profile picture link [GET request] </li>
                    <li>-------------STOCK POST MANAGEMENT------------</li>
                    <li>Create a post for stock, passing stock symbol, tags, title, description through (req.body) [POST request]</li>
                    <li>Get all stock data through endpoint '/api/posts' [GET request] and also if applied filters through (req.query)  e.g. '/api/posts?limit=1&&page=2' for pagination , '/api/posts?stockSymbol=AAPL&&tags=tag1&&sortByDate=2024-09-12' for getting sorted and filtered data</li>
                    <li>To get single stock data passing postId in (req.params) in endpoint e.g. '/api/posts/66e31b4890ecf54f9c926d27' [GET request]</li>
                    <li>Delete a stock post passing postId in (req.params) and authorize token after login to (req.headers) and if token after decrypting from jsonwebtoken module of npm, allow user to enter into system to do crud operations, auth middleware is used for that purpose for authorization [DELETE request]</li>
                    <li>-------------COMMENT MANAGEMENT----------------</li>
                    <li>Add a comment only after authorization of token through auth middleware, so that only registered user can add a comment to a post using postId passing in the (req.params) and comment body through (req.body) through [POST request]</li>
                    <li>Deleting a comment, only two users are allowed for that purpose, one who created the post on which comment is added or the other one is who added a comment is authorized to delete a comment, else no other user can delete any other one's comment, so reliable backend is designed efficiently with the error handling purpose of using try-catch block suitably whenever required and setting send status according to the result processing [DELETE request]</li>
                    <li>------------------LIKE SYSTEM--------------------</li>
                    <li>Like a post can be done by registered user only after login through token passed in headers and user verified in the middleware authorization code as well to adding a like, if user already liked a post and getting a post request again, then nothing will change in the database collection of like and same case handled in the code as well through conditional statements [POST request]</li>
                    <li>Unliking a post if postId exists as per the userId after login , if postId or userId not exists then no modification done and also if user already unliked a post then no change happens in the collection databse of like [DELETE request]</li>
                    <li>Pagination concepts handled through mongoDB query by skip and limit after finding or aggregating the result from the respective collection of database AltDB </li>
                    <li></li>
                    <br>
                    <li>PostmanAPI used for CRUD operations with various endpoints on the server and to interact with the databse MongoDB efficiently used locally and using Visual Studio code editor for working with the API's to develop backend application as per industry standards</li>
                    <li></li>
                    <br>
                    <li>How to run :-</li>
                    <li>use commands:-</li>
                    <li>npm i , to install all the dependencies for the project</li>
                    <li>npm run dev , to start the server, i use nodemon so that no need to again and again restart server</li>
                    <li></li>
                    <br>
                    <li>used port no 8000 to run backend app, so that it would be free for use locally, as react runs on 3000 port no, so to avoid conflict in future, different post numbers are used</li>
                    <li>Password is hashed so that user privacy maintained, as credentials stored in hash format into the database</li>
                    <li>JWT secret key is used in .env file and other informations about the project</li>
                    <br>
                    <li>For details about problem statement , <a href="/backend/assignmentProblem/assignment_problem.docx" target="_blank"> 📃</a></li>
                    <br>
                    <li>I must appreciate your patience and understanding to read and understand my work</li>
                    <li>Thank you for giving your conscious valuable time and efforts for looking at my project</li>
                    <li>For collaboration, feel free to connect👋, i'd be glad to join!</li>
                    <br>
                </ul>
            </p>
        </div>
        <div>
            <a href="https://github.com/erjyotigoswami9/stock_backend" target="_blank">
            <div>
              <img width="30" height="30" src="https://cdn-icons-png.flaticon.com/128/733/733553.png" alt="githubRepoLink"/>
              <p>Github Repository Link</p>
            </div>
            </a>
        </div>
      </div>
    </div>
