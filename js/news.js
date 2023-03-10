//  laodNews
const loadNews = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json();
    return data.data.news_category
}
// // ------------- show all the categories in UI  -------------------
const displayNewsCategories = async () => {
    const data = await loadNews()
    const menu = document.getElementById('all-menu');
    data.forEach(news => {
        const a = document.createElement('a');
        a.innerHTML = `
        <button class="btn btn-white btn-outline-primary" onclick="loadNewsDetails('${news.category_id}')" > ${news.category_name}</button>
        `;
        menu.appendChild(a)
    });
}

// Load News Data
const loadNewsDetails = (id) => {
    document.getElementById("spinner").style.display = "block";
    // fetch (https://openapi.programming-hero.com/api/news/category/01 this ) catagory  item
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayCategoryDetails(data.data))
        .catch(error => displayCategoryDetails(error))
}
//  items  on particular news 
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

    // 
    // show news in UI 
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
                                     <h5 >${detail.total_view ? detail.total_view : '0 Views'}   M</h5>
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
        .then(data => viewDetailsDisplay(data))
        .catch(error => viewDetailsDisplay(error))

}

const viewDetailsDisplay = details => {

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
                                           <h5 > ${details.data[0].total_view ? details.data[0].total_view : '0 view'} M</h5>
                                         </div>
                                    </div>
                                 </div>
                             </div>
     `;
        modal.appendChild(creatediv);


    } catch (err) {

    }

}

const loadBlogs = () => {
    const blog = document.getElementById('blog');
    const div = document.createElement('div');
    div.innerHTML = `<h5 class="mt-4">What is the difference between var ,let ,const?</h5>
                      <p>var variables can be updated and re-declared within its scope; let variables can be updated but not re-declared; const variables can neither be updated nor re-declared.</p>
                      <h5>difference between arrow function and normal function?</h5>
                      <p>Unlike regular functions, arrow functions do not have their own this . The value of this inside an arrow function remains the same throughout the lifecycle of the function and is always bound to the value of this in the closest non-arrow parent function..</p>
                      <h5>Why we use template string?
                      </h5>
                      <p>
                      Template literals (template strings) allow you to use strings or embedded expressions in the form of a string. They are enclosed in backticks </p>`
    blog.appendChild(div);
    // completed template string

}

// Function Calling from outside 
viewDetailsDisplay()
viewClickDetails();




