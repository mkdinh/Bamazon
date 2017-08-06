function GoogleAuth(){
	// Initialize Firebase
	this.config = {
	    apiKey: "AIzaSyA1r_w5SkocfPFvqLSn-xqtUMxFc99F2ZQ",
	    authDomain: "bamazon-35788.firebaseapp.com",
	    databaseURL: "https://bamazon-35788.firebaseio.com",
	    projectId: "bamazon-35788",
	    storageBucket: "bamazon-35788.appspot.com",
	    messagingSenderId: "656603172975"
	  };
	 
	firebase.initializeApp(this.config);

	this.provider = new firebase.auth.GoogleAuthProvider();

	this.Signin = function(){
		firebase.auth().signInWithPopup(this.provider)
			.then(function(res){
				// access token for Google API
				var token = res.credential.accessToken;
				// sign in user info
				var user = res.user;
			})
			.catch(function(err){
				// Handle err
				console.log(err.code,err.message)
			})
	}
	console.log('hey')
}

module.exports = GoogleAuth;
// key: 861007430441-bqld053quevke82p27mkfj1j3aj7laq4.apps.googleusercontent.com
// secret: dQkiuN-dNaBeeIF3DHzvaQA3