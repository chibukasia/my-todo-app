// get the form and table elements from html
const form = document.getElementById('form');
const tbody = document.querySelector('.tbody');

// function to add an activity on the todo list
function addActivity(e){
    e.preventDefault();
    const activity = document.getElementById('todo-id').value;
    const dueDate = document.getElementById('date').value;
    let tableRow = document.createElement('tr');
    tableRow.classList = "tr";
    let timeLeft;
    function activityCountDown(){
        let currentTime = new Date();
        let dueDateinMillisec = new Date(dueDate)
        let timeRemaining = dueDateinMillisec.getTime() - currentTime.getTime();

        //convert remaing time to days, hours, mins and seconds
        let days = Math.floor(timeRemaining/(1000 * 60 * 60 * 24));
        let hours = Math.floor((timeRemaining %(1000 * 60 * 60 * 24))/ (1000 * 60 * 60));
        let minutes = Math.floor((timeRemaining % (1000 * 60 * 60))/(1000 * 60));
        let seconds = Math.floor((timeRemaining % (1000 * 60))/1000)

        timeLeft = `${days} Days ${hours} Hrs ${minutes} Mins ${seconds} Secs`

        if (timeRemaining < 0){
            timeLeft = "Out of deadline"
        }
        return timeLeft;
    }

    activityCountDown();
    
    if (activity.trim()!=""){
        tableRow.innerHTML = `
            <td id="activity">${activity}</td>
            <td id="due-date">${dueDate}</td>
            <td id="time-remaining">${timeLeft}</td>
            <td><button type="button" class= "btn" id="edit-btn">Edit</td>
            <td><button type="button" class= "btn" id="update-btn">Update</td>
            <td><input type="checkbox" id="check">Mark As Done</td>  
            <td><button type="button" class= "btn" id="delete-btn">Delete</td>
            

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
//    setInterval(activityCountDown, 1000)
}

//setInterval(addActivity, 1000)
form.addEventListener('submit', addActivity)
