class List_Builder {
    constructor() {
        this.list = [];
        this.sorted = 'asc'
        this.sorted_by = 'first'
        //get seed data
        this.init()
    }
    
    async init() {
        let data = await fetch("https://jsonplaceholder.typicode.com/users")
        data = await data.json()
        data.forEach((item) => {
            let name = item.name
            if(name.split(" ").length >= 3) {
                //sanitize input to ensure only first & last name
                if (name.includes('Mrs.')) name = name.replace("Mrs. ", '')
                if (name.includes('Ms.')) name = name.replace("Ms. ", '')
                if (name.includes('Mr.')) name = name.replace("Mr. ", '')
                if (name.includes(' I')) name = name.replace(" I", '')
                if (name.includes(' II')) name = name.replace(" II", '')
                if (name.includes(' III')) name = name.replace(" III", '')
                if (name.includes(' IV')) name = name.replace(" IV", '')
                if (name.includes(' V')) name = name.replace(" V", '')
                if (name.includes(' VI')) name = name.replace(" VI", '')
            }
            this.list.push(name)
        }) 
        //use seed data to build out list
        this.build()
    }

    build() {
        const list_shell = document.querySelector(".list_inner");
        //clear existing list from page
        list_shell.innerText = '';
        //sort list entries -> default first name ascending
        this.order()
        //build list items then attach to list
        this.list.forEach((item, i) => {
            //iterate over list & build list items
            let li = document.createElement("li");
            li.classList.add("li_shell");
            li.setAttribute("id", i)
            let text = document.createElement("div");
            text.classList.add("li_text");
            text.innerText = item;
            li.appendChild(text)
            //call to build buttons to build list buttons passing in index of list item
            li.appendChild(this.build_buttons(i))
            list_shell.appendChild(li);
        })
    }

    build_buttons(i) {
        //build out edit & delete buttons 
        let button_shell = document.createElement("div");
        button_shell.classList.add("button_shell");
        let edit = document.createElement("button");
        edit.classList.add("li_button");
        edit.innerText = "Edit"
        //add event listener to switch list entry w/ edit form
        edit.addEventListener("click", (e) => {
            //call to build_edit to build edit form passing in full name & index
            let form = this.build_edit(this.list[i], i);
            let shell = document.getElementById(i);
            shell.innerText = '';
            shell.appendChild(form)
            document.querySelector('.edit_input').focus()
        })
        let del = document.createElement("button");
        del.classList.add("li_button");
        del.innerText = "Delete"
        //add event listener to call delete function
        del.addEventListener('click', () => {
            this.delete(i)
        })
        button_shell.appendChild(edit)
        button_shell.appendChild(del)
        //returns completed button section
        return button_shell
    }

    build_edit(text, i) {
        //builds out edit form
        let form = document.createElement("div")
        form.classList.add("edit_shell")
        let first_name = document.createElement('input')
        let last_name = document.createElement('input')
        first_name.classList.add("edit_input")
        first_name.classList.add("first_name")
        first_name.value = text.split(" ")[0]
        last_name.classList.add("edit_input")
        last_name.classList.add("last_name")
        last_name.value = text.split(" ")[1]
        let save = document.createElement('button')
        save.classList.add('li_button')
        save.innerText = "Save"
        //add event listener when input changes to disable or enable the save button
        first_name.addEventListener('input', () => {
            //check if invalid input
            if((first_name.value === '') || (!/^[A-Za-z\s]*$/.test(first_name.value))) {
                save.disabled = true;
                save.classList.add('button_disabled')
            } else if ((last_name.value !== '') && (/^[A-Za-z\s]*$/.test(last_name.value))) {
                save.disabled = false;
                save.classList = "li_button"
            }
        })
        //add event listener when input changes to disable or enable the save button
        last_name.addEventListener('input', () => {
            //check if invalid input
            if((last_name.value === '') || (!/^[A-Za-z\s]*$/.test(last_name.value))) {
                save.disabled = true;
                save.classList.add('button_disabled')
            } else if ((first_name.value !== '') && (/^[A-Za-z\s]*$/.test(first_name.value))) {
                save.disabled = false;
                save.classList = "li_button"
            }
        })
        save.addEventListener("click", (e) => {
            if (/^[A-Za-z\s]*$/.test(last_name.value) && /^[A-Za-z\s]*$/.test(first_name.value)) {
                // join first & last names then add to list
                let full_name = document.querySelector(".first_name").value + " " + document.querySelector(".last_name").value
                this.edit(i, full_name)
            }
        })
        form.appendChild(first_name)
        form.appendChild(last_name)
        form.appendChild(save)
        //returns completed form
        return form
    }

    add(item) {
        //add item to list then rebuilds list
        if (typeof(item) === "string"){
            this.list.push(item)
            this.build();
        }
    }

    edit(i, update) {
        //given index & new entry, updates entry then rebuilds list
        if (typeof(update) === "string"){
            this.list[i] = update;
            this.build()
        }
    }

    delete(i) {
        //given index, deletes entry then rebuilds list
        this.list.splice(i, 1)
        this.build()
    }

    order() {
        //change the ordering of the list based on sorted (asc or dsc) & sortedBy (first / last name)
        if(this.sorted === 'asc') {
            if(this.sorted_by === 'first') {
                this.list.sort((a, b) => a.split(" ")[0].localeCompare(b.split(" ")[0]))
            } else if (this.sorted_by === 'last') {
                this.list.sort((a, b) => a.split(" ")[1].localeCompare(b.split(" ")[1]))
            }
        } else if (this.sorted === 'dsc') {
            if(this.sorted_by === 'first') {
                this.list.sort((a, b) => a.split(" ")[0].localeCompare(b.split(" ")[0])).reverse()
            } else if (this.sorted_by === 'last') {
                this.list.sort((a, b) => a.split(" ")[1].localeCompare(b.split(" ")[1])).reverse()
            }
        }
    }

}
