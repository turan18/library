let bookCollection = [new Book("Harry Potter","JK Rowling",120,60,false,0)];
let uniqueID = 1;
function Book(title,author,pages,progress,read,uid,imgsrc){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.progress = progress;
    this.read = read;
    this.uid = uid;
}

function formRead(obj){
    let slider = ((obj.parentNode.parentNode).previousElementSibling).querySelector("#pagesRead")
    
    let pages = ((slider.parentNode).previousElementSibling).querySelector("#pages");
    console.log(pages);
    if(obj.checked){
        slider.value = pages.value;
    }
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
        bookCollection.push(new Book(t,a,p,pr,r,id,""));
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



    photo.appendChild(addPhoto);
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

function uploadPhoto(obj){
    let parentToAdd = obj.parentNode;
    let card = (parentToAdd.parentNode.parentNode).getAttribute("data-item");
    let bookObj;
    for(book of bookCollection){
        if(book["uid"] == card){
            bookObj = book;
        }
    }
    var preview = document.createElement("img");
    
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
  
    reader.onloadend = function () {
        preview.src = reader.result;
        bookObj.imgsrc = preview.src
      
    }
  
    if (file) {
      reader.readAsDataURL(file);
      
    } else {
      preview.src = "";
    }

    parentToAdd.appendChild(preview)
    parentToAdd.removeChild(parentToAdd.childNodes[0])
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
            console.log("Do this");
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
    for(book of bookCollection){
        if(book["uid"] == uid){
            bookCollection.pop(book);
        }
    }
    while (cardItem.firstChild) {
        cardItem.removeChild(cardItem.firstChild);
    }
    cardItem.remove();

}

function updatePagesRead(obj){
    let total,current;
    let cardItem = obj.parentNode.parentNode.parentNode.parentNode;
    let cardId = cardItem.getAttribute("data-item");
    let read = cardItem.querySelector(".finish");

    obj.setAttribute("contenteditable","false");
    
    let newPagesRead = obj.textContent;

    let bookObj;
    for(book of bookCollection){
        if(book["uid"] == cardId){
            current = book.progress;
            total = book.pages;
            bookObj = book;
        }
    }
    if(parseInt(newPagesRead) > parseInt(total)){
        alert("Read pages must be less than total.")
        obj.textContent = current;
    }
    else{
        let newProgress = Math.floor((newPagesRead/total) * 100);
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
        
    }
    

}
function updateTotalPages(obj){
    let progress;
    let cardItem = obj.parentNode.parentNode.parentNode.parentNode;
    let cardId = cardItem.getAttribute("data-item");
    let read = cardItem.querySelector(".finish");

    obj.setAttribute("contenteditable","false");
    
    let newTotal = obj.textContent;
    let bookObj;
    for(book of bookCollection){
        if(book["uid"] == cardId){
            current = book.pages;
            progress = book.progress;
            bookObj = book;
        }
    }
    if(parseInt(newTotal) < parseInt(progress)){
        alert("Total pages cannot be less than progress.")
    
        obj.textContent = current;
    }
    else{
        let newProgress = Math.floor((progress/newTotal) * 100);
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
       
    }
    
}

function markAsRead(obj){
    let cardItem = obj.parentNode.parentNode.parentNode.parentNode.parentNode;
    
    let read = obj.checked;
    let uid = cardItem.getAttribute("data-item");
    let bookObj;
    for(book of bookCollection){
        if(book["uid"] == uid){
            bookObj = book;
        }
    }
    if(read){
        bookObj.read = true;
        bookObj.progress = book.pages;
        cardItem.querySelector(".readPages").textContent = `${bookObj.pages}`;
        updateProgressBar(100,uid)
    }
    else{
        cardItem.querySelector(".readPages").textContent = `${bookObj.progress}`;
        cardItem.querySelector(".readPages").textContent = `${bookObj.pages}`;

    }



   
}
