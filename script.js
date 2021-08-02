let bookCollection = [];
let uniqueID = 2;
function Book(title,author,pages,progress,read,uid){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.progress = progress;
    this.read = read;
    this.uid = uid;
}
function addBook(){
    let duplicate = false;
    let t = document.getElementById("title").value;
    let a = document.getElementById("author").value;
    let p = document.getElementById("pages").value;
    let pr = document.getElementById("pagesRead").value;
    let r = document.getElementById("read").checked;
    let id = uniqueID;

    for(book of bookCollection){
        if(book["title"] == t){
            duplicate = true;
        }
    }
    if(!duplicate && (t && a && p && pr)){
        bookCollection.push(new Book(t,a,p,pr,r,id));
        showBooks(t,a,p,pr,r,uniqueID);
        document.getElementById("exit").click() 
        document.getElementById("addBookForm").reset();
        uniqueID++;
       
    }
    else{
        console.log("Error");
    }
    console.log(bookCollection)
}

function showBooks(title,author,pages,pagesRead,read,uid){
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

    
    let progress_wrapper = document.createElement("div");
    progress_wrapper.setAttribute("class","progress-wrapper");

    let status = document.createElement("div");
    status.setAttribute("class","status");
    status.innerHTML = '.';

    
    let progress_filled = document.createElement("div");
    progress_filled.setAttribute("class","progress-filled");
    progress_filled.innerHTML = '.';

    let amount= document.createElement("span");
    amount.setAttribute("class","amount");
    let calc_progress = Math.floor((parseInt(pagesRead)/parseInt(pages)) * 100) 
    amount.innerHTML = `0%`;


    photo.appendChild(addPhoto);
    info.appendChild(bookTitle);
    info.appendChild(bookAuthor);
    status.append(progress_filled,amount)
    progress_wrapper.appendChild(status)

    content.append(info,photo,progress_wrapper);
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


    cardItem.setAttribute("data-item",uid)

    document.querySelector(".main").appendChild(cardItem);
    setTimeout(function (){updateProgressBar(calc_progress,uid)},400);

}

function updateProgressBar(value,id){
   
    let cardItem = document.querySelector(`[data-item="${id}"]`);
    

    let amt = cardItem.querySelector(".amount")
    let progress_bar = cardItem.querySelector(".progress-filled");

  

    let frequency = Math.floor(3000/value);
    
    progress_bar.style.width = `${value}%`

    
    current = parseInt((amt.innerHTML).replace("%",""));
    
    var an = setInterval(function(){
      if(current == value){
        clearInterval(an);
      }
      else{
        if(current < value){
            current++;
            amt.innerHTML = `${current}%`
        }
        else if(current>value){
            current--;
            amt.innerHTML = `${current}%`
        }
    }
    },frequency)
    
}
function currentPageUpdateSlider(pages){
    document.getElementById("pagesRead").setAttribute("max",pages)
}
function currentPageUpdate(pages){
    document.getElementById("current").innerHTML = pages
}



