window.addEventListener('DOMContentLoaded', () => {
    const list_builder = new List_Builder();

    const add_shell = document.querySelector(".add_form")
    const add_button = document.querySelector(".add_button")
    const add_first = document.querySelector(".add_first")
    const add_last = document.querySelector(".add_last")
    const add_save = document.querySelector('.add_save')
    const order_asc = document.getElementById('asc')
    const order_dsc = document.getElementById('dsc')
    const order_first = document.getElementById('order_first')
    const order_last = document.getElementById('order_last')

    add_button.addEventListener('click', (e) => {
        add_button.classList.add("hidden")
        add_shell.classList.remove("hidden")
        add_first.focus()
    })

    add_first.addEventListener('input', (e) => {
        if (add_first.value === '') {
            add_save.disabled = true
            add_save.classList.add('button_disabled')
        } else if(add_last.value !== '') {
            add_save.disabled = false
            add_save.classList = "li_button"
        }
    })

    add_last.addEventListener('input', (e) => {
        if (add_last.value === '') {
            add_save.disabled = true
            add_save.classList.add('button_disabled')
        } else if(add_first.value !== '') {
            add_save.disabled = false
            add_save.classList = "li_button"
        }
    })

    add_save.addEventListener('click', (e) => {
        if(add_first.value !== '' && add_last.value !== '') {
            list_builder.add(add_first.value + " " + add_last.value)
            add_first.value = ''
            add_last.value = ''
            add_shell.classList.add('hidden')
            add_button.classList.remove('hidden')
            add_save.classList.add("button_disabled")
        }
    })

    order_asc.addEventListener('click', () => {
        if(list_builder.sorted === "asc") return
        list_builder.sorted = "asc"
        order_asc.classList = "li_button active"
        order_dsc.classList = "li_button"
        list_builder.build()
    })

    order_dsc.addEventListener('click', () => {
        if(list_builder.sorted === "dsc") return
        list_builder.sorted = "dsc"
        order_asc.classList = "li_button"
        order_dsc.classList = "li_button active"
        list_builder.build()
    })

    order_first.addEventListener('click', () => {
        if(list_builder.sorted_by === "first") return
        list_builder.sorted_by = "first"
        order_first.classList = "li_button active"
        order_last.classList = "li_button"
        list_builder.build()
    })

    order_last.addEventListener('click', () => {
        if(list_builder.sorted_by === "last") return
        list_builder.sorted_by = "last"
        order_first.classList = "li_button"
        order_last.classList = "li_button active"
        list_builder.build()
    })
})
