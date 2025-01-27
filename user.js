const API_BASE_URL = 'http://localhost:3002';

// 1. Fetch all waters when the page loads
async function fetchWaters() {
  try {
    const res = await fetch(`${API_BASE_URL}/water`);
    if (!res.ok) {
      throw new Error(`Failed to fetch waters: ${res.status}`);
    }
    const waters = await res.json();
    displayWaters(waters);
  } catch (error) {
    console.error(error);
    alert("Could not fetch waters");
  }
}

function displayWaters(waters) {
  const ul = document.getElementById('water-list');
  ul.innerHTML = '';

  waters.forEach((water) => {
    const li = document.createElement('li');
    li.textContent = `${water.name}`;

    li.addEventListener('click', () => {
      fetchLuresForWater(water.id);
    });
    
    ul.appendChild(li);
  });
}

// 3. Fetch lures for a given water (GET /water/:id)
async function fetchLuresForWater(waterId) {
  try {
    const res = await fetch(`${API_BASE_URL}/water/${waterId}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch water/lures: ${res.status}`);
    }
    const data = await res.json();
    displayWaterAndLures(data);
  } catch (error) {
    console.error(error);
    alert("Could not fetch lures for that water.");
  }
}

function displayWaterAndLures({ water, lures }) {
    document.getElementById('lure-section').style.display = 'block';
  
    // Water info
    const waterInfoEl = document.getElementById('water-info');
    waterInfoEl.textContent = `Name: ${water.name}, Species: ${water.species}`;
  
    // Clear the existing lure list
    const lureListEl = document.getElementById('lure-list');
    lureListEl.innerHTML = '';
  
    // If no lures, show a single <li> saying none found
    if (lures.length === 0) {
      const noLuresItem = document.createElement('li');
      noLuresItem.textContent = 'No lures found for this water.';
      lureListEl.appendChild(noLuresItem);
      return;
    }
  
    // Otherwise, display each lure with an <img> for the image path
    lures.forEach((lure) => {
      // Create a list item for each lure
      const li = document.createElement('li');
  
      // Create a span (or paragraph) for lure text info
      const textSpan = document.createElement('span');
      textSpan.textContent = `${lure.title} - ${lure.content} - ${lure.name} `;
      
      // Append text info first
      li.appendChild(textSpan);
  
      // If there's an image_path, create an <img> element
      if (lure.image_path) {
        const imgEl = document.createElement('img');
        imgEl.src = lure.image_path;         // The actual URL/path to the image
        imgEl.alt = lure.title || 'Lure';    // Alt text
        imgEl.style.width = '150px';         // Example styling
        imgEl.style.marginLeft = '10px';     // Spacing
  
        li.appendChild(imgEl);
      }
  
      // Add this lure <li> to the list
      lureListEl.appendChild(li);
    });
  }

// 5. On page load, fetch waters
window.addEventListener('DOMContentLoaded', fetchWaters);