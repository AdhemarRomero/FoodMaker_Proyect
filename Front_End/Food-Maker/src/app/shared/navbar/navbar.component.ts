import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { INavbarRoute } from './interfaces/navbar-route.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarRoutes: INavbarRoute[] = []

  constructor(
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.initNavBar()
    this.takeRoutes()
  }

  private initNavBar() {
    this.navbarRoutes = [
      {
        href: "/home",
        icon: "/assets/navbar/navbar-home-icon.svg",
        iconActive: "/assets/navbar/navbar-home-icon-active.svg",
        isActive: true,
        name: "Home"
      },
      {
        href: "/category",
        icon: "/assets/navbar/navbar-category-icon.svg",
        iconActive: "/assets/navbar/navbar-category-icon-active.svg",
        isActive: false,
        name: "Category"
      },
      {
        href: "/recipe/new",
        icon: "/assets/navbar/navbar-plus-icon.svg",
        iconActive: "/assets/navbar/navbar-plus-icon-active.svg",
        isActive: false,
        name: "Plus",
        class: "navbar-plus-icon"
      },
      {
        href: "/favorite",
        icon: "/assets/navbar/navbar-favorite-icon.svg",
        iconActive: "/assets/navbar/navbar-favorite-icon-active.svg",
        isActive: false,
        name: "Favorite"
      },
      {
        href: "/account",
        icon: "/assets/navbar/navbar-account-icon.svg",
        iconActive: "/assets/navbar/navbar-account-icon-active.svg",
        isActive: false,
        name: "Account"
      }
    ]
  }

  handleOnClickRoute(navbarRouteHref: string) {
    this.router.navigateByUrl(navbarRouteHref)
      .then(() => this.takeRoutes())
  }

  handleNavbarRouteChange(navbarRouteHref: string) {
    this.navbarRoutes.forEach(
      navbarRoute => this.handleFindHandleNavbarRouteChange(
        navbarRoute,
        navbarRouteHref
      )
    )
  }

  handleFindHandleNavbarRouteChange(navbarRoute: INavbarRoute, navbarRouteHref: string) {
    navbarRoute.isActive = navbarRoute.href === navbarRouteHref

    navbarRoute.isActive && navbarRoute.href == "/recipe/new"
      ? navbarRoute.class = "navbar-plus-icon-hidden"
      : navbarRoute.class = "navbar-plus-icon"

    navbarRoute.href != "/recipe/new" && (delete navbarRoute.class)
  }

  takeRoutes() {
    const urlFullPath = this.router.url

    const urlPaths = urlFullPath.split("/")

    const [, mainPath] = urlPaths

    this.handleNavbarRouteChange(`/${mainPath}`)
  }
}
