import os

import flet as ft


def get_routes() -> dict:
    routes = {}

    for file in os.listdir("views"):
        if file.endswith(".py"):
            module_name = file[:-3]
            module = __import__(f"views.{module_name}", fromlist=[module_name])

            for attr_name in dir(module):
                attr = getattr(module, attr_name)

                if (
                    isinstance(attr, type)
                    and issubclass(attr, ft.View)
                    and attr != ft.View
                ):
                    route = "/" + attr_name[0].lower() + attr_name[1:]

                    if route.endswith("View"):
                        route = route[:-4]
                    if route == "/home":
                        route = "/"

                    routes[route] = attr

    return routes


routes = get_routes()


class PageNotFoundView(ft.View):
    def __init__(self, page: ft.Page):
        super().__init__()
        self.page: ft.Page = page
        self.route = "/pageNotFound"

        self.horizontal_alignment = ft.CrossAxisAlignment.CENTER
        self.vertical_alignment = ft.MainAxisAlignment.CENTER

        self.controls = [ft.Text("Page Not Found", size=32, weight=ft.FontWeight.BOLD)]


class Router:
    def __init__(self, page: ft.Page):
        page.on_route_change = self.on_route_change
        page.go("/")

    def on_route_change(self, e: ft.RouteChangeEvent):
        e.page.views.clear()

        if e.route in routes:
            e.page.views.append(routes[e.route](e.page))
        else:
            e.page.views.append(PageNotFoundView(e.page))

        e.page.update()
