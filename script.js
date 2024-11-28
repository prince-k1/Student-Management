let totalNumber = document.querySelector("#totalNumber");
let form = document.querySelector("form");
let ul = document.querySelector("#ul");
let sum = 0;
axios
.get(`https://crudcrud.com/api/f8a3094b48784547acb9d1535d3b794c/studentManager`)
.then((res) => {
    for(let i = 0; i < res.data.length; i++){
        displayOnScreen(res.data[i]);
        sum++;
    }
    totalNumber.innerHTML = `All students : ${sum}`
})
.catch(err => console.log(err))

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
       
    
   
    let obj = {
        name : e.target.name.value,
        mobile : e.target.mobile.value,
        address : e.target.address.value
    }
    
    axios
        .post("https://crudcrud.com/api/f8a3094b48784547acb9d1535d3b794c/studentManager", obj)
        .then((res) => {
            displayOnScreen(res.data)
            
        })
        .catch(err => console.log(err))
        totalNumber.innerHTML = `All students : ${++sum}`
})

function displayOnScreen(studentDetails){
    let li = document.createElement("li");
    li.innerHTML = `${studentDetails.name} - ${studentDetails.mobile} - ${studentDetails.address}`;
   
    li.id = `${studentDetails.name} - ${studentDetails.mobile} - ${studentDetails.address}`;
    let del = document.createElement('button');
    del.textContent = "Delete";
    del.className = 'btn btn-danger';
    del.addEventListener('click', (e) => {
        let parent = e.target.parentElement;
        axios
            .delete(`https://crudcrud.com/api/f8a3094b48784547acb9d1535d3b794c/studentManager/${studentDetails._id}`)
        parent.remove();
        totalNumber.innerHTML = `All students : ${--sum}`
    })
    let edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.className = 'btn btn-success'
    edit.addEventListener('click', (e)=> {
        let parent = e.target.parentElement;
        let id = parent.id;
        axios
            .delete(`https://crudcrud.com/api/f8a3094b48784547acb9d1535d3b794c/studentManager/${studentDetails._id}`)
        parent.remove();
        let arr = id.split('-');
        form.name.value = arr[0];
        form.mobile.value = arr[1];
        form.address.value = arr[2];
        totalNumber.innerHTML = `All students : ${--sum}`
    })
    li.appendChild(del);
    li.appendChild(edit);
    ul.appendChild(li);
}