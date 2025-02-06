import flet as ft

from components import PrimaryButton, TertiaryButton


class HomeView(ft.View):
    def __init__(self) -> None:
        super().__init__()
        self.route = "/"

        self.__init_components__()

    def __init_components__(self) -> None:
        self.controls = [
            ft.Text("Home"),
            PrimaryButton("Logout", on_click=self.__logout),
            TertiaryButton("Settings", on_click=self.__settings),
        ]

    def __logout(self, e: ft.ControlEvent) -> None:
        e.page.go("/login")
        e.page.update()

    def __settings(self, e: ft.ControlEvent) -> None:
        e.page.go("/settings")
        e.page.update()
