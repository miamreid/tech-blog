async function deleteBlog(event) {
    event.preventDefault();

    const id = document.querySelector('#blog-id').innerHTML;
    
    const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        document.location.replace(`/dashboard/`);
    } else {
        alert('Error');
    }
}

document.querySelector('.delete-blog-btn').addEventListener('click', deleteBlog);