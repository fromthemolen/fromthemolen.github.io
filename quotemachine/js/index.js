        $(document).ready(function () {
            getQuote();

            $('#newQuote').click(function () {
               $(".quote").fadeOut(3000);
               $(".btn").fadeOut(3000);
               $("#tweet").fadeOut(3000);


              setTimeout(function(){                
                getQuote();
               $(".quote").fadeIn(3000);
               $(".btn").fadeIn(3000);
               $("#tweet").fadeIn(3000);

              }, 3000);

 
            })
            function getQuote() {
                //e.preventDefault();
                $.ajax({

                    type: 'GET',
                    url: "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?",
                    processData: true,
                    data: {},
                    dataType: "json",
                    success: function (data) {
                        processData(data);
                        randomColor();

                    }
                });
            }
            function randomColor(){
              var color = Math.floor(Math.random() * 16777215/2);
              var inverse = (16777214/2 - color);
              if(inverse>0){
                inverse;
              }else{
                inverse = inverse + color;
              }
              
              var average = (color + inverse) / 2;
              var inverseback = '#' + inverse.toString(16);
                var back = '#' + color.toString(16);
              
                        $('.vertical-center').css('background', back);
                        $('.box').css('background', inverseback);

                        $('.btn').css('background-color', back);
                        $('.btn').css('color', inverseback);
                        $('.quote-machine').css('color', back);
                        $('.quote').css('color', back);
                        $('.quotation').css('color', back);
                        $('i').css('color', back);

            };


              function truncateString(str, author, num) {
                var oldstring = str;
                str = str.concat(' ');
                str = str.concat(author);
                
                
                var newstring ='';
                if(str.length <= 3){
                  newstring = oldstring.slice(0, num);
                  newstring = newstring.concat('... ');

                }else if(str.length > num && num < 3){
                  newstring = oldstring.slice(0, num);
                  newstring = newstring.concat('... ');

  
                }else if(str.length > num && num > 3){
                  newstring = oldstring.slice(0, num - 3);
                  newstring = newstring.concat('... ');
                }else{
                  newstring = oldstring.concat(' ');
                }
  
                 return newstring.concat(author);
                }
              
            function processData(data) {
                //Do some stuff with the data
                var post = data; // The data is an array of posts. Grab the first one.
              var tweet = truncateString(post.quoteText, post.quoteAuthor, 130);

              
              $('#tweet').html('<a href="https://twitter.com/intent/tweet?text='+tweet+'&hashtags=quotes"><i class="fab fa-twitter"></i></a>')
                $('.quote').html('<blockquote><p class="quotation">'+ post.quoteText + ' <footer class="text-right"> &mdash;  ' + post.quoteAuthor + '</footer></blockquote> ');
                // If the Source is available, use it. Otherwise hide it.
                if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
                    $('#quote-source').html('Source:' + post.custom_meta.Source);
                } else {
                    $('#quote-source').text('');
                }

            }
        });