# Aadhaar Voting
Aadhaar Based voting system using blockchain technology
Project implemented as part of Rajasthan Hackathron

## Description

* The authority must login first with the provided session ID.
* The voter can now begin the process of voting with proper authentication through OTP(one time password) on the respective linked mobile number.
* If the voter is valid then the system will check for for the voters age and the address to which he can give vote.
* the voting pallete will be opned with  candidate names,their parties and logos.
* Now the voter can give his vote by clicking vote button.
* one voter can give his vote only once,i.e after one time voting buttons are disabled and the vote is automatically loged out.
* Same process continiues for many more votters irrespective of their voting wards.

### Installing and Running Project

Clone Project
```
git clone git@github.com:sanattaori/techdot.git && cd techdot
```
Install Dependencies
```
npm install
```
Running Project
```
node index.js
```
If dependency problem occurs delete package.json, Run
```
npm init
```
Again Install dependencies and run project.


### Running Project
Step 1 - Setting up Environment
Instead of developing the app against the live Ethereum blockchain, we have used an in-memory blockchain (think of it as a blockchain simulator) called testrpc.

```
npm install ethereumjs-testrpc web3
```

Step 2 - Creating Voting Smart Contract

```
npm install solc
```

Replace your aadhaar no and phone number for running project at https://github.com/sanattaori/techdot/blob/7814403250f8b042992c6d437d9f9db8f98f3729/ui/js/app.js#L39

Step 3 - Testing in node console

Not required just for testing in node console-
After writing our smart contract, we'll use Web3js to deploy our app and interact with it
```
$ node
> Web3 = require('web3')
> web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
Then ensure Web3js is initalized and can query all accounts on the blockchain

> web3.eth.accounts
Lastly, compile the contract by loading the code from Voting.sol in to a string variable and compiling it

> code = fs.readFileSync('Voting.sol').toString()
> solc = require('solc')
> compiledCode = solc.compile(code)
```
testrpc creates 10 test accounts to play with automatically. These accounts come preloaded with 100 (fake) ethers.

Deploy the contract!

dCode.contracts[‘:Voting’].bytecode: bytecode which will be deployed to the blockchain.
compiledCode.contracts[‘:Voting’].interface: interface of the contract (called abi) which tells the contract user what methods are available in the contract.
```
> abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
> VotingContract = web3.eth.contract(abiDefinition)
> byteCode = compiledCode.contracts[':Voting'].bytecode
>deployedContract = VotingContract.new(['Sanat','Aniket','Mandar','Akshay'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
> deployedContract.address
> contractInstance = VotingContract.at(deployedContract.address)
deployedContract.address. When you have to interact with your contract, you need this deployed address and abi definition we talked about earlier.
```
Step 4 - Interacting with the Contract via the Nodejs Console
```
> contractInstance.totalVotesFor.call('Sanat').toLocaleString()
'2'
```

### For TypeError: Cannot read property ':Voting' of undefined :
Make sure you have ganache-cli
```
sudo npm install ganache-cli -g
```
copy address of first account
```
$ ganache-cli
```
Paste this adderess to 
ui/js/clist.js line 17
https://github.com/sanattaori/techdot/blob/cecabc1917965ed7404e4c444b7572c97e10dcf9/ui/js/clist.js#L17


### Purpose of test

 * The authority login is to ensure security to prevent piracy,harresment and corruption from candidates standing in election.
 * OTP generation is to authenticate the right aadhar card owner.
 * button disabling and automatic logout is to prevent multiple voting by single candidate. 

### Screenshots
* ![](https://raw.githubusercontent.com/sanattaori/techdot/master/screenshot/1.PNG)
* ![](https://raw.githubusercontent.com/sanattaori/techdot/master/screenshot/2.PNG)
* ![](https://raw.githubusercontent.com/sanattaori/techdot/master/screenshot/3.PNG)
* ![](https://raw.githubusercontent.com/sanattaori/techdot/master/screenshot/4.PNG)
* ![](https://raw.githubusercontent.com/sanattaori/techdot/master/screenshot/5.PNG)
* ![](https://raw.githubusercontent.com/sanattaori/techdot/master/screenshot/gan.PNG)

## Deployment

The Aadhaar based voting system is developed to overcome the flaws of EVM system. So directly EVM will be replaced by touch screen interface having the great
user interface and high security.

## Authors

* **Sanat Taori**
* **Akshay Motghare**
* **Mandar Patil** 
* **Aniket Narkhede**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
