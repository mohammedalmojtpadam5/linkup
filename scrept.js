 
  function afterlogin(){
      let add=document.getElementById("addbtn")
      const token=localStorage.getItem("token")
       if(token==null){
        document.getElementById("none-login").style.setProperty("display","flex","important")
        document.getElementById("log-out").style.setProperty("display","none","important")
        document.getElementById("icons-friend").style.setProperty("display","none","important")
        if(add != null){
              document.getElementById("addbtn").style.setProperty("display","none","important")
             
        }
        
       }else{
        document.getElementById("none-login").style.setProperty("display","none","important")
           document.getElementById("log-out").style.setProperty("display","flex","important")
            document.getElementById("icons-friend").style.setProperty("display","flex","important")
          
              if(add != null){
             document.getElementById("addbtn").style.setProperty("display","flex","important")
              }
         let user=  storageuser()     
        document.getElementById("imgProfile").src= user.profile_image
         document.getElementById("profilename").innerHTML=user.username
      
       }
   } 
    // storage user 
   function storageuser(){
    let user=null
    let storage=localStorage.getItem("user")
    if(storage != null){
      user=JSON.parse(storage)
     
    }
    return user
   }
    // storage user 
 
     /*register end*/
     function RegisterUser(){
      let name = document.getElementById("register-name-input").value 
      let username = document.getElementById("register-username-input").value 
      let password = document.getElementById("register-password-input").value 
      let profile =document.getElementById("register-image-input").files[0]
      
      const formdata= new FormData()
       formdata.append( "name",name)
       formdata.append(  "username" , username)
       formdata.append( "password" ,password )
       formdata.append(  "image" , profile  )
        loaderdata(show=true)
    axios.post("https://tarmeezacademy.com/api/v1/register",
      formdata
    )
    .then((response)=>{
      console.log(response.data)
       localStorage.setItem("token",JSON.stringify(response.data.token))
       localStorage.setItem("user",JSON.stringify(response.data.user))
        localStorage.setItem("img", response.data.user.profile_image)
       const model = document.getElementById("registerModal")
       const modelInstance= bootstrap.Modal.getInstance(model)
       modelInstance.hide()
           alertlogin('Nice, you Register successfully ')
        afterlogin()
        // setTimeout(()=>{
        //   document.getElementById("liveAlertPlaceholder").classList.add("d-none")
        // },3000)
       
    }).catch((erorr)=>{
       alertlogin(' Dont Register successfully ','danger')
    }).finally(()=>{
       loaderdata(show=false)
    })
   }
      /*register end*/
     /*login  */
     function loginuser(){
     let name = document.getElementById("name-input").value 
     let password = document.getElementById("password-input").value 
      loaderdata(show=true)
    axios.post("https://tarmeezacademy.com/api/v1/login",
       paramr={
           "username" : name,
           "password" : password     
       }
    )
    .then((response)=>{
      console.log(response.data)
      localStorage.setItem("token",JSON.stringify(response.data.token))
       localStorage.setItem("user",JSON.stringify( response.data.user))
        localStorage.setItem("img", response.data.user.profile_image)
       const model = document.getElementById("exampleModal")
       const modelInstance= bootstrap.Modal.getInstance(model)
       modelInstance.hide()
       afterlogin()
      referchpost()
       
        alertlogin('Nice, you login successfully ')
        // setTimeout(()=>{
        //   document.getElementById("liveAlertPlaceholder").classList.add("d-none")
        // },3000)
   
      
     

    }).catch((erorr)=>{
      console.log(erorr)
    }).finally(()=>{
       loaderdata(show=false)
    })
    
   }
    /*login end */

    /*logout */
     function logout(){

    localStorage.removeItem("token")
    localStorage.removeItem("user")
    alertlogin("log-out successfully")
    // todo
  //    setTimeout(()=>{
  //         document.getElementById("liveAlertPlaceholder").classList.add("d-none")
  //       },3000)
    afterlogin()
    referchpost()
   }
   /*logout end */

   /*alert */
   function alertlogin(messaga,type="success"){
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

    appendAlert(messaga, type)

 }
 function loaderdata(show=true){
      if(show){
        document.getElementById("loader").style.visibility="visibile"
      }
      else{
        document.getElementById("loader").style.visibility="hidden"
      }
     
    }
 function userprofile(){
     let user= storageuser()
     let userid=user.id
     window.location=`profile.html?id=${userid}`
   }
 
 /*alert end */
