import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import {
  IonApp,
  IonRouterOutlet,
  IonBadge,
  IonIcon,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  add,
  alertCircleOutline,
  bedOutline,
  calendarOutline,
  cashOutline,
  chatbubbleOutline,
  chevronBackOutline,
  chevronForwardOutline,
  close,
  cubeOutline,
  downloadOutline,
  exitOutline,
  eyeOffOutline,
  eyeOutline,
  gridOutline,
  homeOutline,
  listOutline,
  lockClosedOutline,
  logInOutline,
  logOutOutline,
  mailOutline,
  medicalOutline,
  medkitOutline,
  peopleOutline,
  personOutline,
  searchOutline,
  searchSharp,
  personAddSharp,
  logOutSharp,
  callOutline,
  personAddOutline,
  notificationsOutline,
  trashOutline,
  createOutline,
  settingsOutline,
  starOutline,
  wifi,
  wifiOutline,
  calendarNumber,
  flash,
  medkit,
  chevronDownCircleOutline,
  documentText,
  pencilOutline,
  chevronDown,
  chevronUp,
  documentTextSharp,
  documentTextOutline,
  nutritionOutline,
  restaurantOutline,
  chevronUpOutline,
  chevronDownOutline,
  folderOutline,
  ellipse,
  ellipseOutline,
  flaskOutline,
  remove,
  shieldOutline,
  cardOutline,
  receiptOutline,
  analyticsOutline,
  personCircleOutline,
  listCircleOutline,
  businessOutline,
  cogOutline,
  image,
  imageOutline,
  documentOutline,
  timeOutline,
  checkboxOutline,
  keyOutline,
  videocamOutline,
  addCircleOutline,
  today,
  todayOutline,
  calendarNumberOutline,
  statsChartOutline,
  barChartOutline,
  accessibilityOutline,
  bookOutline,
  leafOutline,
  beakerOutline,
  clipboardOutline,
  womanOutline,
  manOutline,
  chevronForward,
  ellipsisVerticalOutline,
  addOutline,
  save,
  saveOutline,
  checkmarkCircleOutline,
  checkmarkCircle,
  closeCircleOutline,
  closeOutline,
  refreshOutline,
  arrowBack,
  arrowForward,
  calendar,
  locationOutline,
  ban,
  checkmarkOutline,
  femaleOutline,
  maleOutline,
  reorderThreeSharp,
  reorderThreeOutline,
  settings,
  settingsSharp,
  checkmarkCircleSharp,
  eyeSharp,
  swapVerticalSharp,
  peopleCircleOutline,
  arrowBackOutline,
  removeCircleOutline,
  arrowDownCircleOutline,
} from 'ionicons/icons';
import { filter, Subscription } from 'rxjs';
import { version } from './commons/constants';
import { MenuComponent, MenuItem } from '@components/menu/menu.component';
import { MenuService } from '@services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    // IonBadge,
    // IonBadge,
    // IonChip,
    CommonModule,
    IonApp,
    // IonIcon,
    IonRouterOutlet,
    // RouterLink,
    // RouterLinkActive,
    MenuComponent,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  public selectedPath = '';
  public menuItems: MenuItem[] = [];
  public menuExpanded = false;
  public isMobile = false;
  public version = version;
  public isLogin: boolean = true;
  public isOnline: boolean = true;
  public userRole: string = 'médico';

  private userSubscription!: Subscription;
  private authStateSubscription!: Subscription;
  private subscriptions = new Subscription();

  // Información del usuario
  public userProfile = {
    name: '',
    email: '',
    avatar: 'assets/avatar.svg',
    role: '',
  };

  constructor(private router: Router, private menuService: MenuService) {
    // Detectar si está en móvil
    this.checkScreenSize();

    // Registrar todos los iconos que se usarán en la aplicación
    this.registerIcons();
  }

  private registerIcons() {
    addIcons({
      arrowBackOutline,
      accessibilityOutline,
      add,
      removeCircleOutline,
      arrowDownCircleOutline,
      addCircleOutline,
      alertCircleOutline,
      analyticsOutline,
      beakerOutline,
      bedOutline,
      bookOutline,
      businessOutline,
      calendarNumber,
      calendarNumberOutline,
      calendarOutline,
      callOutline,
      cardOutline,
      cashOutline,
      chatbubbleOutline,
      checkboxOutline,
      chevronBackOutline,
      chevronDown,
      chevronDownCircleOutline,
      chevronDownOutline,
      chevronForwardOutline,
      chevronUp,
      chevronUpOutline,
      clipboardOutline,
      close,
      cogOutline,
      createOutline,
      cubeOutline,
      documentOutline,
      documentText,
      documentTextOutline,
      documentTextSharp,
      downloadOutline,
      ellipse,
      ellipseOutline,
      exitOutline,
      eyeOffOutline,
      eyeOutline,
      flash,
      flaskOutline,
      folderOutline,
      gridOutline,
      homeOutline,
      imageOutline,
      keyOutline,
      leafOutline,
      listCircleOutline,
      listOutline,
      lockClosedOutline,
      logInOutline,
      logOutOutline,
      logOutSharp,
      mailOutline,
      medicalOutline,
      medkit,
      medkitOutline,
      notificationsOutline,
      nutritionOutline,
      pencilOutline,
      peopleOutline,
      personAddOutline,
      personAddSharp,
      personCircleOutline,
      personOutline,
      receiptOutline,
      remove,
      restaurantOutline,
      searchOutline,
      searchSharp,
      settingsOutline,
      shieldOutline,
      starOutline,
      statsChartOutline,
      timeOutline,
      todayOutline,
      trashOutline,
      videocamOutline,
      wifi,
      wifiOutline,
      womanOutline,
      manOutline,
      chevronForward,
      ellipsisVerticalOutline,
      addOutline,
      save,
      saveOutline,
      checkmarkCircle,
      checkmarkCircleOutline,
      closeCircleOutline,
      closeOutline,
      refreshOutline,
      arrowBack,
      arrowForward,
      calendar,
      locationOutline,
      ban,
      checkmarkOutline,
      femaleOutline,
      maleOutline,
      reorderThreeSharp,
      reorderThreeOutline,
      settings,
      settingsSharp,
      checkmarkCircleSharp,
      eyeSharp,
      swapVerticalSharp,
      peopleCircleOutline,
    });
  }

  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    // Si cambia a móvil, contraer el menú
    if (this.isMobile) {
      this.menuExpanded = false;
    }
  }

  ngOnInit() {
    // Actualizar ruta seleccionada cuando cambia la navegación
    this.menuItems = this.menuService.getMenuByRole('test');

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.selectedPath = event.url;

        // En dispositivos móviles, contraer el menú después de la navegación
        if (this.isMobile) {
          this.menuExpanded = false;
        }
      });

    // Establecer la ruta inicial
    this.selectedPath = this.router.url || '/pdf-template';

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => { });
  }
  @HostListener('document:click')
  @HostListener('document:touchstart')
  @HostListener('document:keydown')
  async onUserInteraction() { }

  ngOnDestroy() {
    // Limpiar las suscripciones para evitar fugas de memoria
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }

    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  // Método para navegar a una ruta
  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  // Método para expandir/contraer el menú
  toggleMenu() {
    this.menuExpanded = !this.menuExpanded;
  }

  async logout() {
    console.log('Cerrar sesión:');
  }
}
