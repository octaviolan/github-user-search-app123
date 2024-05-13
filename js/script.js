const searchForm = document.querySelector('.search-form');
const noFound = document.querySelector('.search-noresults');

function search(e) {
  e.preventDefault();
  const searchInput = document.querySelector('.search-input');
  searchApi(searchInput.value);
}

function showUser() {
  
}

function checkStatus(response) {
  return new Promise((resolve, reject) => {
    if(response.ok) {
      resolve(response);
    } else {
      reject(new Error('No results'));
    }
  })
}

async function searchApi(username) {
  try {
    const api = `https://api.github.com/users/${username}`;
    const response = await fetch(api);
    const responseOk = await checkStatus(response);
    console.log(responseOk);
    const devfinder = await responseOk.json();
    console.log(devfinder);

  } catch (error) {
    console.log(error.message);
    noFound.textContent = error.message;
    noFound.hidden = false;
    setTimeout(()=>{
      noFound.hidden = true;
    }, 2000);
    
  }
}

searchForm.addEventListener('submit', search);