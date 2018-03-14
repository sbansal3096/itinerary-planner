// External Files:
// https://api.html5media.info/1.1.8/html5media.min.js (enables <video> and <audio> tags in all major browsers)
// https://cdn.plyr.io/2.0.13/plyr.js

// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/

function yay(counts,sname,obj) {
    var songid=0;
    jQuery(function ($) {
        'use strict'
        var supportsAudio = !!document.createElement('audio').canPlayType;
        if (supportsAudio) {
            var tracks = [];
            for (var i = 0; i < counts.length; i++) {
                tracks.push({
                    "track": i+1,
                    "name": sname[i],
                    "length": counts[i],
                    "file": "JLS_ATI"
                })
            }

            var index = 0,
                playing = false,
                extension = '',
                mediaPath = 'https://archive.org/download/mythium/',
                //mediaPath = 'file:///home/shubham/Documents/projects/MUSIC/party/',
                buildPlaylist = $.each(tracks, function (key, value) {
                    var trackNumber = value.track,
                        trackName = value.name,
                        trackLength = value.length;
                    if(trackNumber === 1)
                    {
                        $('#plList').empty();
                    }
                    if (trackNumber.toString().length === 1) {
                        trackNumber = '0' + trackNumber;
                    } else {
                        trackNumber = '' + trackNumber;
                    }
                    $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
                }),
                trackCount = tracks.length,
                npAction = $('#npAction'),
                npTitle = $('#npTitle'),
                audio = $('#audio1').bind('play', function () {
                    playing = true;
                    npAction.text('Now Playing...');
                }).bind('pause', function () {
                    playing = false;
                    npAction.text('Paused...');
                }).bind('ended', function () {
                    npAction.text('Paused...');
                    if ((index + 1) < trackCount) {
                        index++;
                        loadTrack(index);
                        audio.play();
                    } else {
                        audio.pause();
                        index = 0;
                        loadTrack(index);
                    }
                }).get(0),
                btnPrev = $('#btnPrev').click(function () {
                    if ((index - 1) > -1) {
                        index--;
                        loadTrack(index);
                        if (playing) {
                            audio.play();
                        }
                    } else {
                        audio.pause();
                        index = 0;
                        loadTrack(index);
                    }
                    obj.id=tracks[id].length;
                }),
                btnNext = $('#btnNext').click(function () {
                    if ((index + 1) < trackCount) {
                        index++;
                        obj.id=tracks[index].length;
                        loadTrack(index);
                        if (playing) {
                            audio.play();
                        }
                    } else {
                        audio.pause();
                        index = 0;
                        loadTrack(index);
                    }
                }),
                li = $('#plList li').click(function () {
                    var id = parseInt($(this).index());
                    songid=id;
                    obj.id=tracks[id].length;
                    if (id !== index) {
                        playTrack(id);
                    }
                }),
                loadTrack = function (id) {
                    $('.plSel').removeClass('plSel');
                    $('#plList li:eq(' + id + ')').addClass('plSel');
                    npTitle.text(tracks[id].name);
                    index = id;
                    audio.src = mediaPath + tracks[id].file + extension;
                },
                playTrack = function (id) {
                    loadTrack(id);
                    audio.play();
                    return id;
                };
            extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
            loadTrack(index);
        }
    });
}
//initialize plyr
  //  plyr.setup($('#audio1'), {});
    //obj.id=songid;
function search(result)
{
  $(document).ready(function(){

    $("#suggLi").click(function(){
      //$("#searchBox").val() = $("#suggLi").val();
      alert("xyz");
    });

    $(".searchSuggestions").hide();
    $("body").click(function(){
      $(".searchSuggestions").hide();
    });
    $("#home").click(function(){
      $(".searchSuggestions").hide();
      $(".searchResults").hide();
      $(".title").addClass("filler");
      $("#searchBox").val("");
    });
    //to provide search suggestion based on input in search text box.
    $("#searchBox").on("input",function(){
      var searchText = $(this).val();
      if(searchText==""){
        $(".searchSuggestions").hide();
      }
      else{
        $(".searchSuggestions").show();
        autoSearchSuggestion(searchText);
      }
    });

    //when focus is in textbox and user hits enter search button will be clicked.
    $("#searchBox").keydown(function(event){
      if(event.keyCode==13){
        $("#searchBtn").click();
      }
      if(event.keyCode==38){
        //go up the list and circulate
        var listItems =  $("#searchSuggestionsUl").children();
        var listLen = listItems.length;
        var hglgItem = -1;
        for(var x=0;x<listLen;x++){
          if($(listItems[x]).hasClass("highlight")){
            hglgItem = x;
            break;
          }
        }
        if(hglgItem==-1){
          $(listItems[listLen-1]).addClass("highlight");
          $("#searchBox").val($(listItems[listLen-1]).text());
        }
        else{
          if(hglgItem==0){
            $(listItems[hglgItem]).removeClass("highlight");
          }
          else{
            $(listItems[hglgItem]).removeClass("highlight");
            $(listItems[hglgItem-1]).addClass("highlight");
            $("#searchBox").val($(listItems[hglgItem-1]).text());
          }
        }
      }
      if(event.keyCode==40){
        var listItems =  $("#searchSuggestionsUl").children();
        var listLen = listItems.length;
        //alert(listLen);
        var hglgItem = -1;
        for(var x=0;x<listLen;x++){
          if($(listItems[x]).hasClass("highlight")){
            hglgItem = x;
            break;
          }
        }
        if(hglgItem==-1){
          $(listItems[0]).addClass("highlight");
          $("#searchBox").val($(listItems[0]).text());
        }
        else{
          if(hglgItem==listLen-1){
            $(listItems[hglgItem]).removeClass("highlight");
          }
          else{
            $(listItems[hglgItem]).removeClass("highlight");
            $(listItems[hglgItem+1]).addClass("highlight");
            $("#searchBox").val($(listItems[hglgItem+1]).text());
          }
        }
      }
    });
    //alert($("#searchSuggestionsUl").children().length);
    //execution of ajax call on click of search button.
    $("#searchBtn").on("click", function(){
      $(".searchSuggestions").hide();
      $(".title").removeClass("filler");
      var searchTitle =  $("#searchBox").val();
      $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?',
        data: 'action=query&list=search&srsearch='+searchTitle+'&format=json&callback=?',
        dataType: 'json',
        success: function(result){
          //alert(result.query.search[0].title);
          var vSearch = result.query.search;
          var searchCount = vSearch.length;
          //alert(searchCount);
          var wikiUrl = 'https://en.wikipedia.org/wiki/';
          $(".searchResults").html("");
          if(searchCount==0){
            var html = "<h3 style=\"color:#fff\">Sorry, no result found.</h3>";
            $(".searchResults").html(html);
            $(".searchResults").show();
          }
          else{
            for(var i=0;i<searchCount;i++){
            var html ="";
            var html = "<div class=\"searchResultCss\">"+"<a href=\""+wikiUrl+vSearch[i].title+"\" target=\"_blank\"><p><strong>"+vSearch[i].title+"</strong></p></a><p>"+vSearch[i].snippet+"...</p>"+"</div>";
            $(".searchResults").append(html);
            $(".searchResults").show();
            }
          }
          /*for(var i=0;i<searchCount;i++){
            var html ="";
            var html = "<div class=\"searchResultCss\">"+"<a href=\""+wikiUrl+vSearch[i].title+"\" target=\"_blank\"><p><strong>"+vSearch[i].title+"</strong></p></a><p>"+vSearch[i].snippet+"...</p>"+"</div>";
            $(".searchResults").append(html);
            $(".searchResults").show();
          }*/
        },
        error: function(xhr, ajaxOption, status){
          alert(xhr.status);
        }
      });
    });
  });

  function autoSearchSuggestion(searchPrefix){
      $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?',
        data: 'action=query&list=prefixsearch&pssearch='+searchPrefix+'&format=json&callback=?',
        dataType: 'json',
        success:function(suggestionResult){
          var sugArray = suggestionResult.query.prefixsearch;
          var sugArrayLen = sugArray.length;
          var html ="";
          for(var j=0; j<sugArrayLen;j++){
            var liId = "suggLi"+j;
            html+="<li id=\""+liId+"\" onclick = \"clickFunc()\">"+sugArray[j].title+"</li>";
          }
          $("#searchSuggestionsUl").html(html);
          $("li").css('padding','3px 10px');
        },
        error:function(xhr,ajaxOption,status){
          alert(xhr.status);
        }
      });
  }

  function clickFunc(){
     alert("ggg");
     $("#searchBox").val($("#"+listId).text());
  }
}