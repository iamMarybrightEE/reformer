import React, {useEffect} from 'react';
import {  facebookProvider} from '../data/firebase-config';
import { useStateContext } from '../contexts/ContextProvider';
import { getAuth, signInWithPopup, FacebookAuthProvider} from "firebase/auth";
import { useState } from 'react';
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import { db } from '../data/firebase-config';
const Login = () => {  
  useEffect(() => {
    addDetails()    
  }, []);  
  const [user, setUser] = useState("")
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
    const { setIsAuth } = useStateContext();
    const auth = getAuth();     
    const signInWithFacebook = () => {
        signInWithPopup(auth, facebookProvider).then((result)=>{
      setUser(result.user);
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      // fetch facebook graph api to get user actual profile picture
      fetch(`https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`)
      .then((response)=>{        
        setDisplayName(result.user.displayName)
        setEmail(result.user.displayName)
        response.blob().then((blob)=>{
        setProfilePicture(URL.createObjectURL(blob));
      })
        })      
    })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    console.log(error)
  });
    }
    const postCollectionRef = collection(db, "users")
        const addDetails = async () => {
          try {            
              addDoc(postCollectionRef,{
              displayName,
              email,
              profilePicture,
              createdAt: serverTimestamp(),
            }).then(
              console.log("done")
            ).catch(err => alert(err.message))
          } catch (error) { throw error;}    
        }
    const handleLogout=()=>{
    setUser(null);
  }
  if (user){
    console.log(displayName, profilePicture, email)
  }
  return (
    <div>
      {user?(
              <>
                <button className='btn btn-secondary btn-md'
                  onClick={handleLogout}>
                  LOGOUT
                </button>
                <h3>Welcome {displayName}</h3>
                <p>{email}</p>
                <div className='photo'>
                  <img src={profilePicture} alt="dp" referrerPolicy='no-referrer'/>
                </div>
              </>
            ):(
              <button className="btn btn-primary btn-md"
                onClick={signInWithFacebook}>
                  Sign In With Facebook
              </button>
           )} 
    </div>
  )
}
export default Login