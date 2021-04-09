async function addPostFormHandler(event) {

    alert('Post has been added!')

    event.preventDefault();

    //get form inputs
    const title = document.querySelector('#post-title').value.trim();
    const post_text = document.querySelector('#post-text').value.trim();

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_text,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', addPostFormHandler)