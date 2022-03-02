const searchProduct = () =>{
    const searchField= document.getElementById('input-product');
    const errormsg1= document.getElementById('error-msg');
    document.getElementById('spinner').style.display= 'block';
    const searchText= searchField.value;
    searchField.value= ''
    if(searchText==typeof Number || searchText==''){
        document.getElementById('spinner').style.display= 'none';
        errormsg1.innerText= 'Please input your favourite phone'
    }
    else if(searchText<0){
        document.getElementById('spinner').style.display= 'none';
        errormsg1.innerText= 'Sorry no allow negative number'
    }
    else{
        const url=  `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
        .then(Response => Response.json())
        .then(data => {
            if(data.data.length===0){
                document.getElementById('spinner').style.display= 'none';
             errormsg1.innerText= 'No data provided'
            }
            else{
                displayProduct(data.data)
                errormsg1.innerText= ''
            }
        }) 
    }
  
   
}

const displayProduct = products =>{
    
    const searchProduct= document.getElementById('product-card');
    document.getElementById('spinner').style.display= 'none';
    searchProduct.textContent= '' 
    products.slice(0,20).forEach(product => {
        // console.log(product)
        const div= document.createElement('div');
        div.classList.add('col');
        div.innerHTML= `
        <div class="card text-center">
            <img src="${product.image}" class="w-50 mx-auto card-img-top" alt="...">
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
    <img src="${product.image}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body text-center ">
          <h3 class="card-title">${product.name}</h3>
          <p class="card-text">${product?.releaseDate?product.releaseDate:'no found'}</p>
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
          <h4>Others</h4>
          <hr class="text-danger fw-bold w-25 mx-auto fw-bolder">
          <h6>Bluetooth : <small>${product?.others?.Bluetooth?product.others.Bluetooth: 'no found'}</small></h6>
          <h6>GPS : <small>${product?.others?.GPS?product.others.GPS: 'no found'}</small></h6>
          <h6>NFC : <small>${product?.others?.NFC?product.others.NFC:'no found'}</small></h6>
          <h6>Radio : <small>${product?.others?.Radio?product.others.Radio:'no found'}</small></h6>
          <h6>USB : <small>${product?.others?.USB?product.others.USB:'no found'}</small></h6>
          <h6>WLAN : <small>${product?.others?.WLAN?product.others.WLAN:'no found'}</small></h6>
          <hr>
          <a href="#" class="btn btn-primary">continue</a>
        </div>
    `
    detailsInformation.appendChild(div)
}
