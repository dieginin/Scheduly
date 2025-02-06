import flet as ft

from components import PrimaryButton


class ResetView(ft.View):
    def __init__(self) -> None:
        super().__init__()
        self.route = "/reset"

        self.__init_components__()

    def __init_components__(self) -> None:
        self.controls = [
            ft.SafeArea(
                ft.Column(
                    [
                        ft.Text("Reset"),
                        PrimaryButton("Reset password", on_click=self.__reset_password),
                    ]
                )
            )
        ]

    def __reset_password(self, e: ft.ControlEvent) -> None:
        e.page.go("/login")
        e.page.update()
