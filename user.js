const API_BASE_URL = 'http://localhost:3002';
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
  
    const waterInfoEl = document.getElementById('water-info');
    waterInfoEl.textContent = `Name: ${water.name}, Species: ${water.species}`;
    const lureListEl = document.getElementById('lure-list');
    lureListEl.innerHTML = '';
    if (lures.length === 0) {
      const noLuresItem = document.createElement('li');
      noLuresItem.textContent = 'No lures found for this water.';
      lureListEl.appendChild(noLuresItem);
      return;
    }
    lures.forEach((lure) => {

      const li = document.createElement('li');
      const textSpan = document.createElement('span');
      textSpan.textContent = `${lure.title} - ${lure.content} - ${lure.name} `;
      li.appendChild(textSpan);

      if (lure.image_path) {
        const imgEl = document.createElement('img');
        imgEl.src = lure.image_path;      
        imgEl.alt = lure.title || 'Lure';   
        imgEl.style.width = '150px';         
        imgEl.style.marginLeft = '10px';     
  
        li.appendChild(imgEl);
      }
  
      lureListEl.appendChild(li);
    });
  }

window.addEventListener('DOMContentLoaded', fetchWaters);