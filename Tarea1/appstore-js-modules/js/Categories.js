import stars from "./Stars.js";

const options = (() => {
    let content = '<option value="">Categoria</option>';
    store.forEach((category, key) => {
        content += `<option value="${key}">${category.nombreCategoria}</option>`;
    });

    return content;
});

export default options;