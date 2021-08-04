window.onload = function(){
    if(JSON.parse(localStorage.getItem("books")) != null){
        let bookList = JSON.parse(localStorage.getItem("books"));
        
        bookList.forEach((book) => {
            showBooks(book.title,book.author,book.pages,book.progress,book.read,book.uid,book.imgsrc);
        });
    }
}



function Book(title,author,pages,progress,read,uid,imgsrc){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.progress = progress;
    this.read = read;
    this.uid = uid;
    this.imgsrc = imgsrc;
}
function addBook(){
    let duplicate = false;
    let t = document.getElementById("title").value;
    let a = document.getElementById("author").value;
    let p = document.getElementById("pages").value;
    let pr = document.getElementById("pagesRead").value;
    let r = document.getElementById("read").checked;



    if(JSON.parse(localStorage.getItem("books") == null)){
        localStorage.setItem("ids","0");
        let book = [new Book(t,a,p,pr,r,0,"")]
        localStorage.setItem("books",JSON.stringify(book))
        document.getElementById("exit").click() 
        document.getElementById("addBookForm").reset();
        showBooks(t,a,p,pr,r,0,"");        
    }
    else{
        booksList = JSON.parse(localStorage.getItem("books"));
        for(book of booksList){
            if(book["title"] == t){
                duplicate = true;
            }
        }
        if(!duplicate && (t && a && p && pr)){
            ids = localStorage.getItem("ids");
            uid = parseInt(ids) + 1; 
            newBook = new Book(t,a,p,pr,r,uid,"");
            booksList.push(newBook);
            localStorage.setItem("books",JSON.stringify(booksList))
            localStorage.setItem("ids",uid.toString());
            document.getElementById("exit").click() 
            document.getElementById("addBookForm").reset();
            showBooks(t,a,p,pr,r,uid,"");
        }
        else{
            alert("Dupicate entry!")
        }
    }
}


function formRead(obj){
    let slider = ((obj.parentNode.parentNode).previousElementSibling).querySelector("#pagesRead")
    
    let pages = ((slider.parentNode).previousElementSibling).querySelector("#pages");
    if(obj.checked){
        slider.value = pages.value;
    }
}
function showBooks(title,author,pages,pagesRead,read,uid,img){
    let cardItem = document.createElement("div");
    cardItem.setAttribute("class","cardItem");


    let changeDiv = document.createElement("div");
    changeDiv.setAttribute("class","change");
    let changeButton = document.createElement("button");
    changeButton.setAttribute("class","edit-page");
    changeButton.setAttribute("onclick","makeEditable(this)")
    let changeImg = new Image()
    changeImg.src = "images/pen-edit.png"
    changeButton.appendChild(changeImg)
    changeDiv.appendChild(changeButton)
   


    let removeDiv = document.createElement("div");
    removeDiv.setAttribute("class","remove");
    let removeButton = document.createElement("button");
    removeButton.setAttribute("class","delete-book");
    removeButton.setAttribute("onclick","removeBook(this)")
    let removeImg = new Image()
    removeImg.src = "images/delete-icon.png"
    removeButton.appendChild(removeImg);
    removeDiv.appendChild(removeButton);
    


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

    let addPhoto = document.createElement("input");
    addPhoto.setAttribute("type","file");
    addPhoto.setAttribute("class","importImage");
    addPhoto.setAttribute("onchange","uploadPhoto(this)")
    addPhoto.setAttribute("accept","image/png, image/gif, image/jpeg")

    let cover = document.createElement("img");
    cover.src = img;

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

    let edits = document.createElement("div");
    edits.setAttribute("class","edits");


    let pages_read_text = document.createElement("p");
    pages_read_text.setAttribute("class","pages-read-text");

    pages_read_text.innerHTML = `<span class="readPages" onblur="updatePagesRead(this)">${pagesRead}</span>/<span class="totalPages" onblur="updateTotalPages(this)">${pages}</span> pages.`//ADD THIS TO EDITS




    let main_toggle = document.createElement("div");
    main_toggle.setAttribute("class","main-toggle");


    let toggle_label = document.createElement("div");
    toggle_label.setAttribute("class","toggle-label");
    toggle_label.innerText = "Read";

    let div_form = document.createElement("div");
    div_form.classList.add("form-check","form-switch");


    let input_switch = document.createElement("input");
    input_switch.classList.add("form-check-input","finish")
    input_switch.setAttribute("type","checkbox");
    input_switch.setAttribute("id","flexSwitchCheckDefault");
    input_switch.setAttribute("onclick","markAsRead(this)")
    if(read){
        input_switch.checked = true;
    }

    div_form.appendChild(input_switch);
    main_toggle.append(toggle_label,div_form);

    edits.append(pages_read_text,main_toggle);


    if(img){
        photo.appendChild(cover);
    }
    else{
        photo.appendChild(addPhoto);
    }
    
    info.appendChild(bookTitle);
    info.appendChild(bookAuthor);
    status.append(progress_filled,amount)
    progress_wrapper.appendChild(status)

    content.append(info,photo,progress_wrapper,edits);
    cardItem.append(changeDiv,removeDiv,content);
    // console.log('THIS ISISIISISIS');
    // console.log(cardItem);
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

  
    current = parseInt((amt.innerHTML).replace("%",""));
    eq = Math.abs(current-value)
    let frequency = Math.floor(3000/eq);
    
    progress_bar.style.width = `${value}%`;
    
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

function makeEditable(currentNode){
    let cardItem = currentNode.parentNode.parentNode;
    let p = cardItem.querySelector(".pages-read-text");
    let r = cardItem.querySelector(".readPages");
    let t = cardItem.querySelector(".totalPages");
    
    r.setAttribute("contenteditable","true");
    t.setAttribute("contenteditable","true");
    r.focus();

    r.addEventListener('keypress', (evt) => {
        if (evt.which === 13) {
            evt.preventDefault();
        }
    });
    t.addEventListener('keypress', (evt) => {
        if (evt.which === 13) {
            evt.preventDefault();
        }
    });
}

function removeBook(currentNode){
    let cardItem = currentNode.parentNode.parentNode;
    let uid = cardItem.getAttribute("data-item");


    if(uid != 9000){
        let bookList = JSON.parse(localStorage.getItem("books"));
        for(book of bookList){
            if(book["uid"] == uid){
                bookList.pop(book);
                localStorage.setItem("books",JSON.stringify(bookList))
            }
        }
    }
    while (cardItem.firstChild) {
        cardItem.removeChild(cardItem.firstChild);
    }
    cardItem.remove();

}

function updatePagesRead(obj){
    let bookObj;
    let cardItem = obj.parentNode.parentNode.parentNode.parentNode;
    let cardId = cardItem.getAttribute("data-item");
    let read = cardItem.querySelector(".finish");

    obj.setAttribute("contenteditable","false");
    
    let newPagesRead = obj.textContent;
    let bookList = JSON.parse(localStorage.getItem("books"));
   
    for(book of bookList){
        if(book["uid"] == cardId){
            bookObj = book;
        }
    }
    if(parseInt(newPagesRead) > parseInt(bookObj.pages)){
        alert("Read pages must be less than total.")
        obj.textContent = bookObj.progress;
    }
    else{
        let newProgress = Math.floor((newPagesRead/bookObj.pages) * 100);
        bookObj.progress = newPagesRead;
       
        updateProgressBar(newProgress,cardId)

        if(newProgress < 100){
            bookObj.read = false;
            read.checked = false;
        }
        if(parseInt(newProgress) == 100){
            bookObj.read = true;
            read.checked = true;
        }

        for(book of bookList){
            if(book["uid"] == bookObj["uid"]){
                book.progress = bookObj.progress;
                book.read = bookObj.read;
            }
        }
        localStorage.setItem("books",JSON.stringify(bookList))
        
    }
    

}
function updateTotalPages(obj){
    let bookObj;
    let cardItem = obj.parentNode.parentNode.parentNode.parentNode;
    let cardId = cardItem.getAttribute("data-item");
    let read = cardItem.querySelector(".finish");

    obj.setAttribute("contenteditable","false");
    
    let newTotal = obj.textContent;
    let bookList = JSON.parse(localStorage.getItem("books"));

    for(book of bookList){
        if(book["uid"] == cardId){
            bookObj = book;
        }
    }
    if(parseInt(newTotal) < parseInt(bookObj.progress)){
        alert("Total pages cannot be less than progress.")
        obj.textContent = book.pages;
    }
    else{
        let newProgress = Math.floor((bookObj.progress/newTotal) * 100);
        updateProgressBar(newProgress,cardId);
        bookObj.pages = newTotal;
        if(newProgress < 100){
            bookObj.read = false;
            read.checked = false;
        }
        if(parseInt(newProgress) == 100){
            bookObj.read = true;
            read.checked = true;
        }
       
        for(book of bookList){
            if(book["uid"] == bookObj["uid"]){
                book.pages = bookObj.pages;
                book.read = bookObj.read;
            }
        }
        localStorage.setItem("books",JSON.stringify(bookList))
    }
    
}

function markAsRead(obj){
    let bookObj;
    let cardItem = obj.parentNode.parentNode.parentNode.parentNode.parentNode;
    let read = obj.checked;
    let uid = cardItem.getAttribute("data-item");

    let bookList = JSON.parse(localStorage.getItem("books"));

    for(book of bookList){
        if(book["uid"] == uid){
            bookObj = book;
        }
    }
    if(read){
        bookObj.read = true;
        bookObj.progress = book.pages;
        cardItem.querySelector(".readPages").textContent = `${bookObj.pages}`;
        for(book of bookList){
            if(book["uid"] == bookObj["uid"]){
                book.read = bookObj.read;
                book.progress = bookObj.progress;
            }
        }
        localStorage.setItem("books",JSON.stringify(bookList));
        updateProgressBar(100,uid)
        

    }
    else{
        cardItem.querySelector(".readPages").textContent = `${bookObj.progress}`;
        cardItem.querySelector(".readPages").textContent = `${bookObj.pages}`;

    }



   
}
function uploadPhoto(obj){
    let parentToAdd = obj.parentNode;
    let uid = (parentToAdd.parentNode.parentNode).getAttribute("data-item");
    let bookObj;

    let bookList = JSON.parse(localStorage.getItem("books"));

    for(book of bookList){
        if(book["uid"] == uid){
            bookObj = book;
        }
    }
    var preview = document.createElement("img");
    
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
  
    reader.onloadend = function () {
        preview.src = reader.result;
        bookObj.imgsrc = preview.src
        for(book of bookList){
            if(book["uid"] == bookObj.uid){
                book.imgsrc = bookObj.imgsrc;
            }
        }
        localStorage.setItem("books",JSON.stringify(bookList))
    }
  
    if (file) {
      reader.readAsDataURL(file);
      
    } else {
      preview.src = "";
    }

    parentToAdd.appendChild(preview)
    parentToAdd.removeChild(parentToAdd.childNodes[0])
}