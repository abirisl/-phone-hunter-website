const searchProduct = () =>{
    const searchField= document.getElementById('input-product');
    const errormsg1= document.getElementById('error-msg');
    document.getElementById('spinner').style.display= 'block';
    const searchText= searchField.value;
    searchField.value= ''
    console.log(searchText)
    
    if(searchText==''){
        errormsg1.innerText= 'No data provided'
    }
    else{
        errormsg1.innerText= ''
    }
   
   const url=  `https://openapi.programming-hero.com/api/phones?search=${searchText}`
   fetch(url)
   .then(Response => Response.json())
   .then(data => displayProduct(data.data)) 
   
}

const displayProduct = products =>{
    
    const searchProduct= document.getElementById('product-card');
    searchProduct.textContent= ''
    document.getElementById('spinner').style.display= 'none';
    const errormsg2= document.getElementById('error-msg2');
    if(products<=0){
        errormsg2.innerText= 'Please input your product name'
    }
    else{
        errormsg2.innerText= ''
    }
        
    products.slice(0,20).forEach(product => {
        // console.log(product)
        const div= document.createElement('div');
        div.classList.add('col');
        div.innerHTML= `
        <div class="card">
            <img src="${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title"> ${product.phone_name}</h5>
              <h6>${product.brand}</h6>
              <button onClick="detailProducts('${product.slug}')" class="btn btn-info text-white">Details >></button>
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
    div.classList.add('card');
    div.innerHTML= `
    <img src="${product.image}" class="card-img-top" alt="...">
        <div class="card-body text-center ">
          <h3 class="card-title">${product.name}</h3>
          <p class="card-text">${product.releaseDate}</p>
          <hr>
          <small>Storage</small>
          <h6>${product.mainFeatures.storage}</h6>
          <hr>
          <small>Screen & Display</small>
          <h6>${product.mainFeatures.displaySize}</h6>
          <hr>
          <small>Memory</small>
          <h6>${product.mainFeatures.memory}</h6>
          <hr>
          <small>Others</small>
          <h6>${product.others.WLAN?product.others.WLAN:'not found'}</h6>
          <hr>
          <a href="#" class="btn btn-primary ">continue</a>
        </div>
    `
    detailsInformation.appendChild(div)
}
