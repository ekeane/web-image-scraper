var request = require('request');
var cheerio = require('cheerio');
  

// ----- variables for csv -------//
var json2csv = require('json2csv');
var fs = require('fs');
var fields = ['file permission', 'absolute url', 'file type'];



url = "http://substack.net/images/";
  
request(url, function (error, response, body) {

    if (!error) {

        var $ = cheerio.load(body);
        var images = []

        $('tr').each(function(i, element) {
            var row = $(this);

            // console.log(i+ ": "+ row.text());
            var fileDescription = row.find('td').first().find("code").text();
            var fileName        = row.find('td').eq(2).find('a').attr('href');   
            // checks if it is a directory
            if (fileDescription.indexOf('d') != -1) {

                console.log(fileDescription);


            } else { // is NOT a dir. puts all images 

            
                // tr.find('td:eq(2)')
                console.log(fileName);

                images.push(fileName);

            }

            // if (row.find('td').first().find("code") {

            // }

            // must check if it is a directory or an image file 
            // if directory ends in slash? then go into file and pull out images
            // else add image to array 

        });

        console.log(images);
    } else {
        console.log(error + "ERROR");
    }

//----------   for sending to csv file -------  //
    
    json2csv({ data: fields, fields: images}, function(err, csv) {
        if (err) console.log(err);
        fs.writeFile('images.csv', csv, function(err) {
            if (err) throw err;
            console.log('SAVED');
        });
    });

});


