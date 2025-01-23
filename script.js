 document.querySelector('#form').addEventListener("submit", async (e) => {
    e.preventDefault();
     const name = document.getElementById('name').value;
     const species = document.getElementById('species').value;
     const body= {
         name: name,
         species: species
     };
     const res = await fetch ('http://localhost:3004/water',{
         method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
    });
     const data = await res.json();
    console.log(data);
 });
//  async function updateLure(id) {
//     const body = {
//         title: document.getElementById('title').value,
//         content: document.getElementById('content').value,
//         name: document.getElementById('name').value,
//         image_path: document.getElementById('image-url').value,
//         water_id: document.getElementById('water-link').value
//     };

//     const response = await fetch(`http://localhost:3004/lure/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(body)
//     });

//     const result = await response.json();
//     console.log(result);
// }
document.querySelector('#form-two').addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const name = document.getElementById('brand').value;
    const imagePath = document.getElementById('image-url').value;
    const waterId = document.getElementById('water-link').value;
    const body= {
        title: title,
        content: content,
        name: name,
        image_path: imagePath,
        water_id: waterId,
        
    };
    const res = await fetch ('http://localhost:3004/lure',{
        method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
    });
    const data = await res.json();
    console.log(data);
});

document.addEventListener('DOMContentLoaded', async function () {
    const blog = document.getElementById('lure');

    try {
        const res = await fetch('http://localhost:3004/lure', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch posts: ${res.status}`);
        }

        const data = await res.json();

        data.forEach(lure => {
            const postElement = document.createElement('div');
            postElement.classList.add('blog-post');

            postElement.innerHTML = `
                <h2 class="blog-title">${lure.title}</h2>
                <img src="${lure.image_path}" alt="${lure.title}" class="blog-image" />
                <p class="blog-content">${lure.content}</p>
                <p class="name">By ${lure.name}</p>
                <div class="blog-bottom">
                    <button id="comment-this">Add comment</button>
                </div>
            `;

            blog.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
});




