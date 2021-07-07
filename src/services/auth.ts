
import api from './api';
import  { Alert} from 'react-native';

interface  Response {
  token: string;
  user: {
    name: string;
    email:string;
  }
}
interface  UserLogin {
  username: string ;
  password: string ;

}

export function signIn(username:UserLogin, password:UserLogin): Promise<Response> {
  return new Promise( resolve => {

    const showAlert = () =>
    Alert.alert(
      "O endereço de email ou a senha que você inseriu não é válido"
    );
  
 
  api.post('/wp-json/jwt-auth/v1/token', {
    username: username,
    password: password
  })
  .then(function (response) {
    resolve({
      token: response.data.token,
      user:{
      name: response.data.user_display_name,
      email: response.data.user_email,
      }
    })
  })
  .catch(function (error) {
    //console.log(error);
    showAlert();
  });


   
  });
}
