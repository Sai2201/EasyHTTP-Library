/**
 * Creating Custom HTTP REST API using ES5 with AJAX
 */

const http = new easyHttp;

document.getElementById('get').addEventListener('click', getUsers);
document.getElementById('post').addEventListener('click', createUser);
document.getElementById('put').addEventListener('click', modifyUser);

/**
 * Retrieve Users using EasyHTTP API's Get method
 */
function getUsers(event) {

    if ( document.getElementById('former') !== null ) {
        clearFields();
    }
    
    //Get Users
    http.get('https://jsonplaceholder.typicode.com/users', function (error, users) {
        if (error) {
            console.log(error)
        } else {
            console.log(users);
            users = JSON.parse(users);
            let output = '';
            users.forEach(user => {
                output += `
                <div class="card card-body mb-2">
                    <h5>Name : ${user.name}</h4>
                    <p>Id : ${user.id}</p>
                    <p>Website : ${user.website}</p>
                    <h6> Company: </h6>
                    <ul>
                        <li>Name : ${user.company.name}</li>
                        <li>Catchphrase : ${user.company.catchPhrase}</li>
                    </ul>
                </div>
            `;
            });
            document.getElementById('output').innerHTML = output;
        }
    });
    event.preventDefault();

}


/**
 * Create/Post a new user using EasyHTTP API's Post method
 */
function createUser() {

    //create a new form
    createForm();

    //remove the userid input from the view
    document.getElementById('invi').style.display = 'none';

    document.getElementById('inter-btn').addEventListener('click', function (e) {
        const name = document.getElementById('name').value;
        const website = document.getElementById('website').value;
        const companyName = document.getElementById('cmpName').value;
        const catchPhrase = document.getElementById('cmpCatch').value;

        let output = '';

        if (name !== '' && website !== '') {
            //create data to send to API
            const dat = {
                name: `${name}`,
                website: `${website}`,
                company: {
                    name: `${companyName}`,
                    catchPhrase: `${catchPhrase}`

                }
            }
            //Create Post Request
            http.post('https://jsonplaceholder.typicode.com/users', dat, function (err, posts) {
                if (err) {
                    output = `<h5>${err}</h5>`;
                } else {
                    posts = JSON.parse(posts);
                    output = `
                    <h5 class="mt-2"> New user with id : ${posts.id} is created! </h5>
                    <div class="card card-body mb-2">
                        <h5>Name : ${posts.name}</h4>
                        <p>Id : ${posts.id}</p>
                        <p>Website : ${posts.website}</p>
                        <h6> Company: </h6>
                        <ul>
                            <li>Name : ${posts.company.name}</li>
                            <li>Catchphrase : ${posts.company.catchPhrase}</li>
                        </ul>
                    </div>
                `;
                }
                document.getElementById('output').innerHTML = output;
            });
        }
        e.preventDefault();
    });
}


/**
 * Modify an existing user using EasyHTTP API's put method
 */
function modifyUser() {

    //create a new form
    createForm();

    document.getElementById('inter-btn').addEventListener('click', function (e) {
        const name = document.getElementById('name').value;
        const website = document.getElementById('website').value;
        const companyName = document.getElementById('cmpName').value;
        const catchPhrase = document.getElementById('cmpCatch').value;
        const userid = document.getElementById('userid').value;

        let output = '';

        if (name !== '' && website !== '') {
            //create data to send to API
            const dat = {
                name: `${name}`,
                website: `${website}`,
                company: {
                    name: `${companyName}`,
                    catchPhrase: `${catchPhrase}`

                }
            }
            //Create Post Request
            http.put(`https://jsonplaceholder.typicode.com/users/${userid}`, dat, function (err, posts) {
                if (err) {
                    output = `<h5>${err}</h5>`;
                } else {
                    posts = JSON.parse(posts);
                    output = `
                    <h5 class="mt-2"> The user with id : ${posts.id} is now modified!</h5>
                    <div class="card card-body mb-2">
                        <h5>Name : ${posts.name}</h4>
                        <p>Id : ${posts.id}</p>
                        <p>Website : ${posts.website}</p>
                        <h6> Company: </h6>
                        <ul>
                            <li>Name : ${posts.company.name}</li>
                            <li>Catchphrase : ${posts.company.catchPhrase}</li>
                        </ul>
                    </div>
                `;
                }
                document.getElementById('output').innerHTML = output;
            });
        }
        e.preventDefault();
    });

}


/**
 * Create the basic form for put and post requests
 */
function createForm () {

    document.getElementById('output').innerHTML = '';

    document.getElementById('data').innerHTML = `
        <form id="former">
            <div class="form-group">
                <label for="name">Name: </label>
                <input type="text" id="name" class="form-control">
            </div>
            <div class="form-group">
                <label for="website">Website: </label>
                <input type="text" id="website" class="form-control">
            </div>
            <div class="form-group">
                <label for="cmpName">Company Name: </label>
                <input type="text" id="cmpName" class="form-control">
            </div>
            <div class="form-group">
                <label for="cmpCatch">Company Catchphrase: </label>
                <input type="text" id="cmpCatch" class="form-control">
            </div>
            <div class="form-group" id="invi">
                <label for="userid">User Id: </label>
                <input type="text" id="userid" class="form-control">
            </div>
            <button id="inter-btn" class="btn btn-warning mb-2">Send!</button>
        </form>
    `;
}


/**
 * Clear the form during a Get Request
 */
function clearFields() {
    document.getElementById('former').remove();
}