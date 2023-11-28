window.onload = pageLoad;
function pageLoad() {
    document.getElementById('CourseOneContent').onclick = savecourseregis;

}

async function savecourseregis() {
    await fetch("/onepage", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: getCookie("username"),
        })
    }).then((res) => {
        
        console.log("than:");
    })

}
function getCookie(name) {
    var value = "";
    try {
        value = document.cookie.split("; ").find(row => row.startsWith(name)).split('=')[1]
        return value
    } catch (err) {
        return false
    }
}
