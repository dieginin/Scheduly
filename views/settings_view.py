import flet as ft

from components import PrimaryButton


class SettingsView(ft.View):
    def __init__(self) -> None:
        super().__init__()
        self.route = "/settings"

        self.__init_components__()

    def __init_components__(self) -> None:
        self.controls = [
            ft.SafeArea(
                ft.Column(
                    [
                        ft.Text("Settings"),
                        PrimaryButton("Go home", on_click=self.__home),
                    ]
                )
            )
        ]

    def __home(self, e: ft.ControlEvent) -> None:
        e.page.go("/")
        e.page.update()
