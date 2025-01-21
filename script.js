document.querySelector('#form').addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById('user-id').value;
    const name = document.getElementById('name').value;
    const body= {
        id: Number(id),
        name: name
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