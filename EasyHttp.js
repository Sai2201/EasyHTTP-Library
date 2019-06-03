// Using ES5 Prototypes
function easyHttp () {
    this.http = new XMLHttpRequest();
}


// Make an HTTP GET request
easyHttp.prototype.get = function ( url, callback ) {

    this.http.open('GET',url,true);

    const self = this.http;

    this.http.onload = function () {
        if ( self.status === 200 ) {
            callback(null,self.responseText);
        } else {
            callback('Error: ' + self.status);
        }
    };
    this.http.send();
}


// Make an HTTP POST request
easyHttp.prototype.post = function ( url, data, callback ) {

    this.http.open('POST',url,true);

    this.http.setRequestHeader('Content-type','application/json');

    const self = this.http;

    this.http.onload = function () { 
        callback(null,self.responseText);
    }

    this.http.send(JSON.stringify(data));
}


// Make an HTTP PUT request
easyHttp.prototype.put = function ( url, data, callback ) {
    this.http.open('PUT',url,true);

    this.http.setRequestHeader('Content-type', 'application/json');

    const self = this.http;

    this.http.onload = function () {
        callback(null,self.responseText);
    }

    this.http.send(JSON.stringify(data));
}


// Make an HTTP DELETE request
easyHttp.prototype.delete = function ( url, callback ) {
    this.http.open('DELETE',url,true);

    const self = this.http;

    this.http.onload = function () {
        if ( self.status === 200 ) {
            callback( null, 'Successfully Deleted...');
        } else {
            callback ('Error: ' + self.status);
        }
    }

    this.http.send();
}