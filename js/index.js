// get the form and table elements from html
const form = document.getElementById('form');
const tbody = document.querySelector('.tbody');

// function to add an activity on the todo list
function addActivity(e){
    e.preventDefault();
    const activity = document.getElementById('todo-id').value;
    let tableRow = document.createElement('tr');
    tableRow.classList = "tr";

    if (activity.trim()!=""){
        tableRow.innerHTML = `
            <td id="activity">${activity}</td>
            <td><button type="button" class= "btn" id="edit-btn">Edit</td>
            <td><input type="checkbox" id="check">Mark As Done</td>  
            <td><button type="button" class= "btn" id="delete-btn">Delete</td>
            <td><button type="button" class= "btn" id="update-btn">Update</td>

        `
        // delete an activity
        const del = tableRow.querySelector('#delete-btn');
        del.addEventListener('click', e=>{
            tableRow.remove();
        })

        // mark an activity done
        const check =tableRow.querySelector('#check');
        const td = tableRow.querySelector('#activity');
        check.addEventListener('click', (e)=>{
            //td.style.textDecoration = "line-through";
            td.classList.toggle('td-checked');
            
        }, false)

        //edit an activity
        const edit = tableRow.querySelector('#edit-btn');
        const update = tableRow.querySelector('#update-btn');
        edit.addEventListener('click', e=>{
            td.setAttribute('contenteditable', true);
            update.style.display = "inline";
        })

        //update the activity
        update.addEventListener('click', e=>{
            td.setAttribute('contenteditable', false);
            update.style.display = "none";
        })
        //append the table row
        tbody.appendChild(tableRow)
    }
    form.reset()
}

form.addEventListener('submit', addActivity)
