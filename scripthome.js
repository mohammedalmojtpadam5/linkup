
  let curentpage=1;
    let lastpage=1
  window.addEventListener('scroll', () => {
  let infinitscroll=  window.innerHeight + window.pageYOffset >= document.body.scrollHeight
 
      
   if(infinitscroll && curentpage<lastpage){
      curentpage=curentpage + 1
      referchpost(false,curentpage)
      console.log(infinitscroll)
   }   
});
  referchpost()
  function referchpost(replace=true,page){
    loaderdata(show=true)
    axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=20&page=${page}`)
        .then((response) => {
          loaderdata(show=false)
           lastpage  = response.data.meta.last_page
           
           console.log(response.data)
           let respo= response.data.data
          //  let selectposts =respo
          //  selectposts.forEach(post=>{
          // // console.log(post);
          //  })
          if(replace){
           document.getElementById("posts").innerHTML="" 
          }
            
            for(post of respo){
           let user=storageuser()
           let isMyPost= user !=null && post.author.id == user.id
           let buttonEdit=''
           if(isMyPost){
            buttonEdit=`
             <span class="dropdown">
    <svg  style="margin:0 5px; float: right; cursor:pointer;" class=" dropdown-toggle" type="" data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
   <ul class="dropdown-menu">
    <button type="button" style=" float: right; " class="btn btn-success dropdown-item" 
                 onclick="deletpost('${encodeURIComponent(JSON.stringify(post))}')" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
  <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8z"/>
  <span style="margin-left:5px;">Delete</span>
</svg></button>
                 <button type="button" style="float: right;" class="btn btn-secondary dropdown-item" 
                 onclick="editPost('${encodeURIComponent(JSON.stringify(post))}')" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
 <span style="margin-left:5px;">Edit</span>
</svg></button>
  </ul>
</svg>
</span>
             
            `
            
           } 
                //  console.log( post.image)
            let  imges =`
                   <div class="card mt-2" >
  <div class="card-header"  style="background-color: #09456d; color: white;" >
    <span onclick="profileshow(${post.author.id})"  style="cursor: pointer;">
        <img src="${post.author.profile_image}" alt="" class="rounded-circle shadow" style="width: 40px; height: 40px;">
        <span>${post.author.name}</span>
    </span>
   
    ${buttonEdit}  
     <h5 style="color: rgb(230, 237, 237); margin-left: 30px; font-size: 14px;">${ post.author.created_at}</h5>
    
  </div>
  <div class="card-body" onclick="showpost(${post.id})"  style="cursor: pointer;">
    <p>${ post.body}</p>
   <img id="img" src="${post.image} " class="w-100 rounded" alt="">
   
     <p class="mt-3 p-1 rounded shadow" style=" background: rgb(112, 112, 109); width: fit-content;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-open-heart-fill" viewBox="0 0 16 16">
  <path d="M8.941.435a2 2 0 0 0-1.882 0l-6 3.2A2 2 0 0 0 0 5.4v.313l4.222 2.475q.035-.087.08-.17c.665-1.3 2.362-1.917 3.698-1.25 1.336-.667 3.033-.05 3.699 1.25a3 3 0 0 1 .08.17L16 5.713V5.4a2 2 0 0 0-1.059-1.765zM0 6.873l4 2.344c-.012.542.124 1.117.416 1.694l.004.006L0 13.372v-6.5Zm.059 7.611 4.9-2.723c.563.73 1.383 1.467 2.49 2.198l.551.365.551-.365c1.107-.73 1.927-1.467 2.49-2.198l4.9 2.723A2 2 0 0 1 14 16H2a2 2 0 0 1-1.941-1.516M16 13.372l-4.42-2.455.004-.006c.292-.577.428-1.152.415-1.694L16 6.873v6.5Z"/>
  <path d="M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
</svg>
       <span> <span>(${post.comments_count})</span> commentt
     
       
       </span>
         </p>      
  </div>
   </div>
              `
               document.getElementById('posts').innerHTML += imges
        //   let tagUeser=`tage-${post.id}`
           
        //  for(tag of post.tags) {
        //    document.getElementById(tagUeser).innerHTML= ""
        //   console.log(tagg.name)
        //  let tagesCountent=`
        //      <span class=" btn btn-sm rounded " style="background: black; color: white;"id="tage-${post.id}" >
        // #${tag.name}
        // </span>
        //  `
        //   document.getElementById(tagUeser).innerHTML += tagesCountent   
        //  }
         
     
         
           }
          
   }) 
   
     
  }
   
  
  let url='https://tarmeezacademy.com/api/v1'
   function addnewPost(){
    let postid=document.getElementById('edit-input').value
    let isCreat = postid==null || postid ==""
   
    
    const token=JSON.parse (localStorage.getItem("token"))
     let body = document.getElementById("body").value 
     let imag = document.getElementById("img-post").files[0] 
     let formData= new FormData()
     formData.append("body",body)
     formData.append("image",imag)
    //  let password = document.getElementById("password-input").value 
    
    if(isCreat){
     
        axios.post(`${url}/posts`,
      formData,
       {
        headers:{
          //  'Content-Type': 'multipart/form-data',
           "Authorization": `Bearer ${token}`
        }
       
       }           
     
    )
    .then((response)=>{

       const model = document.getElementById("add-post-model")
       const modelInstance= bootstrap.Modal.getInstance(model)
       modelInstance.hide()
         alertlogin("add a new posts successfully")
    referchpost()
      
    }).catch((error)=>{
      console.log(error)
      alertlogin('sure of your information','danger')
    })
    }else{
        formData.append("_method",'put')
        axios.post(`${url}/posts/${postid}`,
      formData,
       {
        headers:{
          //  'Content-Type': 'multipart/form-data',
           "Authorization": `Bearer ${token}`
        }
       
       }           
     
    )
    .then((response)=>{
       const model = document.getElementById("add-post-model")
       const modelInstance= bootstrap.Modal.getInstance(model)
       modelInstance.hide()
         alertlogin(" edit posts successfully")
    referchpost()
      console.log(response)
    }).catch((error)=>{
      console.log(error)
      alertlogin(' is not adit','danger')
    })
    }
   
    
   
   }
   function showpost(postid){
    
    window.location= `post.html?postid=${postid}`

   }
    function creatPost(){
        document.getElementById('btn').innerHTML='Create'
    document.getElementById('edit-input').value=''
    document.getElementById('title').innerHTML='Create New  Post'
    document.getElementById('body').value=''
    let modelCreate= document.getElementById("add-post-model")
    let edit= new bootstrap.Modal(modelCreate,{})
    edit.toggle()
   }
   function editPost(postObject){
    let post=JSON.parse(decodeURIComponent(postObject))
    
    document.getElementById('btn').innerHTML='Edit'
    document.getElementById('edit-input').value=post.id
    document.getElementById('title').innerHTML='Edit Post'
    document.getElementById('body').value=post.body
    document.getElementById("img-post").src=post.image 
    let modelEdit= document.getElementById("add-post-model")
    let edit= new bootstrap.Modal(modelEdit,{})
    edit.toggle()
   }

   function deletpost(postdelet){
     let post=JSON.parse(decodeURIComponent(postdelet))
    
     document.getElementById('delete-input').value= post.id
     document.getElementById('btn').innerHTML='Yes'
    let modelEdit= document.getElementById("delete-post-model")
    let edit= new bootstrap.Modal(modelEdit,{})
    edit.toggle()
   }
   function suredeletePost(){
   let postid= document.getElementById('delete-input').value
    let token =JSON.parse(localStorage.getItem("token"))
  
    axios.delete(`https://tarmeezacademy.com/api/v1/posts/${postid}`,{
       headers:{
          // 'Content-Type': 'application/json',
           "Authorization": `Bearer ${token}`
        }
      }
    )
    .then((response)=>{
       const model = document.getElementById("delete-post-model")
       const modelInstance= bootstrap.Modal.getInstance(model)
       modelInstance.hide()
      referchpost()
      
    })
   }  
   function profileshow(id){
    let userid=id
    

    window.location=`profile.html?id=${userid}`
   }  
  
    /*loader */ 
    
   afterlogin()  
 