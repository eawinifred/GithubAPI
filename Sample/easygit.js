$(function(){
    
  $('#profile').on('click', function(e){
    e.preventDefault();
    $('.ghapidata').html('<div id="loader"><img src="http://i.imgur.com/UqLN6nl.gif" alt="loading..."></div>');
    
    var username = $('#ghusername').val();
    var requri   = 'https://api.github.com/users/'+username;
    var repouri  = 'https://api.github.com/users/'+username+'/repos';
    
    requestJSON(requri, function(json) {
      if(json.message == "Not Found" || username == '') {       //if the message we get from our json is "Not Found"
        $('.ghapidata').html("<h2>No User Info Found</h2>");   //set the html content of .ghapidata to text
      }
      
      else {
        // else we have a user and we display their info
        var fullname   = json.name;
        var username   = json.login;
        var aviurl     = json.avatar_url;
        var profileurl = json.html_url;
        var location   = json.location;
        var followersnum = json.followers;
        var followingnum = json.following;
        var reposnum     = json.public_repos;
        
        if(fullname == undefined) { fullname = username; }
        
        var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
        outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="120" height="120" alt="'+username+'"></a></div>';
        outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
        outhtml = outhtml + '<div class="repolist clearfix">';
        
        $('.ghapidata').html(outhtml);         
      } // end else statement
    }); // end requestJSON Ajax call
  }); // end click event handler  
  

  $('#repos').on('click', function(e){
    e.preventDefault();
    $('.ghapidata').html('<div id="loader"><img src="http://i.imgur.com/UqLN6nl.gif" alt="loading..."></div>');
    
    var username = $('#ghusername').val();
    var requri   = 'https://api.github.com/users/'+username;
    var repouri  = 'https://api.github.com/users/'+username+'/repos';
    
    requestJSON(requri, function(json) {
      if(json.message == "Not Found" || username == '') {
        $('.ghapidata').html("<h2>No User Info Found</h2>");
      }
      
      else {
        // else we have a user and we display their info
        var fullname   = json.name;
        var username   = json.login;
        var aviurl     = json.avatar_url;
        var profileurl = json.html_url;
        var location   = json.location;
        var followersnum = json.followers;
        var followingnum = json.following;
        var reposnum     = json.public_repos;
        
        if(fullname == undefined) { fullname = username; }
        
        var outhtml = '<div class="repolist clearfix">';
        
        var repositories;
        $.getJSON(repouri, function(json){
          repositories = json;   
          outputPageContent();                
        });          
        
        function outputPageContent() {
          if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
          else {
            outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
            $.each(repositories, function(index) {
              outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
            });
            outhtml = outhtml + '</ul></div>'; 
          }
          $('.ghapidata').html(outhtml);
        } // end outputPageContent()
      } // end else statement
    }); // end requestJSON Ajax call
  }); // end click event handler  

$('#branch').on('click', function(e){
    e.preventDefault();
    $('.ghapidata').html('<div id="loader"><img src="http://i.imgur.com/UqLN6nl.gif" alt="loading..."></div>');
    
    var username = $('#ghusername').val();
    var reponame = $('#ghreponame').val();
    var branch = 'https://api.github.com/repos/'+username+'/'+reponame+'/'+'branches';
    
    requestJSON(branch, function(json) {
      if(username == '' || reponame == '') {
        $('.ghapidata').html("<h2>Please specify a username & repo name</h2>");
      }
      
      else {
        // else we have a user and we display their info
        var fullname   = json.name;
        var username   = json.login;
        var aviurl     = json.avatar_url;
        var profileurl = json.html_url;
        var location   = json.location;
        var followersnum = json.followers;
        var followingnum = json.following;
        var reposnum     = json.public_repos;
        
        if(fullname == undefined) { fullname = username; }
        
        var outhtml = '<div class="repolist clearfix">';
        
        var branches;
        $.getJSON(branch, function(json){
          branches = json;   
          outputPageContent();                
        });          
        
        function outputPageContent() {
          if(branches.length == 0) { outhtml = outhtml + '<p>No branches!</p></div>'; }
          else {
            outhtml = outhtml + '<p><strong>Branch List:</strong></p> <ul>';
            $.each(branches, function(index) {
              outhtml = outhtml + '<li><a href="'+branches[index].url+'" target="_blank">'+branches[index].name + '</a></li>';
            });
            outhtml = outhtml + '</ul></div>'; 
          }
          $('.ghapidata').html(outhtml);
        } // end outputPageContent()
      } // end else statement
    }); // end requestJSON Ajax call
  }); // end click event handler  


  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  
  }

});
  