const users = [
    {
        nombre:"Pedro",
        apellido:"Martinez",
        ordenes:[
            {
                nombreProducto:"Producto 1",
                descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
                cantidad:2,
                precio:49.99
            },
            {
                nombreProducto:"Producto 2",
                descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
                cantidad:2,
                precio:49.99
            }
        ]
    },
    {
        nombre:"Juan",
        apellido:"Perez",
        ordenes:[
            {
                nombreProducto:"Producto 3",
                descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
                cantidad:2,
                precio:49.99
            },
            {
                nombreProducto:"",
                descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
                cantidad:2,
                precio:49.99
            }
        ]
    },
    {
        nombre:"Maria",
        apellido:"Rodriguez",
        ordenes:[
            {
                nombreProducto:"Producto 4",
                descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
                cantidad:2,
                precio:49.99
            },
            {
                nombreProducto:"Producto 1",
                descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
                cantidad:2,
                precio:49.99
            }
        ]
    }
];

const optionUsers = ((element) => {
    let options = `<option value="" disabled selected>Selecciona tu usuario</option>`;

    users.forEach((user, key) => {
        options += `<option value="${key}">${user.nombre} ${user.apellido}</option>`;
    });

    element.innerHTML = options;
});

const showOrdersByUser = ((titleElement, bodyElement) => {
    const modalTitle = document.getElementById(titleElement);
    const modalBody = document.getElementById(bodyElement);
    let bodyContent = `<div class="card w-75 mx-auto card-rounded">
    <div class="card-body">`;

    modalTitle.innerHTML = `${actualUser.nombre}, Estas son tus ordenes`;
    
    actualUser.ordenes.forEach((order, key) => {
        bodyContent += `<h4 class="card-title text-lugo">${order.nombreProducto}</h4>
        <p class="card-text">${order.descripcion}</p>
        <div class="text-right">
            <span class="text-secondary ml-auto"><b>$${order.precio}</b></span>
        </div>`;

        if ( actualUser.ordenes.length > (key+1) ) {
            bodyContent += '<div class="my-3"><hr></div>';
        }
    });

    bodyContent += `</div></div>`;
    modalBody.innerHTML = bodyContent;
});

const addOrderToUser = ((nombre, descripcion, precio) => {
    console.log(nombre, descripcion, precio);
});

export {users, optionUsers, showOrdersByUser, addOrderToUser};