'use strict';

let formEl = document.getElementById('myForm');
let divEl = document.getElementById('listContainer');
let ulEl = document.createElement('ul');
divEl.appendChild(ulEl);

let dolists = [];

function Dolist(getDone,date){
    this.getDone = getDone;
    this.date = date;
    dolists.push(this);
    
}


formEl.addEventListener('submit', clickSubmit);

function clickSubmit(event){
    
    event.preventDefault();

    let inputEl1 = event.target.getDone.value;

    let inputEl2 = event.target.date.value;

    new Dolist(inputEl1,inputEl2);
    
    settingItem();

    renderList();

    formEl.reset();
}

function renderList(){
    
    ulEl.textContent="";

        let j=0;

    for (let index = 0; index < dolists.length; index++) {
        
        j++;

        let liEl = document.createElement('li');
        ulEl.appendChild(liEl);

        liEl.textContent = `${j}. ${dolists[index].getDone}`;

        let pEl = document.createElement('span');
        liEl.appendChild(pEl);

        pEl.textContent = 'X';

        pEl.setAttribute('id' , dolists[index].date);

        pEl.addEventListener('click',removeItem);

        let liEl1 = document.createElement('p');
        liEl.appendChild(liEl1);

        liEl1.textContent = `${dolists[index].date}`;

        
    }
}

function removeItem(event){
    
    let removeItem = event.target.id;
  for (let i=0; i<dolists.length;i++)
  {
    if (dolists[i].date===removeItem){
        dolists.splice(i,1);
        }
    }
    settingItem();
    renderList();
  }

function settingItem(){

    let data = JSON.stringify(dolists);

    localStorage.setItem('toDo',data);

}

function gettingItem(){

    let stringObj = localStorage.getItem('toDo');

    let normalObj = JSON.parse(stringObj);

    if(normalObj !== null)
    {
        dolists = normalObj;
    }
    renderList();
}





gettingItem();