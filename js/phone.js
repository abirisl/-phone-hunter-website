const searchProduct = () =>{
    const searchField= document.getElementById('input-product');
    const errormsg1= document.getElementById('error-msg')
    const searchText= searchField.value;
    // console.log(searchText)
    searchField.value= ''
    if(searchText==''){
        errormsg1.innerText= 'no data found'
    }
   else{
    const url=  `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(Response => Response.json())
    .then(data => displayProduct(data.data))
    errormsg1.innerText=''
   }
   
}

const displayProduct = products =>{
    // console.log(products)
    const searchProduct= document.getElementById('product-card');
    const errormsg2= document.getElementById('error-msg2')
    searchProduct.textContent= ''
    if(products<=0){
        errormsg2.innerText= 'Please write something to display'
    }
    else{
        errormsg2.innerText= ''
    }
    products.forEach(product => {
        // console.log(product)
        const div= document.createElement('div');
        div.classList.add('col');
        div.innerHTML= `
        <div class="card">
            <img src="${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${product.phone_name}</h5>
              <h6>${product.brand}</h6>
              <button onClick="detailProducts('${product.slug}')" class="btn btn-info text-white">Details</button>
            </div>
          </div>
        `
        searchProduct.appendChild(div)
       
    });
}

const detailProducts= id=>{
    console.log(id)
   const url= `https://openapi.programming-hero.com/api/phone/${id}`
   fetch(url)
   .then(Response=>Response.json())
   .then(data => displayDetails(data.data))
}

const displayDetails = product =>{
    const detailsInformation= document.getElementById('details-product');
    detailsInformation.textContent= ''
    const div= document.createElement('div');
    div.classList.add('card')
    div.innerHTML= `
    <img src="${product.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.mainFeatures}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    `
    detailsInformation.appendChild(div)
}
