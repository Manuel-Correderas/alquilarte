// public/js/admin/adminDashboard.js (Versión para prueba SIN BOOTSTRAP - Activando UserManagement)

console.log('ADMINDASHBOARD.JS: [1] Archivo adminDashboard.js cargado e iniciando ejecución (MODO SIN BOOTSTRAP).');

// Importaciones de otros módulos
import { initializeDepartmentManagement } from './DEPARTMENTMANAGEMENT.JS';
import { initializeUserManagement } from './USERMANAGEMENT.JS'; // <--- ¡DESCOMENTADA!
// import { initializeMapTab } from './MAPAMANAGEMENT.JS'; // Mantenemos comentada si no se usa ahora

console.log('ADMINDASHBOARD.JS: [2] Módulos de gestión importados.');

document.addEventListener('DOMContentLoaded', () => {
    console.log('ADMINDASHBOARD.JS: [EVENT] DOMContentLoaded se ha disparado. Iniciando carga directa de módulos.');

    // Llamada directa a la función de inicialización de departamentos.
    initializeDepartmentManagement();
    
    // <--- ¡NUEVA LÍNEA PARA INICIALIZAR GESTIÓN DE USUARIOS DIRECTAMENTE!
    initializeUserManagement(); 

    console.log('ADMINDASHBOARD.JS: [3] ---> adminDashboard.js DOMContentLoaded finalizado (MODO SIN BOOTSTRAP).');
});
// /public/js/admin/ADMINDASHBOARD.JS
document.addEventListener('DOMContentLoaded', function () {
  const triggerTabList = [].slice.call(document.querySelectorAll('#adminTabs a'));
  triggerTabList.forEach(function (triggerEl) {
    const tabTrigger = new bootstrap.Tab(triggerEl);
    triggerEl.addEventListener('click', function (e) {
      e.preventDefault();
      tabTrigger.show();
    });
  });
});
////
