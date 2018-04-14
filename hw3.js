// introduction animate

for(var shine = 1; shine < 10; shine++)
{
  if(shine < 3){
    $("#intro").animate({opacity:'1'},2000);
    $("#button_right").animate({opacity:'0'},2000);
    $("#wheel").animate({opacity:'0'},2000);
    if(shine%2 == 0)
      $("#button_left").animate({opacity:'0'},2000);
    else
      $("#button_left").animate({opacity:'1'},2000);
  }
  else if(shine < 5){
    $("#intro").animate({opacity:'1'},2000);
    $("#button_left").animate({opacity:'0'},2000);
    $("#wheel").animate({opacity:'0'},2000);
    if(shine%2 == 0)
      $("#button_right").animate({opacity:'0'},2000);
    else
      $("#button_right").animate({opacity:'1'},2000);
  }
  else if(shine < 7){
    $("#intro").animate({opacity:'1'},2000);
    $("#button_left").animate({opacity:'0'},2000);
    $("#button_right").animate({opacity:'0'},2000);
    if(shine%2 == 0)
      $("#wheel").animate({opacity:'0'},2000);
    else
      $("#wheel").animate({opacity:'1'},2000);
  }
  else if(shine < 9){
    $("#intro").animate({opacity:'1'},2000);
    $("#button_left").animate({opacity:'1'},2000);
    $("#button_right").animate({opacity:'1'},2000);
    $("#wheel").animate({opacity:'1'},2000);
  }
  else{
    $("#intro").animate({opacity:'0'},1000);
    $("#button_left").animate({opacity:'0'},1000);
    $("#button_right").animate({opacity:'0'},1000);
    $("#wheel").animate({opacity:'0'},1000);
  }
}


// background 

$(function(){
  var x = 0;
  var twidth = Math.floor((-2)*$("#background").width());
  var dir = 1;

  setInterval(function(){
    if(x == 0)
      dir = 1;
    else if(x == twidth)
      dir = 0;
    console.log(twidth,x);
    if(dir)
      x -= 1;
    else
      x += 1;
    $("#background").css('background-position', x + 'px 0');
  },10);
})

// set position
var state = 1;
var i_x = 0;
var i_y = 0;
var offset_x = 0;
var offset_y = 0;
var old_x = 0;
var old_y = 0;
var arr = new Array(30);

$("img").each(function(i){
  arr[i] = [
    $(this).height(),
    $(this).offset().left,
    $(this).offset().top];
});

$("#background").mousemove(function(e){ 
  i_x = $("#C111").offset().left + ($("#C111").width()/2);
  i_y = $("#C111").offset().top + ($("#C111").height()/2);
  offset_x = i_x - e.clientX;
  offset_y = i_y - e.clientY; 
});

$("#background").mousedown(function(e){
  if(offset_x != old_x || offset_y != old_y){
    old_x = offset_x;
    old_y = offset_y;

    if(e.which == 1){
      state = 1;
      console.log('down_l',state);
    }
    else if(e.which == 2){
      state = 1;
      console.log('down_m',state);
      $("img").each(function(i){
        $(this).height(arr[i][0]);
        $(this).css({'left':arr[i][1]});
        $(this).css({'top':arr[i][2]});
      });
    }
    else if(e.which == 3){
      document.oncontextmenu = function(){return false;}
      state = 3;
      console.log('down_r',state);
      $("img").each(function(){
        var set_x = $(this).offset().left - offset_x;
        var set_y = $(this).offset().top - offset_y;
        $(this).css({left:set_x, top:set_y});        
      });
    }
    else
      alert('???');
  }
});

// wheel event
$("#background").on("wheel", function(e){
  console.log('wheel',state);
  if(state == 3)
    return;

  var base = $("#background").height() / 500;
  var rate = (e.originalEvent.deltaY<0) ? (base) : (-base);
  var rateN = [0, rate, rate, rate, rate]; 
  
  var arrh = [0,
    $("#C111").height(),
    $("#C222").height(),
    $("#C333").height(),
    $("#C444").height()];

  var x = 0;
  for(var j=1;j<5;j++){
    x += (j*j);
    if(arrh[j]==0){
      arrh[j] = arr[30-x][0];
      rateN[j] = arrh[j];
    }
  }

  var C4h = arrh[4] + rate;
  var C3h = arrh[3] + rate;
  var C2h = arrh[2] + rate;
  var C1h = arrh[1] + rate;

  $(".C4").height(C4h);
  $(".C3").height(C3h);
  $(".C2").height(C2h);
  $(".C1").height(C1h);

  $("img").each(function(i){
    if(i < 16)
      rate = rateN[4];
    else if(i < 25)
      rate = rateN[3];
    else if(i < 29)
      rate = rateN[2];
    else if(i < 30)
      rate = rateN[1];

    var xyz = [      
      $(this).offset().left - (rate / 2),
      $(this).offset().top - (rate / 2)];
    $(this).css({'left':xyz[0]});
    $(this).css({'top':xyz[1]});
  });

  e.preventDefault();
});

