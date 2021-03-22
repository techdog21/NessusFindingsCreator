
window.onload = function(){
    var file;
    // grab the button click element to start the change.
    document.getElementById("btnConn").addEventListener("click", xmlCall);
    document.getElementById("btnCopy").addEventListener("click", copyResults);
    document.getElementById("btnCopy").disabled = true;
    document.getElementById("select").disabled = true;
}

// Function to make the AJAX XML Request
function xmlCall() {
    var xhttp = new XMLHttpRequest();
    var progressBar = document.getElementById("progress");

    xhttp.open("GET", "xml/harvard.xml", true);
    xhttp.overrideMimeType('text/xml');
    
    xhttp.onprogress = function(pe) {
        progressBar.max = pe.total;
        progressBar.value = pe.loaded;
    }
    
    xhttp.onloadend = function(pe) {
        progressBar.value = pe.loaded;
    }

    document.getElementById("btnConn").disabled = true;
    document.getElementById("btnConn").value = "Getting Data..."

    // fetch and parse.
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          myParse(this);
        }
    };
    xhttp.send();
}

// Copy Results to clipboard

function copyResults() { 
    var r = document.createRange();
    r.selectNode(document.getElementById("mainDiv"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();

    document.getElementById("btnCopy").value = "Data Copied to Clipboard!"
    document.getElementById("btnCopy").disabled = true; 

}




