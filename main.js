const IVA = 0.21;
const porcentajeDescuento = 0.15;
const porcentajeRec3 = 0.10;
const porcentajeRec6 = 0.25;
let seguirComprando = false;
let totalCompra = 0;

const categorias = [//Array con 2 objetos
    {//Objeto con 2 propiedades
        nombre: "Ferretería",
        subcategorias: [//La 2da propiedad es un array con 3 objetos
            {//Objeto con 2 propiedades
                nombre: "Herramientas",
                productos: [//Array con 3 objetos
                    {nombre: "Amoladora", precio: 550000},
                    {nombre: "Lijadora", precio: 465000},
                    {nombre: "Atornilladora", precio: 710000}
                ]  
            },
            {
                nombre: "Electricidad",
                productos: [
                    {nombre: "Térmicas", precio: 5600},
                    {nombre: "Disyuntores", precio: 7800},
                    {nombre: "Diferenciales", precio: 15000}
                ]
            },
            {
                nombre: "Tornillos",
                productos: [
                    {nombre: "Clavos", precio: 150},
                    {nombre: "Tornillos", precio: 285},
                    {nombre: "Remaches", precio: 300}
                ]
            }
        ]
    },
    {
        nombre: "Corralón",
        subcategorias: [
            {
                nombre: "Cemento",
                productos: [
                    {nombre: "Cemento", precio: 10000}
                ]  
            },
            {
                nombre: "Hierro",
                productos: [
                    {nombre: "Hierro", precio: 78000},
                    {nombre: "Maya de hierro", precio: 56600},
                    {nombre: "Alambre", precio: 14500}
                ]
            },
            {
                nombre: "Ladrillos",
                productos: [
                    {nombre: "Ladrillo hueco", precio: 2400},
                    {nombre: "Ladrillo de cemento", precio: 7900},
                    {nombre: "Ladrillo de barro", precio: 1200}
                ]
            }
        ]
    }
]

do {
    const categoria = prompt("¿Usted desea comprar en Ferretería o Corralón?\nSolo debe ingresar el número correspondiente\n1. Ferretería\n2. Corralón");
    const categoriaSeleccionada = categorias[parseInt(categoria) - 1];

    if (categoriaSeleccionada) {
        const subcategoria = prompt(`Elija una categoría en ${categoriaSeleccionada.nombre}\n${categoriaSeleccionada.subcategorias.map((subcat, index) => `${index + 1}.${subcat.nombre}`).join('\n')}`); 
        const subcategoriaSeleccionada = categoriaSeleccionada.subcategorias[parseInt(subcategoria) - 1];
        
        if (subcategoriaSeleccionada) { 
            const producto = prompt(`¿Qué desea comprar en ${subcategoriaSeleccionada.nombre}?\n${subcategoriaSeleccionada.productos.map((prod, index) => `${index + 1}. ${prod.nombre}`).join('\n')}`); 
            const productoSeleccionado = subcategoriaSeleccionada.productos[parseInt(producto) - 1];

            if (productoSeleccionado) { 
                const cantidad = parseInt(prompt("Ingrese la cantidad:")); 
                console.log(cantidad);
                if (cantidad > 0) { 
                    totalCompra += calcularSubtotal(cantidad, productoSeleccionado.precio); 
                } else { 
                    alert("Cantidad no válida."); 
                } 
            } else { 
                alert("Opción de producto no válida.");
            } 
        } else { 
            alert("Opción de subcategoría no válida."); 
        }
    } else { 
        alert("Opción de categoría general no válida.");
    };

    seguirComprando = confirm("¿Desea seguir comprando?");

} while (seguirComprando);

const totalConIVA = calcularIVA(totalCompra); 
Pago(totalConIVA);

function calcularSubtotal(cantidad, precio) { 
    resultado = cantidad * precio; 
    return resultado;
};

function calcularIVA(subtotal) {
    resultado = subtotal + (subtotal * IVA); 
    return resultado;
};

function Pago(total) { 
    const medioPago = prompt("Seleccione el método de pago:\nSolo debe ingresar el número correspondiente\n1. Tarjeta débito\n2. Tarjeta crédito\n3. Transferencia"); 
    switch (medioPago) { 
        case "1": 
            alert(`El total de la compra es $${total.toFixed(2)}`); 
            break; 
        case "2": 
            PagoCredito(total); 
            break; 
        case "3": 
            const descuento = total - (total * porcentajeDescuento); 
            alert(`Pagando con transferencia tiene el 15% de descuento. El total de la compra es $${descuento.toFixed(2)}`); 
            break; 
        default: alert("Opción de pago inválida."); 
            break; 
    }
}

function PagoCredito(total) { 
    const cuotas = prompt("Desea hacerlo en:\n1. 1 cuota\n2. 3 cuotas\n3. 6 cuotas"); 
    switch (cuotas) { 
        case "1": 
            alert(`Pagando en 1 cuota no tiene recargo. El total de la compra es $${total.toFixed(2)}`); 
            break; 
        case "2": 
            const recargo3 = total + (total * porcentajeRec3); 
            alert(`Pagando en 3 cuotas tiene el 10% de recargo. El total de la compra es 3 cuotas de $${(recargo3 / 3).toFixed(2)} c/u`); 
            break; 
        case "3": 
            const recargo6 = total + (total * porcentajeRec6); 
            alert(`Pagando en 6 cuotas tiene el 25% de recargo. El total de la compra es 6 cuotas de $${(recargo6 / 6).toFixed(2)} c/u`); 
            break; 
        default: 
            alert("Opción de cuotas inválida."); 
            break; 
    }
}