 afterlogin()
 
   //
   // console.log(user)
   // let profileuser=''
   // profileuser=`
   const urlparams= new URLSearchParams(window.location.search)
  const id= urlparams.get("id")
 
   function userdata(){
    axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`)
        .then((response) => {
       let  user=response.data.data
       let  users=''
       users=`
         
         <div class="col-3" id="image">
                    <img id="image" src="${user.profile_image}" alt=""
                    style="width: 90px; height: 90px; border-radius: 100px !important ;">
                </div>
               <!--//profile -image//-->
                <!--username/emil-->
                <div  class="col-4 d-flex flex-column justify-content-evenly" style="margin: 0 10px;">
                   <div  >${user.name}</div>
                   <div >${user.username}</div>
                </div>
                <!--//username/emil//-->
                 <!--cont posts and comment-->
                <div class="col-3 d-flex flex-column justify-content-evenly " >
                   <div style="color: rgb(141, 146, 150); font-weight: 100; font-size: 10px;">
                    <span style="color: black; font-size: 30px;">${user.posts_count}</span>posts
                    
                   </div>
                   <div style="color: rgb(141, 146, 150); font-weight: 100; font-size: 10px;">
                    <span style="color: black; font-size: 30px;">${user.comments_count}</span>comment
                    
                   </div>
   
        
       `
         document.getElementById('profile-user').innerHTML=users
         console.log(response.data.data)
        })
      }
   userdata()   
  
function getpostuser(){
    axios.get(`https://tarmeezacademy.com/api/v1/users/${id}/posts`)
        .then((response) => {
           let respo= response.data.data
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
           console.log(post.image)
                //  console.log( post.image)
            let  imges =`
                   <div class="card mt-2" >
  <div class="card-header"  style="background-color: #09456d; color: white;">
    <img src="${post.author.profile_image}" alt="" class="rounded-circle shadow" style="width: 40px; height: 40px;">
     <span>${post.author.name}</span>
   
 ${buttonEdit}
     <h5 style="color: rgb(223, 233, 233); margin-left: 30px; font-size: 14px;">${ post.author.created_at}</h5>
    
  </div>
  <div class="card-body" onclick="showpost(${post.id})">
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
               document.getElementById('profile').innerHTML += imges
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

 getpostuser()
