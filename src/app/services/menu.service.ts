// src/app/services/menu.service.ts
import { Injectable } from '@angular/core';
import { MenuItem } from '../shared/components/menu/menu.component';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // Definición centralizada de todos los ítems de menú posibles
  private readonly allMenuItems: Record<string, MenuItem> = {
    // Sección de Dashboard
    dashboard: {
      title: 'Tablero',
      url: '/pdf-template',
      icon: 'grid',
    },
  };
  // Mapeo de roles a menús
  private readonly roleMenuMappings: Record<string, string[]> = {
    test: ['dashboard'],
  };

  /**
   * Construye la estructura de menú para un rol específico
   * @param menuIds IDs de los elementos de menú a incluir
   * @returns Estructura de menú filtrada
   */
  private buildMenuFromIds(menuIds: string[]): MenuItem[] {
    const menu: MenuItem[] = [];
    const processedParents = new Set<string>();

    for (const id of menuIds) {
      // Para elementos hijo (formato: padre.hijo)
      if (id.includes('.')) {
        const [parentId, childId] = id.split('.');
        const parentItem = this.allMenuItems[parentId];

        if (parentItem && parentItem.children) {
          const childItem = parentItem.children.find(
            (item) => item.id === childId
          );

          // Si el elemento hijo existe
          if (childItem) {
            // Si ya hemos procesado el padre, lo buscamos en el menú
            if (processedParents.has(parentId)) {
              const existingParent = menu.find(
                (item) =>
                  item.title === parentItem.title &&
                  item.icon === parentItem.icon
              );

              if (existingParent && existingParent.children) {
                existingParent.children.push(childItem);
              }
            }
            // Si no hemos procesado el padre, creamos una copia nueva
            else {
              const newParent: MenuItem = {
                ...parentItem,
                children: [childItem],
              };
              menu.push(newParent);
              processedParents.add(parentId);
            }
          }
        }
      }
      // Para elementos padre
      else {
        const item = this.allMenuItems[id];
        if (item) {
          menu.push({ ...item });
          if (item.children) {
            processedParents.add(id);
          }
        }
      }
    }

    return menu;
  }

  /**
   * Método público para obtener el menú basado en el rol
   * @param role Rol del usuario
   * @returns Estructura de menú para el rol especificado
   */
  getMenuByRole(role: string): MenuItem[] {
    // Obtener los IDs de menú para el rol
    const menuIds = this.roleMenuMappings[role];

    // Construir el menú basado en los IDs
    return this.buildMenuFromIds(menuIds);
  }
}
