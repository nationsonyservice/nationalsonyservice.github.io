/*New Thinking Pagination  */
//article_count = 4;



article_count =$("#article_count").val();
team_page_count = 1;
intern_page_count = 1;
page_count= 1;
var model_id;
var value_id;
/*Session Values Set For Filters */
function get_browser() {
  var browser = ((
          navigator.userAgent.indexOf("Opera")
          || navigator.userAgent.indexOf('OPR')) != -1
          ) ? browser = 'Opera' :
          (navigator.userAgent.indexOf("Edge") != -1) ? 'IE' :
          (navigator.userAgent.indexOf("Chrome") != -1) ? 'Chrome' :
          (navigator.userAgent.indexOf("Safari") != -1) ? 'Safari' :
          (navigator.userAgent.indexOf("Firefox") != -1) ? 'Firefox' :
          ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) ? 'IE' : 'unknown';
  return browser;
}

browser = get_browser();
if(browser!='Safari'){
  sessionStorage.setItem("model_id",'');
  sessionStorage.setItem("value_id",'');
  sessionStorage.setItem("tag_id",'');
}

function masonry()
{
  $('.masonry_new').isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    layoutMode: 'packery',
    columnWidth: 110,
    gutterWidth: 10
  });
}

$(window).load(function(){
  if(page_title=="Newthinking" || page_title=="Intern"){
    masonry();
  }
});

if(head_title=='Portfolio Listing')
{
  var scroll_flag = 0;
  function append_gallery_images()
  {
      load_gallery_images();
   }    
}

function ajaxLoad()
{
   model_id=$('.active .textSelected').attr('model-attr');
   value_id=$('.active .textValue').attr('value-attr');
   sessionStorage.setItem("model_id", model_id);
   sessionStorage.setItem("value_id", value_id);
    /* For Model Filter */
    if(model_id!='' && model_id!=undefined){
      $('#models_list').show();
    }
    else{
      $('#models_list').hide();
      $('.text-model').text('models');
    }
    /* For Value Filter */
    if(value_id!='' && value_id!=undefined){
      $('#value_list').show();
    }
    else{
      $('#value_list').hide();
      $('.text-value').text('value');
    }
    
    $.ajax({
        url : urls+"portfolio/getMorePortfolio",
        type: "POST",
        dataType: "json",
        data : {page_count:-1,model_id:model_id,value_id:value_id},
        success: function(data, textStatus, jqXHR)
        {

          if(data.size>0)
          {
            var newItems= '';
            $('.listing-container').html('');
            $.each(data.result,function(key,val){
              if(val['url']=="" || val['url']==null){
                val['url'] =FRONTEND_IMAGES_PATH+'portfolio-listing/embibe.jpg';
              }
              newItems+='<div class="listing-aticle commom-cls ">'+
                        '<a href="'+urls+'portfolio/'+val['slug']+'">'+
                        '<h4 class="article-tag"><span>'+val['company_name']+'</span></h4>'+
                        '<div class="placeholderGallery commom-cls" data-large="'+val['url']+'">'+
                          '<img src="'+val['url']+'" alt="'+val['company_name']+'" title="'+val['company_name']+'" class="img-small">'+
                        '</div>'+
                       '<div class="text-block">'+
                          '<div class="text--float">'+
                             '<p class="textlimit-portfolio">'+val['description']+'</p>'+
                          '</div>'+
                       '</div>'+
                    '</a>'+
                  '</div>';
              });
            $('.listing-container').append(newItems);
            text_concat();
          }else{
            $('.listing-container').html('<h4>No record found</h4>');
          }
        },
    });
}

if(page_title=='Careers'){
  var word_list_2=[];
  for (var i=0;i<1;i++){
    $('#tagWords ul li').each(function(){
      var listedTag = $(this).attr('data-cat');
      var listedWeight = $(this).attr('data-weight');
      var listedLink = $(this).attr('data-link'); 
      console.log(listedTag)
      

      word_list_2.push({ 
      text: listedTag, 
      weight : listedWeight,
      handlers: {
        click: function() {
          window.open(listedLink,'_blank');
        }
      }


      }); 
    })
  }
}

$(function() {
  $("#specialWords").jQCloud(word_list_2);
});

function submitAnswer()
{
    $(".error-msg" ).each(function( index ) {
        $( this ).html("");
    });
    var formData = new FormData(document.querySelector("form"));
    $.ajax({
        url : urls+"internflow/submitAnswer",
        type: "POST",
        dataType: "json",
        data : formData,
        processData: false,  
        contentType: false,
        success: function(data, textStatus, jqXHR)
        {
            if(data.status=='failure')
            {
              $("#file_error").html(data.error.file_error);
              for(var key in data.error.answers) 
              {
                if(key!='msg')
                {
                  $("#"+key).html(data.error.answers[key]);
                }
              }
            }   
            else
            {
              $('#questionForm')[0].reset();
              $('input[type=file]').val('');
             $('#file_name').html('<span>Choose a file&hellip;</span>');
              $(".pop-up-overlay").addClass("visible");
              $("body").css("overflow","hidden");
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {

        }
    });
}

if(head_title=='Team Listing')
{
  var scroll_flag = 0;
  function append_team_images()
  {
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - $('footer').outerHeight() - $('.nl-signup').outerHeight()   &&  scroll_flag==0)
     {
       scroll_flag = 1;
       $.ajax({
            url : urls+"team/getMoreTeam",
            type: "POST",
            dataType: "json",
            data : {page_count:team_page_count},
            success: function(data, textStatus, jqXHR)
            {

              if(data.size>0)
              {
                var newItems= '';
                $.each(data.result,function(key,val){
                  if(val['url']=="" || val['url']==null){
                    val['url'] =FRONTEND_IMAGES_PATH+'team/listing/bhawana.jpg';
                  }else{
                    val['url'] =FRONTEND_PATH+val['url'];
                  }if(val['thumbnail']=="" || val['thumbnail']==null){
                    val['thumbnail'] =FRONTEND_IMAGES_PATH+'team/listing/bhawana_thumb.jpg';
                  }
                  else{
                    val['thumbnail'] =FRONTEND_PATH+val['thumbnail'];
                  }
                  designation ='';
                  name = val['first_name']+" "+val['last_name'];
                  page_url = urls+'team/'+val['slug'];
                  if(val['first_name']=="" || val['first_name']==null){
                    name='No Author';
                    page_url = 'javascript:void(0);';
                  }
                  if(val['designation_id']!=0 && val['designation']!=null){
                    designation=val['designation'];
                  }
                  /* Page URL For Interns*/
                  if(val['designation_id']==0)
                    page_url = urls+'intern';

                    newItems+='<div class="team-panel commom-cls" style="height: 439px;">'+
                      '<a href="'+page_url+'" title="Team detail">'+
                        '<div class="placeholderGallery" data-large="'+val['url']+'">'+
                          '<img src="'+val['thumbnail']+'" alt="Lightbox" title="Lightbox" class="img-small">'+
                        '</div>'+
                      '</a>'+
                      '<div class="description--float commom-cls">'+
                        '<div class="text-block">'+
                          '<a href="'+page_url+'" class="team-membername" title="'+name+'">'+name+'</a>'+
                          '<div class="sub-head">'+
                            '<div class="bar"> <span class="departname">'+designation+'</span></div>';
                            if(val['email_id']!=""){
                            newItems+='<div class="bar social-handlers">'+
                              '<ul>'+
                                '<li><a href="mailto:'+val['email_id']+'" title="Mail"><span class="the-icons mail-icon span3"><i class="demo-icon icon-mail">&#xe800;</i></span> </a></li>'+
                              '</ul>'+
                            '</div>';
                             }                        
                          newItems+='</div>'+
                        '</div>'+
                      '</div>'+
                    '</div>';
                  });
                  $('.listing-container').append(newItems);
                  if(data.page_count > 0)
                  {
                    team_page_count = data.page_count;
                    scroll_flag = 0;
                  }
              }else{
                $('.loading--icon').css({
                    'opacity' : 0
                }); 
              }
            },
        });
        $('.loading--icon').css({
            'opacity' : 1
        }); 
      }
      load_gallery_images();
      var listingCHeck = $('.grid'),
      listingHeight = $('.grid').height() + 30;
    
      $('.loading--icon').css({
        'top' : listingHeight + 'px'
      });
   }    
}

if(head_title=='Newthinking Listing')
{
  var scroll_flag = 0;
  function append_newthinking_images()
  {
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - $('footer').outerHeight() - $('.nl-signup').outerHeight()   &&  scroll_flag==0) 
    {
       scroll_flag = 1;
       $.ajax({
            url : urls+"newthinking_articles",
            type: "POST",
            dataType: "json",
            data : {search:$("#serrchBox").val(),gender:$('input[name=gender]:checked', '#searchForm').val(),page_count:article_count,tag_id:$("#tag_id").val(),category_id:$("#category_id").val(),'intern':$("#intern").val()},
            success: function(data, textStatus, jqXHR)
            {

              if(data.size>0)
              {
              var newItems= '';
               $.each(data.result,function(key,val){
                  if(val['url']=="" || val['url']==null){
                    val['url'] =FRONTEND_IMAGES_PATH+'portfolio-detail/articles/img1.jpg';
                  }else{
                    val['url'] =FRONTEND_PATH+val['url'];
                  }
                  if(val['thumbnail']=="" || val['thumbnail']==null){
                    val['thumbnail'] =FRONTEND_IMAGES_PATH+'portfolio-detail/articles/img1_thumb.jpg';
                   }
                   else{
                      val['thumbnail'] =FRONTEND_PATH+val['thumbnail'];
                   }
                 name = val['first_name']+" "+val['last_name'];
                 a_url = urls+'team/'+val['team_slug'];
                 if(val['first_name']=="" || val['first_name']==null){
                    name='No Author';
                    a_url = 'javascript:void(0);';
                 }else if(val['designation_id']==11 || val['designation_id']==12){
                  a_url = FRONTEND_PATH+"intern";
                 }if(val['is_extended']=='1' && val['extended_author']!="") {
                    name='No Author';
                    a_url = "javascript:void(0);";
                 }
                 target="";
                 page_url = urls+'new-thinking/'+val['slug'];
                 video_url = page_url;
                 category_filter_page=urls+$("#category_filter_page").val()+val['category_slug'];
                 if(val['content_type']=='video' &&  typeof data.video_article[val['id']] != 'undefined' && data.video_article[val['id']]!="")
                    video_url = page_url;
                if(val['is_extended']=='1')
                {
                  page_url = val['extended_url'];
                  target="_blanke";
                }
                video_url = page_url;
                 title = val['title'];
                 short_description = val['short_description'];
                
                  newItems+='<div class="article-panel grid-item article_left">'+
                    '<div class="related-thumb commom-cls">'+
                      '<a href="'+video_url+'" target="'+target+'" title="New thinking">';
                        if(val['article_redable_time']!=0){ 
                         newItems+='<span class="video-duration"><span>'+val['article_redable_time']+'</span></span>';
                        } 
                        if(val['content_type']=='video'){
                        newItems+= '<span class="video-playbtn">'+
                         '<span class="the-icons span3"><i class="demo-icon icon-googleplay">&#xe806;</i></span>'+
                         '</span>';
                        }
                        newItems+= '<div class="placeholderGallery commom-cls" data-large="'+val['url']+'">'+
                            '<img src="'+val['thumbnail']+'" alt="Lightbox" title="Lightbox" class="img-small">'+
                         '</div>'+
                       '</a>'+
                    '</div>'+
                   '<div class="description--float commom-cls">'+
                      '<div class="text-block">';
                        if(val['category']!='' && val['category']!=null){
                         newItems+='<a href="'+category_filter_page+'" class="sub-head">'+val['category']+'</a>';
                        }
                         newItems+='<h5>'+title+'</h5>'+
                         '<span class="auther-info commom-cls">';
                        if(name !="No Author")
                          newItems+='<a href="'+a_url+'" class="auther-name" title="'+name+'">'+name+'</a><br>';
                        newItems+='<span class="posting-date home-posting-date">'+val['pub_date']+'</span> </span>'+
                         '<p class="textlimit-p">'+short_description+'</p>'+
                         '<a class="button-block" '+target+' href="'+page_url+'" title="Read More">'+
                         '<span>Read More</span>'+
                         '</a>'+
                      '</div>'+
                   '</div>'+
                '</div>';
                });
               var newItems = $(newItems);
               $(newItems).imagesLoaded().then(function(){
                  $('.newthinking-div').append(newItems).isotope('appended', newItems);
                });
                text_concat();
                /*$('.masonry_new').isotope('layout');*/
                if(data.page_count > 0)
                {
                  article_count = data.page_count;
                  scroll_flag = 0;
                }
              }else{
                $('.loading--icon').css({
                    'opacity' : 0
                  }); 
              }
            },
        });
        $('.loading--icon').css({
            'opacity' : 1
        }); 
        $('.masonry_new').isotope('layout');
      }
      load_gallery_images();
      /*$('.masonry_new').isotope('layout');*/
      var listingCHeck = $('.grid'),
      listingHeight = $('.grid').height() + 60;
    
      $('.loading--icon').css({
        'top' : listingHeight + 'px'
      });

      if( $(window).innerWidth() > 992 ){
        if ( $(".entrepreneur--banner").height() + $('header').outerHeight() + $(".newtthinging--filter").height() < $(window).scrollTop() + $(window).height()  ) {
          $('.newtthinging--filter').addClass("sticky");
        }else if( $(".entrepreneur--banner").height() + $('header').outerHeight()  > $(window).scrollTop() ){
          $('.newtthinging--filter').removeClass("sticky");
        } 

        if( $(window).scrollTop() + $(window).height() >=  $(document).height() - $('footer').outerHeight() ){
          $('.newtthinging--filter').addClass("stickbottom");
        }else{
          $('.newtthinging--filter').removeClass("stickbottom");
        }
        
          
      $('.newtthinging--filter').css({
        'height' : $(window).height() - $('header').height() + 'px'
      })
        
      }
   }    
}

function searchByTag(tag)
{
  var page_name=$("#page_name").val();
  var page_url=urls+page_name+"/tag/"+tag;

  if(page_name=='newthinking/category' || page_name=='newthinking/author/intern')
  {
    category=$("#category").val();
    if(page_name=="newthinking/author/intern" && category!="" && category!=undefined){
      page_url=urls+page_name+"/category/"+category+"/tag/"+tag;
    }else if(category!="" && category!=undefined){
      page_url=urls+page_name+"/"+category+"/tag/"+tag;
    }
    if(tag=='all_tags'){
      page_url=urls+page_name+"/"+category;
      if(page_name=='newthinking/author/intern' && category!=""){
         page_url=urls+page_name+"/category/"+category;
      }
      $("#tag_id").val('');
      $("#tag").val('');
    }
  }else{
    if(tag=='all_tags'){
      category=$("#category").val();
      if(category!=""){
       page_url=urls+page_name+"/category/"+category;
      }else{
        page_url=urls+page_name;
      }
      $("#tag_id").val('');
      $("#tag").val('');
    }
  }
  $("#p_url").val(page_url);
  $('#searchForm').attr('action', page_url);
  $("#searchForm").submit();
}

$('#serrchBox').keypress(function (e) {
    if (e.which == 13) {
      if(page_title=='Newthinking'){
        $('#searchForm').attr('action', $("#p_url").val());
        $("#searchForm").submit();
      }else{
        signup_newsletter();
      }
      e.preventDefault();
    }
});

function signup_newsletter()
{
    $(".error-msg" ).html("");
    $(".thank-msg" ).html("");
    $.ajax({
        url : urls+"newsletter/add",
        type: "POST",
        dataType: "json",
        data : $('form#newsletterForm').serialize(),
        success: function(data, textStatus, jqXHR)
        {
            if(data.status=='failure')
            {
              if(data.error.email_id=="This field is required." || data.error.email_id=="This field must contain a valid email address."){
                data.error.email_id = 'Please enter a valid email address.';
                $("#news_msg1").html(data.error.email_id).show();
              }else{
                $("#news_msg3").html(data.error.email_id).show();
              }
            }   
            else
            {
               if(data.status=='success'){
                  $(".thank-msg").html('Thank you for subscribing.').show();
                  $('#newsletterForm')[0].reset();
               }
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {

        }
    });
}

function set_articleHeight(left_height,right_height)
{
  if(left_height>=right_height)
    $('.article_right').height(left_height);
  else if(right_height>=left_height)
    $('.article_left').height(right_height);
}

function setHeadingLength()
{
  $(".textlimit-h").text(function(e, t) {
      t.substr(0, 35);
      return $(this).text().length > 35 && $(this).addClass("appended"), t.substr(0, 35)
  }); $(".textlimit-p").text(function(e, t) {
      t.substr(0, 50);
      return $(this).text().length > 50 && $(this).addClass("appended"), t.substr(0, 50)
  });
}

/* FB Sharing */
if(page_title=="Newthinking"){
 window.fbAsyncInit = function() {
    FB.init({
      appId      : '1103978279703228',                            
      status     : true,                                 
      xfbml      : true                                  
    });
  };
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/all.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  function fbShare(){
    var product_name   =  $("#fb_title").val();
    var description    =  $("#fb_summary").val();
    var share_image    =  $('#fb_image').val();
    var share_url    = $("#fb_url").val() ; 
          var share_capt     =  $("#fb_title").val();
      FB.ui({
          method: 'feed',
          name: product_name,
          link: share_url,
          picture: share_image,
          caption: share_capt,
          description: description

      }, function(response) {
         /* if(response && response.post_id){}
          else{}*/
      });

  }
}
function setInterSliderActive(id){
  sessionStorage.setItem("intern_author_slider",id);
  window.location.href=FRONTEND_PATH+'intern';
}

/*if(page_title=='Intern'){
  $(window).on('load', function() {
      if(perv_ref!="" && perv_ref!=undefined){
        var segments = perv_ref.split('/');
        intern_author_slider=sessionStorage.getItem("intern_author_slider");
        if(intern_author_slider!="" && intern_author_slider!=undefined && segments[4]=='new-thinking'){
          slide=$("#author_name_"+intern_author_slider).attr("data-slick-index");
          $('#intern_slider').slick('slickGoTo', slide);
        }
      }
  });
}*/

if(head_title=='Intern Listing')
{
  var scroll_flag = 0;
  function append_intern_images()
  {
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - $('footer').outerHeight() - $('.nl-signup').outerHeight()   &&  scroll_flag==0) 
    {
       scroll_flag = 1;
       $.ajax({
            url : urls+"intern/getMoreIntern",
            type: "POST",
            dataType: "json",
            data : {page_count:intern_page_count},
            success: function(data, textStatus, jqXHR)
            {

              if(data.size>0)
              {
                var newItems= '';
                $.each(data.result,function(key,val){
                  if(val['url']=="" || val['url']==null){
                    val['url'] = FRONTEND_IMAGES_PATH+'team/listing/bhawana.jpg';
                  }
                  else{
                    val['url'] = FRONTEND_PATH+val['url'];
                  }   
                  if(val['thumbnail']==""  || val['thumbnail']==null){
                    val['thumbnail'] =FRONTEND_IMAGES_PATH+'team/listing/bhawana_thumb.jpg';
                  }
                  else{
                    val['thumbnail'] =FRONTEND_PATH+val['thumbnail'];
                  }
                  if(val['new_thinking_slug']!=null && val['new_thinking_slug']!='')
                  {
                      page_url=FRONTEND_PATH+'new-thinking/'+val['new_thinking_slug'];
                  }else{
                      page_url="javascript:void(0)";
                  }
                  intern_name =val['first_name']+" "+val['last_name'];
                  newItems+='<div class="article-panel grid-item ">'
                   newItems+='<div class="related-thumb commom-cls">';
                    if(val['new_thinking_slug']!='' && val['new_thinking_slug']!=null)
                    {
                      newItems+='<a href="'+page_url+'" title="New thinking">';
                    }
                    newItems+='<div class="placeholderGallery commom-cls" data-large="'+val['url']+'">'+
                        '<img src="'+val['thumbnail']+'" alt="Lightbox" title="Lightbox" class="img-small">'+
                      '</div>';
                    if(val['new_thinking_slug']!=null && val['new_thinking_slug']!='')
                    {
                      newItems+='</a>';
                    }
                   newItems+='</div>'+
                   '<div class="description--float commom-cls">'+
                      '<div class="text-block">'+
                         '<h5>'+intern_name+'</h5>'+
                         '<p class="textlimit-p">'+val['short_description']+'</p>'+
                      '</div>'+
                   '</div>'+
                '</div>';
                });
               var newItems = $(newItems);
               $(newItems).imagesLoaded().then(function(){
                   $('.intern_div_section').append(newItems).isotope('appended', newItems);
                });
                text_concat();
                if(data.page_count > 0)
                {
                  intern_page_count = data.page_count;
                  scroll_flag = 0;
                }
              }else{
                $('.loading--icon').css({
                    'opacity' : 0
                }); 
              }
            },
        });
        $('.loading--icon').css({
            'opacity' : 1
        }); 
        $('.masonry_new').isotope('layout');
      }
      load_gallery_images();
      var listingCHeck = $('.grid'),
      listingHeight = $('.grid').height() + 60;
    
      $('.loading--icon').css({
        'top' : listingHeight + 'px'
      });
   }    
}

$.fn.imagesLoaded = function () {

    // get all the images (excluding those with no src attribute)
    var $imgs = this.find('img[src!=""]');
    // if there's no images, just return an already resolved promise
    if (!$imgs.length) {return $.Deferred().resolve().promise();}

    // for each image, add a deferred object to the array which resolves when the image is loaded (or if loading fails)
    var dfds = [];  
    $imgs.each(function(){

        var dfd = $.Deferred();
        dfds.push(dfd);
        var img = new Image();
        img.onload = function(){dfd.resolve();}
        img.onerror = function(){dfd.resolve();}
        img.src = this.src;

    });

    // return a master promise object which will resolve when all the deferred objects have resolved
    // IE - when all the images are loaded
    return $.when.apply($,dfds);

}

