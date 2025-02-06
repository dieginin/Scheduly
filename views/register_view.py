import flet as ft

from components import PrimaryButton, SecondaryButton


class RegisterView(ft.View):
    def __init__(self) -> None:
        super().__init__()
        self.route = "/register"

        self.__init_components__()

    def __init_components__(self) -> None:
        self.controls = [
            ft.SafeArea(
                ft.Column(
                    [
                        ft.Text("Register"),
                        ft.Row(
                            [
                                PrimaryButton("Login", on_click=self.__sign_in),
                                SecondaryButton("Register", on_click=self.__sign_up),
                            ]
                        ),
                    ]
                )
            )
        ]

    def __sign_in(self, e: ft.ControlEvent) -> None:
        e.page.go("/login")
        e.page.update()

    def __sign_up(self, e: ft.ControlEvent) -> None:
        e.page.go("/")
        e.page.update()
