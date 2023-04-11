 const queryString = window.location.search;
 const urlParams = new URLSearchParams(queryString);

 // get parameters stuff
 const filter = urlParams.get('type');



function showAllPostsDescending(evt) {

    var i = 0;
    var list = new Array();




    for (let i = 0; i < tutorials.posts.length; i++) {

        var iDiv = test.content.cloneNode(true);
        document.getElementById("output").appendChild(iDiv);



        // elem.append(newDiv); // (*)
        list.push(tutorials.posts[i]);


    };
    document.getElementById("output").innerHTML = '';
    list.sort(compare_date);
    list.reverse();
    for (let i = 0; i < list.length; i++) {
        var iDiv = test.content.cloneNode(true);
        document.getElementById("output").appendChild(iDiv);
        fillPost(list[i].id);

    };

    if (evt === undefined) {

    } else {


        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab

        evt.currentTarget.className += " active";

    }

    console.log("amount of posts: " + tutorials.posts.length);


}

function ShowStartButton() {
    var allbutton = document.getElementById("allbutton");
    allbutton.className += " active";
    
     if (filter != undefined) {
     showfilter(event, filter)
 }
}

function showAllPostsAscending() {
    var i = 0;
    var list = new Array();
    for (let i = 0; i < tutorials.posts.length; i++) {
        var iDiv = test.content.cloneNode(true);
        document.getElementById("output").appendChild(iDiv);

        // elem.append(newDiv); // (*)
        list.push(tutorials.posts[i]);


    };
    document.getElementById("output").innerHTML = '';
    list.sort(compare_date);

    for (let i = 0; i < list.length; i++) {
        var iDiv = test.content.cloneNode(true);
        document.getElementById("output").appendChild(iDiv);
        fillPost(list[i].id);

    };

}

function compare_date(a, b) {

    var dateA = a.date.split('/');
    dateA = dateA[1] + dateA[0];
    var dateB = b.date.split('/');
    dateB = dateB[1] + dateB[0];
    return dateA - dateB;

}



function showfilter(evt, type) {
    var list = new Array();
    var textvalue;
    document.getElementById("output").innerHTML = '';
    for (let i = 0; i < tutorials.posts.length; i++) {
        for (let j = 0; j < tutorials.posts[i].types.length; j++) {
            if (type == tutorials.posts[i].types[j].slug) {
                if (!isInArray(list, tutorials.posts[i])) {
                    list.push(tutorials.posts[i]);
                }

            }
        }
    }
    list.sort(compare_date);
    list.reverse();

    for (let i = 0; i < list.length; i++) {
        var iDiv = test.content.cloneNode(true);
        document.getElementById("output").appendChild(iDiv);

        // elem.append(newDiv); // (*)

        fillPost(list[i].id);

    };

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab

    evt.currentTarget.className += " active";
    
      var currenturl = window.location.href.split('?')[0];

     window.history.replaceState({}, 'foo', currenturl + "?type=" + type);
}


function searchData() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");


    filter = input.value.toUpperCase();
    // var test = filter.replace(' ', "_");
    searchUnits(filter);

}

function searchUnits(keyword) {
    var i, output, textvalue, j, l, result = "";

    var fields = keyword.split(' ');
    console.log(fields.length);
    var list = new Array();
    document.getElementById("output").innerHTML = '';

    var searchList = Array.from(tutorials.posts);
    for (let i = 0; i < fields.length; i++) {
        list = new Array();
        SearchListUsingKeyWordAndPush(searchList, fields[i], list);
        searchList = Array.from(list);


    }





    list.sort(compare_date);
    list.reverse();
    for (let i = 0; i < list.length; i++) {
        var iDiv = test.content.cloneNode(true);
        document.getElementById("output").appendChild(iDiv);

        // elem.append(newDiv); // (*)

        fillPost(list[i].id);

    }

}

function SearchListUsingKeyWordAndPush(inlist, keyword, outlist) {
    for (let i = 0; i < inlist.length; i++) {
        textvalue = inlist[i].title;
        if (textvalue.toUpperCase().indexOf(keyword) > -1) {
            if (!isInArray(outlist, inlist[i])) {
                outlist.push(inlist[i]);
            }
        }
        textvalue = inlist[i].description;
        if (textvalue.toUpperCase().indexOf(keyword) > -1) {
            if (!isInArray(outlist, inlist[i])) {
                outlist.push(inlist[i]);
            }
        }
        for (let j = 0; j < inlist[i].tags.length; j++) {
            if (keyword == inlist[i].tags[j].slug.toUpperCase()) {
                if (!isInArray(outlist, inlist[i])) {
                    outlist.push(inlist[i]);
                }

            }
        }
        for (let j = 0; j < inlist[i].types.length; j++) {
            if (keyword == inlist[i].types[j].slug.toUpperCase()) {
                if (!isInArray(outlist, inlist[i])) {
                    outlist.push(inlist[i]);
                }

            }
        }
    }
    return outlist;
}

function isInArray(array, search) {
    return array.indexOf(search) >= 0;
}



function fillPost(id) {

    for (let i = 0; i < tutorials.posts.length; i++) {
        if (id == tutorials.posts[i].id) {
            a = tutorials.posts[i];
            var title, icon, date, originalDate, description, mainlink, type, background, card = "";
            card = document.getElementById("card");
            card.setAttribute("id", "card" + a.id);
            /*if (a.types[0].slug == "video") {
                var iDiv = videoTest.content.cloneNode(true);
                card.innerHTML = "";
                card.appendChild(iDiv);
                video = document.getElementById("video");
                video.setAttribute("src", a.videolink);
                video.setAttribute("id", "video" + a.id);

            } else {*/


            //title
            title = document.getElementById("title");
            title.innerHTML = a.title;

            title.setAttribute("id", "title" + a.id);

            // background image
            //   icon = document.getElementById("previewimage")
            // icon.innerHTML = "<a href=" + a.link + ">";

            // icon.setAttribute("style", "background-image: url(" + "/tutorials/Images/Previews/" + a.id + ".jpg");


            //  icon.setAttribute("id", "previewimage" + a.id);

            background = document.getElementById("linkBackground");

            background.setAttribute("href", a.link);

            background.setAttribute("id", "linkBackground" + a.id);
            background.setAttribute("style", "background-image: url(" + "/tutorials/Images/Thumbnails/" + a.id + ".jpg");

            // date
            date = document.getElementById("postdate");
            originalDate = document.getElementById("originaldate");
            if (a.originalDate == undefined) {
                // original date for updated posts
                date.innerHTML = a.date;
                originalDate.innerHTML = "";

            } else {
                originalDate.innerHTML = a.originalDate;
                date.innerHTML = a.date + " *Updated*";
            }
            originalDate.setAttribute("id", "originaldate" + a.id);



            date.setAttribute("id", "postdate" + a.id);


            // description
            description = document.getElementById("postdescription");
            description.innerHTML = a.description;
            description.setAttribute("id", "postdescription" + a.id);


            extralink = document.getElementById("extralink");
            if (a.extralink != "") {
                extralink.setAttribute("href", a.extralink);
                extralink.innerHTML = a.extralink_description;


            } else {
                extralink.innerHTML = "";
            }
            extralink.setAttribute("id", "extralink" + a.id);

            patreonlink = document.getElementById("patreonlink");

            if (a.patreonlink != "") {
                patreonlink.setAttribute("href", a.patreonlink);
                patreonlink.innerHTML = "<Patreon></Patreon>  Source Files ($10 Tier)";

            } else {
                patreonlink.innerHTML = "";
            }
            patreonlink.setAttribute("id", "patreonlink" + a.id);

            // type
            type = document.getElementById("type");
            for (let i = 0; i < a.types.length; i++) {

                var typeDiv = document.createElement("DIV");
                typeDiv.className = "typefilter";

                switch (a.types[i].slug) {
                    case "built-in":

                        typeDiv.setAttribute("style", "background-color: #416eb3; border: 2px solid #8193ff;")

                        typeDiv.innerHTML = "Built-In";



                        break;

                    case "3d":

                        typeDiv.setAttribute("style", "background-color: #c31f8b; border: 2px solid #ff00f6;")

                        typeDiv.innerHTML = "3D";

                        break;

                    case "other":

                        typeDiv.setAttribute("style", "background-color: #666666; border: 2px solid #bdbdbd;")

                        typeDiv.innerHTML = "Other";

                        break;

                    case "gameplay":

                        typeDiv.setAttribute("style", "background-color: #ca9243; border: 2px solid #ffc470;")

                        typeDiv.innerHTML = "Gameplay";

                        break;
                    case "shader-graph":

                        typeDiv.setAttribute("style", "background-color: #5ad2b7; border: 2px solid #92ffe7;")

                        typeDiv.innerHTML = "Shader Graph";

                        break;
                    case "urp":

                        typeDiv.setAttribute("style", "background-color: #5ecd68; border: 2px solid #91ff9b;")

                        typeDiv.innerHTML = "URP";

                        break;
                    case "asset-pack":

                        typeDiv.setAttribute("style", "background-color: #8d48cd; border: 2px solid #be79ff;")

                        typeDiv.innerHTML = "Asset Pack";

                        break;
                    case "design":

                        typeDiv.setAttribute("style", "background-color: #3c422f; border: 2px solid #999c91;")

                        typeDiv.innerHTML = "Design";

                        break;
                    case "texturing":

                        typeDiv.setAttribute("style", "background-color: #c44e4e; border: 2px solid #f38e8e;")

                        typeDiv.innerHTML = "Textures";

                        break;
                    case "video":

                        typeDiv.setAttribute("style", "background-color: #dce065; border: 2px solid #fdffc7;")

                        typeDiv.innerHTML = "Video";

                        break;
                }
                type.appendChild(typeDiv);


            }

            type.setAttribute("id", "type" + a.id);


            /*}*/
        }
    }
}
