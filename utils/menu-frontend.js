// 1,Gerente General
// 2,Consultor
// 3,Asistente de Ventas
// 4,Responsable de compras
// 5,Gerente de Cuentas
// 6,Responsabe de de nóminas
// 7,Responsable de cuentas por pagar
// 8,Responsable de cuentas por cobrar
// 9,Responsablde de recepción
// 10,Contador
// 11,Responsable de tesoreria
// 12,Asistente de recursos humanos
const staticFrontendMenu = [
    {
        title: 'Mantenimientos',
        roles: [ 1, 12 ],
        items: [
            {
                title: 'Gestión de agentes',
                id: "gestAgentes",
                icon: 'fas fa-user',
                routes:[
                    { route: 'clientes', name: 'Clientes' },
                    { route: 'proveedor', name: 'Proveedores' },
                    { route: 'empleados', name: 'Empleados' }
                ]
            },
            {
                title: 'Gestión de inventario',
                id: "gestInvent",
                icon: 'fas fa-fw fa-cog',
                routes:[
                    { route: 'inventario', name: 'Iventario' }                    
                ]
            },   
        ]
    },
    {
        title: 'Ventas',
        roles: [ 1, 2, 3 ],
        items: [
            {
                title: 'Ciclo de ventas',
                icon: 'fas fa-sync',
                id: "cicloVent",
                routes:[
                    { route: 'ventas', name: 'Ventas' }
                ]
            }
        ]
    },
    {
        title: 'Compras',
        roles: [ 1, 4 ],
        items: [
            {
                title: 'Ciclo de compras',
                icon: 'fas fa-sync',
                id: "gestCom",
                routes:[
                    { route: 'compras', name: 'Registrar compras' },
                    { route: 'comprasComprobanteCompra', name: 'Ordenes de compra' },
                    { route: 'comprasRecibirProductos', name: 'Recepcionar compras' }
                ]
            }
        ]
    },
    {
        title: 'Nóminas',
        roles: [ 1, 6 ],
        items: [
            {
                title: 'Registro de Nóminas',
                icon: 'fas fa-fw fa-cog',
                id: "gestNom",
                routes:[
                    { route: 'nominas', name: 'Nóminas' }
                ]
            }
        ]
    },
    {
        title: 'Transacciones monetarias',
        roles: [ 1, 5 ],
        items: [
            {
                title: 'Cuentas por pagar',
                icon: 'fas fa-fw fa-cog',
                id: "gestTrans",
                routes:[
                    { route: 'nominas', name: 'Pago a proveedores' },
                    { route: 'nominas', name: 'Pago a empleados' }
                ]
            },
            {
                title: 'Cuentas por cobrar',
                icon: 'fas fa-fw fa-cog',
                id: "gestCobr",
                routes:[
                    { route: 'nominas', name: 'Pago de clientes' }
                ]
            }
        ]
    },
    {
        title: 'Libros',
        roles: [ 1, 10 ],
        items: [
            {
                title: 'Visualización de libros',
                id: "gestVisLib",
                icon: 'fas fa-fw fa-cog',
                routes:[
                    { route: 'diario', name: 'Libro Diario' },
                    { route: 'diario', name: 'Libro Mayor' },
                ]
            }
        ]
    },
];

module.exports = { staticFrontendMenu };
