import axios from 'axios'
import cookies from 'universal-cookie'



const cookie = new cookies()

export const onLoginClick = (user, pass) => {
    return (dispatch) =>{
        axios.get('http://localhost:1991/user',{
        params:{
            username: user,
            password: pass
        }
        // res singkatan dari respond
        }).then(res => {

            if (res.data.length > 0) {
                

                //destructing
                const {id, username} = res.data[0]
                
                // send data to reducers
                dispatch({
                    type   :"LOGIN_SUCCESS",
                    payload: {id,username}
                })

                // Membuat sebuah file cookie dengan nama masihLogin, dan valuenya adalah username yg login
                // path : "/" agar dapat diakses di setiap component
                cookie.set('masihLogin', username, {path:'/'})

            } else {
                //jika username dan password tidak ditemukan
                dispatch({
                    type    :"AUTH_ERROR",
                    payload : "Username/Password Wrong!"
                })

                //Menghilangkan pesan error setelah tiga detik
                setTimeout(()=>{
                    dispatch({
                        type: "TIMEOUT"
                    })
                },3000);
            }
        }).catch(err=>{
            console.log("Something has caught error")
        })
    }
}

export const onRegisterUser = (user,email,pass) => {
    // karena yang di return berupa function sehingga tidak perlu ditulis (dispatch)
    return dispatch => {
        axios.get('http://localhost:1991/user',{
            params:{
                username:user
            }
        }).then(res=>{
            if(res.data.length ===0){
                axios.post('http://localhost:1991/user', {
                    username: user,
                    email: email,
                    password: pass

                }).then(res => { 
                    dispatch({
                        type:'AUTH_SUCCESS',
                        payload: 'Registered Successfully'
                    })          
                })
            }
            else{
               dispatch({
                   type: 'AUTH_ERROR',
                   payload: 'username has been taken'
               })

               //Menghilangkan pesan error setelah tiga detik
                setTimeout(() => {
                    dispatch({
                        type: "TIMEOUT"
                    })
                }, 3000);

            }
        })
    }
}

export const onLogoutUser = ()=>{
    cookie.remove('masihLogin')
    // karena action creator mereturn object, maka tidak perlu menggunakan dispatch
    return {
        type:'LOGOUT'
    }
}

//to stay login
export const keepLogin = (user) =>{
    return dispatch => {
        axios.get('http://localhost:1991/user', {
            params: {
                username: user
            }
        }).then(res => {
                if(res.data.length > 0){
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: {username: user}
                    })
                }
            })
    }
}
