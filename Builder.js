const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

// get parameters stuff
const filter = urlParams.get("type");

var jsonTutorials;

function fetchJsonFiles(filePaths) {
    return Promise.all(
        filePaths.map((filePath) =>
            fetch(filePath).then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
        )
    );
}

document.addEventListener("DOMContentLoaded", (event) => {
    const dropdownBtn = document.querySelector(".dropdown-btn");
    const dropdownContent = document.querySelector(".dropdown-content");

    if (dropdownBtn != undefined) {
        dropdownBtn.addEventListener("click", () => {
            dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        });

        window.addEventListener("click", (event) => {
            if (!event.target.matches(".dropdown-btn")) {
                if (dropdownContent.style.display === "block") {
                    dropdownContent.style.display = "none";
                }
            }
        });
    }
});

async function GetAllData() {
    const jsonFilePaths = ["/tutorials/TutData.json"];
    await fetchJsonFiles(jsonFilePaths)
        .then((dataArray) => {
            dataArray.forEach((data, index) => {
                // console.log(`Data from ${jsonFilePaths[index]}:`, data);
                if (index == 0) {
                    jsonTutorials = data;
                }
            });
        })
        .catch((error) => {
            console.error("Error fetching JSON files:", error.message);
        });
}
async function CheckData() {
    if (jsonTutorials === undefined) {
        await GetAllData();

        HandlePage();
    }
}

function showAllPostsDescending(evt) {
    var i = 0;
    var list = [];

    var iDiv = "";

    for (let i = 0; i < jsonTutorials.length; i++) {
        iDiv = test.content.cloneNode(true);
        document.getElementById("output").appendChild(iDiv);

        // elem.append(newDiv); // (*)
        list.push(jsonTutorials[i]);
    }
    document.getElementById("output").innerHTML = "";
    list.sort(compare_date);
    list.reverse();
    for (let i = 0; i < list.length; i++) {
        iDiv = test.content.cloneNode(true);
        document.getElementById("output").appendChild(iDiv);
        fillPost(list[i].id);
    }

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

    console.log("amount of posts: " + jsonTutorials.length);
}

function ShowStartButton() {
    var allbutton = document.getElementById("allbutton");
    allbutton.className += " active";

    if (filter != undefined) {
        showfilter(event, filter);
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");

            if (tablinks[i].id == filter) {
                console.log(tablinks[i].id + " " + filter);
                tablinks[i].className += " active";
            }
        }
    }
}

function showAllPostsAscending() {
    var i = 0;
    var list = [];
    var iDiv = "";
    for (let i = 0; i < jsonTutorials.length; i++) {
        iDiv = test.content.cloneNode(true);
        document.getElementById("output").appendChild(iDiv);

        // elem.append(newDiv); // (*)
        list.push(jsonTutorials[i]);
    }
    document.getElementById("output").innerHTML = "";
    list.sort(compare_date);

    for (let i = 0; i < list.length; i++) {
        iDiv = test.content.cloneNode(true);
        document.getElementById("output").appendChild(iDiv);
        fillPost(list[i].id);
    }
}

function compare_date(a, b) {
    var dateA = a.date.split("/");
    dateA = dateA[1] + dateA[0];
    var dateB = b.date.split("/");
    dateB = dateB[1] + dateB[0];
    return dateA - dateB;
}

function showfilter(evt, type) {
    var currenturl = "";
    if (type === undefined) {
        showAllPostsDescending(evt);
        currenturl = window.location.href.split("?")[0];
        window.history.replaceState({}, "foo", currenturl);
        return;
    }
    var list = [];
    var textvalue;
    document.getElementById("output").innerHTML = "";
    for (let i = 0; i < jsonTutorials.length; i++) {
        for (let j = 0; j < jsonTutorials[i].types.length; j++) {
            if (type == jsonTutorials[i].types[j].slug) {
                if (!isInArray(list, jsonTutorials[i])) {
                    list.push(jsonTutorials[i]);
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
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    if (evt != undefined) {
        evt.currentTarget.className += " active";
    }

    currenturl = window.location.href.split("?")[0];

    window.history.replaceState({}, "foo", currenturl + "?type=" + type);
}

function searchData() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");

    filter = input.value.toUpperCase();
    // var test = filter.replace(' ', "_");
    searchUnits(filter);
}

function searchUnits(keyword) {
    var i,
        output,
        textvalue,
        j,
        l,
        result = "";
    var list = GetSearchList(keyword);
    document.getElementById("output").innerHTML = "";
    for (let i = 0; i < list.length; i++) {
        var iDiv = test.content.cloneNode(true);
        document.getElementById("output").appendChild(iDiv);

        // elem.append(newDiv); // (*)

        fillPost(list[i].id);
    }
}

function GetSearchList(keyword) {
    var fields = keyword.split(" ");
    console.log(fields);
    var list = [];

    for (let i = 0; i < fields.length; i++) {
        if (fields[i] != "") {
            SearchListUsingKeyWordAndPush(jsonTutorials, fields[i].toLowerCase(), list);
        }

        //searchList = Array.from(list);
    }

    list.sort(compare_date);
    list.reverse();
    return list;
}

function SearchListUsingKeyWordAndPush(inlist, keyword, outlist) {
    console.log(keyword);
    for (let i = 0; i < inlist.length; i++) {
        textvalue = inlist[i].title;
        if (textvalue.toLowerCase().indexOf(keyword) != -1) {
            if (!isInArray(outlist, inlist[i]) && !inlist[i].hasOwnProperty("deprecated")) {
                outlist.push(inlist[i]);
            }
        }
        textvalue = inlist[i].description;
        if (textvalue.toLowerCase().indexOf(keyword) != -1) {
            if (!isInArray(outlist, inlist[i]) && !inlist[i].hasOwnProperty("deprecated")) {
                outlist.push(inlist[i]);
            }
        }
        for (let j = 0; j < inlist[i].tags.length; j++) {
            if (keyword == inlist[i].tags[j].slug.toLowerCase()) {
                if (!isInArray(outlist, inlist[i]) && !inlist[i].hasOwnProperty("deprecated")) {
                    outlist.push(inlist[i]);
                }
            }
        }
        for (let j = 0; j < inlist[i].types.length; j++) {
            if (keyword == inlist[i].types[j].slug.toLowerCase()) {
                if (!isInArray(outlist, inlist[i]) && !inlist[i].hasOwnProperty("deprecated")) {
                    outlist.push(inlist[i]);
                }
            }
        }
    }
    return outlist;
}

function isInArray(array, search) {
    return array.indexOf(search) != -1;
}

function ShowPostFromLink() {
    var spellID = urlParams.get("post");
    if (spellID != undefined) {
        document.title = "Minionsart Tutorials - " + spellID;
        FillInFullPost(spellID, "dataHolder");
    }
}

function FillInFullPost(id) {
    for (let i = 0; i < jsonTutorials.length; i++) {
        if (id == jsonTutorials[i].id) {
            a = jsonTutorials[i];
            var title,
                icon,
                date,
                originalDate,
                description,
                mainlink,
                type,
                background,
                links,
                card = "";
            card = document.getElementById("card");
            card.setAttribute("id", "card" + a.id);

            //title
            title = document.getElementById("title");
            title.innerHTML = a.title;

            title.setAttribute("id", "title" + a.id);

            var tinyLink = document.getElementById("tinyLink");
            tinyLink.innerHTML = a.id;
            tinyLink.setAttribute("id", "tinyLink" + a.id);

            var postlink = document.getElementById("postlink");
            postlink.innerHTML = "<a href=" + a.link + "><linkIcon></linkIcon> READ POST</a>";
            // background image

            background = document.getElementById("postPreview");
            var video = document.getElementById("videoPreview");
            if (containsTypeSlug(a, "video")) {
                video.setAttribute("src", a.videolink);
                video.setAttribute("id", "video" + a.id);
                background.remove();
            } else {
                video.remove();
            }

            // replace link to post with link to new post page thingie
            // const newlink = `/tutorials/Posts.html?post=${a.id}`;

            background.setAttribute("id", "postPreview" + a.id);

            //
            background.setAttribute("src", "/tutorials/Images/Gifs/" + a.id + ".gif");

            // date
            // get dates holder and generate a update or released data
            date = document.getElementById("dates");
            var newDateDiv = document.createElement("DIV");
            newDateDiv.innerHTML = '<span class="dates"><calendar></calendar> Released: </span>' + a.date;

            date.appendChild(newDateDiv);

            if ("updateDate" in a) {
                var newUpDateDiv = document.createElement("DIV");
                newUpDateDiv.innerHTML =
                    '<span class="dates"><calendar></calendar> Updated: </span>' + a.updateDate + "";

                date.appendChild(newDateDiv);
            }
            date.setAttribute("id", "updateDate" + a.id);

            // description
            description = document.getElementById("postdescription");
            description.innerHTML = a.description;
            description.setAttribute("id", "postdescription" + a.id);

            // get the links associated with the post

            // keep support for old style of links, but also check for new style
            links = document.getElementById("sourcelinks");
            if ("patreonlink" in a) {
                if (a.patreonlink != "") {
                    var newDateDiv = document.createElement("DIV");

                    // check if not BIRP
                    if (
                        containsTypeSlug(a, "other") ||
                        containsTypeSlug(a, "gameplay") ||
                        containsTypeSlug(a, "3d") ||
                        containsTypeSlug(a, "texturing")
                    ) {
                        newDateDiv.innerHTML =
                            '<span class="patreonDownloadLink"><a href="' +
                            a.patreonlink +
                            '">DOWNLOAD </a></span> <patreon></patreon> Files ($10 Tier)';
                    } else {
                        newDateDiv.innerHTML =
                            '<span class="patreonDownloadLink"><a href="' +
                            a.patreonlink +
                            '">DOWNLOAD </a></span> <patreon></patreon> BIRP Files ($10 Tier)';
                    }

                    links.appendChild(newDateDiv);
                }
            }

            if ("extralink" in a) {
                if (a.extralink != "") {
                    var newDateDiv = document.createElement("DIV");
                    newDateDiv.innerHTML =
                        '<span class="patreonDownloadLink"><a href="' +
                        a.extralink +
                        '"> DOWNLOAD </a></span>' +
                        a.extralink_description;
                    links.appendChild(newDateDiv);
                }
            }

            if ("newlinks" in a) {
                for (let i = 0; i < a.newlinks.length; i++) {
                    var newDateDiv = document.createElement("DIV");

                    newDateDiv.innerHTML =
                        '<span class="patreonDownloadLink"><a href="' +
                        a.newlinks[i].link +
                        '"><patreon></patreon> DOWNLOAD </a></span>' +
                        a.newlinks[i].description;
                    links.appendChild(newDateDiv);
                }
            }

            // there are no links
            if (links.innerHTML == "" && !containsTypeSlug(a, "video")) {
                var newDateDiv = document.createElement("DIV");
                newDateDiv.innerHTML = "None yet, ask if you need it :)";
                links.appendChild(newDateDiv);
            }
            var linksExtra = document.getElementById("extraLinks");
            if ("webgllink" in a) {
                newDateDiv.innerHTML =
                    '<span class="postLink"><a href="' + a.webgllink + '">DEMO </a></span> Play WEBGL Demo';
                linksExtra.appendChild(newDateDiv);
            }

            // type
            type = document.getElementById("type");
            for (let i = 0; i < a.types.length; i++) {
                var typeDiv = CreateTypeDiv(a.types[i].slug);

                type.appendChild(typeDiv);
            }

            type.setAttribute("id", "type" + a.id);

            tag = document.getElementById("tags");
            if ("tags" in a) {
                for (let i = 0; i < a.tags.length; i++) {
                    if (i == a.tags.length - 1) {
                        tag.innerHTML += a.tags[i].slug;
                    } else {
                        tag.innerHTML += a.tags[i].slug + ", ";
                    }
                }
            }

            tag.setAttribute("id", "tags" + a.id);

            FindRelatedPosts(a);
            /*}*/
        }
    }
}

function containsTypeSlug(jsonData, slug) {
    return jsonData.types.some((type) => type.slug === slug);
}

function removeByValue(array, value) {
    return array.filter((item) => item !== value);
}

function FindRelatedPosts(tutData) {
    var searchEntries = "";
    if ("tags" in tutData) {
        for (var i = 0; i < tutData.tags.length; i++) {
            if (i == tutData.tags.length - 1) {
                searchEntries += tutData.tags[i].slug;
            } else {
                searchEntries += tutData.tags[i].slug + " ";
            }
        }
    }
    if (searchEntries != "") {
        var list = GetSearchList(searchEntries);
        console.log(searchEntries);
        console.log(list);
        // remove current entry

        list = removeByValue(list, tutData);

        for (let i = 0; i < list.length; i++) {
            var iDiv = test.content.cloneNode(true);
            document.getElementById("relatedPosts").appendChild(iDiv);

            // elem.append(newDiv); // (*)

            fillPost(list[i].id);
        }
    }
}

function fillPost(id) {
    for (let i = 0; i < jsonTutorials.length; i++) {
        if (id == jsonTutorials[i].id) {
            a = jsonTutorials[i];
            var title,
                icon,
                date,
                originalDate,
                description,
                mainlink,
                type,
                background,
                card = "";
            card = document.getElementById("card");
            card.setAttribute("id", "card" + a.id);

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

            // replace link to post with link to new post page thingie
            const newlink = `/tutorials/Posts.html?post=${a.id}`;
            background.setAttribute("href", newlink);

            background.setAttribute("id", "linkBackground" + a.id);

            var link = extractPostNumber(a.link);

            /*  background.setAttribute(
                "style",
                "background-image: url(" + "https://www.patreon.com/meta-image/post/" + link + ")"
            );*/
            background.setAttribute(
                "style",
                "background-image: url(" + "/tutorials/Images/Thumbnails/" + a.id + ".jpg"
            );

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

            /*extralink = document.getElementById("extralink");
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
            patreonlink.setAttribute("id", "patreonlink" + a.id);*/

            // type
            type = document.getElementById("type");
            for (let i = 0; i < a.types.length; i++) {
                var typeDiv = CreateTypeDiv(a.types[i].slug);

                type.appendChild(typeDiv);
            }

            type.setAttribute("id", "type" + a.id);

            /*}*/
        }
    }
}

function CreateTypeDiv(slug) {
    var typeDiv = document.createElement("DIV");
    typeDiv.className = "typefilter";

    switch (slug) {
        case "built-in":
            typeDiv.setAttribute("style", "background-color: #416eb3; border: 2px solid #8193ff;");

            typeDiv.innerHTML = "Built-In";

            break;

        case "3d":
            typeDiv.setAttribute("style", "background-color: #c31f8b; border: 2px solid #ff00f6;");

            typeDiv.innerHTML = "3D";

            break;

        case "other":
            typeDiv.setAttribute("style", "background-color: #666666; border: 2px solid #bdbdbd;");

            typeDiv.innerHTML = "Other";

            break;

        case "gameplay":
            typeDiv.setAttribute("style", "background-color: #ca9243; border: 2px solid #ffc470;");

            typeDiv.innerHTML = "Gameplay";

            break;
        case "shader-graph":
            typeDiv.setAttribute("style", "background-color: #5ad2b7; border: 2px solid #92ffe7;");

            typeDiv.innerHTML = "Shader Graph";

            break;
        case "urp":
            typeDiv.setAttribute("style", "background-color: #41b34e; border: 2px solid #8193ff;");

            typeDiv.innerHTML = "URP";

            break;
        case "godot":
            typeDiv.setAttribute("style", "background-color: #5ecd68; border: 2px solid #91ff9b;");

            typeDiv.innerHTML = "GODOT";

            break;
        case "asset-pack":
            typeDiv.setAttribute("style", "background-color: #8d48cd; border: 2px solid #be79ff;");

            typeDiv.innerHTML = "Asset Pack";

            break;
        case "design":
            typeDiv.setAttribute("style", "background-color: #3c422f; border: 2px solid #999c91;");

            typeDiv.innerHTML = "Design";

            break;
        case "texturing":
            typeDiv.setAttribute("style", "background-color: #c44e4e; border: 2px solid #f38e8e;");

            typeDiv.innerHTML = "Textures";

            break;
        case "video":
            typeDiv.setAttribute("style", "background-color: #dce065; border: 2px solid #fdffc7;");

            typeDiv.innerHTML = "Video";

            break;
    }
    return typeDiv;
}

function extractPostNumber(url) {
    const regex = /(\d+)$/;
    const match = url.match(regex);
    if (match) {
        return match[1];
    } else {
        return null;
    }
}
