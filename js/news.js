const loadNews = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json();
    return data.data.news_category
}

const displayNewsCategories = async () => {
    const data = await loadNews()
    const menu = document.getElementById('all-menu');
    data.forEach(news => {
        const a = document.createElement('a');
        a.innerHTML = `<a   data-bs-toggle="bg-dark"  onclick="loadNewsDetails('${news.category_id}')" > ${news.category_name}</a>`;
        menu.appendChild(a)
    });
}

// Load News Data
const loadNewsDetails = (id) => {
    document.getElementById("spinner").style.display = "block";
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayCategoryDetails(data.data))
        .catch(error => displayCategoryDetails(error))
}

const displayCategoryDetails = details => {

    document.getElementById("spinner").style.display = "none";

    if (details.length > 0) {
        const totallength = details.length;
        const inputfildText = document.getElementById('search-field');
        inputfildText.value = 'Total' + ' ' + ' ' + totallength + ' ' + ' News Found';
    } else if (details.length <= 0) {

        const totallength = details.length;
        const inputfildText = document.getElementById('search-field');
        inputfildText.value = 'No News Found ';
    }
    details.sort((a, b) => b.total_view - a.total_view);
    const newsBodyContainer = document.getElementById('news-body');
    newsBodyContainer.innerHTML = '';
    details.forEach(detail => {

        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
            <div class="card mb-3 p-4" >
            <div class="row g-0">
                <div class="col-md-3 d-flex justify-content-center">
                <img src="${detail.thumbnail_url}" class="img-fluid rounded-start mx-auto  " alt="...">
                </div>
            <div class="col-md-9">
                <div class="card-body">
                <h4 class="card-title">${detail.title}</h4>
                <p class="card-text my-4">${detail.details.slice(0, 400) + '.........'}</p>
                <div class="row d-flex ">
                <div class="col-lg-4  d-flex">
                    <img class="w-25 rounded-circle me-3" src="${detail.author.img}" alt="">
                    <div>
                    <h6>${detail.author.name ? detail.author.name : 'NO Name Found'}</h6>
                    <p> ${detail.author.published_date ? detail.author.published_date : 'NO Date Found'}</p>

                   </div>

                </div>

                <div class="col-md-3 d-flex ">
                                      <h5 class=' me-1 class= "py-2"' ><i class="fa-regular fa-eye"></i></h5>
                                     <h5 >${detail.total_view ? detail.total_view : 'NO views'}   M</h5>
                             </div>

            

                <div class="col-lg-2">
                <button type="button" onclick="viewClickDetails('${detail._id}')" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
               Explore</button>
                </div>


            </div>
        </div>
            `;
        newsBodyContainer.appendChild(cardDiv);
    })

}

displayNewsCategories();
loadNewsDetails();

// Modal Section


const viewClickDetails = (id) => {

    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
        .then(res => res.json())
        .then(data => viewClickDetailsDisplay(data))
        .catch(error => viewClickDetailsDisplay(error))

}

const viewClickDetailsDisplay = details => {

    const modal = document.getElementById('exampleModalLabel');
    modal.innerHTML = ''

    try {
        const creatediv = document.createElement('div');

        creatediv.innerHTML = `
                            <div class="row">
                                 <div class="col-lg-12">
                                         <img class="w-100"  src="${details.data[0].image_url}" alt="" >
                                         <h3 class="card-text my-3">${details.data[0].title}</h3>
                                         <p>${details.data[0].details.slice(0, 200) + ' ' + 'more.....'}</p>
                                         <h5 h5 > ${details.data[0].author.published_date}</h5 >
                                     <div class= "row ">
                                         <div class= "col ">
                                            <img class="w-25 rounded-circle my-2 d-block"  src="${details.data[0].author.img}" alt="" >
                                         </div>
                                         <div class= "col ">
                                             <a>${details.data[0].author.name ? details.data[0].author.name : 'No author Name!'}</a>
                                         </div>
                                         <div class= "col ">
                                           <h5 class='mx-2 class= "py-2"' ><i class="fa-regular fa-eye"></i></h5>
                                           <h5 > ${details.data[0].total_view ? details.data[0].total_view : 'not view'} M</h5>
                                         </div>
                                    </div>
                                 </div>
                             </div>
     `;
        modal.appendChild(creatediv);


    } catch (err) {

    }

}


viewClickDetailsDisplay()
viewClickDetails();





