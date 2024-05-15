const searchForm = document.querySelector('.search-form');
const noFound = document.querySelector('.search-noresults');
const user = document.querySelector('.user');

function search(e) {
  e.preventDefault();
  const searchInput = document.querySelector('.search-input');
  searchApi(searchInput.value);
}

function showUser(devfinder) {
  user.innerHTML = '';
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const joined = devfinder.created_at.split('T')[0];
  const date = joined.split('-');
  const year = date[0];
  const month = Number(date[1]) - 1;
  const day = date[2]
  
  const div = document.createElement('div');
  
  div.innerHTML = `
    <article class="user-info">
      <div class="avatar-container">
        <img src="${devfinder.avatar_url}" alt="Avatar" class="user-avatar">
      </div>
      <div class="info-container">
        <span class="user-name">${devfinder.name ? devfinder.name : devfinder.login}</span>
        <span class="user-login">@${devfinder.login}</span> 
        <span class="user-created">Joined ${day} ${months[month]} ${year}</span>
      </div>
    </article>

    <article class="user-bio">
      <p class="bio">${devfinder.bio ? devfinder.bio : 'This profile has no bio'}</p>
    </article>

    <article class="user-github">
      <div class="user-repos">
        <span>Repos</span>
        <span class="public-repos">${devfinder.public_repos}</span>
      </div>
      <div class="user-followers">
        <span>Followers</span>
        <span class="followers">${devfinder.followers}</span>
      </div>
      <div class="user-followings">
        <span>Following</span>
        <span class="following">${devfinder.following}</span>
      </div>
    </article>

    <ul class="user-social">
      <li><i class="icon-location"></i>${devfinder.location ? devfinder.location : 'Not Available'}</li>
      <li><i class="icon-website"></i><a href="${devfinder.html_url}">${devfinder.html_url ? devfinder.html_url.split('//')[1] : 'Not Available'}</a></li>
      <li><i class="icon-twitter"></i><a href="https://twitter.com/${devfinder.twitter_username}">${devfinder.twitter_username ? devfinder.twitter_username : 'Not Available'}</a></li>
      <li><i class="icon-company"></i><a href="https://${devfinder.company}.com">${devfinder.company ? devfinder.company : 'Not Available'}</a></li>
    </ul>
  `;
  
  user.appendChild(div);
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
    showUser(devfinder);
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