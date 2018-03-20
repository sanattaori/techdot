var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');	
var passwordHash = require('password-hash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var request = require('request');
var fs = require('fs');
Web3 = require('web3')
solc = require('solc')
var app = express();
app.use( bodyParser.json() )
app.use(cookieParser());
app.use(morgan('combined'));




app.use("/", express.static("ui"));


var username;
var password;

app.post('/login', function(req, res) {
    
	console.log(req.body);
    username = req.body.username;
    password = req.body.password;
    var hashedPassword = passwordHash.generate(password);
    console.log(hashedPassword);
    
    if (username == "admin" && password == "password") {

    	res.status(200).send({ message: hashedPassword});

    } else {
    	res.status(500).send({ message: 'error' });
    }
});

app.post('/auth', function(req, res) {
	var cookie_pass = req.cookies['auth'];
	if (passwordHash.verify('password', cookie_pass)) {
		res.status(200).send({ message: hashedPassword});
	} else {
		res.status(500).send({ message: 'error' });
	}
});

app.get('/',function(req,res){
	var cookie_pass = req.cookies['auth'];
	if (passwordHash.verify('password', cookie_pass)) {
		res.sendFile(path.join(__dirname, 'ui', 'app.html'));
	} else {
		console.log('ok');
	}
});

app.get('/app', function(req, res){
	var cookie_pass = req.cookies['auth'];
	var cookie_otp = req.cookies['show'];

	if (passwordHash.verify('password', cookie_pass) && cookie_otp != null) {
		//res.sendFile(path.join(__dirname, 'ui', 'clist.html'));
		res.redirect('/info');
		

	} else if (cookie_otp == null && passwordHash.verify('password', cookie_pass)) {
		res.sendFile(path.join(__dirname, 'ui', 'app.html'));
	}
	else {
		res.redirect('/');
	}
	
});

// app.post('/getaddress',function(req,res){

// });

app.get('/info', function(req, res){
	var cookie_pass = req.cookies['auth'];
	var cookie_otp = req.cookies['show'];
	if (cookie_pass == null || cookie_pass == '' || cookie_otp == null || cookie_otp == '') {
		res.redirect('/app');
	} else {
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		 code = fs.readFileSync('Voting.sol').toString()

		 compiledCode = solc.compile(code)
		 abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
		 VotingContract = web3.eth.contract(abiDefinition)
		 byteCode = compiledCode.contracts[':Voting'].bytecode
		 deployedContract = VotingContract.new(['Sanat','Aniket','Mandar','Akshay'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
		
		contractInstance = VotingContract.at(deployedContract.address)

		res.sendFile(path.join(__dirname, 'ui', 'clist.html'));
	}
	
});




var port = 8080;
app.listen(8080, function () {
  console.log(`app listening on port ${port}!`);
});