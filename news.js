const loadingNews = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLoadingNews(data.data.news_category))
    .catch(error => console.log(error))

}

const displayLoadingNews = allNews => {
   console.log(allNews);

   //LOADER SPINNER
  loadingSpinner(true);

   const menu = document.getElementById('navbarNav');
   menu.textContent = '';


   //NEWSPAPER CATEGORY IS HERE

   allNews.forEach(news => {

    const li = document.createElement('li');
    li.classList.add('nav-item','ms-3')
    li.innerHTML = `
    <a onclick="loadSingleNews('${news.category_id}')" class="nav-link fw-bold fs-5" href="#">${news.category_name}</a>
    
    `;
    menu.appendChild(li);
   });


}


//========================  SHOW ALL NEWS HERE  =============================

const loadSingleNews = (id) => {
   //console.log(id);
   const url = ` https://openapi.programming-hero.com/api/news/category/${id}`;

 
    console.log(url);
   fetch(url)
   .then(res => res.json())
   .then(data => displaySingleNews(data.data))
   .catch(error => console.log(error))
 
  
}
const displaySingleNews = showNews => {
  console.log(showNews);

  const newsContainer = document.getElementById('shows-news');
  newsContainer.textContent = '';

  //FOUND NEWS
  let foundNews = document.getElementById('found-news');
  foundNews.innerText =`${showNews.length} news found`;

  showNews.forEach(myNews => {
    
    const divs = document.createElement('div');
    divs.classList.add('col');
    divs.innerHTML = `
    <div class="card" data-bs-toggle="modal" data-bs-target="#newsModal" onclick="loadNewsDetails('${myNews._id}')">
    <img src="${myNews.thumbnail_url ? myNews.thumbnail_url : 'No image available'}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${myNews.title ? myNews.title : 'No title found'}</h5>
      <p class="card-text">${myNews.details.length > 30 ? myNews.details.slice(0, 200) + '...' :'Not found' }</p>
      <div class="d-flex justify-content-between">
        <div class="authors">
            <div class="author-box d-flex align-items-center">
                <img src="${myNews.author.img ? myNews.author.img : 'no found'}" class="img-fluid w-25 rounded-circle" alt="" >
                <div class="info ms-3">
                  <p class="mb-0">${myNews.author.name ? myNews.author.name : 'No name found'}</p>
                  <p>${myNews.author.published_date ? myNews.author.published_date : 'No date available'}</p>
                </div>
            </div>
        </div>
        <div class="ratings d-flex align-items-center">
           <span class="me-2"><i class="fa fa-eye"></i></span>
           <span>${myNews.rating.number ? myNews.rating.number : 'no found'}M</span>
        </div>
    </div>
    </div>
  </div>
    
    `;

    newsContainer.appendChild(divs);

    //LOADER SPINNER
   loadingSpinner(false);


  });
   
}
//===========================  SHOW DETAILS MODAL  =========================

const loadNewsDetails = news_id => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`
   
  console.log(url);
  fetch(url)
  .then(res => res.json())
  .then(data => displayNewsdetail(data.data[0]))
  .catch(error => console.log(error))
}

const displayNewsdetail = detailsNews => {
    console.log(detailsNews);
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = detailsNews.title;
    const detailsBody = document.getElementById('details-body');
    detailsBody.innerHTML = `
    <img src="${detailsNews.image_url ? detailsNews.image_url : 'No image found'}" class="img-fluid" alt="">
    <h6 class="mt-2">${detailsNews.author.name ? detailsNews.author.name : 'No Author name found'}<h6>
      <h4>${ detailsNews.total_view ?  detailsNews.total_view : 'No view'}</h4>
    
    
    `;
}


//=========================  LOADING SPINNER ========================
const loadingSpinner = isLoding => {
  const loadings = document.getElementById('loader');
  if(isLoding){
      loadings.classList.remove('d-none');
  }else{
      loadings.classList.add('d-none');
  }
}



loadingNews();











