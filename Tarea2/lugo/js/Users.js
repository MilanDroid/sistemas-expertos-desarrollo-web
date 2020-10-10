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
    let options = "";

    usersStorage.forEach((user, key) => {
        options += `<option value="${key}" ${key == 0 ? 'selected':''}>${user.nombre} ${user.apellido}</option>`;
    });

    element.innerHTML = options;

    actualUser = usersStorage[element.value];
    document.getElementById('user-name').innerHTML = actualUser.nombre;
    document.getElementById('btn-view-orders').removeAttribute('disabled');
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
    const cantidad = document.getElementById('add-order-count');
    const user = document.getElementById('users').value;
    
    usersStorage[user].ordenes.push({
        nombreProducto: nombre,
        descripcion: descripcion,
        cantidad: cantidad,
        precio: precio
    });

    localStorage.setItem('usuarios', JSON.stringify(usersStorage));
});

const showAddOrderModal = ((nombre, descripcion, precio) => {
    const modalBody = document.getElementById('detail-add-order-body');

    modalBody.innerHTML = `<h4 class="text-lugo font-weight-normal">${nombre}</h4>
    <p class="card-text">${descripcion}</p>
    <form>
        <div class="form-group">
            <label for="recipient-name" class="col-form-label">Cantidad a solicitar:</label>
            <input type="text" class="form-control form-control-sm" id="add-order-count">
        </div>
    </form>
    <p class="card-text text-right py-0 my-0 mt-2">
        <span class="text-secondary ml-auto"><b>$${precio}</b></span>
    </p>
    <div class="modal-footer text-right">
        <button type="button"
        class="btn btn-primary-dark bg-dark-lugo rounded-pill text-white px-5"
        data-dismiss="modal"
        onclick="addOrder('${nombre}', '${descripcion}', ${precio})">Procesar orden</button>
    </div>`;
});

export {users, optionUsers, showOrdersByUser, addOrderToUser, showAddOrderModal};