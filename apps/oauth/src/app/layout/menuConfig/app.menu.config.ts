export const menuConfig: { [key: string]: any[] } = {
  ADMIN: [
    {
      label: 'Menú Principal',
     
      items: [
        {
          label: 'Administrar',
          icon: 'pi pi-fw pi-cog',
          items: [
            {
              label: 'Dashboard',
              icon: 'pi pi-fw pi-id-card',
              routerLink: ['/dashboard-ml/dashboard-odon'],
            },
            {
              label: 'Usuarios',
              icon: 'pi pi-fw pi-id-card',
              routerLink: ['/personal-info/consultar-personas'],
            },
            {
              label: 'Pacientes',
              icon: 'pi pi-fw pi-users',
              routerLink: ['/informacion-paciente'],
            },
            {
              label: 'Doctores',
              icon: 'pi pi-fw pi-users',
              routerLink: ['/doctor-info'],
            },
          ],
        },
        {
          label: 'Gestionar',
          icon: 'pi pi-fw pi-briefcase',
          items: [
            {
              label: 'Tratamientos',
              icon: 'pi pi-fw pi-heart',
              routerLink: ['/doctor-info/man-tratamiento'],
            },
            {
              label: 'cargar',
              icon: 'pi pi-fw pi-heart',
              routerLink: ['/informacion-paciente/archivo-info'],
            }
          ],
        },
      ],
    },
  ],  
  DOCTOR: [
    {
      label: 'Menú Principal',
      items: [
        {
          label: 'Gestión de Pacientes',
          icon: 'pi pi-fw pi-users',
          items: [
            {
              label: 'Pacientes',
              icon: 'pi pi-fw pi-user',
              routerLink: ['/informacion-paciente'],
            },
          ],
        },
        {
          label: 'Gestión de Agenda',
          icon: 'pi pi-fw pi-calendar',
          items: [
            {
              label: 'Calendario',
              icon: 'pi pi-fw pi-calendar',
              routerLink: ['/cita-info/calendario-info'],
            },
          ],
        },
        {
          label: 'Gestión de Citas',
          icon: 'pi pi-fw pi-calendar-plus',
          items: [
            {
              label: 'Citas',
              icon: 'pi pi-fw pi-calendar-plus',
              routerLink: ['/cita-info'],
            },
            {
              label: 'Historial Citas',
              icon: 'pi pi-fw pi-history',
              routerLink: ['/cita-info/historial-cita'],
            },
          ],
        },
      ],
    },
  ],
  
  PACIENTE: [
    {
      label: 'Menú Principal',
      items: [
        {
          label: 'Gestión de Citas',
          icon: 'pi pi-fw pi-calendar-plus',
          items: [
            {
              label: 'Citas',
              icon: 'pi pi-fw pi-calendar-plus',
              routerLink: ['/cita-info/p-cita-info'],
            },
            {
              label: 'Historial Citas',
              icon: 'pi pi-fw pi-history',
              routerLink: ['/cita-info/historial-cita'],
            },
            {
              label: 'Historial Clínico',
              icon: 'pi pi-fw pi-history',
              routerLink: ['/informacion-paciente/historial-clinico'],
            }
          ],
        },
      ],
    },
  ],
};
