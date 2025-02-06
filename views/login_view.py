import flet as ft

from components import PrimaryButton, SecondaryButton


class LoginView(ft.View):
    def __init__(self) -> None:
        super().__init__()
        self.route = "/login"

        self.__init_components__()

    def __init_components__(self) -> None:
        self.controls = [
            ft.SafeArea(
                ft.Column(
                    [
                        ft.Text("Login"),
                        ft.Row(
                            [
                                PrimaryButton("Login", on_click=self.__sign_in),
                                SecondaryButton("Register", on_click=self.__sign_up),
                            ]
                        ),
                        ft.TextButton("Reset password", on_click=self.__reset_password),
                    ]
                )
            )
        ]

    def __sign_in(self, e: ft.ControlEvent) -> None:
        e.page.go("/")
        e.page.update()

    def __sign_up(self, e: ft.ControlEvent) -> None:
        e.page.go("/register")
        e.page.update()

    def __reset_password(self, e: ft.ControlEvent) -> None:
        e.page.go("/reset")
        e.page.update()
