let bookCollection = [];
function Book(title,author,pages,progress,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.progress = progress;
    this.read = read;
}
function addBook(){
    let duplicate = false;
    let t = document.getElementById("title").value;
    let a = document.getElementById("author").value;
    let p = document.getElementById("pages").value;
    let pr = document.getElementById("pagesRead").value;
    let r = document.getElementById("read").checked;
   

    for(book of bookCollection){
        if(book["title"] == t){
            duplicate = true;
        }
    }
    if(!duplicate && (t && a && p && pr)){
        bookCollection.push(new Book(t,a,p,pr,r));
        showBooks(t,a,p,pr,r);
        document.getElementById("exit").click() 
        document.getElementById("addBookForm").reset();
       
    }
    else{
        console.log("Error");
    }
    console.log(bookCollection)
}

function showBooks(title,author,pages,pagesRead,read){
    let cardItem = document.createElement("div");
    cardItem.setAttribute("class","cardItem");

    let content = document.createElement("div");
    content.setAttribute("class","content");

    let info = document.createElement("div");
    info.setAttribute("class","info");

    let bookTitle = document.createElement("div");
    bookTitle.setAttribute("class","bookTitle");
    bookTitle.innerHTML = title;


    let bookAuthor = document.createElement("div");
    bookAuthor.setAttribute("class","bookAuthor");
    bookAuthor.innerHTML = author;

    let photo = document.createElement("div");
    photo.setAttribute("class","photo");

    let addPhoto = document.createElement("button");
    addPhoto.setAttribute("class","addPhoto");
    addPhoto.innerHTML = "Upload cover"

    let status = document.createElement("div");
    status.setAttribute("class","status");
    status.innerHTML = "Progress";

    photo.appendChild(addPhoto);
    info.appendChild(bookTitle);
    info.appendChild(bookAuthor);

    content.append(info,photo,status);
    cardItem.appendChild(content);
    cardItem.animate([
        // keyframes
        { opacity: '0' },
        { opacity: '25' },
        { opacity: '50' },
        { opacity: '75' },
        { opacity: '100' },

      ], {
        // timing options
        duration: 1000,
        
      })

    document.querySelector(".main").appendChild(cardItem);

}

function updateProgressBar(value){
    let elems = document.querySelectorAll(".progress-filled");
    let elemsArr = [...elems];
    elemsArr.forEach((e)=>{
        e.style.width = `${value}%`
    })
    // document.querySelector(".progress-filled").style.width = `${value}%`
}
function currentPageUpdateSlider(pages){
    document.getElementById("pagesRead").setAttribute("max",pages)
}
function currentPageUpdate(pages){
    document.getElementById("current").innerHTML = pages
}



