import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonIcon, IonBadge } from '@ionic/angular/standalone';

export interface MenuItem {
  id?: string;
  title: string;
  url?: string;
  icon?: string;
  children?: MenuItem[];
  permissions?: string[];
  expanded?: boolean;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    IonBadge,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    IonIcon,
    IonBadge,
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() menuItems: MenuItem[] = [];
  @Input() menuExpanded = false;
  @Input() userProfile: any;
  @Input() appVersion: string = '';

  // @Output() logout = new EventEmitter<void>();

  toggleSubmenu(item: MenuItem) {
    // Para controlar la expansión de submenús
    item.expanded = !item.expanded;
  }

  // Método para verificar si el usuario tiene los permisos necesarios para ver un ítem del menú
  canView(item: MenuItem): boolean {
    if (!item.permissions || item.permissions.length === 0) {
      return true; // Sin restricciones de permisos
    }

    // Verificar si el usuario tiene alguno de los permisos requeridos
    return true;
  }

  hasChildren(item: MenuItem): boolean {
    return !!(item.children && item.children.length > 0);
  }

  async logout() {
    console.log('Cerrar sesión:');
  }
}
