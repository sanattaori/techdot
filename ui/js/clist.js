


$(document).ready(function() {
$('.modal').modal();
	// $.ajax({
 //    url: '/getaddress',
 //    method: 'post'
	// }).done(function(){
	// 	console.log('done');
	// });


	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
	VotingContract = web3.eth.contract(abi);
	contractInstance = VotingContract.at('0xa7fb89a3fe6927b6d272637b148775f6fee5a8cf');
	// candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}


	//check cookie
	function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
	}

	var aadhaar_list = {
		"300000000000" : "Akola",
		"738253790005" : "Bhandara"
	}

	var aadhaar = readCookie('aadhaar');

	console.log(aadhaar);
	var address = aadhaar_list[aadhaar];
	console.log(address);
	$('#loc_info').text('Location based on Aadhaar : '+ address)

	function disable() {
			$('#vote1').addClass( "disabled" );
		    $('#vote2').addClass( "disabled" );
		    $('#vote3').addClass( "disabled" );
		    $('#vote4').addClass( "disabled" );
		    
		    //logout
		    document.cookie = "show=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
		    document.cookie = "aadhaar=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
		    window.location = '/app';


	}

	$('#vote1').click(function(){
		contractInstance.voteForCandidate('Sanat', {from: web3.eth.accounts[0]}, function() {
		    alert('vote submited to Sanat');
		    disable();
		    $('#loc_info').text('Vote submited successfully to Sanat')

		});
	})
	$('#vote2').click(function(){
		contractInstance.voteForCandidate('Aniket', {from: web3.eth.accounts[0]}, function() {
		    alert('vote submited to Aniket');
		     disable();
		     $('#loc_info').text('Vote submited successfully to Aniket')
		});
	})
	$('#vote3').click(function(){
		contractInstance.voteForCandidate('Mandar', {from: web3.eth.accounts[0]}, function() {
		    alert('vote submited to Mandar');
		     disable();
		      
		      $('#loc_info').text('Vote submited successfully to Mandar')
		});
	})
	$('#vote4').click(function(){
		contractInstance.voteForCandidate('Akshay', {from: web3.eth.accounts[0]}, function() {
		    alert('vote submited to Akshay');
		     disable();
		     $('#loc_info').text('Vote submited successfully to Akshay')
		});
	})
});