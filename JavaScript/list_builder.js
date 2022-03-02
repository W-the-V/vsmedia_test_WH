class List_Builder {
    constructor() {
        this.list = [];
        this.sorted = 'asc'
        this.sorted_by = 'first'
        this.init()
    }
    
    async init() {
        let data = await fetch("https://jsonplaceholder.typicode.com/users")
        data = await data.json()
        data.forEach((item) => {
            let name = item.name
            if(name.split(" ").length >= 3) {
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
        this.build()
    }

    build() {
        const list_shell = document.querySelector(".list_inner");
        list_shell.innerText = '';
        this.order()
        this.list.forEach((item, i) => {
            let li = document.createElement("li");
            li.classList.add("li_shell");
            li.setAttribute("id", i)
            let text = document.createElement("div");
            text.classList.add("li_text");
            text.innerText = item;
            li.appendChild(text)
            li.appendChild(this.build_buttons(i))
            list_shell.appendChild(li);
        })
    }

    build_buttons(i) {
        let button_shell = document.createElement("div");
        button_shell.classList.add("button_shell");
        let edit = document.createElement("button");
        edit.classList.add("li_button");
        edit.innerText = "Edit"
        edit.addEventListener("click", (e) => {
            let form = this.build_edit(this.list[i], i);
            let shell = document.getElementById(i);
            shell.innerText = '';
            shell.appendChild(form)
            document.querySelector('.edit_input').focus()
        })
        let del = document.createElement("button");
        del.classList.add("li_button");
        del.innerText = "Delete"
        del.addEventListener('click', () => {
            this.delete(i)
        })
        button_shell.appendChild(edit)
        button_shell.appendChild(del)
        return button_shell
    }

    build_edit(text, i) {
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
        first_name.addEventListener('input', () => {
            if(first_name.value === '') {
                save.disabled = true;
                save.classList.add('button_disabled')
            } else if (last_name.value !== '') {
                save.disabled = false;
                save.classList = "li_button"
            }
        })
        last_name.addEventListener('input', () => {
            if(last_name.value === '') {
                save.disabled = true;
                save.classList.add('button_disabled')
            } else if (first_name.value !== '') {
                save.disabled = false;
                save.classList = "li_button"
            }
        })
        save.addEventListener("click", (e) => {
            let full_name = document.querySelector(".first_name").value + " " + document.querySelector(".last_name").value
            this.edit(i, full_name)
        })
        form.appendChild(first_name)
        form.appendChild(last_name)
        form.appendChild(save)
        return form
    }

    add(item) {
        if (typeof(item) === "string"){
            this.list.push(item)
            this.build();
        }
    }

    edit(i, update) {
        if (typeof(update) === "string"){
            this.list[i] = update;
            this.build()
        }
    }

    delete(i) {
        this.list.splice(i, 1)
        this.build()
    }

    order() {
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
