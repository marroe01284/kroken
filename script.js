const API_BASE_URL = 'http://localhost:3002';
 document.querySelector('#form').addEventListener("submit", async (e) => {
    e.preventDefault();
     const name = document.getElementById('name').value;
     const species = document.getElementById('species').value;
     const body= {
         name: name,
         species: species
     };
     try {
        const res = await fetch(`${API_BASE_URL}/water`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
        
        if (!res.ok) {
          const errData = await res.json();
          console.error('Error creating water:', errData);
          alert(`Error creating water: ${errData.message || 'Unknown error'}`);
          return;
        }
        
        const data = await res.json();
        console.log('Response data:', data);

        alert('Water created successfully!');
        

        document.getElementById('form-two').reset();
        
      } catch (error) {
        console.error('Network or server error:', error);
        alert(`Failed to create lure. ${error.message}`);
      }
    });

 document.querySelector('#form-two').addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const name = document.getElementById('brand').value;
    const imagePath = document.getElementById('image-url').value;
    const waterId = document.getElementById('water-link').value;
    
    const body = {
      title,
      content,
      name,
      image_path: imagePath,
      water_id: waterId,
    };
    
    try {
      const res = await fetch(`${API_BASE_URL}/lure`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      if (!res.ok) {

        const errData = await res.json();
        console.error('Error creating lure:', errData);
        alert(`Error creating lure: ${errData.message || 'Unknown error'}`);
        return;
      }
      
      const data = await res.json();
      console.log('Response data:', data);

      alert('Lure created successfully!');

      document.getElementById('form-two').reset();
      
    } catch (error) {
      console.error('Network or server error:', error);
      alert(`Failed to create lure. ${error.message}`);
    }
  });

  const updateForm = document.getElementById('update-form');

  updateForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const lureId = document.getElementById('lure-id').value;
    const body = {
      title: document.getElementById('title-update').value,
      content: document.getElementById('content-update').value,
      name: document.getElementById('brand-update').value,
      image_path: document.getElementById('image-update').value,
      water_id: document.getElementById('water-update').value
    };

    updateLure(lureId, body);
  });

  async function updateLure(id, body) {
    try {
      const response = await fetch(`${API_BASE_URL}/lure/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        alert('Update failed: ' + (result.message || 'Unknown error'));
      } else {
        alert('Lure updated successfully!');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to update lure');
    }
  }






