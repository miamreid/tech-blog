async function newBlog(event) {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (content && title) {
  
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }); 

    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert('Error');
    }
  }
};
  
  document.querySelector('.add-blog-btn').addEventListener('submit', newBlog);
